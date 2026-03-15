import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def get_urls():
    res = supabase.table('products').select('name_en, official_url').not_.is_('official_url', 'null').execute()
    for p in res.data:
        if p['official_url'].strip():
            print(f"{p['name_en']}: {p['official_url']}")

if __name__ == "__main__":
    get_urls()
