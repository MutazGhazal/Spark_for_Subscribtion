import os
import json
from supabase import create_client

def export_all():
    if os.path.exists('.env'):
        with open('.env', 'r') as f:
            for line in f:
                if '=' in line:
                    k, v = line.strip().split('=', 1)
                    os.environ[k] = v
    
    url = os.environ.get('SUPABASE_URL')
    key = os.environ.get('SUPABASE_KEY')
    if not url or not key:
        print("MISSING CREDENTIALS")
        return

    sb = create_client(url, key)
    res = sb.table('products').select('*').execute()
    
    with open('current_db_state.json', 'w', encoding='utf-8') as f:
        json.dump(res.data, f, indent=2, ensure_ascii=False)
    print(f"Exported {len(res.data)} products to current_db_state.json")

if __name__ == "__main__":
    export_all()
