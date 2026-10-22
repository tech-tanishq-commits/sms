# 🎓 Campus Life & Student Portal

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?logo=github&style=for-the-badge)](https://sarthak24884.github.io/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Python](https://img.shields.io/badge/Python%203.x-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

> A comprehensive, modern, high-performance web application designed for campus and hostel living. Features full offline static capabilities for instant deployment on **GitHub Pages**, as well as a RESTful Python/Flask backend with SQLite.

---

## 🚀 Live Demo

- **GitHub Pages (Static Demo)**: [https://sarthak24884.github.io/](https://sarthak24884.github.io/)
- **Demo Student Credentials**:
  - **Registration ID**: `12204561`
  - **Password**: `lpu@1234`
  - **Student**: Sarthak Mishra &bull; BH-3, Room 412

---

## ✨ Features & Modules

### 1. 🕒 Live Digital Clock & Dynamic Next Meal
- Real-time digital clock in header ticking every second with 12-hour AM/PM and calendar date.
- Dynamic Next Meal card synchronizing automatically with current time:
  - **Breakfast**: 7:00 AM – 9:00 AM
  - **Lunch**: 11:00 AM – 2:30 PM
  - **Snacks**: 5:00 PM – 6:00 PM
  - **Dinner**: 8:00 PM – 10:00 PM

### 2. 🍲 7-Day Campus Mess Schedule
- Complete Monday–Sunday interactive dining schedule.
- Dietary tags, chef specials, meal timings, and dietician certifications for each meal slot.

### 3. 🍔 Cafes & More (Food Court & MB Square)
- Dual dining interface with smooth Veg and Non-Veg MB Square sliding toggle.
- 32 carefully curated dishes with 100% verified photo references.
- Interactive cart, quantity controls, and order placement.

### 4. 🏥 Uni-Hospital Specialist Doctors & OPD Token Generator
- Resident specialist doctors directory (General Medicine, Orthopedics, ENT, Dermatology, Dental Sciences, Mental Wellness).
- Instant OPD queue token generation (`UNI-OPD-XXXX`) with appointment confirmation slips.

### 5. ⚡ Private Room Electricity Meter & Analytics
- Sub-meter consumption calculator (Previous vs Current kWh) at ₹7.50/unit.
- Detailed appliance power breakdown (Air Conditioner, Lights & Fans, Power Sockets, Normal Sockets).
- Verified photo proof certification modal.

### 6. 🛡️ Wardens & Emergency Contacts Directory
- Pre-populated directory with 17 verified demo contacts (Chief Wardens, Block Wardens, Ambulance, Security Control Room, Dean of School, Receptionist).
- Direct-dial (`tel:`) and 1-click clipboard copy buttons.

### 7. 🧹 Room Housekeeping & Cleaning
- Slot reservation for floor mopping, deep cleaning, and washroom sanitization.
- Request status tracker (Pending, In Progress, Completed).

### 8. 🔄 Campus OLX (Peer-to-Peer Student Marketplace)
- Second-hand campus marketplace for student appliances, study gear, and textbooks.
- Direct **WhatsApp** and **Call Seller** buttons.

### 9. 🎨 Theme System
- One-click Dark Mode / Light Mode switcher with local storage persistence.

---

## 📁 Repository Structure

```
├── index.html              # Main Campus Portal application
├── cafes.html              # Cafes & More food court portal
├── marketplace.html        # Campus OLX marketplace
├── store.html              # Departmental store & cross-building inventory
├── app.py                  # Flask RESTful API server
├── database.py             # SQLite schema and sample data seeder
├── requirements.txt        # Python dependencies
├── run.bat                 # 1-Click launcher for Windows
├── css/
│   └── styles.css          # Main responsive design stylesheet
├── js/
│   ├── main.js             # Core portal controller & offline fallback DB
│   ├── marketplace.js      # Campus OLX controller
│   ├── store.js            # Campus store controller
│   └── mockData.js         # Offline mock dataset
└── templates/              # Flask Jinja2 templates (synced with root)
```

---

## 🛠️ How to Deploy on GitHub Pages

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com/new) and create a repository named `student-portal` (or `sarthak24884.github.io`).
2. **Upload / Push the Files**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Campus Life & Student Portal"
   git branch -M main
   git remote add origin https://github.com/sarthak24884/<repo-name>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - In your GitHub repo, go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
   - Your site will be live at `https://sarthak24884.github.io/<repo-name>/` in 1–2 minutes!

---

## 💻 Running Locally

### Option A: 1-Click Windows Launcher
Double-click `run.bat` in the project root. It will verify Python, initialize SQLite, start the local server, and open your browser automatically.

### Option B: Python Flask Server
```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Seed database
python database.py

# 3. Start server
python app.py
```
Open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

### Option C: Direct Offline Static Mode
Double-click `index.html` or `cafes.html` to browse directly in any web browser without needing any server installed.

---

## 👤 Author

**Sarthak Mishra**
- GitHub: [@sarthak24884](https://github.com/sarthak24884)
