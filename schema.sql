-- LPU Student Management System - Supabase / PostgreSQL Schema Setup

CREATE TABLE IF NOT EXISTS cleaning_requests (
    id BIGSERIAL PRIMARY KEY,
    student_name VARCHAR(120) NOT NULL,
    reg_no VARCHAR(50) NOT NULL,
    hostel_block VARCHAR(50) NOT NULL,
    room_no VARCHAR(50) NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    preferred_slot VARCHAR(100) NOT NULL,
    instructions TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mess_menu (
    id BIGSERIAL PRIMARY KEY,
    day_of_week VARCHAR(20) NOT NULL,
    meal_type VARCHAR(50) NOT NULL,
    items TEXT NOT NULL,
    timings VARCHAR(50) NOT NULL,
    special_dish VARCHAR(120)
);

CREATE TABLE IF NOT EXISTS electricity_bills (
    id BIGSERIAL PRIMARY KEY,
    hostel_block VARCHAR(50) NOT NULL,
    room_no VARCHAR(50) NOT NULL,
    previous_reading NUMERIC(10,2) NOT NULL,
    current_reading NUMERIC(10,2) NOT NULL,
    rate_per_unit NUMERIC(6,2) DEFAULT 7.50,
    due_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Unpaid',
    last_payment_date DATE
);

CREATE TABLE IF NOT EXISTS lebrocs_items (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    description TEXT,
    is_veg INTEGER DEFAULT 1,
    badge VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS lebrocs_orders (
    id BIGSERIAL PRIMARY KEY,
    order_code VARCHAR(50) UNIQUE NOT NULL,
    student_name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    hostel_block VARCHAR(50) NOT NULL,
    room_no VARCHAR(50) NOT NULL,
    items_summary TEXT NOT NULL,
    total_amount NUMERIC(10,2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'Cash on Delivery',
    status VARCHAR(50) DEFAULT 'Preparing',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS marketplace_items (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    original_price NUMERIC(10,2),
    condition VARCHAR(100) NOT NULL,
    description TEXT,
    seller_name VARCHAR(120) NOT NULL,
    hostel_block VARCHAR(50) NOT NULL,
    room_no VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL,
    status VARCHAR(50) DEFAULT 'Available',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS library_books (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    author VARCHAR(200) NOT NULL,
    department VARCHAR(150) NOT NULL,
    isbn VARCHAR(50),
    floor VARCHAR(100) NOT NULL,
    rack_shelf VARCHAR(100) NOT NULL,
    total_copies INT DEFAULT 5,
    available_copies INT DEFAULT 5
);

CREATE TABLE IF NOT EXISTS book_reservations (
    id BIGSERIAL PRIMARY KEY,
    reservation_code VARCHAR(50) UNIQUE NOT NULL,
    book_id BIGINT REFERENCES library_books(id),
    student_name VARCHAR(120) NOT NULL,
    reg_no VARCHAR(50) NOT NULL,
    hostel_block VARCHAR(50) NOT NULL,
    room_no VARCHAR(50) NOT NULL,
    reserved_date TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'Reserved'
);

CREATE TABLE IF NOT EXISTS emergency_contacts (
    id BIGSERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    name VARCHAR(150) NOT NULL,
    contact_number VARCHAR(50) NOT NULL,
    location_or_block VARCHAR(150) NOT NULL,
    availability VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS campus_stores (
    id BIGSERIAL PRIMARY KEY,
    store_name VARCHAR(150) NOT NULL,
    building_name VARCHAR(100) NOT NULL,
    floor_location VARCHAR(150) NOT NULL,
    timings VARCHAR(100) NOT NULL,
    contact_no VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS campus_store_items (
    id BIGSERIAL PRIMARY KEY,
    item_name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    primary_building VARCHAR(100) NOT NULL,
    primary_store VARCHAR(150) NOT NULL,
    floor_location VARCHAR(150) NOT NULL,
    stock_status VARCHAR(100) NOT NULL,
    other_buildings_json JSONB,
    description TEXT
);

