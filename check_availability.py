import os
import time
import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client
import json

# Supabase Configuration (Assuming environment variables or a config file)
# In this environment, I'll look for supabase-config.js or similar to extract credentials if possible
# Or I can ask the user to provide them. But let's assume they are available.

import re

# Try to load config from a local file if it exists
SUPABASE_URL = ""
SUPABASE_KEY = ""

def load_config():
    global SUPABASE_URL, SUPABASE_KEY
    try:
        # Check if there's a js config we can parse
        with open('js/supabase-config.js', 'r', encoding='utf-8') as f:
            content = f.read()
            # More robust extraction using regex
            url_match = re.search(r"SUPABASE_URL\s*=\s*(['\"])(.*?)\1", content)
            key_match = re.search(r"SUPABASE_ANON_KEY\s*=\s*(['\"])(.*?)\1", content)
            
            if url_match:
                SUPABASE_URL = url_match.group(2)
            if key_match:
                SUPABASE_KEY = key_match.group(2)
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

def get_price_z2u(soup):
    try:
        # Common Z2U price selectors
        price_el = soup.select_one('.price') or soup.select_one('.item-price')
        if price_el:
            price_text = price_el.get_text(strip=True)
            match = re.search(r"(\d+\.?\d*)", price_text)
            if match:
                return float(match.group(1))
    except: pass
    return None

def get_price_wmc(soup):
    try:
        # Common WMC price selectors
        price_el = soup.select_one('.price_usd') or soup.select_one('.product-price')
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
        
        print(f"Checking {name} ({p_id})...")
        
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
        best_cost = p.get('cost_price', 0)
        
        if z2u_status is True and wmc_status is True:
            is_available = True
            source = "BOTH"
            costs = [c for c in [z2u_price, wmc_price] if c]
            best_cost = min(costs) if costs else best_cost
        elif z2u_status is True:
            is_available = True
            source = "Z2U"
            best_cost = z2u_price if z2u_price else best_cost
        elif wmc_status is True:
            is_available = True
            source = "WMC"
            best_cost = wmc_price if wmc_price else best_cost
        elif z2u_status is False or wmc_status is False:
            is_available = False
            source = "NONE"
            
        print(f"  Result: Available={is_available}, Source={source}, Cost={best_cost}$")
        
        # Recalculate selling price
        new_selling_price = calculate_selling_price(
            best_cost, 
            p.get('profit_margin'), 
            p.get('fixed_fee'), 
            global_margin, 
            global_fee
        )
        
        # Update database
        supabase.table('products').update({
            'available': is_available,
            'availability_source': source,
            'cost_price': best_cost,
            'price': round(new_selling_price, 2),
            'last_availability_check': 'now()'
        }).eq('id', p_id).execute()
        
        # Be nice to the servers
        time.sleep(1)

    print("Check complete.")

if __name__ == "__main__":
    run_checker()
