import requests
from bs4 import BeautifulSoup
import re
import json

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

def get_price_z2u(soup):
    try:
        selectors = [
            '.price', '.item-price', '.price-num', '.goods-price', 
            'span.d-pricing', '.price-now', '.price-box .price',
            '.product-price', '.product_price_new',
            '[id*="price"]', '[class*="price"]'
        ]
        for sel in selectors:
            el = soup.select_one(sel)
            if el:
                text = el.get_text(strip=True)
                match = re.search(r"(\d+\.?\d*)", text)
                if match:
                    val = float(match.group(1))
                    if 0.1 < val < 500: return val
        
        # Text search if selectors fail
        content = soup.get_text(separator=' ')
        matches = re.findall(r"\$\s*(\d+\.?\d*)", content)
        if matches:
            for m in matches:
                val = float(m)
                if 0.5 < val < 500: return val
    except: pass
    return None

def test():
    url = "https://www.z2u.com/product-30948/Personal-Account-Netflix-30days-4K-UHD-Premium-1-Month.html"
    print(f"Testing URL: {url}")
    res = requests.get(url, headers=HEADERS, timeout=15)
    print(f"Status: {res.status_code}")
    if res.status_code == 200:
        soup = BeautifulSoup(res.text, 'html.parser')
        price = get_price_z2u(soup)
        print(f"Resulting Price: {price}")
        if not price:
            print("Snippet of content:")
            print(res.text[:1000])

if __name__ == "__main__":
    test()
