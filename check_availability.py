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
        if content:
            content_lower = content.lower()
            if "request error" in content_lower or "product does not exist" in content_lower or "no results found" in content_lower:
                return None # Detected soft 404

        # 1. Collect ALL potential prices first
        potential_prices = []

        # JSON-LD
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
                                potential_prices.append(val)
                except: continue

        # Specific spans (most reliable)
        price_spans = soup.select('span.priceTxt') or soup.select('.price-num') or soup.select('.item-price') or soup.select('.price')
        if price_spans:
            for s in price_spans:
                match = re.search(r"(\d+\.?\d*)", s.get_text())
                if match:
                    potential_prices.append(float(match.group(1)))

        # Regex fallback with currency
        if content:
            currency_matches = re.findall(r'[\$\€\£]\s?(\d{1,4}(?:[.,]\d{2})?)', content)
            currency_matches += re.findall(r'(\d{1,4}(?:[.,]\d{2})?)\s?[\$\€\£]', content)
            for m in currency_matches:
                try: potential_prices.append(float(m.replace(',', '.')))
                except: continue

        # 2. Filter and Pick
        # Ignore very low prices (likely fees) and very high (outliers)
        # Typically, a subscription is > $0.80. Anything like $0.25 or $0.45 is usually a fee.
        valid_prices = [v for v in potential_prices if 0.8 <= v < 1000]
        
        if valid_prices:
            # If we found multiple prices, and some are $1.0 vs $10.0, 
            # we should avoid the absolute minimum if it's suspicious.
            # But for now, returning the minimum > $0.80 is the safest fix for "0 cost".
            return min(valid_prices)

        # 3. Last resort fallback (very relaxed)
        if potential_prices:
            relaxed = [v for v in potential_prices if 0.1 < v < 500]
            if relaxed: return min(relaxed)

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

        # 1. Specialized JSON-LD check (Already good, but let's be thorough)
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
                        if price: return float(str(price).replace(',', '').replace('$', '').replace(' ', ''))
            except: continue

        # 2. Targeted Selectors for common sites
        # Spotify, Disney, Netflix often use headings or specific price spans
        selectors = [
            'span[data-testid="price-amount"]', '.pricing-card__price', 
            '.price-text', '.amount', '.price-value', '.plan-price', 
            'h3.price', '.pricing__price', '#price', '.cost'
        ]
        for sel in selectors:
            el = soup.select_one(sel)
            if el:
                txt = el.get_text(strip=True)
                match = re.search(r"(\d+\.?\d*)", txt.replace(',', '.'))
                if match:
                    val = float(match.group(1))
                    if 0.5 < val < 1000: return val

        # 3. Regex Fallback (More aggressive)
        # Look for patterns like $19.99, 19,99 €, etc.
        # We look for prices followed by /mo, /month, or preceded by $
        patterns = [
            r'[\$\€\£]\s?(\d{1,4}(?:[.,]\d{2})?)',
            r'(\d{1,4}(?:[.,]\d{2})?)\s?[\$\€\£]',
            r'(\d{1,4}(?:[.,]\d{2})?)\s?/\s?(?:mo|month|year)',
        ]
        prices = []
        for p in patterns:
            matches = re.findall(p, content)
            for m in matches:
                try:
                    val = float(m.replace(',', '.'))
                    if 0.5 < val < 500: prices.append(val)
                except: continue
        
        if prices:
            # We take the minimum that isn't too low (e.g. avoided $0.0 if any)
            return min(prices)

    except Exception as e:
        print(f"    ⚠️ Error official ({url}): {e}")
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
    
    # Check for dry run
    dry_run = "--dry-run" in sys.argv
    if dry_run:
        print("🚩 DRY RUN MODE: Database will not be updated.")

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
                    # Check for soft 404
                    if "Request error" in content or "Product does not exist" in content:
                        print("    🚩 Z2U page: Product Not Found (404)")
                        z2u_status = False
                    elif "item-detail" in content or "product" in content or "z2u" in content:
                        soup = BeautifulSoup(content, 'html.parser')
                        z2u_status = not (soup.find(string=re.compile("Sold out")) or soup.select_one('.soldOut'))
                        z2u_price = get_price_z2u(soup, content)
                        if z2u_price: print(f"    ✅ Z2U price: ${z2u_price}")
                    else:
                        print("    🚩 Z2U page might be blocked or empty structure")
                elif res.status_code == 404:
                    print("    🚩 Z2U page: 404 Not Found")
                    z2u_status = False
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
                elif res.status_code == 404:
                    wmc_status = False
            except: pass
        
        # 4. Determine Availability & Cost
        is_available = p.get('available', False)
        source = p.get('availability_source', 'NONE')
        scraped_cost = None
        
        # If we have explicit negative info (404 or sold out), mark as unavailable
        if z2u_status is False and (not wmc_url or wmc_status is False):
            is_available = False
            print("    ⚠️ Product marked UNAVAILABLE (Sources confirmed empty/404)")
        elif z2u_status is True or wmc_status is True:
            is_available = True
            source = "BOTH" if (z2u_status and wmc_status) else ("Z2U" if z2u_status else "WMC")
            scraped_cost = min([c for c in [z2u_price, wmc_price] if c]) if (z2u_price or wmc_price) else None
        
        # 5. DANGEROUS FALLBACK FIX: Never use selling price as cost!
        best_cost = scraped_cost if scraped_cost is not None else p.get('cost_price')
        if not best_cost or best_cost == 0: 
            print("    ⚠️ Note: No valid cost available for this product")
            best_cost = 0
        
        # Only recalculate selling price if we actually have a cost > 0
        new_selling_price = p.get('price')
        if scraped_cost is not None:
            # If we have a cost, recalculate main price
            new_val = calculate_selling_price(best_cost, p.get('profit_margin'), p.get('fixed_fee'), global_margin, global_fee)
            new_selling_price = round(new_val, 2)
        
        # 6. Update Plans (Sync 1st plan or all 0 costs)
        updated_plans = []
        original_plans = p.get('subscription_plans', [])
        if original_plans:
            for i, plan in enumerate(original_plans):
                plan_cost = plan.get('cost_price', 0)
                # If plan cost is 0, try to inherit but ONLY if it's a 1-month/short duration plan
                # to avoid applying 1-month cost to 12-month plans.
                if (not plan_cost or plan_cost == 0) and scraped_cost:
                    label = (plan.get('label_en') or "").lower()
                    is_short = any(x in label for x in ['1 month', '30 day', '31 day', 'واحد', 'شهر'])
                    # If it's short duration OR there's only one plan, allow inheritance
                    if is_short or len(original_plans) == 1:
                        plan['cost_price'] = scraped_cost
                        plan_cost = scraped_cost
                    else:
                        print(f"    ℹ️ Skipping cost inheritance for plan: {plan.get('label_en')} (Not a 1-month plan)")
                
                # Recalculate price if we have a cost
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
        
        if dry_run:
            print(f"    📊 Pre-update check: Price ${new_selling_price}, Available: {is_available}")
            continue

        try:
            supabase.table('products').update(update_data).eq('id', p_id).execute()
        except Exception as e: 
            print(f"    ❌ DB update failed for {p_id}: {e}")
        time.sleep(1)

if __name__ == "__main__":
    run_checker()
