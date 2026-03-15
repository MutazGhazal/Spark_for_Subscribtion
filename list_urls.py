"""
List all source URLs for manual verification
"""

import os
import json
from supabase import create_client

# Load env
if os.path.exists('.env'):
    with open('.env', 'r') as f:
        for line in f:
            if '=' in line:
                k, v = line.strip().split('=', 1)
                os.environ[k] = v

SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY')


def list_all_urls():
    """List all source URLs for verification"""
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("❌ Supabase not configured")
        return
    
    try:
        sb = create_client(SUPABASE_URL, SUPABASE_KEY)
        res = sb.table('products').select('id, name_en, source_url, wmcentre_url, subscription_plans').execute()
        products = res.data
        
        print(f"\n📦 Total products: {len(products)}")
        print("=" * 80)
        
        all_urls = []
        
        for product in products:
            product_id = product['id']
            product_name = product.get('name_en', 'Unknown')
            main_z2u = product.get('source_url', '')
            main_wm = product.get('wmcentre_url', '')
            plans = product.get('subscription_plans', [])
            
            print(f"\n🔹 {product_name}")
            print(f"   ID: {product_id}")
            
            product_urls = {
                'product_id': product_id,
                'product_name': product_name,
                'urls': []
            }
            
            # Main URLs
            if main_z2u:
                print(f"   📎 Main Z2U: {main_z2u}")
                product_urls['urls'].append({'type': 'main_z2u', 'url': main_z2u, 'plan': 'main'})
            
            if main_wm:
                print(f"   📎 Main WMCentre: {main_wm}")
                product_urls['urls'].append({'type': 'main_wmcentre', 'url': main_wm, 'plan': 'main'})
            
            # Plan URLs
            for plan in plans:
                plan_label = plan.get('label_en', '') or plan.get('label_ar', '')
                plan_z2u = plan.get('source_url', '')
                plan_wm = plan.get('wmcentre_url', '')
                
                if plan_z2u:
                    print(f"   📎 Plan '{plan_label}' Z2U: {plan_z2u}")
                    product_urls['urls'].append({'type': 'plan_z2u', 'url': plan_z2u, 'plan': plan_label})
                
                if plan_wm:
                    print(f"   📎 Plan '{plan_label}' WMCentre: {plan_wm}")
                    product_urls['urls'].append({'type': 'plan_wmcentre', 'url': plan_wm, 'plan': plan_label})
            
            if product_urls['urls']:
                all_urls.append(product_urls)
        
        # Save to file
        with open('all_source_urls.json', 'w', encoding='utf-8') as f:
            json.dump(all_urls, f, indent=2, ensure_ascii=False)
        
        print(f"\n" + "=" * 80)
        print(f"💾 All URLs saved to all_source_urls.json")
        
        # Summary
        total_urls = sum(len(p['urls']) for p in all_urls)
        print(f"📊 Total URLs: {total_urls}")
        
    except Exception as e:
        print(f"❌ Error: {e}")


def list_by_service(service_name: str):
    """List URLs for specific service"""
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("❌ Supabase not configured")
        return
    
    try:
        sb = create_client(SUPABASE_URL, SUPABASE_KEY)
        res = sb.table('products').select('id, name_en, source_url, wmcentre_url, subscription_plans').ilike('name_en', f'%{service_name}%').execute()
        products = res.data
        
        print(f"\n🔎 Found {len(products)} products matching '{service_name}'")
        print("=" * 80)
        
        for product in products:
            print(f"\n📌 {product['name_en']}")
            print(f"   ID: {product['id']}")
            
            if product.get('source_url'):
                print(f"   Z2U: {product['source_url']}")
            if product.get('wmcentre_url'):
                print(f"   WMCentre: {product['wmcentre_url']}")
            
            plans = product.get('subscription_plans', [])
            if plans:
                print("   Plans:")
                for plan in plans:
                    label = plan.get('label_en', 'N/A')
                    z2u = plan.get('source_url', 'N/A')
                    wm = plan.get('wmcentre_url', 'N/A')
                    print(f"     - {label}:")
                    if z2u != 'N/A':
                        print(f"       Z2U: {z2u}")
                    if wm != 'N/A':
                        print(f"       WMCentre: {wm}")
        
    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='List source URLs')
    parser.add_argument('--service', type=str, help='Filter by service name (e.g., netflix, spotify)')
    
    args = parser.parse_args()
    
    if args.service:
        list_by_service(args.service)
    else:
        list_all_urls()
