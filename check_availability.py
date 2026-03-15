import os
import sys
sys.stdout.reconfigure(encoding='utf-8')
import time
import requests
import re
import json
from bs4 import BeautifulSoup
from supabase import create_client, Client

# === CONFIGURATION ===
# Try to load from .env file if exists
if os.path.exists(".env"):
    with open(".env", "r") as f:
        for line in f:
            if "=" in line:
                k, v = line.strip().split("=", 1)
                os.environ[k] = v

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ ERROR: Please set SUPABASE_URL and SUPABASE_KEY environment variables (or create .env file).")
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

def get_price_z2u(soup, content=None):
    try:
        if content and ("Request error" in content or "Product does not exist" in content):
            return None # Detected soft 404

        # 1. Try JSON-LD logic first
        if content:
            json_ld = soup.find_all('script', type='application/ld+json')
            for script in json_ld:
                try:
                    if not script.string: continue
                    data = json.loads(script.string)
                    items = data if isinstance(data, list) else [data]
                    for item in items:
                        offers = item.get('offers')
                        if offers:
                            if isinstance(offers, list): offers = offers[0]
                            price = offers.get('price')
                            if price:
                                val = float(str(price).replace(',', '').replace('$', ''))
                                if val > 0.1: return val
                except: continue

            # 2. Prefer specific span.priceTxt or elements with currency
            price_spans = soup.select('span.priceTxt') or soup.select('.price-num') or soup.select('.item-price')
            if price_spans:
                valid_prices = []
                for s in price_spans:
                    match = re.search(r"(\d+\.?\d*)", s.get_text())
                    if match:
                        val = float(match.group(1))
                        if 0.5 < val < 1000: valid_prices.append(val)
                if valid_prices:
                    # In subscription contexts, we usually want a mid-to-high price or specific one.
                    # For now, let's filter out anything < 1.0 if there are larger prices
                    high_prices = [v for v in valid_prices if v >= 1.0]
                    return min(high_prices) if high_prices else min(valid_prices)

            # 3. Try Regex with currency symbol prefix/suffix (more likely to be actual price)
            currency_matches = re.findall(r'[\$\€\£]\s?(\d{1,4}(?:[.,]\d{2})?)', content)
            currency_matches += re.findall(r'(\d{1,4}(?:[.,]\d{2})?)\s?[\$\€\£]', content)
            if currency_matches:
                prices = []
                for m in currency_matches:
                    try:
                        val = float(m.replace(',', '.'))
                        if 0.5 < val < 1000: prices.append(val)
                    except: continue
                if prices:
                    high_prices = [v for v in prices if v >= 1.0]
                    return min(high_prices) if high_prices else min(prices)

        # Fallback to general selectors if above failed
        selectors = [
            'span.d-pricing', '.price', '.item-price', '.price-num',
            '.goods-price', '.price-now', '.price-box .price',
            '.product-price', '.product_price_new', '.current-price',
            '.productCardStyle-3 span', '.goods-info .price'
        ]
        for sel in selectors:
            for el in soup.select(sel): # Try all matches for the selector
                text = el.get_text(strip=True)
                match = re.search(r"(\d+\.?\d*)", text)
                if match:
                    val = float(match.group(1))
                    if 0.1 < val < 500: return val # Return the first valid price
        
        # Fallback: Check for hidden inputs or data attributes
        price_meta = soup.select_one('meta[property="product:price:amount"]')
        if price_meta and price_meta.get('content'):
            return float(price_meta['content'])

        # Fallback: Text search
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
        print(f"  🔍 Scraping Official: {url}")
        res = requests.get(url, headers=HEADERS, timeout=15)
        if res.status_code != 200: 
            print(f"    ⚠️ Official page failed: {res.status_code}")
            return None
        content = res.text
        if "vaptcha" in content.lower() or "challenge" in content.lower():
            print("    🚩 Official page blocked by anti-bot")
            return None
            
        soup = BeautifulSoup(content, 'html.parser')
        # Check JSON-LD
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
                        if price: return float(str(price).replace(',', '').replace('$', ''))
            except: continue

        # Regex fallback
        data_matches = re.findall(r'price["\']?\s*[:=]\s*["\']?(\d{1,4}(?:[.,]\d{2})?)["\']?', content, re.IGNORECASE)
        visible_matches = re.findall(r'[\$€£]\s?(\d{0,4}(?:[.,]\d{2}))', content)
        visible_matches += re.findall(r'(\d{0,4}(?:[.,]\d{2}))\s?[\$€£]', content)
        all_matches = data_matches + visible_matches
        prices = []
        for m in all_matches:
            try:
                val = float(m.replace(',', '.'))
                if 0.5 < val < 500: prices.append(val)
            except: continue
        if prices: return min(prices)
    except Exception as e:
        print(f"    ⚠️ Error official: {e}")
    return None

def run_checker():
    print("\n🚀 Starting availability & price check...")
    global_margin, global_fee = 1.1, 3.0
    try:
        settings_res = supabase.table('site_settings').select('value').eq('key', 'store').maybe_single().execute()
        if settings_res.data:
            global_margin = settings_res.data['value'].get('global_profit_margin', 1.1)
            global_fee = settings_res.data['value'].get('global_fixed_fee', 3.0)
    except Exception as e:
        print(f"Error fetching settings: {e}")

    products = supabase.table('products').select('*').execute().data
    for p in products:
        p_id = p['id']
        name = p['name_en']
        z2u_url, wmc_url, official_url = p.get('source_url', ''), p.get('wmcentre_url', ''), p.get('official_url', '')
        print(f"\n[{p_id}] {name}...")

        # 1. Official Price
        scraped_official = scrape_official_price(official_url)
        
        # 2. Z2U Scrape
        z2u_status, z2u_price = None, None
        if z2u_url:
            try:
                res = requests.get(z2u_url, headers=HEADERS, timeout=15)
                if res.status_code == 200:
                    content = res.text
                    if "item-detail" in content or "product" in content or "z2u" in content: # relaxed condition since some pages might not have product
                        soup = BeautifulSoup(content, 'html.parser')
                        z2u_status = not (soup.find(string=re.compile("Sold out")) or soup.select_one('.soldOut'))
                        z2u_price = get_price_z2u(soup, content)
                        if z2u_price: print(f"    ✅ Z2U price: ${z2u_price}")
                    else:
                        print("    🚩 Z2U page might be blocked or empty structure")
                else: print(f"    ⚠️ Z2U status: {res.status_code}")
            except Exception as e: print(f"    ❌ Z2U error: {e}")

        # 3. WMC Scrape
        wmc_status, wmc_price = None, None
        if wmc_url:
            try:
                res = requests.get(wmc_url, headers=HEADERS, timeout=15)
                if res.status_code == 200:
                    wmc_status = 'buy_nav' in res.text and not ("Product out of stock" in res.text)
                    wmc_price = get_price_wmc(BeautifulSoup(res.text, 'html.parser'))
                    if wmc_price: print(f"    ✅ WMC price: ${wmc_price}")
            except: pass
        
        # 4. Determine Availability & Cost
        is_available = False
        source = "NONE"
        scraped_cost = None
        
        if z2u_status is True and wmc_status is True:
            is_available, source = True, "BOTH"
            scraped_cost = min([c for c in [z2u_price, wmc_price] if c]) if (z2u_price or wmc_price) else None
        elif z2u_status is True:
            is_available, source, scraped_cost = True, "Z2U", z2u_price
        elif wmc_status is True:
            is_available, source, scraped_cost = True, "WMC", wmc_price
        else:
            # If scrapers failed (None), keep current availability
            is_available = p.get('available', False)

        # 5. DANGEROUS FALLBACK FIX: Never use selling price as cost!
        best_cost = scraped_cost if scraped_cost is not None else p.get('cost_price')
        if not best_cost: 
            print("    ⚠️ Skip price calculation (no cost available)")
            best_cost = p.get('cost_price', 0)
        
        # Only recalculate selling price if we actually have a cost > 0
        new_selling_price = p.get('price')
        if best_cost and best_cost > 0:
            new_val = calculate_selling_price(best_cost, p.get('profit_margin'), p.get('fixed_fee'), global_margin, global_fee)
            # Inflation protection: Only update if the change is reasonable OR if we have a fresh scrape.
            # If we didn't scrape anything, don't update the price at all.
            if scraped_cost is not None:
                new_selling_price = round(new_val, 2)
        
        # 6. Update Plans
        updated_plans = []
        original_plans = p.get('subscription_plans', [])
        if original_plans:
            for i, plan in enumerate(original_plans):
                plan_cost = plan.get('cost_price')
                # Update 1st plan cost from main scrape if it was 0
                if i == 0 and scraped_cost is not None:
                    if not plan_cost or plan_cost == 0:
                        plan['cost_price'] = scraped_cost
                        plan_cost = scraped_cost
                
                if plan_cost and plan_cost > 0:
                    plan['price'] = round(calculate_selling_price(plan_cost, p.get('profit_margin'), p.get('fixed_fee'), global_margin, global_fee), 2)
                updated_plans.append(plan)

        # 7. Sync DB
        update_data = {
            'available': is_available,
            'availability_source': source,
            'cost_price': best_cost,
            'price': new_selling_price,
            'official_price': scraped_official if scraped_official is not None else p.get('official_price'),
            'subscription_plans': updated_plans if updated_plans else original_plans,
            'last_availability_check': 'now()'
        }
        try:
            supabase.table('products').update(update_data).eq('id', p_id).execute()
        except: print(f"    ❌ DB update failed for {p_id}")
        time.sleep(1)

if __name__ == "__main__":
    run_checker()
