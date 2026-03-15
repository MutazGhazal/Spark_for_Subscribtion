"""
Fix Plan URLs - Update URLs for each plan based on duration
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

sb = create_client(os.environ.get('SUPABASE_URL'), os.environ.get('SUPABASE_KEY'))


# Z2U URLs by product and duration
Z2U_PLAN_URLS = {
    'netflix-premium-4k': {
        '1_month': 'https://www.z2u.com/product-30948/Personal-Account-Netflix-30days-4K-UHD-Premium-1-Month.html',
        '3_months': 'https://www.z2u.com/product-30949/Personal-Account-Netflix-90days-4K-UHD-Premium-3-Month.html',
        '6_months': 'https://www.z2u.com/product-30950/Personal-Account-Netflix-180days-4K-UHD-Premium-6-Month.html',
        '12_months': 'https://www.z2u.com/product-30951/Personal-Account-Netflix-365days-4K-UHD-Premium-12-Month.html',
    },
    # Add more products here...
}


def parse_duration(label: str) -> str:
    """Parse duration to standard key"""
    label_lower = label.lower()
    
    if any(x in label_lower for x in ['1 month', 'month 1', 'شهر واحد', '30 day']):
        return '1_month'
    elif any(x in label_lower for x in ['3 month', 'month 3', '3 أشهر', '90 day']):
        return '3_months'
    elif any(x in label_lower for x in ['6 month', 'month 6', '6 أشهر', '180 day']):
        return '6_months'
    elif any(x in label_lower for x in ['12 month', '1 year', 'month 12', 'سنة', '365 day']):
        return '12_months'
    
    return None


def fix_product_plan_urls(product_id: str, dry_run: bool = True):
    """Fix URLs for a specific product"""
    try:
        res = sb.table('products').select('id, name_en, subscription_plans').eq('id', product_id).maybe_single().execute()
        if not res.data:
            print(f"  ❌ Product {product_id} not found")
            return False
        
        product = res.data
        plans = product.get('subscription_plans', [])
        
        if not plans:
            print(f"  ⚠️ No plans for {product['name_en']}")
            return False
        
        print(f"\n🔎 {product['name_en']}")
        
        # Check if this product has URL mappings
        if product_id not in Z2U_PLAN_URLS:
            print(f"  ⚠️ No URL mappings for {product_id}")
            return False
        
        url_mappings = Z2U_PLAN_URLS[product_id]
        updated_plans = []
        changes = []
        
        for plan in plans:
            label = plan.get('label_en', '')
            duration_key = parse_duration(label)
            
            if duration_key and duration_key in url_mappings:
                new_url = url_mappings[duration_key]
                old_url = plan.get('source_url', '')
                
                if old_url != new_url:
                    changes.append(f"  {label}: {old_url} → {new_url}")
                    plan['source_url'] = new_url
            
            updated_plans.append(plan)
        
        if changes:
            print("  Changes:")
            for change in changes:
                print(f"    {change}")
            
            if not dry_run:
                sb.table('products').update({'subscription_plans': updated_plans}).eq('id', product_id).execute()
                print("  ✅ Updated in database")
            else:
                print("  🚩 Dry run - not updated")
        else:
            print("  ⏭️ No changes needed")
        
        return True
        
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False


def add_url_mapping(product_id: str, duration: str, url: str):
    """Add a new URL mapping"""
    if product_id not in Z2U_PLAN_URLS:
        Z2U_PLAN_URLS[product_id] = {}
    
    Z2U_PLAN_URLS[product_id][duration] = url
    print(f"✅ Added URL mapping for {product_id} - {duration}: {url}")


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Fix plan URLs')
    parser.add_argument('--update', action='store_true', help='Update database')
    parser.add_argument('--product', type=str, required=True, help='Product ID to fix')
    parser.add_argument('--add-url', nargs=3, metavar=('PRODUCT', 'DURATION', 'URL'), help='Add URL mapping')
    
    args = parser.parse_args()
    
    if args.add_url:
        add_url_mapping(args.add_url[0], args.add_url[1], args.add_url[2])
    else:
        fix_product_plan_urls(args.product, dry_run=not args.update)
