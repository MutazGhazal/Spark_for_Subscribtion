"""
Verify Source URLs - Check if Z2U and WMCentre URLs are working
"""

import os
import sys
import json
import time
import requests
from urllib.parse import urlparse
from typing import Dict, List, Tuple
from concurrent.futures import ThreadPoolExecutor, as_completed

# Load env
if os.path.exists('.env'):
    with open('.env', 'r') as f:
        for line in f:
            if '=' in line:
                k, v = line.strip().split('=', 1)
                os.environ[k] = v

from supabase import create_client

SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY')

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
}


class URLVerifier:
    """Verifies if URLs are working"""
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
        self.results = []
    
    def check_url(self, url: str, source: str = "unknown") -> Dict:
        """Check if a URL is working"""
        result = {
            'url': url,
            'source': source,
            'status': 'unknown',
            'status_code': None,
            'error': None,
            'redirect_url': None,
            'response_time': None
        }
        
        if not url:
            result['status'] = 'empty'
            return result
        
        try:
            start_time = time.time()
            res = self.session.get(url, timeout=15, allow_redirects=True)
            result['response_time'] = round(time.time() - start_time, 2)
            result['status_code'] = res.status_code
            result['redirect_url'] = res.url if res.url != url else None
            
            if res.status_code == 200:
                # Check for common error indicators
                content = res.text.lower()
                if any(x in content for x in ['not found', '404', 'product does not exist', 'sold out', 'unavailable']):
                    result['status'] = 'invalid'
                    result['error'] = 'Product not found or unavailable'
                elif 'z2u' in url and ('item-detail' not in content and 'product' not in content):
                    result['status'] = 'suspicious'
                    result['error'] = 'Page structure unexpected'
                else:
                    result['status'] = 'working'
            elif res.status_code == 404:
                result['status'] = 'not_found'
                result['error'] = '404 Not Found'
            elif res.status_code in [403, 429]:
                result['status'] = 'blocked'
                result['error'] = f'Blocked ({res.status_code})'
            else:
                result['status'] = 'error'
                result['error'] = f'HTTP {res.status_code}'
                
        except requests.exceptions.Timeout:
            result['status'] = 'timeout'
            result['error'] = 'Request timeout'
        except requests.exceptions.ConnectionError:
            result['status'] = 'connection_error'
            result['error'] = 'Connection error'
        except Exception as e:
            result['status'] = 'error'
            result['error'] = str(e)
        
        return result
    
    def verify_product_urls(self, product: Dict) -> List[Dict]:
        """Verify all URLs for a product"""
        results = []
        product_name = product.get('name_en', 'Unknown')
        product_id = product.get('id', 'unknown')
        plans = product.get('subscription_plans', [])
        
        print(f"\n🔎 Checking: {product_name}")
        
        # Check main source_url
        main_url = product.get('source_url')
        if main_url:
            result = self.check_url(main_url, 'main_z2u')
            result['product_id'] = product_id
            result['product_name'] = product_name
            result['plan'] = 'main'
            results.append(result)
            status_icon = '✅' if result['status'] == 'working' else '❌'
            print(f"  {status_icon} Main URL: {result['status']}")
        
        # Check wmcentre_url
        wm_url = product.get('wmcentre_url')
        if wm_url:
            result = self.check_url(wm_url, 'main_wmcentre')
            result['product_id'] = product_id
            result['product_name'] = product_name
            result['plan'] = 'main'
            results.append(result)
            status_icon = '✅' if result['status'] == 'working' else '❌'
            print(f"  {status_icon} WMCentre: {result['status']}")
        
        # Check plan URLs
        for plan in plans:
            plan_label = plan.get('label_en', '') or plan.get('label_ar', '')
            
            # Check plan source_url
            plan_url = plan.get('source_url')
            if plan_url:
                result = self.check_url(plan_url, 'plan_z2u')
                result['product_id'] = product_id
                result['product_name'] = product_name
                result['plan'] = plan_label
                results.append(result)
                status_icon = '✅' if result['status'] == 'working' else '❌'
                print(f"  {status_icon} Plan '{plan_label}' Z2U: {result['status']}")
            
            # Check plan wmcentre_url
            plan_wm_url = plan.get('wmcentre_url')
            if plan_wm_url:
                result = self.check_url(plan_wm_url, 'plan_wmcentre')
                result['product_id'] = product_id
                result['product_name'] = product_name
                result['plan'] = plan_label
                results.append(result)
                status_icon = '✅' if result['status'] == 'working' else '❌'
                print(f"  {status_icon} Plan '{plan_label}' WMCentre: {result['status']}")
        
        return results
    
    def verify_all_products(self, max_workers: int = 3):
        """Verify URLs for all products"""
        if not SUPABASE_URL or not SUPABASE_KEY:
            print("❌ Supabase not configured")
            return
        
        try:
            sb = create_client(SUPABASE_URL, SUPABASE_KEY)
            res = sb.table('products').select('id, name_en, source_url, wmcentre_url, subscription_plans').execute()
            products = res.data
            
            print(f"\n📦 Verifying URLs for {len(products)} products")
            print("=" * 60)
            
            all_results = []
            
            for product in products:
                results = self.verify_product_urls(product)
                all_results.extend(results)
                time.sleep(0.5)  # Rate limiting
            
            # Save results
            self.save_results(all_results)
            self.print_summary(all_results)
            
        except Exception as e:
            print(f"❌ Error: {e}")
    
    def save_results(self, results: List[Dict]):
        """Save verification results to file"""
        output = {
            'timestamp': time.strftime('%Y-%m-%d %H:%M:%S'),
            'total_checked': len(results),
            'results': results
        }
        
        with open('url_verification_results.json', 'w', encoding='utf-8') as f:
            json.dump(output, f, indent=2, ensure_ascii=False)
        
        print(f"\n💾 Results saved to url_verification_results.json")
    
    def print_summary(self, results: List[Dict]):
        """Print summary of verification results"""
        working = sum(1 for r in results if r['status'] == 'working')
        not_found = sum(1 for r in results if r['status'] == 'not_found')
        blocked = sum(1 for r in results if r['status'] == 'blocked')
        timeout = sum(1 for r in results if r['status'] == 'timeout')
        error = sum(1 for r in results if r['status'] in ['error', 'connection_error'])
        invalid = sum(1 for r in results if r['status'] == 'invalid')
        empty = sum(1 for r in results if r['status'] == 'empty')
        
        print("\n" + "=" * 60)
        print("📊 VERIFICATION SUMMARY")
        print("=" * 60)
        print(f"Total URLs checked: {len(results)}")
        print(f"  ✅ Working: {working}")
        print(f"  ❌ Not Found (404): {not_found}")
        print(f"  🚫 Invalid Product: {invalid}")
        print(f"  🔒 Blocked: {blocked}")
        print(f"  ⏱️ Timeout: {timeout}")
        print(f"  💥 Error: {error}")
        print(f"  ⚪ Empty: {empty}")
        
        # List broken URLs
        broken = [r for r in results if r['status'] not in ['working', 'empty']]
        if broken:
            print("\n" + "=" * 60)
            print("🔧 BROKEN URLs NEEDING FIX:")
            print("=" * 60)
            for r in broken[:20]:  # Show first 20
                print(f"\n{r['product_name']} - {r['plan']}")
                print(f"  URL: {r['url']}")
                print(f"  Status: {r['status']} - {r['error']}")


def verify_single_url(url: str):
    """Verify a single URL"""
    verifier = URLVerifier()
    result = verifier.check_url(url)
    
    print(f"\n🔎 Checking: {url}")
    print(f"Status: {result['status']}")
    print(f"Status Code: {result['status_code']}")
    print(f"Response Time: {result['response_time']}s")
    if result['error']:
        print(f"Error: {result['error']}")
    if result['redirect_url']:
        print(f"Redirected to: {result['redirect_url']}")


def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Verify source URLs')
    parser.add_argument('--url', type=str, help='Verify single URL')
    parser.add_argument('--product', type=str, help='Verify specific product ID')
    
    args = parser.parse_args()
    
    if args.url:
        verify_single_url(args.url)
    elif args.product:
        # Verify single product
        if not SUPABASE_URL or not SUPABASE_KEY:
            print("❌ Supabase not configured")
            return
        
        sb = create_client(SUPABASE_URL, SUPABASE_KEY)
        res = sb.table('products').select('id, name_en, source_url, wmcentre_url, subscription_plans').eq('id', args.product).maybe_single().execute()
        
        if res.data:
            verifier = URLVerifier()
            verifier.verify_product_urls(res.data)
        else:
            print(f"❌ Product {args.product} not found")
    else:
        # Verify all products
        verifier = URLVerifier()
        verifier.verify_all_products()


if __name__ == "__main__":
    main()
