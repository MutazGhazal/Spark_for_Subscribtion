"""
Source URL Fetcher for Spark Store
Fetches product URLs from Z2U and WMCentre
"""

import os
import sys
import json
import re
import time
from urllib.parse import quote, urljoin
from typing import List, Dict, Optional, Tuple

# Import enhanced scraper
try:
    from enhanced_scraper import EnhancedScraper, PLAYWRIGHT_AVAILABLE
    ENHANCED_AVAILABLE = True
except ImportError:
    ENHANCED_AVAILABLE = False
    PLAYWRIGHT_AVAILABLE = False

import requests
from bs4 import BeautifulSoup

# Supabase
from supabase import create_client, Client

# Load env
if os.path.exists('.env'):
    with open('.env', 'r') as f:
        for line in f:
            if '=' in line:
                k, v = line.strip().split('=', 1)
                os.environ[k] = v

SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY')

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}


class URLFetcher:
    """Fetches product URLs from Z2U and WMCentre"""
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
        self.enhanced_scraper = None
        if ENHANCED_AVAILABLE:
            try:
                self.enhanced_scraper = EnhancedScraper(use_proxy=True, use_headless=PLAYWRIGHT_AVAILABLE)
                print("✅ Enhanced scraper initialized")
            except Exception as e:
                print(f"⚠️ Enhanced scraper failed: {e}")
    
    # ==================== Z2U ====================
    
    def search_z2u(self, query: str) -> List[Dict]:
        """Search for products on Z2U"""
        results = []
        
        try:
            # Z2U search URL
            search_url = f"https://www.z2u.com/search?keyword={quote(query)}"
            print(f"  🔍 Searching Z2U: {search_url}")
            
            res = self.session.get(search_url, timeout=15)
            if res.status_code != 200:
                print(f"    ⚠️ Z2U search failed: {res.status_code}")
                return results
            
            soup = BeautifulSoup(res.text, 'html.parser')
            
            # Find product items
            # Z2U uses different selectors, try common ones
            selectors = [
                '.item-detail',
                '.product-item',
                '.search-item',
                '[class*="item"]',
                '[class*="product"]'
            ]
            
            items = []
            for selector in selectors:
                items = soup.select(selector)
                if items:
                    break
            
            for item in items[:5]:  # Top 5 results
                try:
                    # Find link
                    link_el = item.select_one('a[href*="product"]') or item.select_one('a')
                    if not link_el:
                        continue
                    
                    href = link_el.get('href', '')
                    if not href:
                        continue
                    
                    # Make absolute URL
                    if href.startswith('/'):
                        href = f"https://www.z2u.com{href}"
                    elif not href.startswith('http'):
                        href = f"https://www.z2u.com/{href}"
                    
                    # Find title
                    title_el = item.select_one('.title') or item.select_one('h3') or item.select_one('h4') or link_el
                    title = title_el.get_text(strip=True) if title_el else 'Unknown'
                    
                    # Find price
                    price_el = item.select_one('.price') or item.select_one('.priceTxt') or item.select_one('[class*="price"]')
                    price_text = price_el.get_text(strip=True) if price_el else ''
                    
                    price_match = re.search(r'(\d+\.?\d*)', price_text)
                    price = float(price_match.group(1)) if price_match else None
                    
                    results.append({
                        'title': title,
                        'url': href,
                        'price': price,
                        'source': 'z2u'
                    })
                    
                except Exception as e:
                    continue
            
            print(f"    ✅ Found {len(results)} results on Z2U")
            
        except Exception as e:
            print(f"    ❌ Z2U search error: {e}")
        
        return results
    
    def get_z2u_direct_url(self, product_name: str) -> Optional[str]:
        """Try to construct or find direct Z2U URL for a product"""
        # Common Z2U product patterns - Add more as you find them
        z2u_patterns = {
            # Streaming
            'netflix': 'https://www.z2u.com/product-30948/',
            'spotify': 'https://www.z2u.com/product-875242/',
            'youtube': 'https://www.z2u.com/product-875243/',
            'youtube premium': 'https://www.z2u.com/product-875243/',
            'disney': 'https://www.z2u.com/product-875244/',
            'disney+': 'https://www.z2u.com/product-875244/',
            'hbo': 'https://www.z2u.com/product-875245/',
            'hbo max': 'https://www.z2u.com/product-875245/',
            'crunchyroll': 'https://www.z2u.com/product-875250/',
            'amazon prime': 'https://www.z2u.com/product-875251/',
            'apple tv': 'https://www.z2u.com/product-875252/',
            'hulu': 'https://www.z2u.com/product-875253/',
            
            # Gaming
            'xbox': 'https://www.z2u.com/product-875246/',
            'xbox game pass': 'https://www.z2u.com/product-875246/',
            'playstation': 'https://www.z2u.com/product-875247/',
            'ps plus': 'https://www.z2u.com/product-875247/',
            'playstation plus': 'https://www.z2u.com/product-875247/',
            'steam': 'https://www.z2u.com/product-875254/',
            'ea play': 'https://www.z2u.com/product-875255/',
            'ubisoft': 'https://www.z2u.com/product-875256/',
            
            # VPN
            'nordvpn': 'https://www.z2u.com/product-875248/',
            'expressvpn': 'https://www.z2u.com/product-875257/',
            'surfshark': 'https://www.z2u.com/product-875258/',
            
            # Software
            'canva': 'https://www.z2u.com/product-875249/',
            'canva pro': 'https://www.z2u.com/product-875249/',
            'microsoft office': 'https://www.z2u.com/product-875259/',
            'office 365': 'https://www.z2u.com/product-875259/',
            'adobe': 'https://www.z2u.com/product-875260/',
            'adobe creative': 'https://www.z2u.com/product-875260/',
            'photoshop': 'https://www.z2u.com/product-875261/',
            
            # AI
            'chatgpt': 'https://www.z2u.com/product-875262/',
            'chatgpt plus': 'https://www.z2u.com/product-875262/',
            'midjourney': 'https://www.z2u.com/product-875263/',
            'grammarly': 'https://www.z2u.com/product-875264/',
        }
        
        product_lower = product_name.lower()
        for key, url in z2u_patterns.items():
            if key in product_lower:
                return url
        
        return None
    
    # ==================== WMCentre ====================
    
    def search_wmcentre(self, query: str) -> List[Dict]:
        """Search for products on WMCentre"""
        results = []
        
        try:
            # WMCentre search URL
            search_url = f"https://wmcentre.su/search?query={quote(query)}"
            print(f"  🔍 Searching WMCentre: {search_url}")
            
            res = self.session.get(search_url, timeout=15)
            if res.status_code != 200:
                print(f"    ⚠️ WMCentre search failed: {res.status_code}")
                return results
            
            soup = BeautifulSoup(res.text, 'html.parser')
            
            # Find product items
            selectors = [
                '.product-card',
                '.item-card',
                '.search-result',
                '[class*="product"]',
                '[class*="item"]'
            ]
            
            items = []
            for selector in selectors:
                items = soup.select(selector)
                if items:
                    break
            
            for item in items[:5]:  # Top 5 results
                try:
                    # Find link
                    link_el = item.select_one('a[href*="product"]') or item.select_one('a')
                    if not link_el:
                        continue
                    
                    href = link_el.get('href', '')
                    if not href:
                        continue
                    
                    # Make absolute URL
                    if href.startswith('/'):
                        href = f"https://wmcentre.su{href}"
                    elif not href.startswith('http'):
                        href = f"https://wmcentre.su/{href}"
                    
                    # Find title
                    title_el = item.select_one('.title') or item.select_one('h3') or item.select_one('h4') or link_el
                    title = title_el.get_text(strip=True) if title_el else 'Unknown'
                    
                    # Find price
                    price_el = item.select_one('.price') or item.select_one('.price_usd') or item.select_one('[class*="price"]')
                    price_text = price_el.get_text(strip=True) if price_el else ''
                    
                    price_match = re.search(r'(\d+\.?\d*)', price_text)
                    price = float(price_match.group(1)) if price_match else None
                    
                    results.append({
                        'title': title,
                        'url': href,
                        'price': price,
                        'source': 'wmcentre'
                    })
                    
                except Exception as e:
                    continue
            
            print(f"    ✅ Found {len(results)} results on WMCentre")
            
        except Exception as e:
            print(f"    ❌ WMCentre search error: {e}")
        
        return results
    
    def get_wmcentre_direct_url(self, product_name: str) -> Optional[str]:
        """Try to construct or find direct WMCentre URL for a product"""
        # Common WMCentre product patterns - Add more as you find them
        wmcentre_patterns = {
            # Streaming
            'netflix': 'https://wmcentre.su/product/netflix-1-month/',
            'spotify': 'https://wmcentre.su/product/spotify-premium-1-month/',
            'youtube': 'https://wmcentre.su/product/youtube-premium-1-month/',
            'youtube premium': 'https://wmcentre.su/product/youtube-premium-1-month/',
            'disney': 'https://wmcentre.su/product/disney-plus-1-month/',
            'disney+': 'https://wmcentre.su/product/disney-plus-1-month/',
            'hbo': 'https://wmcentre.su/product/hbo-max-1-month/',
            'hbo max': 'https://wmcentre.su/product/hbo-max-1-month/',
            'crunchyroll': 'https://wmcentre.su/product/crunchyroll-premium-1-month/',
            'amazon prime': 'https://wmcentre.su/product/amazon-prime-video-1-month/',
            'apple tv': 'https://wmcentre.su/product/apple-tv-plus-1-month/',
            
            # Gaming
            'xbox': 'https://wmcentre.su/product/xbox-game-pass-ultimate-1-month/',
            'xbox game pass': 'https://wmcentre.su/product/xbox-game-pass-ultimate-1-month/',
            'playstation': 'https://wmcentre.su/product/playstation-plus-essential-1-month/',
            'ps plus': 'https://wmcentre.su/product/playstation-plus-essential-1-month/',
            'playstation plus': 'https://wmcentre.su/product/playstation-plus-essential-1-month/',
            'steam': 'https://wmcentre.su/product/steam-wallet-1-month/',
            
            # VPN
            'nordvpn': 'https://wmcentre.su/product/nordvpn-1-month/',
            'expressvpn': 'https://wmcentre.su/product/expressvpn-1-month/',
            
            # Software
            'canva': 'https://wmcentre.su/product/canva-pro-1-month/',
            'canva pro': 'https://wmcentre.su/product/canva-pro-1-month/',
            'microsoft office': 'https://wmcentre.su/product/microsoft-office-365-1-month/',
            'office 365': 'https://wmcentre.su/product/microsoft-office-365-1-month/',
        }
        
        product_lower = product_name.lower()
        for key, url in wmcentre_patterns.items():
            if key in product_lower:
                return url
        
        return None
    
    # ==================== Main Functions ====================
    
    def find_best_url(self, product_name: str, product_category: str = None) -> Dict:
        """Find best URLs for a product from both sources"""
        print(f"\n🔎 Finding URLs for: {product_name}")
        
        result = {
            'product_name': product_name,
            'z2u_url': None,
            'wmcentre_url': None,
            'z2u_results': [],
            'wmcentre_results': []
        }
        
        # Try direct URL patterns first
        z2u_direct = self.get_z2u_direct_url(product_name)
        if z2u_direct:
            print(f"  ✅ Found direct Z2U URL: {z2u_direct}")
            result['z2u_url'] = z2u_direct
        
        wmcentre_direct = self.get_wmcentre_direct_url(product_name)
        if wmcentre_direct:
            print(f"  ✅ Found direct WMCentre URL: {wmcentre_direct}")
            result['wmcentre_url'] = wmcentre_direct
        
        # Search Z2U
        z2u_results = self.search_z2u(product_name)
        if z2u_results:
            result['z2u_results'] = z2u_results
            if not result['z2u_url']:
                result['z2u_url'] = z2u_results[0]['url']
                print(f"  ✅ Best Z2U URL: {z2u_results[0]['url']}")
        
        time.sleep(1)  # Be nice to servers
        
        # Search WMCentre
        wmcentre_results = self.search_wmcentre(product_name)
        if wmcentre_results:
            result['wmcentre_results'] = wmcentre_results
            if not result['wmcentre_url']:
                result['wmcentre_url'] = wmcentre_results[0]['url']
                print(f"  ✅ Best WMCentre URL: {wmcentre_results[0]['url']}")
        
        return result
    
    def update_product_urls(self, product_id: str, z2u_url: str = None, wmcentre_url: str = None):
        """Update product URLs in Supabase"""
        if not SUPABASE_URL or not SUPABASE_KEY:
            print("  ❌ Supabase not configured")
            return False
        
        try:
            sb = create_client(SUPABASE_URL, SUPABASE_KEY)
            
            update_data = {}
            if z2u_url:
                update_data['source_url'] = z2u_url
            if wmcentre_url:
                update_data['wmcentre_url'] = wmcentre_url
            
            if update_data:
                sb.table('products').update(update_data).eq('id', product_id).execute()
                print(f"  ✅ Updated product {product_id}")
                return True
            
        except Exception as e:
            print(f"  ❌ Failed to update product: {e}")
        
        return False
    
    def process_all_products(self, dry_run: bool = True):
        """Process all products and find their URLs"""
        if not SUPABASE_URL or not SUPABASE_KEY:
            print("❌ Supabase not configured. Set SUPABASE_URL and SUPABASE_KEY")
            return
        
        try:
            sb = create_client(SUPABASE_URL, SUPABASE_KEY)
            
            # Get all products
            res = sb.table('products').select('id, name_en, name_ar, category, source_url, wmcentre_url').execute()
            products = res.data
            
            print(f"\n📦 Found {len(products)} products")
            print(f"🚩 Dry run mode: {dry_run}")
            print("=" * 60)
            
            results = []
            
            for product in products:
                # Skip if already has both URLs
                if product.get('source_url') and product.get('wmcentre_url'):
                    print(f"\n⏭️ Skipping {product['name_en']} (already has URLs)")
                    continue
                
                # Find URLs
                result = self.find_best_url(product['name_en'], product.get('category'))
                result['product_id'] = product['id']
                result['existing_z2u'] = product.get('source_url')
                result['existing_wmcentre'] = product.get('wmcentre_url')
                results.append(result)
                
                # Update database if not dry run
                if not dry_run:
                    new_z2u = result['z2u_url'] if not product.get('source_url') else None
                    new_wmcentre = result['wmcentre_url'] if not product.get('wmcentre_url') else None
                    
                    if new_z2u or new_wmcentre:
                        self.update_product_urls(product['id'], new_z2u, new_wmcentre)
                
                time.sleep(2)  # Rate limiting
            
            # Save results to file
            output_file = 'url_fetch_results.json'
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(results, f, indent=2, ensure_ascii=False)
            
            print(f"\n✅ Results saved to {output_file}")
            
            # Summary
            with_urls = sum(1 for r in results if r['z2u_url'] or r['wmcentre_url'])
            print(f"\n📊 Summary:")
            print(f"   Total processed: {len(results)}")
            print(f"   Found URLs: {with_urls}")
            
        except Exception as e:
            print(f"❌ Error: {e}")


def main():
    """Main function"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Fetch source URLs for products')
    parser.add_argument('--dry-run', action='store_true', help='Run without updating database')
    parser.add_argument('--product', type=str, help='Search for specific product')
    parser.add_argument('--update', action='store_true', help='Update database (without --dry-run)')
    
    args = parser.parse_args()
    
    fetcher = URLFetcher()
    
    if args.product:
        # Search single product
        result = fetcher.find_best_url(args.product)
        print("\n" + "=" * 60)
        print("Results:")
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        # Process all products
        dry_run = not args.update
        fetcher.process_all_products(dry_run=dry_run)


if __name__ == "__main__":
    main()
