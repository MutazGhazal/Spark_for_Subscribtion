-- SQL Script to restore inflated prices to a sane baseline
-- This script resets prices for products that have clearly inflated due to scraper failures.
-- Run this in your Supabase SQL Editor.

-- 1. Reset Main Product Prices if they are suspiciously high and have 0 cost
UPDATE products 
SET price = 10 
WHERE (id ILIKE '%netflix%' OR name_en ILIKE '%netflix%') 
  AND price > 20 
  AND (cost_price IS NULL OR cost_price = 0);

UPDATE products 
SET price = 25 
WHERE (id ILIKE '%gemini%' OR name_en ILIKE '%gemini%') 
  AND price > 50 
  AND (cost_price IS NULL OR cost_price = 0);

UPDATE products 
SET price = 15 
WHERE (id ILIKE '%linkedin%' OR name_en ILIKE '%linkedin%') 
  AND price > 40 
  AND (cost_price IS NULL OR cost_price = 0);

UPDATE products 
SET price = 10 
WHERE (id ILIKE '%spotify%' OR name_en ILIKE '%spotify%') 
  AND price > 20 
  AND (cost_price IS NULL OR cost_price = 0);

-- 2. Update Netflix with a working Z2U URL (Example of how to fix products)
UPDATE products
SET source_url = 'https://www.z2u.com/product-30948/Personal-Account-Netflix-30days-4K-UHD-Premium-1-Month.html'
WHERE id = 'netflix-premium-4k';

UPDATE products
SET source_url = 'https://www.z2u.com/product-875242/Google-AI-Gemini-Plus-12-Months-Private-Account.html'
WHERE id = 'google-gemini-pro-family';

-- 3. Clear the 0 official prices if you want them to stop appearing as "-"
-- UPDATE products SET official_price = NULL WHERE official_price = 0;
