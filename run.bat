@echo off
title Campus Hostel and Mess Portal - Student Private Domain
color 0F

cd /d "%~dp0"

echo ====================================================================
echo        CAMPUS HOSTEL AND MESS SERVICE - PRIVATE STUDENT PORTAL       
echo ====================================================================
echo.
echo [*] Working Directory: %CD%
echo [*] Checking Python installation...

python --version >nul 2>&1
if errorlevel 1 (
    echo [!] ERROR: Python was not detected in PATH.
    echo [*] Opening local file version directly in your browser...
    start "" index.html
    echo.
    echo Portal opened directly from local file!
    pause
    exit /b 0
)

echo [*] Initializing SQLite database and campus data...
python database.py

echo.
echo ====================================================================
echo  [+] DEMO STUDENT LOGIN CREDENTIALS:
echo      Registration ID : 12204561
echo      Password        : lpu@1234
echo      Student Domain  : Sarthak Mishra - BH-3, Room 412
echo.
echo  [+] LATEST FEATURES READY:
echo      - Complete Local File Support (Works via file:// or http://)
echo      - Top Corner Calendar Removed [Clean Digital Real-Time Clock]
echo      - Accurate Real-Time Images in Campus OLX and Cafes & More
echo      - Wardens and Contacts Directory Pre-Populated [17 Demo Direct Dials]
echo      - Uni-Hospital and Specialist Doctors Directory [OPD Token Generator]
echo      - Time-Allocated Next Meal on Dashboard [Breakfast, Lunch, Snacks, Dinner]
echo      - Unified Single-Frame Facilities Sidebar [High-CSS Gradient Styles]
echo      - Dashboard Quick Actions to Sidebar Sync Highlighting
echo      - Dark Mode and Light Mode Dynamic Theme Switcher
echo      - Private Electricity Meter and Power Breakdown [AC, Lights, Sockets]
echo      - Cafes and More with Veg and Non-Veg MB Square Sliding Toggle
echo      - Room Housekeeping Slot Booking and 7-Day Mess Dining Tracker
echo      - Hostel and Services Feedback with Checklist and 5-Star Ratings
echo ====================================================================
echo.
echo [*] Starting web application server at: http://127.0.0.1:5000
echo [*] Opening portal in your default web browser...

start "" cmd /c "ping 127.0.0.1 -n 3 >nul && start http://127.0.0.1:5000"

echo.
echo  [+] Server running at: http://127.0.0.1:5000
echo  [+] Press Ctrl+C in this window anytime to stop the server.
echo ====================================================================
echo.

python app.py
if errorlevel 1 (
    echo.
    echo [!] Notice: Server closed. You can also open index.html directly.
    pause
)
pause
