"""
Fix Plan Prices - Update prices based on duration
Each plan should have appropriate pricing based on duration
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


def calculate_plan_price(base_price: float, duration_months: int) -> float:
    """
    Calculate plan price based on duration with discount
    - 1 Month: base price
    - 3 Months: base * 2.5 (17% discount)
    - 6 Months: base * 4.5 (25% discount)
    - 12 Months: base * 8 (33% discount)
    """
    multipliers = {
        1: 1.0,
        2: 1.9,
        3: 2.5,
        4: 3.2,
        5: 3.9,
        6: 4.5,
        7: 5.2,
        8: 5.8,
        9: 6.4,
        10: 7.0,
        11: 7.5,
        12: 8.0,
    }
    
    multiplier = multipliers.get(duration_months, duration_months * 0.7)
    return round(base_price * multiplier, 2)


def parse_duration(label: str) -> int:
    """Parse duration in months from label"""
    label_lower = label.lower()
    
    # Direct month mentions
    if '1 month' in label_lower or 'month 1' in label_lower or 'شهر واحد' in label_lower:
        return 1
    if '2 month' in label_lower or 'month 2' in label_lower or 'شهرين' in label_lower:
        return 2
    if '3 month' in label_lower or 'month 3' in label_lower or '3 أشهر' in label_lower:
        return 3
    if '4 month' in label_lower or 'month 4' in label_lower or '4 أشهر' in label_lower:
        return 4
    if '5 month' in label_lower or 'month 5' in label_lower or '5 أشهر' in label_lower:
        return 5
    if '6 month' in label_lower or 'month 6' in label_lower or '6 أشهر' in label_lower:
        return 6
    if '7 month' in label_lower or 'month 7' in label_lower or '7 أشهر' in label_lower:
        return 7
    if '8 month' in label_lower or 'month 8' in label_lower or '8 أشهر' in label_lower:
        return 8
    if '9 month' in label_lower or 'month 9' in label_lower or '9 أشهر' in label_lower:
        return 9
    if '10 month' in label_lower or 'month 10' in label_lower or '10 أشهر' in label_lower:
        return 10
    if '11 month' in label_lower or 'month 11' in label_lower or '11 شهر' in label_lower:
        return 11
    if '12 month' in label_lower or '1 year' in label_lower or 'month 12' in label_lower or 'سنة' in label_lower or 'year 1' in label_lower:
        return 12
    
    # Try to extract number
    import re
    match = re.search(r'(\d+)\s*(month|mo|شهر)', label_lower)
    if match:
        return int(match.group(1))
    
    match = re.search(r'(\d+)\s*(year|yr|سنة)', label_lower)
    if match:
        return int(match.group(1)) * 12
    
    return 1  # Default to 1 month


def fix_product_prices(product_id: str, dry_run: bool = True):
    """Fix prices for a single product's plans"""
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
        
        # Find base price (1 month plan)
        base_price = None
        for plan in plans:
            duration = parse_duration(plan.get('label_en', ''))
            if duration == 1:
                base_price = plan.get('price') or plan.get('cost_price', 0) * 1.5
                break
        
        if not base_price:
            # Use first plan's price as base
            first_plan = plans[0]
            base_price = first_plan.get('price', 4)
            print(f"  ⚠️ Using base price: ${base_price}")
        
        updated_plans = []
        changes = []
        
        for plan in plans:
            label = plan.get('label_en', '')
            duration = parse_duration(label)
            
            old_price = plan.get('price', 0)
            new_price = calculate_plan_price(base_price, duration)
            
            if old_price != new_price:
                changes.append(f"  {label}: ${old_price} → ${new_price}")
                plan['price'] = new_price
            
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


def fix_all_products(dry_run: bool = True):
    """Fix prices for all products with multiple plans"""
    try:
        res = sb.table('products').select('id, name_en, subscription_plans').execute()
        products = res.data
        
        print(f"\n📦 Found {len(products)} products")
        print(f"🚩 Dry run: {dry_run}")
        print("=" * 60)
        
        fixed_count = 0
        skipped_count = 0
        
        for product in products:
            plans = product.get('subscription_plans', [])
            
            # Only process products with multiple plans
            if len(plans) <= 1:
                continue
            
            # Check if all plans have same price
            prices = [pl.get('price') for pl in plans if pl.get('price')]
            if len(set(prices)) > 1:
                skipped_count += 1
                continue  # Already has different prices
            
            if fix_product_prices(product['id'], dry_run):
                fixed_count += 1
        
        print(f"\n" + "=" * 60)
        print(f"📊 Summary:")
        print(f"   Fixed: {fixed_count}")
        print(f"   Skipped (already correct): {skipped_count}")
        
    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Fix plan prices')
    parser.add_argument('--update', action='store_true', help='Update database')
    parser.add_argument('--product', type=str, help='Fix specific product ID')
    
    args = parser.parse_args()
    
    if args.product:
        fix_product_prices(args.product, dry_run=not args.update)
    else:
        fix_all_products(dry_run=not args.update)
