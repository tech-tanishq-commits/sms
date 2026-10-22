import os
import json
import random
import string
from datetime import datetime
from flask import Flask, render_template, request, jsonify, send_from_directory
from database import get_db_connection, init_db

app = Flask(__name__)
app.config['SECRET_KEY'] = 'lpu-sms-secret-key-2026'

# Ensure database is initialized
init_db()

def generate_code(prefix="LPU"):
    rand_chars = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"{prefix}-{rand_chars}"

@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return ('', 204)

@app.route('/store.html')
def departmental_store_page():
    return send_from_directory(os.path.dirname(os.path.abspath(__file__)), 'store.html')

@app.route('/marketplace.html')
def campus_olx_page():
    return send_from_directory(os.path.dirname(os.path.abspath(__file__)), 'marketplace.html')

@app.route('/cafes.html')
def cafes_and_more_page():
    return send_from_directory(os.path.dirname(os.path.abspath(__file__)), 'cafes.html')

@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'css'), filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'js'), filename)

# ==================== 0. STUDENT AUTHENTICATION & PRIVATE DOMAIN ====================

@app.route('/api/auth/login', methods=['POST'])
def student_login():
    data = request.get_json() or {}
    reg_no = data.get('reg_no', '').strip()
    password = data.get('password', '').strip()

    if not reg_no or not password:
        return jsonify({'error': 'Please enter your Registration ID and Password.'}), 400

    conn = get_db_connection()
    user = conn.execute(
        'SELECT * FROM student_users WHERE reg_no = ? AND password = ?',
        (reg_no, password)
    ).fetchone()
    conn.close()

    if user:
        user_dict = dict(user)
        user_dict.pop('password', None)
        return jsonify({
            'success': True,
            'message': f'Welcome back, {user_dict["student_name"]}!',
            'user': user_dict
        })
    else:
        return jsonify({'error': 'Invalid Registration ID or Password. (Demo: 12204561 / lpu@1234)'}), 401

@app.route('/api/auth/profile/<reg_no>', methods=['GET'])
def get_student_profile(reg_no):
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM student_users WHERE reg_no = ?', (reg_no,)).fetchone()
    conn.close()
    if user:
        user_dict = dict(user)
        user_dict.pop('password', None)
        return jsonify(user_dict)
    return jsonify({'error': 'Student domain not found'}), 404

# ==================== FEEDBACK & COMPLAINTS ====================

@app.route('/api/feedback', methods=['GET'])
def get_feedbacks():
    reg_no = request.args.get('reg_no')
    conn = get_db_connection()
    if reg_no:
        rows = conn.execute(
            'SELECT * FROM hostel_feedback WHERE reg_no = ? ORDER BY created_at DESC', (reg_no,)
        ).fetchall()
    else:
        rows = conn.execute('SELECT * FROM hostel_feedback ORDER BY created_at DESC LIMIT 20').fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json() or {}
    reg_no = data.get('reg_no', '').strip()
    student_name = data.get('student_name', '').strip()
    hostel_block = data.get('hostel_block', '').strip()
    room_no = data.get('room_no', '').strip()
    services_reviewed = data.get('services_reviewed', '')
    overall_rating = int(data.get('overall_rating', 5))
    feedback_category = data.get('feedback_category', 'General Hostel Facilities')
    feedback_text = data.get('feedback_text', '').strip()
    would_recommend = 1 if data.get('would_recommend', True) else 0

    if not all([reg_no, student_name, feedback_text]):
        return jsonify({'error': 'Please provide student details and feedback description.'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO hostel_feedback (reg_no, student_name, hostel_block, room_no, services_reviewed, overall_rating, feedback_category, feedback_text, would_recommend, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Submitted to Hostel Warden')
    ''', (reg_no, student_name, hostel_block, room_no, services_reviewed, overall_rating, feedback_category, feedback_text, would_recommend))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return jsonify({
        'success': True,
        'id': new_id,
        'message': 'Thank you! Your feedback and ratings have been submitted to the Chief Warden desk.'
    })

@app.route('/api/cleaning', methods=['GET'])
def get_cleaning_requests():
    block = request.args.get('block')
    conn = get_db_connection()
    if block and block != 'ALL':
        requests = conn.execute(
            'SELECT * FROM cleaning_requests WHERE hostel_block = ? ORDER BY created_at DESC', (block,)
        ).fetchall()
    else:
        requests = conn.execute(
            'SELECT * FROM cleaning_requests ORDER BY created_at DESC LIMIT 30'
        ).fetchall()
    conn.close()
    return jsonify([dict(r) for r in requests])

@app.route('/api/cleaning', methods=['POST'])
def schedule_cleaning():
    data = request.get_json() or {}
    student_name = data.get('student_name', '').strip()
    reg_no = data.get('reg_no', '').strip()
    hostel_block = data.get('hostel_block', '').strip()
    room_no = data.get('room_no', '').strip()
    service_type = data.get('service_type', 'Room Deep Cleaning & Mopping')
    preferred_slot = data.get('preferred_slot', '10:00 AM - 12:00 PM')
    instructions = data.get('instructions', '')

    if not all([student_name, reg_no, hostel_block, room_no]):
        return jsonify({'error': 'Please fill all required fields.'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO cleaning_requests (student_name, reg_no, hostel_block, room_no, service_type, preferred_slot, instructions, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')
    ''', (student_name, reg_no, hostel_block, room_no, service_type, preferred_slot, instructions))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return jsonify({'success': True, 'id': new_id, 'message': 'Cleaning service scheduled successfully!'})

@app.route('/api/cleaning/<int:req_id>/status', methods=['POST'])
def update_cleaning_status(req_id):
    data = request.get_json() or {}
    new_status = data.get('status', 'Completed')
    conn = get_db_connection()
    conn.execute('UPDATE cleaning_requests SET status = ? WHERE id = ?', (new_status, req_id))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': f'Request status marked as {new_status}'})

# ==================== 2. MESS MENU ====================

@app.route('/api/mess-menu', methods=['GET'])
def get_mess_menu():
    day = request.args.get('day')
    conn = get_db_connection()
    if day:
        items = conn.execute(
            'SELECT * FROM mess_menu WHERE LOWER(day_of_week) = LOWER(?) ORDER BY id ASC', (day,)
        ).fetchall()
    else:
        items = conn.execute('SELECT * FROM mess_menu ORDER BY id ASC').fetchall()
    conn.close()
    return jsonify([dict(item) for item in items])

# ==================== 3. ELECTRICITY BILLS & METER ====================

def generate_supply_breakdown(units, amount, block, room):
    # Variables: ac, lights and fans, power socket, normal socket
    ac_units = round(units * 0.45, 2)
    ac_amount = round(amount * 0.45, 2)
    lt_units = round(units * 0.24, 2)
    lt_amount = round(amount * 0.24, 2)
    pwr_units = round(units * 0.21, 2)
    pwr_amount = round(amount * 0.21, 2)
    norm_units = round(units - (ac_units + lt_units + pwr_units), 2)
    norm_amount = round(amount - (ac_amount + lt_amount + pwr_amount), 2)

    return {
        'ac': {
            'label': 'Air Conditioner (AC)',
            'icon': '❄️',
            'units': ac_units,
            'percentage': 45.0,
            'amount': ac_amount,
            'specs': '1.5 Ton Dual Inverter 5-Star (Thermostat 24°C)',
            'sub_meter_id': f'{block}-AC-{room}',
            'status': 'Active (Running Eco Mode)',
            'avg_daily_hrs': '5.5 hrs/night',
            'draw_watts': '1450 Watts'
        },
        'lights_and_fans': {
            'label': 'Lights & Fans',
            'icon': '💡',
            'units': lt_units,
            'percentage': 24.0,
            'amount': lt_amount,
            'specs': '2x 28W BLDC Ceiling Fans + 2x 20W LED Batten Fixtures',
            'sub_meter_id': f'{block}-LT-{room}',
            'status': 'Optimal (Power-saving BLDC active)',
            'avg_daily_hrs': '14.0 hrs/day',
            'draw_watts': '96 Watts'
        },
        'power_socket': {
            'label': 'Power Socket (16A Heavy)',
            'icon': '🔌',
            'units': pwr_units,
            'percentage': 21.0,
            'amount': pwr_amount,
            'specs': 'Dedicated 16A Circuit (Room Cooler, Electric Kettle, Iron)',
            'sub_meter_id': f'{block}-PWR-{room}',
            'status': 'Normal Load (Surge Protected)',
            'avg_daily_hrs': '3.2 hrs intermittent',
            'draw_watts': '1200 - 1800 Watts'
        },
        'normal_socket': {
            'label': 'Normal Socket (6A Light)',
            'icon': '📱',
            'units': norm_units,
            'percentage': 10.0,
            'amount': norm_amount,
            'specs': 'Standard 6A Sockets (Laptops, Mobile Fast Chargers, Desk Lamp)',
            'sub_meter_id': f'{block}-SOC-{room}',
            'status': 'Standby & Charging',
            'avg_daily_hrs': 'Continuous draw',
            'draw_watts': '120 - 180 Watts'
        }
    }

@app.route('/api/electricity/my-meter', methods=['GET'])
def get_student_private_meter():
    reg_no = request.args.get('reg_no', '12204561').strip()
    conn = get_db_connection()
    student = conn.execute('SELECT * FROM student_users WHERE reg_no = ?', (reg_no,)).fetchone()
    if not student:
        conn.close()
        return jsonify({'error': 'Unauthorized: Only logged-in student can access their room meter.'}), 403

    block = student['hostel_block']
    room = student['room_no']
    row = conn.execute(
        'SELECT * FROM electricity_bills WHERE hostel_block = ? AND room_no = ? ORDER BY id DESC LIMIT 1',
        (block, room)
    ).fetchone()
    conn.close()

    if row:
        bill = dict(row)
    else:
        bill = {
            'id': 1,
            'hostel_block': block,
            'room_no': room,
            'previous_reading': 980.0,
            'current_reading': 1095.0,
            'rate_per_unit': 7.50,
            'due_date': '2026-09-25',
            'status': 'Unpaid',
            'last_payment_date': None
        }

    units = round(bill['current_reading'] - bill['previous_reading'], 2)
    amount = round(units * bill['rate_per_unit'], 2)
    bill['units_consumed'] = units
    bill['calculated_amount'] = amount
    bill['student_name'] = student['student_name']
    bill['reg_no'] = student['reg_no']
    bill['photo_proof_url'] = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80'
    bill['supply_breakdown'] = generate_supply_breakdown(units, amount, block, room)

    return jsonify(bill)

@app.route('/api/electricity/search', methods=['GET'])
def search_electricity():
    reg_no = request.args.get('reg_no', '12204561').strip()
    block = request.args.get('block', '').strip()
    room = request.args.get('room', '').strip()

    conn = get_db_connection()
    # Check if student is logged in
    student = conn.execute('SELECT * FROM student_users WHERE reg_no = ?', (reg_no,)).fetchone()
    if not student:
        conn.close()
        return jsonify({'error': 'Private Domain: Please log in with your Registration ID and Password.'}), 401

    # Privacy constraint: Student can only access their own room
    auth_block = student['hostel_block']
    auth_room = student['room_no']

    row = conn.execute(
        'SELECT * FROM electricity_bills WHERE hostel_block = ? AND room_no = ? ORDER BY id DESC LIMIT 1',
        (auth_block, auth_room)
    ).fetchone()
    conn.close()

    if row:
        bill = dict(row)
    else:
        bill = {
            'id': 1,
            'hostel_block': auth_block,
            'room_no': auth_room,
            'previous_reading': 980.0,
            'current_reading': 1095.0,
            'rate_per_unit': 7.50,
            'due_date': '2026-09-25',
            'status': 'Unpaid',
            'last_payment_date': None
        }

    units = round(bill['current_reading'] - bill['previous_reading'], 2)
    amount = round(units * bill['rate_per_unit'], 2)
    bill['units_consumed'] = units
    bill['calculated_amount'] = amount
    bill['student_name'] = student['student_name']
    bill['reg_no'] = student['reg_no']
    bill['photo_proof_url'] = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80'
    bill['supply_breakdown'] = generate_supply_breakdown(units, amount, auth_block, auth_room)

    return jsonify(bill)

@app.route('/api/electricity/pay', methods=['POST'])
def pay_electricity():
    data = request.get_json() or {}
    block = data.get('hostel_block')
    room = data.get('room_no')
    transaction_id = "LPU-TXN-" + ''.join(random.choices(string.digits, k=8))
    payment_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    conn = get_db_connection()
    conn.execute('''
        UPDATE electricity_bills
        SET status = 'Paid', last_payment_date = ?
        WHERE hostel_block = ? AND room_no = ?
    ''', (payment_time, block, room))
    conn.commit()
    conn.close()

    return jsonify({
        'success': True,
        'transaction_id': transaction_id,
        'paid_at': payment_time,
        'message': f'Electricity payment of room {block}-{room} successful!'
    })

# ==================== 4. LE BROCS FOOD DELIVERY ====================

@app.route('/api/lebrocs/menu', methods=['GET'])
def get_lebrocs_menu():
    category = request.args.get('category')
    conn = get_db_connection()
    if category and category != 'ALL':
        items = conn.execute('SELECT * FROM lebrocs_items WHERE category = ?', (category,)).fetchall()
    else:
        items = conn.execute('SELECT * FROM lebrocs_items').fetchall()
    conn.close()
    return jsonify([dict(i) for i in items])

@app.route('/api/lebrocs/order', methods=['POST'])
def place_lebrocs_order():
    data = request.get_json() or {}
    student_name = data.get('student_name', '').strip()
    phone = data.get('phone', '').strip()
    hostel_block = data.get('hostel_block', '').strip()
    room_no = data.get('room_no', '').strip()
    items_summary = data.get('items_summary', '')
    total_amount = float(data.get('total_amount', 0.0))
    payment_method = data.get('payment_method', 'Cash on Delivery')

    if not all([student_name, phone, hostel_block, room_no, items_summary]):
        return jsonify({'error': 'Please fill all checkout fields and ensure cart is not empty.'}), 400

    order_code = generate_code("BROCS-LPU")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO lebrocs_orders (order_code, student_name, phone, hostel_block, room_no, items_summary, total_amount, payment_method, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Preparing')
    ''', (order_code, student_name, phone, hostel_block, room_no, items_summary, total_amount, payment_method))
    conn.commit()
    conn.close()

    return jsonify({
        'success': True,
        'order_code': order_code,
        'estimated_delivery': '25-35 minutes',
        'message': f'Order placed successfully! Delivery to {hostel_block}, Room {room_no}.'
    })

@app.route('/api/lebrocs/orders', methods=['GET'])
def get_recent_lebrocs_orders():
    conn = get_db_connection()
    orders = conn.execute('SELECT * FROM lebrocs_orders ORDER BY created_at DESC LIMIT 15').fetchall()
    conn.close()
    return jsonify([dict(o) for o in orders])

# ==================== 5. SENIOR MARKETPLACE ====================

@app.route('/api/marketplace', methods=['GET'])
def get_marketplace_items():
    query = request.args.get('query', '').strip().lower()
    category = request.args.get('category', '').strip()

    conn = get_db_connection()
    sql = 'SELECT * FROM marketplace_items WHERE status = "Available"'
    params = []

    if category and category != 'ALL':
        sql += ' AND category = ?'
        params.append(category)

    if query:
        sql += ' AND (LOWER(title) LIKE ? OR LOWER(description) LIKE ?)'
        params.extend([f'%{query}%', f'%{query}%'])

    sql += ' ORDER BY created_at DESC'
    items = conn.execute(sql, params).fetchall()
    conn.close()
    return jsonify([dict(i) for i in items])

@app.route('/api/marketplace', methods=['POST'])
def post_marketplace_item():
    data = request.get_json() or {}
    title = data.get('title', '').strip()
    category = data.get('category', '').strip()
    price = float(data.get('price', 0))
    original_price = float(data.get('original_price', 0)) if data.get('original_price') else None
    condition = data.get('condition', 'Good Condition')
    description = data.get('description', '')
    seller_name = data.get('seller_name', '').strip()
    hostel_block = data.get('hostel_block', '').strip()
    room_no = data.get('room_no', '').strip()
    phone = data.get('phone', '').strip()
    whatsapp = data.get('whatsapp', '').strip() or phone

    if not all([title, category, price, seller_name, hostel_block, phone]):
        return jsonify({'error': 'Please fill all required marketplace fields.'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO marketplace_items (title, category, price, original_price, condition, description, seller_name, hostel_block, room_no, phone, whatsapp, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Available')
    ''', (title, category, price, original_price, condition, description, seller_name, hostel_block, room_no, phone, whatsapp))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return jsonify({'success': True, 'id': new_id, 'message': 'Item listed in Senior Marketplace successfully!'})

@app.route('/api/marketplace/<int:item_id>/sold', methods=['POST'])
def mark_marketplace_sold(item_id):
    conn = get_db_connection()
    conn.execute('UPDATE marketplace_items SET status = "Sold" WHERE id = ?', (item_id,))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Item marked as sold!'})

# ==================== 6. CENTRAL LIBRARY LOCATOR ====================

@app.route('/api/library', methods=['GET'])
def get_library_books():
    search = request.args.get('search', '').strip().lower()
    dept = request.args.get('dept', '').strip()

    conn = get_db_connection()
    sql = 'SELECT * FROM library_books WHERE 1=1'
    params = []

    if dept and dept != 'ALL':
        sql += ' AND department = ?'
        params.append(dept)

    if search:
        sql += ' AND (LOWER(title) LIKE ? OR LOWER(author) LIKE ? OR LOWER(isbn) LIKE ?)'
        params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])

    sql += ' ORDER BY title ASC'
    books = conn.execute(sql, params).fetchall()
    conn.close()
    return jsonify([dict(b) for b in books])

@app.route('/api/library/reserve', methods=['POST'])
def reserve_book():
    data = request.get_json() or {}
    book_id = data.get('book_id')
    student_name = data.get('student_name', '').strip()
    reg_no = data.get('reg_no', '').strip()
    hostel_block = data.get('hostel_block', '').strip()
    room_no = data.get('room_no', '').strip()

    if not all([book_id, student_name, reg_no, hostel_block, room_no]):
        return jsonify({'error': 'Please fill all student details to reserve.'}), 400

    conn = get_db_connection()
    book = conn.execute('SELECT * FROM library_books WHERE id = ?', (book_id,)).fetchone()
    if not book:
        conn.close()
        return jsonify({'error': 'Book not found'}), 404

    if book['available_copies'] <= 0:
        conn.close()
        return jsonify({'error': 'No available physical copies left for this book at Central Library.'}), 400

    reservation_code = generate_code("LPU-LIB")
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO book_reservations (reservation_code, book_id, student_name, reg_no, hostel_block, room_no)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (reservation_code, book_id, student_name, reg_no, hostel_block, room_no))

    cursor.execute('''
        UPDATE library_books
        SET available_copies = available_copies - 1
        WHERE id = ?
    ''', (book_id,))

    conn.commit()
    conn.close()

    return jsonify({
        'success': True,
        'reservation_code': reservation_code,
        'book_title': book['title'],
        'floor': book['floor'],
        'rack_shelf': book['rack_shelf'],
        'pickup_window': '48 Hours from Central Library Helpdesk (Block 36)'
    })

# ==================== 7. CONTACTS DIRECTORY ====================

@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    category = request.args.get('category')
    conn = get_db_connection()
    if category and category != 'ALL':
        contacts = conn.execute('SELECT * FROM emergency_contacts WHERE category = ?', (category,)).fetchall()
    else:
        contacts = conn.execute('SELECT * FROM emergency_contacts').fetchall()
    conn.close()
    return jsonify([dict(c) for c in contacts])

# ==================== 8. CAMPUS STORE & BUILDING INVENTORY ====================

@app.route('/api/store/items', methods=['GET'])
def get_store_items():
    query = request.args.get('query', '').strip().lower()
    category = request.args.get('category', '').strip()
    building = request.args.get('building', '').strip()

    conn = get_db_connection()
    items = conn.execute('SELECT * FROM campus_store_items').fetchall()
    conn.close()

    result = []
    for item in items:
        item_dict = dict(item)
        try:
            item_dict['other_buildings'] = json.loads(item_dict['other_buildings_json'])
        except Exception:
            item_dict['other_buildings'] = []

        # Filter by category
        if category and category != 'ALL' and item_dict['category'] != category:
            continue

        # Filter by query
        if query:
            match_name = query in item_dict['item_name'].lower()
            match_desc = query in (item_dict['description'] or '').lower()
            match_store = query in item_dict['primary_store'].lower()
            match_bldg = query in item_dict['primary_building'].lower()
            match_other = any(query in b.get('building', '').lower() or query in b.get('store', '').lower() for b in item_dict['other_buildings'])
            if not (match_name or match_desc or match_store or match_bldg or match_other):
                continue

        # Filter by building (matches primary building OR any other building where it is stocked)
        if building and building != 'ALL':
            primary_match = item_dict['primary_building'].lower() == building.lower()
            other_match = any(b.get('building', '').lower() == building.lower() and b.get('stock') != 'Out of Stock' for b in item_dict['other_buildings'])
            if not (primary_match or other_match):
                continue

        result.append(item_dict)

    return jsonify(result)

@app.route('/api/store/buildings', methods=['GET'])
def get_campus_stores():
    conn = get_db_connection()
    stores = conn.execute('SELECT * FROM campus_stores ORDER BY building_name ASC').fetchall()
    conn.close()
    return jsonify([dict(s) for s in stores])

# ==================== 9. GLOBAL SEARCH API ====================

@app.route('/api/global-search', methods=['GET'])
def global_search():
    q = request.args.get('q', '').strip().lower()
    if not q:
        return jsonify({'query': '', 'total': 0, 'results': []})

    conn = get_db_connection()
    results = []

    # 1. Store items & Building Inventory
    store_items = conn.execute(
        'SELECT id, item_name, category, price, primary_building, stock_status FROM campus_store_items WHERE LOWER(item_name) LIKE ? OR LOWER(category) LIKE ? OR LOWER(description) LIKE ?',
        (f'%{q}%', f'%{q}%', f'%{q}%')
    ).fetchall()
    for s in store_items:
        results.append({
            'module': 'store',
            'icon': '🏬',
            'title': s['item_name'],
            'subtitle': f"Store: {s['primary_building']} • ₹{s['price']} • {s['stock_status']}",
            'tab': 'store'
        })

    # 2. Mess Menu
    mess_items = conn.execute(
        'SELECT day_of_week, meal_type, items, special_dish, timings FROM mess_menu WHERE LOWER(items) LIKE ? OR LOWER(special_dish) LIKE ? OR LOWER(day_of_week) LIKE ?',
        (f'%{q}%', f'%{q}%', f'%{q}%')
    ).fetchall()
    for m in mess_items:
        results.append({
            'module': 'mess',
            'icon': '🍲',
            'title': f"{m['day_of_week']} {m['meal_type']}: {m['special_dish'] or 'Regular Mess'}",
            'subtitle': f"Timings: {m['timings']} • {m['items'][:60]}...",
            'tab': 'mess'
        })

    # 3. Le Brocs Food
    brocs_items = conn.execute(
        'SELECT id, name, category, price, is_veg FROM lebrocs_items WHERE LOWER(name) LIKE ? OR LOWER(category) LIKE ? OR LOWER(description) LIKE ?',
        (f'%{q}%', f'%{q}%', f'%{q}%')
    ).fetchall()
    for b in brocs_items:
        results.append({
            'module': 'lebrocs',
            'icon': '🍔',
            'title': b['name'],
            'subtitle': f"Le Brocs ({b['category']}) • ₹{b['price']} • {'Veg' if b['is_veg'] else 'Non-Veg'}",
            'tab': 'lebrocs'
        })

    # 4. Library Books
    lib_books = conn.execute(
        'SELECT id, title, author, floor, rack_shelf, available_copies FROM library_books WHERE LOWER(title) LIKE ? OR LOWER(author) LIKE ?',
        (f'%{q}%', f'%{q}%')
    ).fetchall()
    for lib in lib_books:
        results.append({
            'module': 'library',
            'icon': '📚',
            'title': lib['title'],
            'subtitle': f"By {lib['author']} • {lib['floor']} ({lib['available_copies']} copies)",
            'tab': 'library'
        })

    # 5. Marketplace
    market = conn.execute(
        'SELECT id, title, price, condition, hostel_block FROM marketplace_items WHERE status = "Available" AND (LOWER(title) LIKE ? OR LOWER(description) LIKE ?)',
        (f'%{q}%', f'%{q}%')
    ).fetchall()
    for mk in market:
        results.append({
            'module': 'marketplace',
            'icon': '🔄',
            'title': mk['title'],
            'subtitle': f"Senior Market • ₹{mk['price']} • {mk['condition']} ({mk['hostel_block']})",
            'tab': 'marketplace'
        })

    # 6. Wardens & Emergency
    contacts = conn.execute(
        'SELECT title, name, contact_number, location_or_block FROM emergency_contacts WHERE LOWER(title) LIKE ? OR LOWER(name) LIKE ? OR LOWER(location_or_block) LIKE ?',
        (f'%{q}%', f'%{q}%', f'%{q}%')
    ).fetchall()
    for c in contacts:
        results.append({
            'module': 'contacts',
            'icon': '📞',
            'title': c['title'],
            'subtitle': f"{c['name']} • {c['location_or_block']} • Call: {c['contact_number']}",
            'tab': 'contacts'
        })

    # 7. Salon & Grooming Services
    salon_items = conn.execute(
        'SELECT service_name, category, price, duration_mins, gender_type FROM salon_services WHERE LOWER(service_name) LIKE ? OR LOWER(category) LIKE ? OR LOWER(description) LIKE ?',
        (f'%{q}%', f'%{q}%', f'%{q}%')
    ).fetchall()
    for sl in salon_items:
        results.append({
            'module': 'salon',
            'icon': '💇',
            'title': sl['service_name'],
            'subtitle': f"Campus Salon ({sl['category']}) • ₹{sl['price']} • {sl['duration_mins']} mins • {sl['gender_type']}",
            'tab': 'salon'
        })

    # 8. Student To-Do Tasks
    todo_items = conn.execute(
        'SELECT id, title, category, priority, due_date, is_completed FROM student_todos WHERE LOWER(title) LIKE ? OR LOWER(category) LIKE ?',
        (f'%{q}%', f'%{q}%')
    ).fetchall()
    for td in todo_items:
        results.append({
            'module': 'todos',
            'icon': '✅',
            'title': td['title'],
            'subtitle': f"To-Do ({td['category']}) • Priority: {td['priority']} • Due: {td['due_date']} • {'Done' if td['is_completed'] else 'Pending'}",
            'tab': 'todos'
        })

    conn.close()
    return jsonify({
        'query': q,
        'total': len(results),
        'results': results[:25]
    })

# ==================== 10. CAMPUS SALON & PARLOUR BOOKING ====================

@app.route('/api/salon/branches', methods=['GET'])
def get_salon_branches():
    conn = get_db_connection()
    branches = conn.execute('SELECT * FROM salon_branches ORDER BY name ASC').fetchall()
    conn.close()
    return jsonify([dict(b) for b in branches])

@app.route('/api/salon/services', methods=['GET'])
def get_salon_services():
    gender = request.args.get('gender')
    category = request.args.get('category')

    conn = get_db_connection()
    sql = 'SELECT * FROM salon_services WHERE 1=1'
    params = []

    if gender and gender != 'ALL':
        sql += ' AND (gender_type = ? OR gender_type = "Unisex")'
        params.append(gender)

    if category and category != 'ALL':
        sql += ' AND category = ?'
        params.append(category)

    sql += ' ORDER BY price ASC'
    services = conn.execute(sql, params).fetchall()
    conn.close()
    return jsonify([dict(s) for s in services])

@app.route('/api/salon/bookings', methods=['GET'])
def get_salon_bookings():
    branch = request.args.get('branch')
    conn = get_db_connection()
    if branch and branch != 'ALL':
        bookings = conn.execute('SELECT * FROM salon_bookings WHERE salon_branch = ? ORDER BY id DESC LIMIT 20', (branch,)).fetchall()
    else:
        bookings = conn.execute('SELECT * FROM salon_bookings ORDER BY id DESC LIMIT 25').fetchall()
    conn.close()
    return jsonify([dict(b) for b in bookings])

@app.route('/api/salon/book', methods=['POST'])
def book_salon_slot():
    data = request.get_json() or {}
    student_name = data.get('student_name', '').strip()
    reg_no = data.get('reg_no', '').strip()
    phone = data.get('phone', '').strip()
    hostel_block = data.get('hostel_block', '').strip()
    room_no = data.get('room_no', '').strip()
    salon_branch = data.get('salon_branch', '').strip()
    service_name = data.get('service_name', '').strip()
    booking_date = data.get('booking_date', '').strip()
    time_slot = data.get('time_slot', '').strip()
    stylist = data.get('stylist_preference', 'Any Available Stylist').strip()

    if not all([student_name, reg_no, phone, hostel_block, room_no, salon_branch, service_name, booking_date, time_slot]):
        return jsonify({'error': 'Please fill all required slot booking details.'}), 400

    token_code = generate_code("SALON-LPU")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO salon_bookings (token_code, student_name, reg_no, phone, hostel_block, room_no, salon_branch, service_name, booking_date, time_slot, stylist_preference, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed')
    ''', (token_code, student_name, reg_no, phone, hostel_block, room_no, salon_branch, service_name, booking_date, time_slot, stylist))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return jsonify({
        'success': True,
        'id': new_id,
        'token_code': token_code,
        'salon_branch': salon_branch,
        'time_slot': time_slot,
        'booking_date': booking_date,
        'message': f'Salon appointment confirmed! Show Token {token_code} at {salon_branch} reception.'
    })

@app.route('/api/salon/<int:booking_id>/status', methods=['POST'])
def update_salon_status(booking_id):
    data = request.get_json() or {}
    status = data.get('status', 'Completed')
    conn = get_db_connection()
    conn.execute('UPDATE salon_bookings SET status = ? WHERE id = ?', (status, booking_id))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': f'Appointment marked as {status}'})

# ==================== 11. STUDENT TO-DO & TASK PLANNER ====================

@app.route('/api/todos', methods=['GET'])
def get_todos():
    status = request.args.get('status', 'ALL')
    category = request.args.get('category', 'ALL')

    conn = get_db_connection()
    sql = 'SELECT * FROM student_todos WHERE 1=1'
    params = []

    if status == 'pending':
        sql += ' AND is_completed = 0'
    elif status == 'completed':
        sql += ' AND is_completed = 1'

    if category and category != 'ALL':
        sql += ' AND category = ?'
        params.append(category)

    sql += ' ORDER BY is_completed ASC, due_date ASC, id DESC'
    rows = conn.execute(sql, params).fetchall()

    # Calculate overall stats
    total = conn.execute('SELECT COUNT(*) FROM student_todos').fetchone()[0]
    completed = conn.execute('SELECT COUNT(*) FROM student_todos WHERE is_completed = 1').fetchone()[0]
    pending = total - completed
    percent = round((completed / total * 100), 1) if total > 0 else 0

    conn.close()
    return jsonify({
        'todos': [dict(r) for r in rows],
        'total': total,
        'completed': completed,
        'pending': pending,
        'percent': percent
    })

@app.route('/api/todos', methods=['POST'])
def add_todo():
    data = request.get_json() or {}
    title = data.get('title', '').strip()
    category = data.get('category', 'Assignments & CA').strip()
    priority = data.get('priority', 'Medium').strip()
    due_date = data.get('due_date', '').strip() or datetime.now().strftime('%Y-%m-%d')
    due_time = data.get('due_time', '11:59 PM').strip()

    if not title:
        return jsonify({'error': 'Please enter a task title.'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO student_todos (title, category, priority, due_date, due_time, is_completed)
        VALUES (?, ?, ?, ?, ?, 0)
    ''', (title, category, priority, due_date, due_time))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return jsonify({'success': True, 'id': new_id, 'message': 'Task added to your To-Do list!'})

@app.route('/api/todos/<int:todo_id>/toggle', methods=['POST'])
def toggle_todo(todo_id):
    conn = get_db_connection()
    conn.execute('''
        UPDATE student_todos
        SET is_completed = 1 - is_completed
        WHERE id = ?
    ''', (todo_id,))
    conn.commit()
    updated = conn.execute('SELECT is_completed FROM student_todos WHERE id = ?', (todo_id,)).fetchone()
    conn.close()

    is_done = updated['is_completed'] if updated else 0
    return jsonify({'success': True, 'is_completed': is_done, 'message': 'Task updated.'})

@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    conn = get_db_connection()
    conn.execute('DELETE FROM student_todos WHERE id = ?', (todo_id,))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Task removed.'})

# ==================== UNIHOSPITAL DOCTOR APPOINTMENTS API ====================

@app.route('/api/unihospital/doctors', methods=['GET'])
def get_unihospital_doctors():
    department = request.args.get('department')
    conn = get_db_connection()
    if department and department != 'ALL':
        doctors = conn.execute('SELECT * FROM unihospital_doctors WHERE department = ? ORDER BY id ASC', (department,)).fetchall()
    else:
        doctors = conn.execute('SELECT * FROM unihospital_doctors ORDER BY id ASC').fetchall()
    conn.close()
    return jsonify([dict(d) for d in doctors])

@app.route('/api/unihospital/appointments', methods=['GET'])
def get_unihospital_appointments():
    reg_no = request.args.get('reg_no', '12204561')
    conn = get_db_connection()
    appointments = conn.execute('SELECT * FROM unihospital_appointments WHERE reg_no = ? ORDER BY id DESC', (reg_no,)).fetchall()
    conn.close()
    return jsonify([dict(a) for a in appointments])

@app.route('/api/unihospital/appointments', methods=['POST'])
def book_unihospital_appointment():
    data = request.get_json() or {}
    student_name = data.get('student_name', '').strip()
    reg_no = data.get('reg_no', '').strip()
    phone = data.get('phone', '').strip()
    hostel_block = data.get('hostel_block', '').strip()
    room_no = data.get('room_no', '').strip()
    doctor_name = data.get('doctor_name', '').strip()
    department = data.get('department', '').strip()
    appointment_date = data.get('appointment_date', '').strip()
    time_slot = data.get('time_slot', '').strip()
    symptoms = data.get('symptoms', '').strip()

    if not all([student_name, reg_no, doctor_name, appointment_date, time_slot]):
        return jsonify({'error': 'Please fill all required appointment fields.'}), 400

    token_code = generate_code("UNI-OPD")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO unihospital_appointments (token_code, student_name, reg_no, phone, hostel_block, room_no, doctor_name, department, appointment_date, time_slot, symptoms, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed')
    ''', (token_code, student_name, reg_no, phone, hostel_block, room_no, doctor_name, department, appointment_date, time_slot, symptoms))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return jsonify({
        'success': True,
        'id': new_id,
        'token_code': token_code,
        'doctor_name': doctor_name,
        'time_slot': time_slot,
        'appointment_date': appointment_date,
        'message': f'Appointment confirmed with {doctor_name}! Your OPD Token: {token_code}'
    })

def free_port(port=5000):
    import subprocess
    try:
        out = subprocess.check_output('netstat -ano', shell=True).decode()
        for line in out.strip().splitlines():
            if f':{port}' in line and 'LISTENING' in line:
                parts = line.strip().split()
                if len(parts) >= 5:
                    pid = parts[-1]
                    if pid != str(os.getpid()):
                        subprocess.run(f'taskkill /F /PID {pid}', shell=True, capture_output=True)
    except Exception:
        pass

if __name__ == '__main__':
    free_port(5000)
    print("Starting LPU Student Management System on http://127.0.0.1:5000")
    app.run(debug=False, host='0.0.0.0', port=5000, use_reloader=False)



