@echo off
chcp 65001 >nul
echo ==========================================
echo  Spark Store - Enhanced Scraper Setup
echo ==========================================
echo.

echo [1/3] Installing Python packages...
pip install -r requirements.txt

echo.
echo [2/3] Installing Playwright browsers...
python -m playwright install chromium

echo.
echo [3/3] Testing scraper...
python enhanced_scraper.py

echo.
echo ==========================================
echo  Setup Complete!
echo ==========================================
echo.
echo To run the enhanced availability checker:
echo   python check_availability.py
echo.
echo To test with dry-run mode:
echo   python check_availability.py --dry-run
echo.
pause
