import sys
sys.stdout.reconfigure(encoding='utf-8')
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
        if "Request error" in content or "Product does not exist" in content:
            print("❌ Detected soft 404 page.")
        
        # Prefer specific spans
        price_spans = soup.select('span.priceTxt') or soup.select('.price-num') or soup.select('.item-price')
        valid_prices = []
        if price_spans:
            print(f"   Searching in {len(price_spans)} price spans...")
            for s in price_spans:
                match = re.search(r"(\d+\.?\d*)", s.get_text())
                if match:
                    val = float(match.group(1))
                    if 0.5 < val < 1000: valid_prices.append(val)
        
        # Regex fallback with currency
        currency_matches = re.findall(r'[\$\€\£]\s?(\d{1,4}(?:[.,]\d{2})?)', content)
        currency_matches += re.findall(r'(\d{1,4}(?:[.,]\d{2})?)\s?[\$\€\£]', content)
        
        all_found = list(set(valid_prices + [float(m.replace(',','.')) for m in currency_matches if re.match(r'^\d', m)]))
        
        prices = [v for v in all_found if 0.5 < v < 1000]
        if prices:
            # Filter out very low prices if higher ones exist (to avoid fees)
            high_prices = [v for v in prices if v >= 1.0]
            best = min(high_prices) if high_prices else min(prices)
            print(f"   ✨ Best Match detected: {best}")
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
