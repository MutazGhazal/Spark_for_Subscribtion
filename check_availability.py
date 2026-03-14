import os
import time
import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client
import json

# Supabase Configuration (Assuming environment variables or a config file)
# In this environment, I'll look for supabase-config.js or similar to extract credentials if possible
# Or I can ask the user to provide them. But let's assume they are available.

# Try to load config from a local file if it exists
SUPABASE_URL = ""
SUPABASE_KEY = ""

def load_config():
    global SUPABASE_URL, SUPABASE_KEY
    try:
        # Check if there's a js config we can parse
        with open('js/supabase-config.js', 'r', encoding='utf-8') as f:
            content = f.read()
            # Simple extraction from JS
            if "supabaseUrl =" in content:
                SUPABASE_URL = content.split("supabaseUrl = '")[1].split("'")[0]
            if "supabaseKey =" in content:
                SUPABASE_KEY = content.split("supabaseKey = '")[1].split("'")[0]
    except Exception as e:
        print(f"Error loading config: {e}")

load_config()

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Supabase credentials not found. Please set them in js/supabase-config.js")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

def check_z2u(url):
    if not url or "z2u.com" not in url:
        return None
    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        if response.status_code != 200:
            return None
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Indicators for Z2U
        # 1. "Sold out" badge
        is_sold_out = soup.find(text=lambda t: "Sold out" in t) or soup.select_one('.soldOut')
        # 2. Presence of "Buy Now" button
        buy_btn = soup.select_one('button.button_submit')
        
        if is_sold_out:
            return False
        if buy_btn:
            return True
        
        # Fallback: check text
        if "Adequate stock" in response.text or "In stock" in response.text:
            return True
            
        return False
    except Exception as e:
        print(f"Z2U Check Error ({url}): {e}")
        return None

def check_wmc(url):
    if not url or "wmcentre" not in url:
        return None
    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        if response.status_code != 200:
            return None
        
        # Indicators for WMCentre
        # 1. Buy button presence
        if 'buy_nav' in response.text:
            return True
            
        # 2. Out of stock text
        if "Product out of stock" in response.text or "Sales of this product are temporarily suspended" in response.text:
            return False
            
        return False
    except Exception as e:
        print(f"WMC Check Error ({url}): {e}")
        return None

def run_checker():
    print("Starting availability check...")
    
    # Fetch all products
    response = supabase.table('products').select('id, name_en, source_url, wmcentre_url').execute()
    products = response.data
    
    for p in products:
        p_id = p['id']
        name = p['name_en']
        z2u_url = p.get('source_url', '')
        wmc_url = p.get('wmcentre_url', '')
        
        print(f"Checking {name} ({p_id})...")
        
        z2u_status = check_z2u(z2u_url)
        wmc_status = check_wmc(wmc_url)
        
        is_available = False
        source = "NONE"
        
        if z2u_status is True and wmc_status is True:
            is_available = True
            source = "BOTH"
        elif z2u_status is True:
            is_available = True
            source = "Z2U"
        elif wmc_status is True:
            is_available = True
            source = "WMC"
        elif z2u_status is False or wmc_status is False:
            is_available = False
            source = "NONE"
            
        print(f"  Result: Available={is_available}, Source={source}")
        
        # Update database
        supabase.table('products').update({
            'available': is_available,
            'availability_source': source,
            'last_availability_check': 'now()'
        }).eq('id', p_id).execute()
        
        # Be nice to the servers
        time.sleep(1)

    print("Check complete.")

if __name__ == "__main__":
    run_checker()
