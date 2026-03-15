import requests
import re
import json
from bs4 import BeautifulSoup

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

def scrape_official_price(url):
    if not url: return None
    try:
        print(f"Testing URL: {url}")
        res = requests.get(url, headers=HEADERS, timeout=15)
        if res.status_code != 200:
            print(f"Status Code: {res.status_code}")
            return None
        
        content = res.text
        soup = BeautifulSoup(content, 'html.parser')
        
        # 1. Try to find JSON-LD (Common on official sites for SEO)
        json_ld = soup.find_all('script', type='application/ld+json')
        for script in json_ld:
            try:
                if not script.string: continue
                data = json.loads(script.string)
                # Handle single object or list of objects
                items = data if isinstance(data, list) else [data]
                for item in items:
                    # Look for Price Specification or Offers
                    offers = item.get('offers')
                    if not offers and '@graph' in item: # Handle complex JSON-LD
                        items.extend(item['@graph'])
                        continue
                        
                    if offers:
                        if isinstance(offers, list): offers = offers[0]
                        price = offers.get('price') or offers.get('lowPrice') or offers.get('priceSpecification', {}).get('price')
                        if price: 
                            print(f"  ✨ Found price in JSON-LD: {price}")
                            return float(str(price).replace(',', ''))
            except: continue

        # 2. Improved Regex search
        # Look for patterns like "price": 19.99 or price:19.99
        data_matches = re.findall(r'price["\']?\s*[:=]\s*["\']?(\d{1,4}(?:[.,]\d{2})?)["\']?', content, re.IGNORECASE)
        
        # Look for currency symbols followed/preceded by price
        visible_matches = re.findall(r'[\$€£]\s?(\d{0,4}(?:[.,]\d{2}))', content)
        visible_matches += re.findall(r'(\d{0,4}(?:[.,]\d{2}))\s?[\$€£]', content)
        
        # Look for "monthly" or "/mo" patterns
        monthly_matches = re.findall(r'(?:month|mo|mo\.)\s?[\$€£]?\s?(\d{1,4}(?:[.,]\d{2})?)', content, re.IGNORECASE)
        
        all_matches = data_matches + visible_matches + monthly_matches
        
        prices = []
        for m in all_matches:
            try:
                clean_m = m.replace(',', '.')
                if clean_m.count('.') > 1:
                    parts = clean_m.split('.')
                    clean_m = "".join(parts[:-1]) + "." + parts[-1]
                
                val = float(clean_m)
                if 0.5 < val < 500: prices.append(val)
            except: continue
            
        if prices:
            best = min(prices)
            print(f"  ✨ Found official price via regex: {best}")
            return best
            
    except Exception as e:
        print(f"Error: {e}")
    return None

if __name__ == "__main__":
    urls = [
        "https://www.spotify.com/us/premium/",
        "https://www.canva.com/pro/",
        "https://www.netflix.com/signup/planconf"
    ]
    for u in urls:
        res = scrape_official_price(u)
        print(f"Final Result for {u}: {res}\n")
