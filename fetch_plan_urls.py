"""
Fetch Source URLs for Subscription Plans
Each product can have multiple plans (durations) with different URLs
"""

import os
import sys
import json
import re
import time
from urllib.parse import quote
from typing import List, Dict, Optional

import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client

# Load env
if os.path.exists('.env'):
    with open('.env', 'r') as f:
        for line in f:
            if '=' in line:
                k, v = line.strip().split('=', 1)
                os.environ[k] = v

SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY')

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}


# ============================================
# DATABASE OF Z2U URLs BY PRODUCT AND DURATION
# ============================================

Z2U_PLAN_URLS = {
    # Netflix
    'netflix': {
        '1_month': 'https://www.z2u.com/product-30948/Personal-Account-Netflix-30days-4K-UHD-Premium-1-Month.html',
        '3_months': 'https://www.z2u.com/product-30949/',
        '6_months': 'https://www.z2u.com/product-30950/',
        '12_months': 'https://www.z2u.com/product-30951/',
    },
    
    # Spotify
    'spotify': {
        '1_month': 'https://www.z2u.com/product-875242/',
        '3_months': 'https://www.z2u.com/product-875265/',
        '6_months': 'https://www.z2u.com/product-875266/',
        '12_months': 'https://www.z2u.com/product-875267/',
    },
    
    # YouTube Premium
    'youtube': {
        '1_month': 'https://www.z2u.com/product-875243/',
        '3_months': 'https://www.z2u.com/product-875268/',
        '6_months': 'https://www.z2u.com/product-875269/',
        '12_months': 'https://www.z2u.com/product-875270/',
    },
    
    # Disney+
    'disney': {
        '1_month': 'https://www.z2u.com/product-875244/',
        '3_months': 'https://www.z2u.com/product-875271/',
        '6_months': 'https://www.z2u.com/product-875272/',
        '12_months': 'https://www.z2u.com/product-875273/',
    },
    
    # HBO Max
    'hbo': {
        '1_month': 'https://www.z2u.com/product-875245/',
        '3_months': 'https://www.z2u.com/product-875274/',
        '6_months': 'https://www.z2u.com/product-875275/',
        '12_months': 'https://www.z2u.com/product-875276/',
    },
    
    # Xbox Game Pass
    'xbox': {
        '1_month': 'https://www.z2u.com/product-875246/',
        '3_months': 'https://www.z2u.com/product-875277/',
        '6_months': 'https://www.z2u.com/product-875278/',
        '12_months': 'https://www.z2u.com/product-875279/',
    },
    
    # PlayStation Plus
    'playstation': {
        '1_month': 'https://www.z2u.com/product-875247/',
        '3_months': 'https://www.z2u.com/product-875280/',
        '12_months': 'https://www.z2u.com/product-875281/',
    },
    
    # NordVPN
    'nordvpn': {
        '1_month': 'https://www.z2u.com/product-875248/',
        '3_months': 'https://www.z2u.com/product-875282/',
        '6_months': 'https://www.z2u.com/product-875283/',
        '12_months': 'https://www.z2u.com/product-875284/',
    },
    
    # Canva Pro
    'canva': {
        '1_month': 'https://www.z2u.com/product-875249/',
        '3_months': 'https://www.z2u.com/product-875285/',
        '6_months': 'https://www.z2u.com/product-875286/',
        '12_months': 'https://www.z2u.com/product-875287/',
    },
    
    # ChatGPT Plus
    'chatgpt': {
        '1_month': 'https://www.z2u.com/product-875262/',
        '3_months': 'https://www.z2u.com/product-875288/',
        '6_months': 'https://www.z2u.com/product-875289/',
        '12_months': 'https://www.z2u.com/product-875290/',
    },
    
    # Crunchyroll
    'crunchyroll': {
        '1_month': 'https://www.z2u.com/product-875250/',
        '3_months': 'https://www.z2u.com/product-875291/',
        '12_months': 'https://www.z2u.com/product-875292/',
    },
    
    # Amazon Prime
    'amazon': {
        '1_month': 'https://www.z2u.com/product-875251/',
        '3_months': 'https://www.z2u.com/product-875293/',
        '12_months': 'https://www.z2u.com/product-875294/',
    },
    
    # Apple TV
    'apple': {
        '1_month': 'https://www.z2u.com/product-875252/',
        '3_months': 'https://www.z2u.com/product-875295/',
        '12_months': 'https://www.z2u.com/product-875296/',
    },
}


WMCENTRE_PLAN_URLS = {
    # Netflix
    'netflix': {
        '1_month': 'https://wmcentre.su/product/netflix-1-month/',
        '3_months': 'https://wmcentre.su/product/netflix-3-months/',
        '6_months': 'https://wmcentre.su/product/netflix-6-months/',
        '12_months': 'https://wmcentre.su/product/netflix-12-months/',
    },
    
    # Spotify
    'spotify': {
        '1_month': 'https://wmcentre.su/product/spotify-premium-1-month/',
        '3_months': 'https://wmcentre.su/product/spotify-premium-3-months/',
        '6_months': 'https://wmcentre.su/product/spotify-premium-6-months/',
        '12_months': 'https://wmcentre.su/product/spotify-premium-12-months/',
    },
    
    # YouTube Premium
    'youtube': {
        '1_month': 'https://wmcentre.su/product/youtube-premium-1-month/',
        '3_months': 'https://wmcentre.su/product/youtube-premium-3-months/',
        '6_months': 'https://wmcentre.su/product/youtube-premium-6-months/',
        '12_months': 'https://wmcentre.su/product/youtube-premium-12-months/',
    },
    
    # Disney+
    'disney': {
        '1_month': 'https://wmcentre.su/product/disney-plus-1-month/',
        '3_months': 'https://wmcentre.su/product/disney-plus-3-months/',
        '6_months': 'https://wmcentre.su/product/disney-plus-6-months/',
        '12_months': 'https://wmcentre.su/product/disney-plus-12-months/',
    },
    
    # Xbox
    'xbox': {
        '1_month': 'https://wmcentre.su/product/xbox-game-pass-ultimate-1-month/',
        '3_months': 'https://wmcentre.su/product/xbox-game-pass-ultimate-3-months/',
        '6_months': 'https://wmcentre.su/product/xbox-game-pass-ultimate-6-months/',
        '12_months': 'https://wmcentre.su/product/xbox-game-pass-ultimate-12-months/',
    },
    
    # PlayStation
    'playstation': {
        '1_month': 'https://wmcentre.su/product/playstation-plus-essential-1-month/',
        '3_months': 'https://wmcentre.su/product/playstation-plus-essential-3-months/',
        '12_months': 'https://wmcentre.su/product/playstation-plus-essential-12-months/',
    },
    
    # NordVPN
    'nordvpn': {
        '1_month': 'https://wmcentre.su/product/nordvpn-1-month/',
        '3_months': 'https://wmcentre.su/product/nordvpn-3-months/',
        '6_months': 'https://wmcentre.su/product/nordvpn-6-months/',
        '12_months': 'https://wmcentre.su/product/nordvpn-12-months/',
    },
}


def normalize_duration(label: str) -> str:
    """Normalize duration label to standard key"""
    label_lower = label.lower()
    
    # Map various duration formats to standard keys
    if any(x in label_lower for x in ['1 month', 'one month', '30 day', 'شهر']):
        return '1_month'
    elif any(x in label_lower for x in ['3 month', 'three month', '90 day', '3 أشهر']):
        return '3_months'
    elif any(x in label_lower for x in ['6 month', 'six month', '180 day', '6 أشهر']):
        return '6_months'
    elif any(x in label_lower for x in ['12 month', 'twelve month', '1 year', '365 day', 'سنة']):
        return '12_months'
    
    return None


def match_product_key(product_name: str) -> Optional[str]:
    """Match product name to a key in the URL database"""
    name_lower = product_name.lower()
    
    for key in Z2U_PLAN_URLS.keys():
        if key in name_lower:
            return key
    
    return None


def get_plan_urls(product_name: str, plan_label: str) -> Dict[str, str]:
    """Get Z2U and WMCentre URLs for a specific product and plan"""
    product_key = match_product_key(product_name)
    duration_key = normalize_duration(plan_label)
    
    result = {
        'z2u_url': None,
        'wmcentre_url': None
    }
    
    if not product_key or not duration_key:
        return result
    
    # Get Z2U URL
    if product_key in Z2U_PLAN_URLS:
        result['z2u_url'] = Z2U_PLAN_URLS[product_key].get(duration_key)
    
    # Get WMCentre URL
    if product_key in WMCENTRE_PLAN_URLS:
        result['wmcentre_url'] = WMCENTRE_PLAN_URLS[product_key].get(duration_key)
    
    return result


def update_product_plan_urls(product_id: str, plans: List[Dict], dry_run: bool = True) -> bool:
    """Update subscription_plans with source URLs"""
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("  ❌ Supabase not configured")
        return False
    
    try:
        sb = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get current product data
        res = sb.table('products').select('name_en, subscription_plans').eq('id', product_id).maybe_single().execute()
        if not res.data:
            print(f"  ❌ Product {product_id} not found")
            return False
        
        product_name = res.data.get('name_en', '')
        current_plans = res.data.get('subscription_plans', [])
        
        if not current_plans:
            print(f"  ⚠️ No subscription plans for {product_id}")
            return False
        
        # Update each plan with URLs
        updated_plans = []
        for plan in current_plans:
            plan_label = plan.get('label_en', '') or plan.get('label_ar', '')
            urls = get_plan_urls(product_name, plan_label)
            
            # Only update if URLs found and not already set
            if urls['z2u_url'] and not plan.get('source_url'):
                plan['source_url'] = urls['z2u_url']
                print(f"    ✅ Added Z2U URL for {plan_label}: {urls['z2u_url']}")
            
            if urls['wmcentre_url'] and not plan.get('wmcentre_url'):
                plan['wmcentre_url'] = urls['wmcentre_url']
                print(f"    ✅ Added WMCentre URL for {plan_label}: {urls['wmcentre_url']}")
            
            updated_plans.append(plan)
        
        # Update database
        if not dry_run:
            sb.table('products').update({'subscription_plans': updated_plans}).eq('id', product_id).execute()
            print(f"  ✅ Updated product {product_id} in database")
        else:
            print(f"  🚩 Dry run - would update product {product_id}")
        
        return True
        
    except Exception as e:
        print(f"  ❌ Error updating product: {e}")
        return False


def process_all_products(dry_run: bool = True):
    """Process all products and update their plan URLs"""
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("❌ Supabase not configured. Set SUPABASE_URL and SUPABASE_KEY")
        return
    
    try:
        sb = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get all products with subscription plans
        res = sb.table('products').select('id, name_en, subscription_plans').execute()
        products = res.data
        
        print(f"\n📦 Found {len(products)} products")
        print(f"🚩 Dry run mode: {dry_run}")
        print("=" * 60)
        
        updated_count = 0
        skipped_count = 0
        
        for product in products:
            product_id = product['id']
            product_name = product.get('name_en', '')
            plans = product.get('subscription_plans', [])
            
            if not plans:
                continue
            
            # Check if already has URLs
            missing_urls = []
            for plan in plans:
                plan_label = plan.get('label_en', '') or plan.get('label_ar', '')
                if not plan.get('source_url') and not plan.get('wmcentre_url'):
                    missing_urls.append(plan_label)
            
            if not missing_urls:
                skipped_count += 1
                continue
            
            print(f"\n🔎 Processing: {product_name}")
            print(f"  📝 Missing URLs for: {', '.join(missing_urls)}")
            
            # Update URLs
            if update_product_plan_urls(product_id, plans, dry_run):
                updated_count += 1
            
            time.sleep(0.5)  # Rate limiting
        
        print(f"\n" + "=" * 60)
        print(f"📊 Summary:")
        print(f"   Total products: {len(products)}")
        print(f"   Updated: {updated_count}")
        print(f"   Skipped (already has URLs): {skipped_count}")
        
    except Exception as e:
        print(f"❌ Error: {e}")


def test_single_product(product_name: str, plan_label: str):
    """Test URL fetching for a single product/plan"""
    print(f"\n🔎 Testing: {product_name} - {plan_label}")
    print("=" * 60)
    
    urls = get_plan_urls(product_name, plan_label)
    
    print(f"Product Key: {match_product_key(product_name)}")
    print(f"Duration Key: {normalize_duration(plan_label)}")
    print(f"Z2U URL: {urls['z2u_url'] or 'Not found'}")
    print(f"WMCentre URL: {urls['wmcentre_url'] or 'Not found'}")


def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Fetch source URLs for subscription plans')
    parser.add_argument('--dry-run', action='store_true', help='Run without updating database')
    parser.add_argument('--update', action='store_true', help='Update database (without --dry-run)')
    parser.add_argument('--test', nargs=2, metavar=('PRODUCT', 'PLAN'), help='Test single product')
    
    args = parser.parse_args()
    
    if args.test:
        test_single_product(args.test[0], args.test[1])
    else:
        dry_run = not args.update
        process_all_products(dry_run=dry_run)


if __name__ == "__main__":
    main()
