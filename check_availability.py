import os
import time
import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client
import json
import re

# Load .env if present (useful for local testing)
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Try to load config
SUPABASE_URL = ""
SUPABASE_KEY = ""

def load_config():
    global SUPABASE_URL, SUPABASE_KEY
    
    # 1. Check environment variables first (Standard for GitHub Actions)
    SUPABASE_URL = os.environ.get('SUPABASE_URL')
    SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
    
    if SUPABASE_URL and SUPABASE_KEY:
        print("✅ Credentials loaded from environment variables.")
        return

    # 2. Fallback: Check if there's a js config we can parse (Standard for local development)
    try:
        config_path = 'js/supabase-config.js'
        if os.path.exists(config_path):
            with open(config_path, 'r', encoding='utf-8') as f:
                content = f.read()
                url_match = re.search(r"SUPABASE_URL\s*=\s*(['\"])(.*?)\1", content)
                key_match = re.search(r"SUPABASE_ANON_KEY\s*=\s*(['\"])(.*?)\1", content)
                
                if url_match: SUPABASE_URL = url_match.group(2)
                if key_match: SUPABASE_KEY = key_match.group(2)
                
            if SUPABASE_URL and SUPABASE_KEY:
                print(f"✅ Credentials loaded from {config_path}")
                return
    except Exception as e:
        print(f"⚠️ Error reading local config file: {e}")

load_config()

# Debug: Print library versions to identify conflicts
try:
    import importlib.metadata
    libs = ['supabase', 'gotrue', 'postgrest', 'httpx']
    print("--- Library Versions ---")
    for lib in libs:
        try:
            version = importlib.metadata.version(lib)
            print(f"{lib}: {version}")
        except importlib.metadata.PackageNotFoundError:
            print(f"{lib}: Not found")
except Exception as e:
    print(f"Version check failed: {e}")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ ERROR: Supabase credentials not found!")
    if not SUPABASE_URL: print("   - Missing SUPABASE_URL")
    if not SUPABASE_KEY: print("   - Missing SUPABASE_KEY")
    print("\nPlease set them as Repository Secrets in GitHub Actions or in js/supabase-config.js locally.")
    exit(1)

try:
    # Attempt connection with default options
    print("Attempting to connect to Supabase...")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("✅ Successfully connected to Supabase.")
except TypeError as te:
    if "proxy" in str(te):
        print(f"❌ ERROR: Known Supabase Library Conflict Detected: {te}")
        print("This is a version conflict between supabase-py and gotrue-py.")
        print("Attempting to bypass by using custom options...")
        try:
            # Force empty client options to avoid proxy argument passing
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
    # Print the type of exception to help debug
    print(f"Exception Type: {type(e).__name__}")
    exit(1)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

def get_price_z2u(soup):
    try:
        # Common Z2U price selectors
        price_el = soup.select_one('.price') or soup.select_one('.item-price') or soup.select_one('.price-num') or soup.select_one('.goods-price')
        if price_el:
            price_text = price_el.get_text(strip=True)
            match = re.search(r"(\d+\.?\d*)", price_text)
            if match:
                return float(match.group(1))
        
        # Fallback: search for any text containing $ and numbers
        potential_prices = soup.find_all(string=re.compile(r"\$\s*\d+"))
        for text in potential_prices:
            match = re.search(r"(\d+\.?\d*)", str(text))
            if match:
                return float(match.group(1))
    except: pass
    return None

def get_price_wmc(soup):
    try:
        # Common WMC price selectors
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
    """
    Attempts to extract a price from an official website.
    Since official sites vary, we use a generic regex search for price patterns.
    """
    if not url: return None
    try:
        print(f"  🔍 Scraping Official: {url}")
        res = requests.get(url, headers=HEADERS, timeout=15)
        if res.status_code != 200:
            print(f"  ⚠️ Official site returned status {res.status_code}")
            return None
        
        content = res.text
        # Look for patterns like $19.99, £9.99, etc.
        matches = re.findall(r'[\$\€\£]\s?(\d{1,4}(?:[.,]\d{2})?)', content)
        matches += re.findall(r'(\d{1,4}(?:[.,]\d{2})?)\s?[\$\€\£]', content)
        
        prices = []
        for m in matches:
            try:
                val = float(m.replace(',', '.'))
                if 0.5 < val < 1000: prices.append(val)
            except: continue
            
        if prices:
            best = min(prices)
            print(f"  ✨ Found official price: ${best}")
            return best
    except Exception as e:
        print(f"  ⚠️ Error scraping official: {e}")
    return None

def run_checker():
    print("Starting availability & price check...")
    
    # 1. Fetch Global Settings
    global_margin = 1.1
    global_fee = 3.0
    try:
        settings_res = supabase.table('site_settings').select('value').eq('key', 'store').maybe_single().execute()
        if settings_res.data:
            global_margin = settings_res.data['value'].get('global_profit_margin', 1.1)
            global_fee = settings_res.data['value'].get('global_fixed_fee', 3.0)
    except Exception as e:
        print(f"Error fetching global settings: {e}")

    # 2. Fetch all products
    response = supabase.table('products').select('*').execute()
    products = response.data
    
    for p in products:
        p_id = p['id']
        name = p['name_en']
        z2u_url = p.get('source_url', '')
        wmc_url = p.get('wmcentre_url', '')
        official_url = p.get('official_url', '')
        
        print(f"\n[{p_id}] Checking {name}...")
        
        # Scrape Official Price if URL exists
        scraped_official = scrape_official_price(official_url)
        
        # Scrape Z2U
        z2u_status = None
        z2u_price = None
        if z2u_url:
            try:
                res = requests.get(z2u_url, headers=HEADERS, timeout=15)
                if res.status_code == 200:
                    soup = BeautifulSoup(res.text, 'html.parser')
                    z2u_status = not (soup.find(text=lambda t: "Sold out" in t) or soup.select_one('.soldOut'))
                    z2u_price = get_price_z2u(soup)
            except: pass

        # Scrape WMC
        wmc_status = None
        wmc_price = None
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
            is_available = True
            source = "BOTH"
            costs = [c for c in [z2u_price, wmc_price] if c]
            scraped_cost = min(costs) if costs else None
        elif z2u_status is True:
            is_available = True
            source = "Z2U"
            scraped_cost = z2u_price
        elif wmc_status is True:
            is_available = True
            source = "WMC"
            scraped_cost = wmc_price
        elif z2u_status is False or wmc_status is False:
            is_available = False
            source = "NONE"

        # Determine best cost to use for calculation
        db_cost = p.get('cost_price')
        
        # If we found a price on the site, that's our new cost.
        # If not, use the current cost from DB.
        # As a last resort (first run), use the selling price.
        best_cost = scraped_cost if scraped_cost is not None else db_cost
        if best_cost is None:
            best_cost = p.get('price', 0)
            
        print(f"  Result: Available={is_available}, Source={source}, Cost={best_cost}$")
        
        # Calculate selling price (always recalculate to reflect any changes in margins/fees)
        new_selling_price = calculate_selling_price(
            best_cost, 
            p.get('profit_margin'), 
            p.get('fixed_fee'), 
            global_margin, 
            global_fee
        )
        
        # Update subscription plans if they exist
        updated_plans = []
        original_plans = p.get('subscription_plans', [])
        if original_plans:
            for plan in original_plans:
                plan_cost = plan.get('cost_price')
                plan_official_url = plan.get('official_url')
                
                # Scrape official price for plan if URL exists
                if plan_official_url:
                    plan_scraped_official = scrape_official_price(plan_official_url)
                    if plan_scraped_official:
                        plan['official_price'] = plan_scraped_official

                # If plan has a cost_price, update its selling price.
                if plan_cost is not None:
                    plan_new_price = calculate_selling_price(
                        plan_cost,
                        p.get('profit_margin'),
                        p.get('fixed_fee'),
                        global_margin,
                        global_fee
                    )
                    plan['price'] = round(plan_new_price, 2)
                updated_plans.append(plan)

        # Update database
        update_data = {
            'available': is_available,
            'availability_source': source,
            'cost_price': best_cost,
            'price': round(new_selling_price, 2),
            'official_price': scraped_official if scraped_official else p.get('official_price'),
            'subscription_plans': updated_plans if updated_plans else original_plans,
            'last_availability_check': 'now()'
        }
        supabase.table('products').update(update_data).eq('id', p_id).execute()
        
        # Be nice to the servers
        time.sleep(1)

    print("Check complete.")

if __name__ == "__main__":
    run_checker()
