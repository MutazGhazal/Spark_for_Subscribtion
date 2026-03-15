import os
from supabase import create_client

def get_data():
    if os.path.exists('.env'):
        with open('.env', 'r') as f:
            for line in f:
                if '=' in line:
                    k, v = line.strip().split('=', 1)
                    os.environ[k] = v
    
    url = os.environ.get('SUPABASE_URL')
    key = os.environ.get('SUPABASE_KEY')
    if not url or not key:
        print("Missing credentials")
        return

    sb = create_client(url, key)
    res = sb.table('products').select('id, name_en, source_url, price, cost_price, official_price').limit(10).execute()
    for row in res.data:
        print(f"ID: {row['id']}")
        print(f"Name: {row['name_en']}")
        print(f"URL: {row['source_url']}")
        print(f"Price: {row['price']}")
        print(f"Cost: {row['cost_price']}")
        print(f"Official: {row['official_price']}")
        print("-" * 20)

if __name__ == "__main__":
    get_data()
