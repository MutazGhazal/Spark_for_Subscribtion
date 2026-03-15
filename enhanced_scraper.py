"""
Enhanced Price Scraper for Spark Store
Supports: Headless Browser (Playwright), Free Proxy Rotation, Official APIs
"""

import os
import sys
import time
import json
import random
import re
from typing import Optional, Dict, List, Tuple
from dataclasses import dataclass
from urllib.parse import urlparse

# Try to import playwright
try:
    from playwright.sync_api import sync_playwright, Page, Browser
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False
    print("⚠️ Playwright not installed. Run: pip install playwright && playwright install")

import requests
from bs4 import BeautifulSoup


@dataclass
class PriceResult:
    """Result of a price scraping attempt"""
    price: Optional[float]
    currency: str = "USD"
    source: str = ""
    error: Optional[str] = None
    method_used: str = ""


class FreeProxyManager:
    """Manages free proxies for rotation"""
    
    FREE_PROXY_LISTS = [
        "https://api.proxyscrape.com/v2/?request=get&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all",
        "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt",
        "https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt",
    ]
    
    def __init__(self):
        self.proxies: List[str] = []
        self.last_update = 0
        self.cache_duration = 300  # 5 minutes
    
    def fetch_proxies(self) -> List[str]:
        """Fetch free proxies from public lists"""
        if time.time() - self.last_update < self.cache_duration and self.proxies:
            return self.proxies
        
        proxies = []
        for url in self.FREE_PROXY_LISTS:
            try:
                res = requests.get(url, timeout=10)
                if res.status_code == 200:
                    # Parse proxy list
                    lines = res.text.strip().split('\n')
                    for line in lines:
                        line = line.strip()
                        if ':' in line and not line.startswith('#'):
                            # Extract ip:port
                            match = re.search(r'(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d+)', line)
                            if match:
                                proxies.append(f"http://{match.group(1)}:{match.group(2)}")
            except Exception as e:
                print(f"  ⚠️ Failed to fetch proxies from {url}: {e}")
        
        self.proxies = list(set(proxies))  # Remove duplicates
        self.last_update = time.time()
        print(f"  ✅ Loaded {len(self.proxies)} free proxies")
        return self.proxies
    
    def get_random_proxy(self) -> Optional[str]:
        """Get a random proxy from the pool"""
        if not self.proxies:
            self.fetch_proxies()
        return random.choice(self.proxies) if self.proxies else None
    
    def mark_bad_proxy(self, proxy: str):
        """Remove a non-working proxy from the pool"""
        if proxy in self.proxies:
            self.proxies.remove(proxy)


class OfficialAPIs:
    """Official APIs for subscription services"""
    
    def __init__(self):
        self.manual_prices = self._load_manual_prices()
    
    def _load_manual_prices(self) -> dict:
        """Load manual prices from JSON file"""
        try:
            if os.path.exists('official_prices.json'):
                with open('official_prices.json', 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    return data.get('services', {})
        except Exception as e:
            print(f"  ⚠️ Failed to load manual prices: {e}")
        return {}
    
    def get_manual_price(self, service_key: str, plan: str = "1_month") -> Optional[float]:
        """Get price from manual database"""
        service = self.manual_prices.get(service_key.lower())
        if service:
            plan_data = service.get('plans', {}).get(plan)
            if plan_data:
                return plan_data.get('price')
        return None
    
    @staticmethod
    def get_spotify_price(country: str = "US") -> PriceResult:
        """
        Get Spotify Premium price using their public API
        Note: Spotify doesn't have a public price API, but we can use their plan page
        """
        try:
            url = f"https://www.spotify.com/{country.lower()}/premium/"
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.0.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
            }
            
            res = requests.get(url, headers=headers, timeout=10)
            if res.status_code != 200:
                return PriceResult(None, error=f"HTTP {res.status_code}")
            
            # Look for price in the page
            patterns = [
                r'[\$€£]\s?(\d+\.?\d*)',  # $9.99
                r'(\d+\.?\d*)\s?[\$€£]',  # 9.99 $
                r'price["\']?\s*[:=]\s*["\']?(\d+\.?\d*)',
            ]
            
            prices = []
            for pattern in patterns:
                matches = re.findall(pattern, res.text)
                for m in matches:
                    try:
                        val = float(m.replace(',', ''))
                        if 4 < val < 20:  # Spotify individual plan range
                            prices.append(val)
                    except:
                        continue
            
            if prices:
                return PriceResult(min(prices), source="spotify.com", method_used="official_page")
            
            return PriceResult(None, error="No price found")
            
        except Exception as e:
            return PriceResult(None, error=str(e))
    
    @staticmethod
    def get_youtube_premium_price(country: str = "US") -> PriceResult:
        """Get YouTube Premium price"""
        try:
            url = f"https://www.youtube.com/premium"
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
            }
            
            res = requests.get(url, headers=headers, timeout=10)
            if res.status_code != 200:
                return PriceResult(None, error=f"HTTP {res.status_code}")
            
            # YouTube prices are usually in JSON-LD
            soup = BeautifulSoup(res.text, 'html.parser')
            scripts = soup.find_all('script', type='application/ld+json')
            
            for script in scripts:
                try:
                    data = json.loads(script.string)
                    if isinstance(data, list):
                        data = data[0]
                    
                    offers = data.get('offers', [])
                    if offers:
                        if isinstance(offers, dict):
                            offers = [offers]
                        for offer in offers:
                            price = offer.get('price')
                            if price:
                                return PriceResult(float(price), source="youtube.com", method_used="json_ld")
                except:
                    continue
            
            # Fallback to regex
            patterns = [r'[\$€£]\s?(\d+\.?\d*)', r'(\d+\.?\d*)\s*/\s*month']
            prices = []
            for pattern in patterns:
                matches = re.findall(pattern, res.text)
                for m in matches:
                    try:
                        val = float(m.replace(',', ''))
                        if 10 < val < 30:
                            prices.append(val)
                    except:
                        continue
            
            if prices:
                return PriceResult(min(prices), source="youtube.com", method_used="regex")
            
            return PriceResult(None, error="No price found")
            
        except Exception as e:
            return PriceResult(None, error=str(e))
    
    @staticmethod
    def get_netflix_price(country: str = "US") -> PriceResult:
        """
        Get Netflix prices
        Note: Netflix doesn't have a public API for prices
        """
        try:
            # Netflix signup page
            url = "https://www.netflix.com/signup/planform"
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
            }
            
            res = requests.get(url, headers=headers, timeout=10)
            if res.status_code != 200:
                return PriceResult(None, error=f"HTTP {res.status_code}")
            
            # Netflix prices are embedded in JavaScript
            patterns = [
                r'["\']?price["\']?\s*:\s*["\']?(\d+\.?\d*)',
                r'[\$€£]\s?(\d+\.?\d*)',
            ]
            
            prices = []
            for pattern in patterns:
                matches = re.findall(pattern, res.text)
                for m in matches:
                    try:
                        val = float(m.replace(',', ''))
                        if 6 < val < 25:  # Netflix plan range
                            prices.append(val)
                    except:
                        continue
            
            if prices:
                return PriceResult(min(prices), source="netflix.com", method_used="page_scrape")
            
            return PriceResult(None, error="No price found")
            
        except Exception as e:
            return PriceResult(None, error=str(e))


class EnhancedScraper:
    """Enhanced scraper with multiple fallback methods"""
    
    def __init__(self, use_proxy: bool = True, use_headless: bool = True):
        self.use_proxy = use_proxy
        self.use_headless = use_headless and PLAYWRIGHT_AVAILABLE
        self.proxy_manager = FreeProxyManager() if use_proxy else None
        self.official_apis = OfficialAPIs()
        
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Cache-Control': 'max-age=0',
        })
    
    def scrape_with_requests(self, url: str, max_retries: int = 3) -> PriceResult:
        """Scrape using requests with proxy rotation"""
        for attempt in range(max_retries):
            try:
                proxy = None
                if self.proxy_manager:
                    proxy_url = self.proxy_manager.get_random_proxy()
                    if proxy_url:
                        proxy = {'http': proxy_url, 'https': proxy_url}
                
                res = self.session.get(url, proxies=proxy, timeout=15)
                
                if res.status_code == 200:
                    return self._extract_price_from_html(res.text, url)
                
                if res.status_code in [403, 429, 503]:
                    # Blocked - try with different proxy
                    if proxy and self.proxy_manager:
                        self.proxy_manager.mark_bad_proxy(proxy_url)
                    time.sleep(random.uniform(1, 3))
                    continue
                    
            except Exception as e:
                if attempt < max_retries - 1:
                    time.sleep(random.uniform(1, 3))
                    continue
                return PriceResult(None, error=str(e))
        
        return PriceResult(None, error="Max retries exceeded")
    
    def scrape_with_playwright(self, url: str) -> PriceResult:
        """Scrape using Playwright headless browser with stealth options"""
        if not PLAYWRIGHT_AVAILABLE:
            return PriceResult(None, error="Playwright not available")
        
        try:
            with sync_playwright() as p:
                # Launch with stealth options
                browser = p.chromium.launch(
                    headless=True,
                    args=[
                        '--disable-blink-features=AutomationControlled',
                        '--disable-web-security',
                        '--disable-features=IsolateOrigins,site-per-process',
                    ]
                )
                
                context = browser.new_context(
                    user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    viewport={'width': 1920, 'height': 1080},
                    locale='en-US',
                    timezone_id='America/New_York',
                )
                
                # Add script to hide webdriver
                context.add_init_script("""
                    Object.defineProperty(navigator, 'webdriver', {
                        get: () => undefined
                    });
                    Object.defineProperty(navigator, 'plugins', {
                        get: () => [1, 2, 3, 4, 5]
                    });
                    window.chrome = { runtime: {} };
                """)
                
                page = context.new_page()
                
                # Navigate with timeout
                page.goto(url, wait_until='domcontentloaded', timeout=30000)
                
                # Wait for content to load
                page.wait_for_timeout(5000)
                
                # Get page content
                content = page.content()
                
                browser.close()
                
                return self._extract_price_from_html(content, url, method="playwright")
                
        except Exception as e:
            return PriceResult(None, error=f"Playwright error: {str(e)}")
    
    def _extract_price_from_html(self, html: str, url: str, method: str = "requests") -> PriceResult:
        """Extract price from HTML content"""
        soup = BeautifulSoup(html, 'html.parser')
        
        # 1. Try JSON-LD first (most reliable)
        json_ld_scripts = soup.find_all('script', type='application/ld+json')
        for script in json_ld_scripts:
            try:
                if not script.string:
                    continue
                data = json.loads(script.string)
                items = data if isinstance(data, list) else [data]
                
                for item in items:
                    offers = item.get('offers')
                    if offers:
                        if isinstance(offers, list):
                            offers = offers[0]
                        if isinstance(offers, dict):
                            price = offers.get('price') or offers.get('lowPrice')
                            if price:
                                return PriceResult(
                                    float(str(price).replace(',', '').replace('$', '')),
                                    source=urlparse(url).netloc,
                                    method_used=f"{method}_json_ld"
                                )
            except:
                continue
        
        # 2. Try common price selectors
        selectors = [
            'span[data-testid="price-amount"]',
            '.priceTxt',
            '.price-num',
            '.item-price',
            '.product-price',
            '.price',
            '[class*="price"]',
        ]
        
        for selector in selectors:
            elements = soup.select(selector)
            for el in elements:
                text = el.get_text(strip=True)
                match = re.search(r'[\$€£]?\s?(\d+\.?\d*)', text)
                if match:
                    try:
                        val = float(match.group(1))
                        if 0.5 < val < 1000:
                            return PriceResult(val, source=urlparse(url).netloc, method_used=f"{method}_selector")
                    except:
                        continue
        
        # 3. Regex fallback
        patterns = [
            r'[\$€£]\s?(\d{1,4}(?:[.,]\d{2})?)',
            r'(\d{1,4}(?:[.,]\d{2})?)\s?[\$€£]',
        ]
        
        prices = []
        for pattern in patterns:
            matches = re.findall(pattern, html)
            for m in matches:
                try:
                    val = float(m.replace(',', '.'))
                    if 0.5 < val < 1000:
                        prices.append(val)
                except:
                    continue
        
        if prices:
            return PriceResult(min(prices), source=urlparse(url).netloc, method_used=f"{method}_regex")
        
        return PriceResult(None, error="No price found in HTML")
    
    def scrape_official_price(self, service_name: str, url: str = None) -> PriceResult:
        """
        Scrape official price using multiple methods:
        1. Try manual price database first (most reliable)
        2. Try official API if available
        3. Try Playwright headless browser
        4. Try requests with proxy rotation
        """
        service_name = service_name.lower()
        
        # Method 1: Try manual price database (most reliable)
        # Map common service names to keys in the JSON file
        service_key_map = {
            'youtube': 'youtube',
            'youtube premium': 'youtube',
            'netflix': 'netflix_standard',
            'spotify': 'spotify_individual',
        }
        
        # Find matching service key
        matched_key = None
        for key in service_key_map:
            if key in service_name:
                matched_key = service_key_map[key]
                break
        
        if matched_key:
            manual_price = self.official_apis.get_manual_price(matched_key)
            if manual_price:
                print(f"  ✅ Found manual price for {service_name}: ${manual_price}")
                return PriceResult(manual_price, source="manual_database", method_used="manual_json")
        
        # Method 2: Try official API
        print(f"  🔍 Trying official API for {service_name}...")
        
        if 'spotify' in service_name:
            result = self.official_apis.get_spotify_price()
            if result.price:
                return result
        elif 'youtube' in service_name:
            result = self.official_apis.get_youtube_premium_price()
            if result.price:
                return result
        elif 'netflix' in service_name:
            result = self.official_apis.get_netflix_price()
            if result.price:
                return result
        
        # Method 3: Try Playwright if available
        if self.use_headless and url:
            print(f"  🔍 Trying Playwright for {url}...")
            result = self.scrape_with_playwright(url)
            if result.price:
                return result
        
        # Method 4: Try requests with proxy
        if url:
            print(f"  🔍 Trying requests with proxy for {url}...")
            result = self.scrape_with_requests(url)
            if result.price:
                return result
        
        return PriceResult(None, error="All methods failed")
    
    def scrape_z2u_price(self, url: str) -> PriceResult:
        """Scrape price from Z2U with multiple methods"""
        
        # Try Playwright first (more reliable for Z2U)
        if self.use_headless:
            print(f"  🔍 Trying Playwright for Z2U...")
            result = self.scrape_with_playwright(url)
            if result.price:
                # Validate price is reasonable for cost
                if 0.5 < result.price < 100:
                    return PriceResult(result.price, source="z2u.com", method_used="playwright")
        
        # Fallback to requests with proxy
        print(f"  🔍 Trying requests for Z2U...")
        return self.scrape_with_requests(url)


# Test function
def test_scraper():
    """Test the enhanced scraper"""
    print("=" * 60)
    print("Testing Enhanced Scraper")
    print("=" * 60)
    
    scraper = EnhancedScraper(use_proxy=True, use_headless=PLAYWRIGHT_AVAILABLE)
    
    # Test official prices
    test_services = [
        ("Spotify", "https://www.spotify.com/us/premium/"),
        ("YouTube Premium", "https://www.youtube.com/premium"),
        ("Netflix", "https://www.netflix.com/signup/planform"),
    ]
    
    print("\n🎯 Testing Official Price Scraping:")
    print("-" * 60)
    
    for service, url in test_services:
        print(f"\n{service}:")
        result = scraper.scrape_official_price(service, url)
        if result.price:
            print(f"  ✅ Price: ${result.price} (via {result.method_used})")
        else:
            print(f"  ❌ Failed: {result.error}")
    
    # Test Z2U (if you have a URL)
    print("\n" + "=" * 60)
    print("To test Z2U scraping, provide a URL:")
    print("python enhanced_scraper.py <z2u_url>")
    print("=" * 60)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        # Test specific URL
        url = sys.argv[1]
        scraper = EnhancedScraper(use_proxy=True, use_headless=PLAYWRIGHT_AVAILABLE)
        
        print(f"Testing URL: {url}")
        result = scraper.scrape_with_playwright(url) if PLAYWRIGHT_AVAILABLE else scraper.scrape_with_requests(url)
        
        if result.price:
            print(f"✅ Found price: ${result.price} (via {result.method_used})")
        else:
            print(f"❌ Failed: {result.error}")
    else:
        test_scraper()
