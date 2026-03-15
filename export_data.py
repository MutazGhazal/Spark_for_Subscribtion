import os
import json
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
        return

    sb = create_client(url, key)
    res = sb.table('products').select('id, name_en, source_url, price, cost_price, official_price').limit(20).execute()
    with open('/tmp/debug_products.json', 'w') as f:
        json.dump(res.data, f, indent=2)

if __name__ == "__main__":
    get_data()
