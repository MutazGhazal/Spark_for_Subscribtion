# Script to push changes to GitHub automatically
# Usage: Right-click -> Run with PowerShell, or run from terminal: .\push-to-github.ps1

Set-Location "D:\Subscribtions Sellers"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Pushing changes to GitHub..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Stage all changes
Write-Host "[1/3] Adding all changes..." -ForegroundColor Yellow
git add -A

# Commit with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$commitMsg = "update: $timestamp"
Write-Host "[2/3] Committing: $commitMsg" -ForegroundColor Yellow
git commit -m $commitMsg

# Push to GitHub
Write-Host "[3/3] Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   Done! Changes pushed to GitHub." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Keep window open
Read-Host "Press Enter to close"
