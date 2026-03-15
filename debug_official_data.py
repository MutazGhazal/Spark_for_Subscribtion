import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def check_data():
    print("--- Checking Product Data for Official URLs/Prices ---")
    try:
        res = supabase.table('products').select('id, name_en, official_url, official_price').execute()
        prods = res.data
        if not prods:
            print("No products found.")
            return

        total = len(prods)
        has_url = sum(1 for p in prods if p.get('official_url'))
        has_price = sum(1 for p in prods if p.get('official_price') is not None)

        print(f"Total Products: {total}")
        print(f"Products with Official URL: {has_url}")
        print(f"Products with Official Price: {has_price}")
        
        print("\nFirst 10 products:")
        for p in prods[:10]:
            print(f"- {p['name_en']}: URL={p.get('official_url')}, Price={p.get('official_price')}")

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    check_data()
