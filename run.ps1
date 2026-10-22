# Student Management System - LPU PowerShell Launcher
Set-Location -Path $PSScriptRoot

Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host "       CAMPUS HOSTEL & MESS SERVICE - PRIVATE STUDENT PORTAL        " -ForegroundColor Yellow
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "[*] Working Directory: $PSScriptRoot" -ForegroundColor Gray
Write-Host "[*] Initializing SQLite database and campus data..." -ForegroundColor Green
python database.py

Write-Host ""
Write-Host "====================================================================" -ForegroundColor DarkGray
Write-Host " [+] DEMO STUDENT CREDENTIALS: " -ForegroundColor Yellow
Write-Host "     Registration ID : 12204561" -ForegroundColor White
Write-Host "     Password        : lpu@1234" -ForegroundColor White
Write-Host "     Resident Domain : Sarthak Mishra (BH-3, Room 412)" -ForegroundColor Green
Write-Host ""
Write-Host " [+] LATEST UPDATES READY: " -ForegroundColor Yellow
Write-Host "     - Top Corner Calendar Removed (Clean Live Clock Header)" -ForegroundColor White
Write-Host "     - Accurate Real-Time Images in Campus OLX and Cafes & More" -ForegroundColor White
Write-Host "     - Wardens & Emergency Directory (17 Demo Direct Contacts)" -ForegroundColor White
Write-Host "     - Uni-Hospital & Specialist Doctors (OPD Token Generator)" -ForegroundColor White
Write-Host "     - Time-Allocated Meals (Breakfast, Lunch, Snacks, Dinner)" -ForegroundColor White
Write-Host "     - Unified Single-Frame Facilities Sidebar & Clean Header" -ForegroundColor White
Write-Host "====================================================================" -ForegroundColor DarkGray
Write-Host ""
Write-Host "[*] Starting server at http://127.0.0.1:5000..." -ForegroundColor Green
Start-Sleep -Seconds 1
Start-Process "http://127.0.0.1:5000"

python app.py
