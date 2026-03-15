import os
import time
import requests
import re
import json
from bs4 import BeautifulSoup
from supabase import create_client, Client

# === CONFIGURATION ===
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ ERROR: Please set SUPABASE_URL and SUPABASE_KEY environment variables.")
    exit(1)

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
except TypeError as te:
    if "keywords" in str(te) and "proxy" in str(te):
        print("This is a version conflict between supabase-py and gotrue-py.")
        print("Attempting to bypass by using custom options...")
        try:
            from supabase.lib.client_options import ClientOptions
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY, options=ClientOptions(postgrest_client_timeout=10))
            print("✅ Successfully connected using ClientOptions override.")
        except Exception as e2:
            print(f"❌ Failed fallback connection: {e2}")
            exit(1)
    else:
        print(f"❌ ERROR: TypeError during connection: {te}")
        exit(1)
except Exception as e:
    print(f"❌ ERROR: Failed to connect to Supabase (General): {e}")
    exit(1)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

def get_price_z2u(soup):
    try:
        selectors = [
            '.price', '.item-price', '.price-num', '.goods-price', 
            'span.d-pricing', '.price-now', '.price-box .price',
            '[id*="price"]', '[class*="price"]'
        ]
        for sel in selectors:
            el = soup.select_one(sel)
            if el:
                text = el.get_text(strip=True)
                match = re.search(r"(\d+\.?\d*)", text)
                if match:
                    val = float(match.group(1))
                    if 0.1 < val < 500: return val
        content = soup.get_text(separator=' ')
        matches = re.findall(r"\$\s*(\d+\.?\d*)", content)
        if matches:
            for m in matches:
                val = float(m)
                if 0.5 < val < 500: return val
    except: pass
    return None

def get_price_wmc(soup):
    try:
        price_el = soup.select_one('.price_usd') or soup.select_one('.product-price') or soup.select_one('.price')
        if price_el:
            price_text = price_el.get_text(strip=True)
            match = re.search(r"(\d+\.?\d*)", price_text)
            if match:
                return float(match.group(1))
    except: pass
    return None

def calculate_selling_price(cost, profit_margin_p, fixed_fee_p, global_margin, global_fee):
    margin = profit_margin_p if profit_margin_p is not None else global_margin
    fee = fixed_fee_p if fixed_fee_p is not None else global_fee
    return (cost * margin) + fee

def scrape_official_price(url):
    if not url: return None
    try:
        res = requests.get(url, headers=HEADERS, timeout=15)
        if res.status_code != 200: return None
        content = res.text
        soup = BeautifulSoup(content, 'html.parser')
        json_ld = soup.find_all('script', type='application/ld+json')
        for script in json_ld:
            try:
                if not script.string: continue
                data = json.loads(script.string)
                items = data if isinstance(data, list) else [data]
                for item in items:
                    offers = item.get('offers')
                    if not offers and '@graph' in item:
                        items.extend(item['@graph'])
                        continue
                    if offers:
                        if isinstance(offers, list): offers = offers[0]
                        price = offers.get('price') or offers.get('lowPrice') or offers.get('priceSpecification', {}).get('price')
                        if price: return float(str(price).replace(',', ''))
            except: continue
        data_matches = re.findall(r'price["\']?\s*[:=]\s*["\']?(\d{1,4}(?:[.,]\d{2})?)["\']?', content, re.IGNORECASE)
        visible_matches = re.findall(r'[\$€£]\s?(\d{0,4}(?:[.,]\d{2}))', content)
        visible_matches += re.findall(r'(\d{0,4}(?:[.,]\d{2}))\s?[\$€£]', content)
        monthly_matches = re.findall(r'(?:month|mo|mo\.)\s?[\$€£]?\s?(\d{1,4}(?:[.,]\d{2})?)', content, re.IGNORECASE)
        all_matches = data_matches + visible_matches + monthly_matches
        prices = []
        for m in all_matches:
            try:
                clean_m = m.replace(',', '.')
                if clean_m.count('.') > 1:
                    parts = clean_m.split('.')
                    clean_m = "".join(parts[:-1]) + "." + parts[-1]
                val = float(clean_m)
                if 0.5 < val < 500: prices.append(val)
            except: continue
        if prices: return min(prices)
    except: pass
    return None

def run_checker():
    print("Starting availability & price check...")
    global_margin, global_fee = 1.1, 3.0
    try:
        settings_res = supabase.table('site_settings').select('value').eq('key', 'store').maybe_single().execute()
        if settings_res.data:
            global_margin = settings_res.data['value'].get('global_profit_margin', 1.1)
            global_fee = settings_res.data['value'].get('global_fixed_fee', 3.0)
    except Exception as e:
        print(f"Error fetching global settings: {e}")

    products = supabase.table('products').select('*').execute().data
    for p in products:
        p_id = p['id']
        name = p['name_en']
        z2u_url, wmc_url, official_url = p.get('source_url', ''), p.get('wmcentre_url', ''), p.get('official_url', '')
        print(f"\n[{p_id}] Checking {name}...")
        scraped_official = scrape_official_price(official_url)
        z2u_status, z2u_price = None, None
        if z2u_url:
            try:
                res = requests.get(z2u_url, headers=HEADERS, timeout=15)
                if res.status_code == 200:
                    soup = BeautifulSoup(res.text, 'html.parser')
                    z2u_status = not (soup.find(text=lambda t: "Sold out" in t) or soup.select_one('.soldOut'))
                    z2u_price = get_price_z2u(soup)
            except: pass
        wmc_status, wmc_price = None, None
        if wmc_url:
            try:
                res = requests.get(wmc_url, headers=HEADERS, timeout=15)
                if res.status_code == 200:
                    soup = BeautifulSoup(res.text, 'html.parser')
                    wmc_status = 'buy_nav' in res.text and not ("Product out of stock" in res.text)
                    wmc_price = get_price_wmc(soup)
            except: pass
        
        is_available = False
        source = "NONE"
        scraped_cost = None
        if z2u_status is True and wmc_status is True:
            is_available, source = True, "BOTH"
            costs = [c for c in [z2u_price, wmc_price] if c]
            scraped_cost = min(costs) if costs else None
        elif z2u_status is True:
            is_available, source, scraped_cost = True, "Z2U", z2u_price
        elif wmc_status is True:
            is_available, source, scraped_cost = True, "WMC", wmc_price
        
        best_cost = scraped_cost if scraped_cost is not None else p.get('cost_price')
        if best_cost is None: best_cost = p.get('price', 0)
        new_selling_price = calculate_selling_price(best_cost, p.get('profit_margin'), p.get('fixed_fee'), global_margin, global_fee)
        
        updated_plans = []
        original_plans = p.get('subscription_plans', [])
        if original_plans:
            for i, plan in enumerate(original_plans):
                plan_cost = plan.get('cost_price')
                plan_official_url = plan.get('official_url', p.get('official_url'))
                if plan_official_url:
                    plan_scraped_official = scrape_official_price(plan_official_url)
                    if plan_scraped_official is not None: plan['official_price'] = plan_scraped_official
                if i == 0 and scraped_cost is not None:
                    if not plan_cost or plan_cost == 0:
                        plan['cost_price'] = scraped_cost
                        plan_cost = scraped_cost
                if plan_cost:
                    plan_new_price = calculate_selling_price(plan_cost, p.get('profit_margin'), p.get('fixed_fee'), global_margin, global_fee)
                    plan['price'] = round(plan_new_price, 2)
                updated_plans.append(plan)

        update_data = {
            'available': is_available,
            'availability_source': source,
            'cost_price': best_cost,
            'price': round(new_selling_price, 2),
            'official_price': scraped_official if scraped_official is not None else p.get('official_price'),
            'subscription_plans': updated_plans if updated_plans else original_plans,
            'last_availability_check': 'now()'
        }
        supabase.table('products').update(update_data).eq('id', p_id).execute()
        time.sleep(1)

if __name__ == "__main__":
    run_checker()
