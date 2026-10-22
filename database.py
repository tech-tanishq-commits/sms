import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "lpu_system.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Cleaning requests table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS cleaning_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_name TEXT NOT NULL,
            reg_no TEXT NOT NULL,
            hostel_block TEXT NOT NULL,
            room_no TEXT NOT NULL,
            service_type TEXT NOT NULL,
            preferred_slot TEXT NOT NULL,
            instructions TEXT,
            status TEXT DEFAULT 'Pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Mess menu table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS mess_menu (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            day_of_week TEXT NOT NULL,
            meal_type TEXT NOT NULL,
            items TEXT NOT NULL,
            timings TEXT NOT NULL,
            special_dish TEXT
        )
    ''')

    # Electricity bills table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS electricity_bills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hostel_block TEXT NOT NULL,
            room_no TEXT NOT NULL,
            previous_reading REAL NOT NULL,
            current_reading REAL NOT NULL,
            rate_per_unit REAL DEFAULT 7.50,
            due_date TEXT NOT NULL,
            status TEXT DEFAULT 'Unpaid',
            last_payment_date TEXT
        )
    ''')

    # Le Brocs menu table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS lebrocs_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT,
            is_veg INTEGER DEFAULT 1,
            badge TEXT
        )
    ''')

    # Le Brocs orders table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS lebrocs_orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_code TEXT UNIQUE NOT NULL,
            student_name TEXT NOT NULL,
            phone TEXT NOT NULL,
            hostel_block TEXT NOT NULL,
            room_no TEXT NOT NULL,
            items_summary TEXT NOT NULL,
            total_amount REAL NOT NULL,
            payment_method TEXT DEFAULT 'Cash on Delivery',
            status TEXT DEFAULT 'Preparing',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Senior Marketplace table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS marketplace_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            original_price REAL,
            condition TEXT NOT NULL,
            description TEXT,
            seller_name TEXT NOT NULL,
            hostel_block TEXT NOT NULL,
            room_no TEXT NOT NULL,
            phone TEXT NOT NULL,
            whatsapp TEXT NOT NULL,
            status TEXT DEFAULT 'Available',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Library books table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS library_books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            department TEXT NOT NULL,
            isbn TEXT,
            floor TEXT NOT NULL,
            rack_shelf TEXT NOT NULL,
            total_copies INTEGER DEFAULT 5,
            available_copies INTEGER DEFAULT 5
        )
    ''')

    # Book reservations table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS book_reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reservation_code TEXT UNIQUE NOT NULL,
            book_id INTEGER NOT NULL,
            student_name TEXT NOT NULL,
            reg_no TEXT NOT NULL,
            hostel_block TEXT NOT NULL,
            room_no TEXT NOT NULL,
            reserved_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'Reserved',
            FOREIGN KEY (book_id) REFERENCES library_books (id)
        )
    ''')

    # Emergency Contacts table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS emergency_contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            title TEXT NOT NULL,
            name TEXT NOT NULL,
            contact_number TEXT NOT NULL,
            location_or_block TEXT NOT NULL,
            availability TEXT NOT NULL
        )
    ''')

    # Campus Stores table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS campus_stores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            store_name TEXT NOT NULL,
            building_name TEXT NOT NULL,
            floor_location TEXT NOT NULL,
            timings TEXT NOT NULL,
            contact_no TEXT
        )
    ''')

    # Campus Store Items Inventory table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS campus_store_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            primary_building TEXT NOT NULL,
            primary_store TEXT NOT NULL,
            floor_location TEXT NOT NULL,
            stock_status TEXT NOT NULL,
            other_buildings_json TEXT NOT NULL,
            description TEXT
        )
    ''')

    # Salon Branches table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS salon_branches (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            building_location TEXT NOT NULL,
            gender_type TEXT NOT NULL,
            timings TEXT NOT NULL,
            phone TEXT NOT NULL
        )
    ''')

    # Salon Services table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS salon_services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            service_name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            duration_mins INTEGER DEFAULT 30,
            gender_type TEXT NOT NULL,
            description TEXT
        )
    ''')

    # Salon Bookings table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS salon_bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            token_code TEXT UNIQUE NOT NULL,
            student_name TEXT NOT NULL,
            reg_no TEXT NOT NULL,
            phone TEXT NOT NULL,
            hostel_block TEXT NOT NULL,
            room_no TEXT NOT NULL,
            salon_branch TEXT NOT NULL,
            service_name TEXT NOT NULL,
            booking_date TEXT NOT NULL,
            time_slot TEXT NOT NULL,
            stylist_preference TEXT DEFAULT 'Any Available Stylist',
            status TEXT DEFAULT 'Confirmed',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Student To-Do Tasks table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS student_todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            priority TEXT DEFAULT 'Medium',
            due_date TEXT NOT NULL,
            due_time TEXT,
            is_completed INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Student Users Authentication & Profile table (Single Student Domain Access)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS student_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reg_no TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            student_name TEXT NOT NULL,
            hostel_block TEXT NOT NULL,
            room_no TEXT NOT NULL,
            department TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL,
            avatar_initials TEXT DEFAULT 'SM',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Hostel Services Feedback table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS hostel_feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reg_no TEXT NOT NULL,
            student_name TEXT NOT NULL,
            hostel_block TEXT NOT NULL,
            room_no TEXT NOT NULL,
            services_reviewed TEXT NOT NULL,
            overall_rating INTEGER NOT NULL,
            feedback_category TEXT NOT NULL,
            feedback_text TEXT NOT NULL,
            would_recommend INTEGER DEFAULT 1,
            status TEXT DEFAULT 'Under Review by Warden',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    
    # Uni-Hospital Specialist Doctors table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS unihospital_doctors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            doctor_name TEXT NOT NULL,
            qualification TEXT NOT NULL,
            specialty TEXT NOT NULL,
            department TEXT NOT NULL,
            timings TEXT NOT NULL,
            room_no TEXT NOT NULL,
            experience TEXT NOT NULL,
            image_url TEXT
        )
    ''')

    # Uni-Hospital OPD Appointments table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS unihospital_appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            token_code TEXT UNIQUE NOT NULL,
            student_name TEXT NOT NULL,
            reg_no TEXT NOT NULL,
            phone TEXT NOT NULL,
            hostel_block TEXT NOT NULL,
            room_no TEXT NOT NULL,
            doctor_name TEXT NOT NULL,
            department TEXT NOT NULL,
            appointment_date TEXT NOT NULL,
            time_slot TEXT NOT NULL,
            symptoms TEXT,
            status TEXT DEFAULT 'Confirmed',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    conn.commit()
    seed_sample_data(conn)
    conn.close()

def seed_sample_data(conn):
    cursor = conn.cursor()

    # Seed Mess Menu if empty
    cursor.execute("SELECT COUNT(*) FROM mess_menu")
    if cursor.fetchone()[0] == 0:
        menu_data = [
            ("Monday", "Breakfast", "Aloo Paratha with Curd, Mint Chutney, Butter, Boiled Eggs / Banana, Tea & Coffee", "07:30 AM - 09:30 AM", "Desi Ghee Paratha"),
            ("Monday", "Lunch", "Amritsari Chole, Jeera Rice, Bhature / Poori, Fresh Green Salad, Boondi Raita", "12:00 PM - 02:30 PM", "Amritsari Chole"),
            ("Monday", "Snacks", "Samosa Chaat / Veg Puff, Ginger Masala Chai, Filter Coffee", "04:30 PM - 06:00 PM", "Crispy Samosa"),
            ("Monday", "Dinner", "Dal Makhani, Shahi Paneer, Tawa Roti, Butter Naan, Gulab Jamun (2 pcs)", "07:30 PM - 09:45 PM", "Gulab Jamun & Shahi Paneer"),

            ("Tuesday", "Breakfast", "Idli Sambar, Medu Vada, Coconut Chutney, Tomato Chutney, Tea & Milk", "07:30 AM - 09:30 AM", "South Indian Special"),
            ("Tuesday", "Lunch", "Rajma Masala (Jammu Style), Steamed Basmati Rice, Chapati, Mixed Veg Korma, Salad", "12:00 PM - 02:30 PM", "Kashmiri Rajma"),
            ("Tuesday", "Snacks", "Aloo Tikki Burger, Nimbu Pani / Chai", "04:30 PM - 06:00 PM", "Aloo Tikki"),
            ("Tuesday", "Dinner", "Kadhai Paneer / Egg Curry, Yellow Dal Tadka, Rice, Butter Roti, Moong Dal Halwa", "07:30 PM - 09:45 PM", "Moong Dal Halwa"),

            ("Wednesday", "Breakfast", "Poha with Roasted Peanuts, Sev, Sprouts Salad, Boiled Eggs / Fruit, Tea", "07:30 AM - 09:30 AM", "Indori Poha"),
            ("Wednesday", "Lunch", "Kadhi Pakoda, Jeera Rice, Aloo Jeera Dry, Phulka Roti, Pickle & Papad", "12:00 PM - 02:30 PM", "Punjabi Kadhi Pakoda"),
            ("Wednesday", "Snacks", "Veg Momos with Spicy Red Chutney, Sweet Corn, Hot Coffee", "04:30 PM - 06:00 PM", "Steamed Momos"),
            ("Wednesday", "Dinner", "Paneer Lababdar / Chicken Curry, Dal Palak, Steamed Rice, Tandoori Roti, Rasgulla", "07:30 PM - 09:45 PM", "Special Paneer / Chicken"),

            ("Thursday", "Breakfast", "Masala Dosa, Mysore Bonda, Sambar, Coconut Chutney, Milk & Tea", "07:30 AM - 09:30 AM", "Crispy Masala Dosa"),
            ("Thursday", "Lunch", "Dal Fry, Mix Veg Poriyal, Peas Pulao, Chapati, Cucumber Raita", "12:00 PM - 02:30 PM", "Dal Fry & Peas Pulao"),
            ("Thursday", "Snacks", "Bread Pakoda with Green & Sweet Chutney, Masala Chai", "04:30 PM - 06:00 PM", "Crisp Bread Pakoda"),
            ("Thursday", "Dinner", "Mutter Paneer, Dal Makhani, Jeera Rice, Soft Rotis, Ice Cream Cup", "07:30 PM - 09:45 PM", "Amul Ice Cream Cup"),

            ("Friday", "Breakfast", "Gobhi & Paneer Paratha, Pickle, Curd, Butter, Coffee / Tea", "07:30 AM - 09:30 AM", "Stuffed Paratha Feast"),
            ("Friday", "Lunch", "Kashmiri Dum Aloo, Dal Panchratna, Steamed Rice, Phulkas, Boondi Raita", "12:00 PM - 02:30 PM", "Dum Aloo Kashmiri"),
            ("Friday", "Snacks", "Pav Bhaji with Butter Pav, Onion Lemon Salad, Hot Tea", "04:30 PM - 06:00 PM", "Mumbai Pav Bhaji"),
            ("Friday", "Dinner", "Paneer Butter Masala / Butter Chicken, Dal Tadka, Veg Biryani, Roti, Jalebi", "07:30 PM - 09:45 PM", "Crisp Hot Jalebi"),

            ("Saturday", "Breakfast", "Uttapam with Coconut Chutney, Sambhar, Boiled Eggs, Tea & Bournvita", "07:30 AM - 09:30 AM", "Onion Tomato Uttapam"),
            ("Saturday", "Lunch", "Chole Kulche (Amritsari Style), Pulao, Curd, Fresh Salad & Sirka Onion", "12:00 PM - 02:30 PM", "Amritsari Kulche"),
            ("Saturday", "Snacks", "Kachori with Aloo Sabzi / Chai", "04:30 PM - 06:00 PM", "Khasta Kachori"),
            ("Saturday", "Dinner", "Soyabean Chaap Curry, Dal Makhani, Steamed Rice, Tandoori Roti, Kheer", "07:30 PM - 09:45 PM", "Rice Kheer & Soya Chaap"),

            ("Sunday", "Breakfast", "Puri Bhaji (Halwai Style), Sooji Halwa, Fresh Banana, Tea & Coffee", "08:00 AM - 10:00 AM", "Special Halwa Puri"),
            ("Sunday", "Lunch", "LPU Special Hyderabadi Biryani (Veg & Chicken), Mirchi Ka Salan, Raita, Gulab Jamun", "12:30 PM - 03:00 PM", "Grand Sunday Biryani"),
            ("Sunday", "Snacks", "French Fries / White Sauce Pasta, Cold Coffee", "04:30 PM - 06:00 PM", "Uni-Mall Style Pasta"),
            ("Sunday", "Dinner", "Paneer Do Pyaza, Dal Tadka, Tawa Paratha, Jeera Rice, Kesar Rasmalai", "07:30 PM - 09:45 PM", "Royal Rasmalai")
        ]
        cursor.executemany('''
            INSERT INTO mess_menu (day_of_week, meal_type, items, timings, special_dish)
            VALUES (?, ?, ?, ?, ?)
        ''', menu_data)

    # Seed Le Brocs Menu if empty
    cursor.execute("SELECT COUNT(*) FROM lebrocs_items")
    if cursor.fetchone()[0] == 0:
        brocs_data = [
            ("LPU Monster Smash Burger", "Burgers", 169.0, "Double crispy patty, melted cheddar, caramelized onions & secret smoky sauce", 1, "Best Seller ⭐"),
            ("Crispy Paneer Makhani Burger", "Burgers", 139.0, "Herb-crusted cottage cheese steak coated in creamy makhani dressing", 1, "Student Fav"),
            ("Fiery Chicken Zinger Burger", "Burgers", 159.0, "Juicy fried chicken breast with jalapeños and chipotle mayo", 0, "Chef Choice 🔥"),
            ("Peri Peri Loaded French Fries", "Sides & Snacks", 99.0, "Golden crinkle fries tossed in spicy African peri-peri with cheesy dip", 1, "Popular"),
            ("Kurkure Veg Momos (6 Pcs)", "Momos", 119.0, "Super crunchy coated fried dumplings served with hot red chutney & mayo", 1, "Crunchy Hit"),
            ("Kurkure Chicken Momos (6 Pcs)", "Momos", 139.0, "Crispy battered minced chicken momos served with fiery garlic dip", 0, "Must Try"),
            ("Paneer Tikka Kathi Roll", "Wraps & Rolls", 129.0, "Charcoal grilled spiced paneer cubes wrapped in layered lachha paratha", 1, "Classic"),
            ("Butter Chicken Kathi Roll", "Wraps & Rolls", 149.0, "Tender shredded tandoori chicken cooked in rich butter gravy wrapped hot", 0, "Top Rated"),
            ("Cheese Burst Farmhouse Pizza (7 inch)", "Pizzas", 189.0, "Mozzarella overload, bell peppers, golden corn, olives, and mushrooms", 1, "Cheesy"),
            ("Smoky BBQ Chicken Pizza (7 inch)", "Pizzas", 219.0, "Grilled barbecue chicken chunks, sliced red onions and melted gouda", 0, "Signature"),
            ("Belgian Dark Chocolate Shake", "Beverages", 110.0, "Thick creamy shake blended with rich Belgian chocolate and choco chips", 1, "Chilled"),
            ("Nutella Brownie Blast Shake", "Beverages", 129.0, "Dense chocolate brownie crushed into chilled Nutella hazelnut shake", 1, "Sweet Tooth"),
            ("Hostel Night-Owl Combo", "Combos", 229.0, "1 Veg Smash Burger + 1 Peri Peri Fries + 1 Chilled Cold Drink", 1, "Value Combo 🎯"),
            ("Brocs Non-Veg Binge Box", "Combos", 269.0, "1 Chicken Zinger + 4 Kurkure Chicken Momos + 1 Coke", 0, "Mega Combo 🍗")
        ]
        cursor.executemany('''
            INSERT INTO lebrocs_items (name, category, price, description, is_veg, badge)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', brocs_data)

    # Seed Sample Electricity Bills
    cursor.execute("SELECT COUNT(*) FROM electricity_bills")
    if cursor.fetchone()[0] == 0:
        bills_data = [
            ("BH-1", "304", 1420.0, 1545.0, 7.50, "2026-09-20", "Unpaid", None),
            ("BH-2", "215", 2100.0, 2260.0, 7.50, "2026-09-20", "Paid", "2026-09-10"),
            ("BH-3", "412", 980.0, 1095.0, 7.50, "2026-09-25", "Unpaid", None),
            ("BH-4", "108", 3100.0, 3280.0, 7.50, "2026-09-20", "Unpaid", None),
            ("BH-5", "501", 1750.0, 1890.0, 7.50, "2026-09-22", "Paid", "2026-09-08"),
            ("GH-1", "202", 1120.0, 1230.0, 7.50, "2026-09-20", "Unpaid", None),
            ("GH-2", "418", 1650.0, 1785.0, 7.50, "2026-09-25", "Unpaid", None)
        ]
        cursor.executemany('''
            INSERT INTO electricity_bills (hostel_block, room_no, previous_reading, current_reading, rate_per_unit, due_date, status, last_payment_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', bills_data)

    # Seed Senior Marketplace
    cursor.execute("SELECT COUNT(*) FROM marketplace_items")
    if cursor.fetchone()[0] == 0:
        market_data = [
            ("Symphony Personal Room Cooler (High Air Throw)", "Hostel Essentials", 2200.0, 4500.0, "Excellent (Used 1 Sem)", "Very clean, runs super quiet. Perfect for BH/GH summers. Complete with wheels and power cord.", "Aman Verma (Final Year CSE)", "BH-3", "412", "9876543210", "919876543210"),
            ("Casio FX-991EX Classwiz Calculator", "Electronics & Study", 850.0, 1600.0, "Like New", "Original box available, all matrix and integration functions working smoothly. Allowed in LPU end-term exams.", "Rohan Sharma (3rd Year ME)", "BH-1", "208", "9812345678", "919812345678"),
            ("Hercules Geared Cycle (Dual Disk Brakes)", "Vehicles & Transport", 3400.0, 8500.0, "Good Condition", "Great for commuting from BH-4 to Block 34/38 Uni-Mall. New tyres installed last month.", "Simran Kaur (4th Year B.Tech)", "GH-2", "310", "9898981234", "919898981234"),
            ("Mini Electric Kettle (1.5L Pigeon)", "Appliances", 450.0, 999.0, "Good", "Used for late night Maggi, tea and hot water. Auto shut-off working perfectly.", "Karthik Reddy (3rd Year ECE)", "BH-5", "114", "9765432109", "919765432109"),
            ("Engineering Mini Drafter + Drawing Board & Sheet Tube", "Civil & Mech Gear", 550.0, 1400.0, "Good", "Essential for 1st year graphics. Heavy-duty clamp, accurate scales, zero bent.", "Deepak Kumar (2nd Year CE)", "BH-2", "502", "9823456781", "919823456781"),
            ("Data Structures & Algorithms in C++ by Sartaj Sahni", "Textbooks", 350.0, 750.0, "Barely Used", "Clean book without pen markings, syllabus oriented for CSE/IT students.", "Priya Nair (MCA 2nd Year)", "GH-1", "104", "9845123789", "919845123789")
        ]
        cursor.executemany('''
            INSERT INTO marketplace_items (title, category, price, original_price, condition, description, seller_name, hostel_block, room_no, phone, whatsapp)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', market_data)

    # Seed Library Books (Central Library Block 36 / 38)
    cursor.execute("SELECT COUNT(*) FROM library_books")
    if cursor.fetchone()[0] == 0:
        books_data = [
            ("Introduction to Algorithms (CLRS)", "Thomas H. Cormen, Charles E. Leiserson", "Computer Science & Engineering", "978-0262033848", "Floor 3 (Tech Section)", "Rack CSE-04 • Shelf B", 12, 5),
            ("Operating System Concepts (Dinosaur Book)", "Abraham Silberschatz, Peter B. Galvin", "Computer Science & Engineering", "978-1118063330", "Floor 3 (Tech Section)", "Rack CSE-08 • Shelf A", 10, 4),
            ("Artificial Intelligence: A Modern Approach", "Stuart Russell, Peter Norvig", "Computer Science & Engineering", "978-0136042594", "Floor 4 (AI/Data Science)", "Rack AI-02 • Shelf C", 8, 3),
            ("Database System Concepts", "Abraham Silberschatz, Henry F. Korth", "Computer Science & Engineering", "978-0078022159", "Floor 3 (Tech Section)", "Rack CSE-12 • Shelf D", 9, 6),
            ("Modern Digital and Analog Communication Systems", "B.P. Lathi, Zhi Ding", "Electronics & Communication", "978-0195331455", "Floor 2 (Core Engg)", "Rack ECE-03 • Shelf A", 7, 2),
            ("Theory of Machines and Mechanisms", "Joseph E. Shigley, John J. Uicker", "Mechanical Engineering", "978-0195371239", "Floor 2 (Core Engg)", "Rack MECH-07 • Shelf B", 6, 3),
            ("Organic Chemistry (Sixth Edition)", "Robert T. Morrison, Robert N. Boyd", "Applied Sciences & Pharmacy", "978-0136436690", "Floor 1 (Basic Sciences)", "Rack SCI-05 • Shelf E", 8, 4),
            ("Financial Management: Theory and Practice", "Prasanna Chandra", "Mittal School of Business", "978-9352605484", "Floor 1 (Management)", "Rack MBA-01 • Shelf C", 11, 7),
            ("Computer Networking: A Top-Down Approach", "James F. Kurose, Keith W. Ross", "Computer Science & Engineering", "978-0133594140", "Floor 3 (Tech Section)", "Rack CSE-15 • Shelf C", 14, 8)
        ]
        cursor.executemany('''
            INSERT INTO library_books (title, author, department, isbn, floor, rack_shelf, total_copies, available_copies)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', books_data)

    # Seed Emergency & Warden Contacts
    cursor.execute("SELECT COUNT(*) FROM emergency_contacts")
    if cursor.fetchone()[0] == 0:
        contacts_data = [
            ("Emergency", "24x7 University Ambulance & Health Centre", "Dr. Rajesh Sharma (Chief Medical Officer)", "+91 1824 517100", "Uni-Hospital (Near Gate 4)", "24x7 Available"),
            ("Emergency", "LPU Central Security & Control Room", "Inspector Balwinder Singh", "+91 1824 517000", "Main Control Tower (Gate 1)", "24x7 Available"),
            ("Wardens", "Chief Warden - Boys Hostels (BH)", "Prof. Gurpreet Singh", "+91 98760 11223", "Central Hostel Office (BH-3 Ground)", "09:00 AM - 08:00 PM"),
            ("Wardens", "Chief Warden - Girls Hostels (GH)", "Dr. Sunita Pathak", "+91 98760 44556", "GH Central Block Office", "09:00 AM - 08:00 PM"),
            ("Wardens", "Hostel Warden BH-1 & BH-2", "Mr. Harpreet Singh", "+91 98140 10203", "BH-1 Warden Office (Room 101)", "08:00 AM - 10:00 PM"),
            ("Wardens", "Hostel Warden BH-3 & BH-4", "Mr. Rakesh Chander", "+91 98140 20304", "BH-3 Warden Office (Room 102)", "08:00 AM - 10:00 PM"),
            ("Wardens", "Hostel Warden BH-5 & BH-6", "Mr. Anil Kumar", "+91 98140 30405", "BH-5 Warden Office (Room 101)", "08:00 AM - 10:00 PM"),
            ("Wardens", "Hostel Warden GH-1 & GH-2", "Ms. Neha Sharma", "+91 98140 40506", "GH-1 Warden Office (Room 004)", "08:00 AM - 10:00 PM"),
            ("Technicians", "Campus Senior Electrician & Power Unit", "Mr. Satnam Singh", "+91 98881 22334", "Hostel Maintenance Cell", "08:00 AM - 08:00 PM"),
            ("Technicians", "Hostel Plumber & RO Water Tech", "Mr. Jagjit Singh", "+91 98881 33445", "Hostel Maintenance Cell", "08:00 AM - 07:00 PM"),
            ("Technicians", "Carpenter & Furniture Maintenance", "Mr. Mohan Lal", "+91 98881 44556", "Central Maintenance Yard", "09:00 AM - 06:00 PM"),
            ("Technicians", "Air Conditioner & Cooler Technician", "Mr. Virender Singh", "+91 98881 55667", "Block 34 HVAC Center", "09:00 AM - 07:00 PM"),
            ("Helpline", "Student Welfare / Ragging Helpline", "Dean Student Welfare Office", "+91 1824 517200", "Block 29 (Division of Student Welfare)", "24x7 Toll Free"),
            ("Helpline", "LPU IT & Wi-Fi Support Desk", "Network Operations Center", "+91 1824 517300", "Block 36 (NOC Desk)", "09:00 AM - 07:00 PM")
        ]
        cursor.executemany('''
            INSERT INTO emergency_contacts (category, title, name, contact_number, location_or_block, availability)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', contacts_data)

    # Seed Sample Cleaning Requests
    cursor.execute("SELECT COUNT(*) FROM cleaning_requests")
    if cursor.fetchone()[0] == 0:
        cleaning_data = [
            ("Aarav Gupta", "12204561", "BH-3", "412", "Room Deep Cleaning & Mopping", "10:00 AM - 12:00 PM", "Please sanitize door handles and sweep balcony.", "Completed"),
            ("Pooja Verma", "12208932", "GH-1", "204", "Washroom Sanitization", "02:00 PM - 04:00 PM", "Need mirror and tap cleaning.", "In Progress"),
            ("Vikram Malhotra", "12215670", "BH-1", "304", "Floor Mopping & Dusting", "04:00 PM - 06:00 PM", "Room keys with roommate if not present.", "Pending")
        ]
        cursor.executemany('''
            INSERT INTO cleaning_requests (student_name, reg_no, hostel_block, room_no, service_type, preferred_slot, instructions, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', cleaning_data)

    # Seed Campus Stores
    cursor.execute("SELECT COUNT(*) FROM campus_stores")
    if cursor.fetchone()[0] == 0:
        stores_data = [
            ("Uni-Mall Central Supermarket & Stationery", "Uni-Mall", "Basement & Ground Floor Shop B-09", "08:30 AM - 11:00 PM", "+91 1824 517401"),
            ("Block 34 Engineering Stationery & Print Hub", "Block 34", "Ground Floor Near Mechanical Labs", "08:30 AM - 07:30 PM", "+91 1824 517402"),
            ("Block 38 Tech & IT Supplies Store", "Block 38", "2nd Floor NOC & Computing Wing", "09:00 AM - 07:00 PM", "+91 1824 517403"),
            ("Block 28 Pharmacy & Biotech Lab Supplies", "Block 28", "Ground Floor Main Foyer", "08:30 AM - 06:30 PM", "+91 1824 517404"),
            ("Block 36 Central Library Desk & Supplies", "Block 36", "1st Floor Entry Reception", "08:00 AM - 10:00 PM", "+91 1824 517405"),
            ("BH-1 Tuck & General Essentials Shop", "BH-1", "Ground Floor West Lobby", "07:30 AM - 11:30 PM", "+91 1824 517411"),
            ("BH-3 Daily Needs & Hardware Kiosk", "BH-3", "Ground Floor Opposite Mess 1", "07:30 AM - 11:30 PM", "+91 1824 517413"),
            ("BH-5 Student Tuck Shop", "BH-5", "Ground Floor Entrance", "08:00 AM - 11:00 PM", "+91 1824 517415"),
            ("GH-1 Student Essentials & Stationery Kiosk", "GH-1", "Block Main Entrance Foyer", "08:00 AM - 10:30 PM", "+91 1824 517421"),
            ("GH-2 Daily Needs & Tuck Shop", "GH-2", "Ground Floor Corridor", "08:00 AM - 10:30 PM", "+91 1824 517422"),
            ("Uni-Hospital 24x7 Pharmacy", "Uni-Hospital", "Ground Floor Emergency Wing", "24x7 Open", "+91 1824 517100")
        ]
        cursor.executemany('''
            INSERT INTO campus_stores (store_name, building_name, floor_location, timings, contact_no)
            VALUES (?, ?, ?, ?, ?)
        ''', stores_data)

    # Seed Campus Store Items & Building Availability
    cursor.execute("SELECT COUNT(*) FROM campus_store_items")
    if cursor.fetchone()[0] == 0:
        import json
        items_inventory_data = [
            (
                "Engineering Drawing Sheet Tube (Waterproof Telescopic)",
                "Stationery & Academic",
                180.0,
                "Block 34",
                "Block 34 Engineering Stationery & Print Hub",
                "Ground Floor Near Mechanical Labs",
                "In Stock (35+)",
                json.dumps([
                    {"building": "Uni-Mall", "store": "Uni-Mall Central Supermarket & Stationery", "floor": "Basement Shop B-09", "stock": "In Stock (18)"},
                    {"building": "BH-1", "store": "BH-1 Tuck & General Essentials Shop", "floor": "Ground Floor West Lobby", "stock": "Low Stock (2)"},
                    {"building": "Block 36", "store": "Block 36 Central Library Desk", "floor": "1st Floor Entry", "stock": "Out of Stock"}
                ]),
                "Heavy-duty expandable plastic tube with strap. Mandatory for engineering graphics & CAD sheets."
            ),
            (
                "Casio Scientific Calculator FX-991EX Classwiz",
                "Electronics & Tech",
                1450.0,
                "Uni-Mall",
                "Uni-Mall Central Supermarket & Stationery",
                "Ground Floor Tech Section",
                "In Stock (22)",
                json.dumps([
                    {"building": "Block 38", "store": "Block 38 Tech & IT Supplies Store", "floor": "2nd Floor NOC Wing", "stock": "In Stock (8)"},
                    {"building": "Block 34", "store": "Block 34 Engineering Stationery", "floor": "Ground Floor", "stock": "In Stock (5)"},
                    {"building": "BH-3", "store": "BH-3 Daily Needs Kiosk", "floor": "Ground Floor", "stock": "Out of Stock"}
                ]),
                "Genuine 552-function calculator allowed in LPU midterm and endterm examinations."
            ),
            (
                "Lab Coat (White Pure Cotton - Embroidered LPU Crest)",
                "Uniforms & Lab Gear",
                380.0,
                "Block 28",
                "Block 28 Pharmacy & Biotech Lab Supplies",
                "Ground Floor Main Foyer",
                "In Stock (50+)",
                json.dumps([
                    {"building": "Uni-Mall", "store": "Uni-Mall Central Supermarket & Stationery", "floor": "Ground Floor Shop G-14", "stock": "In Stock (30+)"},
                    {"building": "GH-1", "store": "GH-1 Student Essentials Kiosk", "floor": "Block Main Entrance", "stock": "In Stock (15)"},
                    {"building": "BH-1", "store": "BH-1 Tuck & General Essentials", "floor": "Ground Floor", "stock": "In Stock (10)"}
                ]),
                "Full-sleeve high quality cotton protective coat. Required for Chemistry, Biotech & Pharmacy labs."
            ),
            (
                "Heavy Duty 4-Socket Power Extension Board (3M Spike Guard)",
                "Electronics & Tech",
                320.0,
                "BH-3",
                "BH-3 Daily Needs & Hardware Kiosk",
                "Ground Floor Opposite Mess 1",
                "In Stock (25+)",
                json.dumps([
                    {"building": "BH-1", "store": "BH-1 Tuck & General Essentials Shop", "floor": "Ground Floor West Lobby", "stock": "In Stock (14)"},
                    {"building": "Uni-Mall", "store": "Uni-Mall Central Supermarket", "floor": "Ground Floor", "stock": "In Stock (40+)"},
                    {"building": "GH-2", "store": "GH-2 Daily Needs & Tuck Shop", "floor": "Ground Floor Corridor", "stock": "Low Stock (3)"},
                    {"building": "BH-5", "store": "BH-5 Student Tuck Shop", "floor": "Ground Floor", "stock": "In Stock (8)"}
                ]),
                "Fire retardant cord with master switch & surge indicator, safe for laptop, phone & room cooler."
            ),
            (
                "LPU Blue Practical Assignment Ruled Sheets (Pack of 100)",
                "Stationery & Academic",
                95.0,
                "Block 34",
                "Block 34 Engineering Stationery & Print Hub",
                "Ground Floor Near Mechanical Labs",
                "In Stock (120+)",
                json.dumps([
                    {"building": "Uni-Mall", "store": "Uni-Mall Central Supermarket & Stationery", "floor": "Basement Shop B-09", "stock": "In Stock (80+)"},
                    {"building": "Block 36", "store": "Block 36 Central Library Desk", "floor": "1st Floor Entry", "stock": "In Stock (30)"},
                    {"building": "BH-1", "store": "BH-1 Tuck & General Essentials", "floor": "Ground Floor", "stock": "In Stock (45)"},
                    {"building": "GH-1", "store": "GH-1 Student Essentials Kiosk", "floor": "Entrance Foyer", "stock": "In Stock (50+)"}
                ]),
                "Official pre-punched practical continuous writing sheets formatted as per LPU evaluation guidelines."
            ),
            (
                "Room Plastic Bucket & Mug Set (20 Litre Virgin Plastic)",
                "Hostel & Room Essentials",
                240.0,
                "BH-1",
                "BH-1 Tuck & General Essentials Shop",
                "Ground Floor West Lobby",
                "In Stock (18+)",
                json.dumps([
                    {"building": "Uni-Mall", "store": "Uni-Mall Central Supermarket", "floor": "Ground Floor", "stock": "In Stock (60+)"},
                    {"building": "BH-3", "store": "BH-3 Daily Needs & Hardware Kiosk", "floor": "Ground Floor", "stock": "In Stock (12)"},
                    {"building": "GH-1", "store": "GH-1 Student Essentials Kiosk", "floor": "Entrance Foyer", "stock": "In Stock (20+)"},
                    {"building": "BH-5", "store": "BH-5 Student Tuck Shop", "floor": "Ground Floor", "stock": "Low Stock (2)"}
                ]),
                "Durable molded plastic bucket with handle and graduated 1.5L mug for hostel washrooms."
            ),
            (
                "Godrej 6-Lever Brass Room Padlock (with 3 Keys)",
                "Hostel & Room Essentials",
                195.0,
                "BH-3",
                "BH-3 Daily Needs & Hardware Kiosk",
                "Ground Floor Opposite Mess 1",
                "In Stock (30+)",
                json.dumps([
                    {"building": "BH-1", "store": "BH-1 Tuck & General Essentials Shop", "floor": "Ground Floor West Lobby", "stock": "In Stock (15)"},
                    {"building": "Uni-Mall", "store": "Uni-Mall Central Supermarket", "floor": "Ground Floor", "stock": "In Stock (45+)"},
                    {"building": "BH-5", "store": "BH-5 Student Tuck Shop", "floor": "Ground Floor", "stock": "Low Stock (3)"},
                    {"building": "GH-2", "store": "GH-2 Daily Needs & Tuck Shop", "floor": "Ground Floor", "stock": "In Stock (10)"}
                ]),
                "High-security rust-proof lock recommended for hostel room doors and personal lockers."
            ),
            (
                "Dettol Antiseptic Liquid (250ml Disinfectant)",
                "Pharmacy & Personal Care",
                130.0,
                "Uni-Hospital",
                "Uni-Hospital 24x7 Pharmacy",
                "Ground Floor Emergency Wing",
                "In Stock (50+)",
                json.dumps([
                    {"building": "Uni-Mall", "store": "Uni-Mall Central Supermarket & Pharmacy", "floor": "Shop G-04", "stock": "In Stock (35+)"},
                    {"building": "BH-1", "store": "BH-1 Tuck & General Essentials", "floor": "Ground Floor", "stock": "In Stock (12)"},
                    {"building": "BH-3", "store": "BH-3 Daily Needs Kiosk", "floor": "Ground Floor", "stock": "Low Stock (4)"},
                    {"building": "GH-1", "store": "GH-1 Student Essentials Kiosk", "floor": "Entrance Foyer", "stock": "In Stock (15)"}
                ]),
                "Original antibacterial solution for first aid, laundry sanitization and surface hygiene."
            ),
            (
                "Pigeon 1.5L Stainless Steel Electric Kettle",
                "Electronics & Tech",
                699.0,
                "Uni-Mall",
                "Uni-Mall Central Supermarket & Stationery",
                "Ground Floor Home Section",
                "In Stock (16)",
                json.dumps([
                    {"building": "BH-3", "store": "BH-3 Daily Needs & Hardware Kiosk", "floor": "Ground Floor", "stock": "Low Stock (2)"},
                    {"building": "BH-1", "store": "BH-1 Tuck & General Essentials", "floor": "Ground Floor", "stock": "Out of Stock"}
                ]),
                "1500W rapid boiling kettle with 360-degree swivel base and auto power cut-off."
            ),
            (
                "Cat-6 High-Speed Gigabit LAN Cable (5 Meter Molded)",
                "Electronics & Tech",
                150.0,
                "Block 38",
                "Block 38 Tech & IT Supplies Store",
                "2nd Floor NOC Wing",
                "In Stock (40+)",
                json.dumps([
                    {"building": "Uni-Mall", "store": "Uni-Mall Central Supermarket", "floor": "Ground Floor Tech Section", "stock": "In Stock (25)"},
                    {"building": "BH-1", "store": "BH-1 Tuck & General Essentials", "floor": "Ground Floor", "stock": "In Stock (10)"},
                    {"building": "BH-3", "store": "BH-3 Daily Needs Kiosk", "floor": "Ground Floor", "stock": "In Stock (8)"}
                ]),
                "RJ45 gold-plated copper Ethernet patch cable for ultra-fast hostel room Wi-Fi/LAN port."
            ),
            (
                "Reynolds 045 Fine Ball Pens (Box of 20 - Blue)",
                "Stationery & Academic",
                120.0,
                "Block 36",
                "Block 36 Central Library Desk & Supplies",
                "1st Floor Entry Reception",
                "In Stock (70+)",
                json.dumps([
                    {"building": "Block 34", "store": "Block 34 Engineering Stationery", "floor": "Ground Floor", "stock": "In Stock (90+)"},
                    {"building": "Uni-Mall", "store": "Uni-Mall Central Supermarket & Stationery", "floor": "Basement Shop B-09", "stock": "In Stock (150+)"},
                    {"building": "BH-1", "store": "BH-1 Tuck & General Essentials", "floor": "Ground Floor", "stock": "In Stock (50+)"},
                    {"building": "GH-2", "store": "GH-2 Daily Needs & Tuck Shop", "floor": "Ground Floor", "stock": "In Stock (20+)"}
                ]),
                "Smooth writing 0.7mm laser tip blue ball pens ideal for long exam sessions."
            ),
            (
                "Maggi 2-Minute Masala Noodles (Pack of 4)",
                "Snacks & Packaged Food",
                56.0,
                "BH-1",
                "BH-1 Tuck & General Essentials Shop",
                "Ground Floor West Lobby",
                "In Stock (120+)",
                json.dumps([
                    {"building": "BH-3", "store": "BH-3 Daily Needs & Hardware Kiosk", "floor": "Ground Floor", "stock": "In Stock (80+)"},
                    {"building": "BH-5", "store": "BH-5 Student Tuck Shop", "floor": "Ground Floor", "stock": "In Stock (60+)"},
                    {"building": "GH-1", "store": "GH-1 Student Essentials Kiosk", "floor": "Block Entrance", "stock": "In Stock (90+)"},
                    {"building": "GH-2", "store": "GH-2 Daily Needs & Tuck Shop", "floor": "Ground Floor", "stock": "In Stock (75+)"},
                    {"building": "Uni-Mall", "store": "Uni-Mall Central Supermarket", "floor": "Ground Floor", "stock": "In Stock (250+)"}
                ]),
                "Hostel late-night favorite classic Maggi masala noodles."
            )
        ]
        cursor.executemany('''
            INSERT INTO campus_store_items (item_name, category, price, primary_building, primary_store, floor_location, stock_status, other_buildings_json, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', items_inventory_data)

    # Seed Salon Branches
    cursor.execute("SELECT COUNT(*) FROM salon_branches")
    if cursor.fetchone()[0] == 0:
        branches = [
            ("Uni-Mall Looks & Style Unisex Salon", "Uni-Mall 1st Floor Shop 104", "Unisex", "09:00 AM - 09:30 PM", "+91 1824 517451"),
            ("BH-1 Boys Grooming & Hair Studio", "BH-1 Ground Floor East Corridor", "Men Only", "08:30 AM - 10:00 PM", "+91 1824 517452"),
            ("BH-3 Campus Men's Salon & Spa", "BH-3 Ground Floor Near Recreation Hall", "Men Only", "08:30 AM - 10:00 PM", "+91 1824 517453"),
            ("GH-1 Glamour Girls Beauty Parlour", "GH-1 Ground Floor Central Wing", "Women Only", "09:00 AM - 09:30 PM", "+91 1824 517454"),
            ("GH-2 Blossom Skin & Hair Lounge", "GH-2 Ground Floor Lobby", "Women Only", "09:00 AM - 09:30 PM", "+91 1824 517455")
        ]
        cursor.executemany('''
            INSERT INTO salon_branches (name, building_location, gender_type, timings, phone)
            VALUES (?, ?, ?, ?, ?)
        ''', branches)

    # Seed Salon Services
    cursor.execute("SELECT COUNT(*) FROM salon_services")
    if cursor.fetchone()[0] == 0:
        services = [
            ("Classic Haircut & Blowdry Styling", "Haircuts & Styling", 120.0, 25, "Unisex", "Precision cut tailored to student choice with neck shave and dry styling."),
            ("Beard Trim & Razor Sharp Line-up", "Beard & Shaving", 70.0, 20, "Men Only", "Beard shaping, oil massage, hot towel treatment and sharp perimeter line-up."),
            ("Executive Haircut + Beard Combo", "Combos & Packages", 170.0, 40, "Men Only", "Full haircut, beard trim & shaping, aftershave lotion and splash."),
            ("L'Oreal Deep Conditioning Hair Spa", "Hair Treatments & Spa", 450.0, 45, "Unisex", "Intense scalp massage, steaming, deep conditioning hair mask for dry damaged hair."),
            ("Cooling Mint & Almond Head Massage", "Massage & Relaxation", 150.0, 20, "Unisex", "Stress relieving 20-minute acupressure head massage with herbal navratna / almond oil."),
            ("O3+ D-Tan Clean-Up & Anti-Tan Pack", "Skin Care & Facials", 350.0, 35, "Unisex", "Instant glow removal of sun tan, scrubbing, steam, blackhead removal and cooling clay mask."),
            ("Gold Glow Radiance Facial", "Skin Care & Facials", 650.0, 50, "Unisex", "Deep skin detox, 5-step herbal massage, skin firming pack for festive occasions & farewells."),
            ("Eyebrow Threading + Forehead", "Beauty & Grooming", 50.0, 15, "Women Only", "Precise thread shaping with soothing aloe vera gel application."),
            ("Full Arms & Legs Honey Waxing", "Beauty & Grooming", 380.0, 40, "Women Only", "Painless warm honey wax hair removal followed by moisturizing lotion."),
            ("Streax Hair Coloring / Root Touch-up", "Hair Color & Highlights", 399.0, 45, "Unisex", "Ammonia-free vibrant hair color application with wash and conditioning.")
        ]
        cursor.executemany('''
            INSERT INTO salon_services (service_name, category, price, duration_mins, gender_type, description)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', services)

    # Seed Sample Salon Bookings (Today's queue)
    cursor.execute("SELECT COUNT(*) FROM salon_bookings")
    if cursor.fetchone()[0] == 0:
        bookings = [
            ("SALON-LPU-1021", "Tanmay Bhatia", "12207712", "9876501234", "BH-3", "204", "BH-3 Campus Men's Salon & Spa", "Executive Haircut + Beard Combo", "2026-09-12", "02:00 PM - 02:40 PM", "Senior Stylist Vikram", "In Queue"),
            ("SALON-LPU-1022", "Kavya Soni", "12209934", "9876505678", "GH-1", "312", "GH-1 Glamour Girls Beauty Parlour", "O3+ D-Tan Clean-Up & Anti-Tan Pack", "2026-09-12", "03:00 PM - 03:35 PM", "Any Available Stylist", "Confirmed"),
            ("SALON-LPU-1023", "Arun Nair", "12214455", "9876509012", "BH-1", "108", "Uni-Mall Looks & Style Unisex Salon", "L'Oreal Deep Conditioning Hair Spa", "2026-09-12", "04:30 PM - 05:15 PM", "Any Available Stylist", "Confirmed")
        ]
        cursor.executemany('''
            INSERT INTO salon_bookings (token_code, student_name, reg_no, phone, hostel_block, room_no, salon_branch, service_name, booking_date, time_slot, stylist_preference, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', bookings)

    # Seed Sample Student To-Dos
    cursor.execute("SELECT COUNT(*) FROM student_todos")
    if cursor.fetchone()[0] == 0:
        todos = [
            ("Submit DSA Lab Evaluation Record (Block 34, Lab 202)", "Assignments & CA", "High", "2026-09-14", "11:59 PM", 0),
            ("Pay Room 412 Electricity Bill (Dues ₹862.50)", "Bills & Dues", "High", "2026-09-20", "05:00 PM", 0),
            ("Return Operating System Concepts Book to Central Library Block 36", "Library & Academics", "Medium", "2026-09-15", "04:00 PM", 0),
            ("Hostel Linen Drop-off at BH Basement Laundromat", "Hostel & Chores", "Low", "2026-09-13", "10:00 AM", 1),
            ("Attend 09:00 AM Compiler Design Lecture (Maintain 75% Attendance)", "Attendance & Classes", "High", "2026-09-14", "09:00 AM", 0),
            ("Haircut & Beard Shaping Slot at BH-3 Campus Salon", "Appointments", "Medium", "2026-09-12", "05:00 PM", 1),
            ("Refill Water in Symphony Personal Room Cooler", "Hostel & Chores", "Low", "2026-09-12", "08:00 PM", 0)
        ]
        cursor.executemany('''
            INSERT INTO student_todos (title, category, priority, due_date, due_time, is_completed)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', todos)

    # Seed Default Student Users (Demo Login Credentials)
    cursor.execute("SELECT COUNT(*) FROM student_users")
    if cursor.fetchone()[0] == 0:
        students = [
            ("12204561", "lpu@1234", "Sarthak Mishra", "BH-3", "412", "B.Tech Computer Science & Engg", "9876543210", "sarthak.12204561@lpu.in", "SM")
        ]
        cursor.executemany('''
            INSERT INTO student_users (reg_no, password, student_name, hostel_block, room_no, department, phone, email, avatar_initials)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', students)

    # Seed Sample Feedback
    cursor.execute("SELECT COUNT(*) FROM hostel_feedback")
    if cursor.fetchone()[0] == 0:
        feedbacks = [
            ("12204561", "Sarthak Mishra", "BH-3", "412", "Room Cleaning, Mess Food, Electricity Meter", 5, "Mess Food & Cleanliness", "Housekeeping was prompt and mess dinner has improved noticeably this week. Really appreciate the online meter reading with photo verification!", 1, "Reviewed & Noted by Warden")
        ]
        cursor.executemany('''
            INSERT INTO hostel_feedback (reg_no, student_name, hostel_block, room_no, services_reviewed, overall_rating, feedback_category, feedback_text, would_recommend, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', feedbacks)

    
    # Seed Uni-Hospital Doctors
    cursor.execute("SELECT COUNT(*) FROM unihospital_doctors")
    if cursor.fetchone()[0] == 0:
        doctors_data = [
            ("Dr. Rajesh Sharma", "MBBS, MD (General Medicine)", "Chief Medical Officer - Viral Fevers, General Ailments & Critical Care", "General Medicine", "09:00 AM - 02:00 PM", "OPD Room 101", "18+ Years Exp", "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80"),
            ("Dr. Ananya Sen", "MBBS, MS (Orthopedics)", "Senior Orthopedic Surgeon - Joint Pain, Sports Injury & Fracture Rehab", "Orthopedics & Sports Medicine", "10:00 AM - 01:00 PM", "OPD Room 104", "12+ Years Exp", "https://images.unsplash.com/photo-1594824813579-0524458f796d?w=400&auto=format&fit=crop&q=80"),
            ("Dr. Vikramjeet Singh", "MBBS, MS (ENT)", "ENT Specialist - Ear Infections, Sinusitis, Throat & Hearing", "ENT Department", "02:00 PM - 05:00 PM", "OPD Room 108", "14+ Years Exp", "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80"),
            ("Dr. Neha Kapoor", "MBBS, MD (Dermatology)", "Consultant Dermatologist - Acne, Skin Allergies, Hair & Scalp Health", "Dermatology", "11:00 AM - 03:00 PM", "OPD Room 112", "9+ Years Exp", "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80"),
            ("Dr. Amanpreet Kaur", "BDS, MDS (Oral & Maxillofacial)", "Dental Surgeon - Scaling, Cavity Filling, Toothache & Root Canal", "Dental Sciences", "09:30 AM - 01:30 PM", "OPD Room 115", "10+ Years Exp", "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80"),
            ("Dr. Shalini Mukherjee", "M.Sc, Ph.D. (Clinical Psychology)", "Senior Student Counselor - Mental Wellness, Exam Anxiety & Stress", "Mental Health & Counseling", "10:00 AM - 04:00 PM", "OPD Room 202", "11+ Years Exp", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80")
        ]
        cursor.executemany('''
            INSERT INTO unihospital_doctors (doctor_name, qualification, specialty, department, timings, room_no, experience, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', doctors_data)

    # Seed Sample Uni-Hospital Appointment
    cursor.execute("SELECT COUNT(*) FROM unihospital_appointments")
    if cursor.fetchone()[0] == 0:
        cursor.execute('''
            INSERT INTO unihospital_appointments (token_code, student_name, reg_no, phone, hostel_block, room_no, doctor_name, department, appointment_date, time_slot, symptoms, status)
            VALUES ('UNI-OPD-1042', 'Sarthak Mishra', '12204561', '9876543210', 'BH-3', '412', 'Dr. Rajesh Sharma', 'General Medicine', 'Today', '10:30 AM - 11:00 AM', 'Seasonal viral fever & mild throat congestion', 'Confirmed')
        ''')

    conn.commit()

if __name__ == "__main__":
    init_db()
    print("LPU Database initialized successfully!")
