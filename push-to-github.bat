@echo off
chcp 65001 >nul
cd /d "D:\Subscribtions Sellers"

echo.
echo ========================================
echo    Pushing changes to GitHub...
echo ========================================
echo.

echo [1/3] Adding all changes...
git add -A

echo [2/3] Committing changes...
git commit -m "update: %date% %time:~0,5%"

echo [3/3] Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo    Done! Changes pushed to GitHub.
echo ========================================
echo.

pause
