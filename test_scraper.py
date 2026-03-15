import requests
import re
import json
from bs4 import BeautifulSoup

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

def test_scrape(url):
    print(f"--- Testing Scraper for: {url} ---")
    try:
        res = requests.get(url, headers=HEADERS, timeout=15)
        print(f"Status Code: {res.status_code}")
        if res.status_code != 200:
            print("❌ Failed to reach site.")
            return

        content = res.text
        soup = BeautifulSoup(content, 'html.parser')
        
        found_price = None

        # 1. JSON-LD
        print("\n1. Checking JSON-LD...")
        json_ld = soup.find_all('script', type='application/ld+json')
        for script in json_ld:
            try:
                data = json.loads(script.string)
                items = data if isinstance(data, list) else [data]
                for item in items:
                    offers = item.get('offers')
                    if offers:
                        if isinstance(offers, list): offers = offers[0]
                        price = offers.get('price')
                        if price: 
                            print(f"   ✨ Found in JSON-LD: {price}")
                            found_price = price
            except: continue

        # 2. Regex
        print("\n2. Checking Regex Patterns...")
        data_matches = re.findall(r'price["\']?\s*:\s*["\']?(\d{1,4}(?:[.,]\d{2})?)["\']?', content, re.IGNORECASE)
        visible_matches = re.findall(r'[\$\€\£]\s?(\d{1,4}(?:[.,]\d{2})?)', content)
        visible_matches += re.findall(r'(\d{1,4}(?:[.,]\d{2})?)\s?[\$\€\£]', content)
        
        all_matches = list(set(data_matches + visible_matches))
        print(f"   Found potential matches: {all_matches}")
        
        prices = []
        for m in all_matches:
            try:
                val = float(m.replace(',', '.'))
                if 0.5 < val < 1000: prices.append(val)
            except: continue
            
        if prices:
            best = min(prices)
            print(f"   ✨ Best Regex Match: {best}")
            if not found_price: found_price = best

        if found_price:
            print(f"\n✅ SUCCESS: Final extracted price: {found_price}")
        else:
            print("\n❌ FAILURE: No price could be extracted.")
            print("\nTop 500 chars of site content for debug:")
            print(content[:500])

    except Exception as e:
        print(f"❌ ERROR unexpected: {e}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        test_scrape(sys.argv[1])
    else:
        url = input("Enter official URL to test: ")
        test_scrape(url)
