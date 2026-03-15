"""Debug product data from Supabase"""
import os
from supabase import create_client
import json

# Load env
if os.path.exists('.env'):
    with open('.env', 'r') as f:
        for line in f:
            if '=' in line:
                k, v = line.strip().split('=', 1)
                os.environ[k] = v

sb = create_client(os.environ.get('SUPABASE_URL'), os.environ.get('SUPABASE_KEY'))

# Get Netflix products
print("=" * 60)
print("NETFLIX PRODUCTS")
print("=" * 60)
res = sb.table('products').select('id, name_en, price, official_price, subscription_plans').ilike('name_en', '%netflix%').execute()

for p in res.data:
    print(f"\nID: {p['id']}")
    print(f"Name: {p['name_en']}")
    print(f"Price: ${p['price']}, Official: ${p['official_price']}")
    plans = p.get('subscription_plans', [])
    if plans:
        print("Plans:")
        for pl in plans:
            label = pl.get('label_en', 'N/A')
            price = pl.get('price', 'N/A')
            cost = pl.get('cost_price', 'N/A')
            official = pl.get('official_price', 'N/A')
            print(f"  - {label}: Price=${price}, Cost=${cost}, Official=${official}")
    else:
        print("Plans: None")

# Get products with same price for all plans
print("\n" + "=" * 60)
print("PRODUCTS WITH SAME PRICE ACROSS ALL PLANS")
print("=" * 60)

res = sb.table('products').select('id, name_en, subscription_plans').execute()

for p in res.data:
    plans = p.get('subscription_plans', [])
    if len(plans) > 1:
        prices = [pl.get('price') for pl in plans if pl.get('price')]
        if prices and len(set(prices)) == 1:
            print(f"\n{p['name_en']}")
            for pl in plans:
                print(f"  - {pl.get('label_en')}: ${pl.get('price')}")
