import os
import requests
from bs4 import BeautifulSoup
import re

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}

def debug_z2u(url):
    print(f"Fetching: {url}")
    try:
        res = requests.get(url, headers=HEADERS, timeout=15)
        print(f"Status Code: {res.status_code}")
        if res.status_code != 200:
            print("Failed to fetch page.")
            return

        content = res.text
        print(f"Content Length: {len(content)}")
        
        # Check for common bot detection or empty page
        if "vaptcha" in content.lower() or "cloudflare" in content.lower():
            print("🚩 BUG: Detected anti-bot (Cloudflare/Vaptcha)!")
            return

        soup = BeautifulSoup(content, 'html.parser')
        
        # Find all $ patterns
        all_text = soup.get_text(separator=' ')
        prices = re.findall(r"\$\s?(\d+\.?\d*)", all_text)
        print(f"Found $ matches in text: {prices}")

        # Check standard selectors
        selectors = ['.price', '.item-price', '.price-num', '.goods-price', 'span.d-pricing']
        for sel in selectors:
            el = soup.select_one(sel)
            if el:
                print(f"Found via {sel}: {el.get_text(strip=True)}")

        # Search for specific price tags
        for tag in soup.find_all(['span', 'div', 'p']):
            if 'price' in tag.get('class', []) or 'price' in tag.get('id', ''):
                print(f"Potential element: <{tag.name} class='{tag.get('class')}'> {tag.get_text(strip=True)}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Test with a Netflix Z2U URL (placeholder, should be replaced with a real one from DB)
    test_url = "https://www.z2u.com/netflix/items-6051" 
    debug_z2u(test_url)
