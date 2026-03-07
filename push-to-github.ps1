# ============================================
# GitHub Auto Push Script
# ============================================
# Usage: Right-click this file -> Run with PowerShell
# Or run in terminal: .\push-to-github.ps1
# Or with custom message: .\push-to-github.ps1 -m "your message"
# ============================================

param(
    [Alias("m")]
    [string]$Message
)

# Set UTF-8 encoding
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   GitHub Auto Push Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version 2>&1
    Write-Host "[OK] $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Git is not installed!" -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if we're in a git repo
$isRepo = git rev-parse --is-inside-work-tree 2>&1
if ($isRepo -ne "true") {
    Write-Host "[ERROR] This is not a Git repository!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Show current status
Write-Host "--- Current Status ---" -ForegroundColor Yellow
git status --short

$changes = git status --porcelain
if ([string]::IsNullOrWhiteSpace($changes)) {
    Write-Host ""
    Write-Host "[INFO] No changes to push. Working tree is clean." -ForegroundColor Yellow
    
    # Check if there are unpushed commits
    $unpushed = git log origin/main..HEAD --oneline 2>&1
    if (-not [string]::IsNullOrWhiteSpace($unpushed)) {
        Write-Host "[INFO] But you have unpushed commits:" -ForegroundColor Yellow
        Write-Host $unpushed -ForegroundColor White
        Write-Host ""
        $pushOnly = Read-Host "Push these commits? (y/n)"
        if ($pushOnly -eq "y" -or $pushOnly -eq "Y") {
            Write-Host ""
            Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
            git push origin main 2>&1 | Out-Host
            if ($LASTEXITCODE -eq 0) {
                Write-Host ""
                Write-Host "[SUCCESS] Pushed successfully!" -ForegroundColor Green
            } else {
                Write-Host ""
                Write-Host "[ERROR] Push failed!" -ForegroundColor Red
            }
        }
    } else {
        Write-Host "[INFO] Everything is up to date with GitHub." -ForegroundColor Green
    }
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 0
}

Write-Host ""

# Stage all changes
Write-Host "Adding all changes..." -ForegroundColor Cyan
git add .

# Get commit message
if ([string]::IsNullOrWhiteSpace($Message)) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    $defaultMsg = "Update $timestamp"
    Write-Host ""
    $Message = Read-Host "Commit message (Enter for '$defaultMsg')"
    if ([string]::IsNullOrWhiteSpace($Message)) {
        $Message = $defaultMsg
    }
}

# Commit
Write-Host ""
Write-Host "Committing: $Message" -ForegroundColor Cyan
git commit -m "$Message" 2>&1 | Out-Host

# Push
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push origin main 2>&1 | Out-Host

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "   SUCCESS! Changes pushed to GitHub" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "   FAILED! Could not push to GitHub" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try running: git pull origin main --rebase" -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to exit"
