// ==================== LOCAL FILE MODE FALLBACK DB ====================
const LOCAL_MODE = (window.location.protocol === 'file:');

const LOCAL_DEMO_DB = {
  cleaning: [
    { id: 1041, student_name: "Sarthak Mishra", reg_no: "12204561", hostel_block: "BH-3", room_no: "412", service_type: "Room Deep Cleaning & Mopping", preferred_slot: "Today 10:00 AM - 12:00 PM", instructions: "Please mop under study desk and sweep balcony.", status: "Completed" },
    { id: 1042, student_name: "Aman Verma", reg_no: "12208932", hostel_block: "BH-3", room_no: "408", service_type: "Washroom Sanitization", preferred_slot: "Today 02:00 PM - 04:00 PM", instructions: "Mirror and tap scrub required.", status: "In Progress" },
    { id: 1043, student_name: "Rohan Sharma", reg_no: "12215670", hostel_block: "BH-3", room_no: "415", service_type: "Floor Mopping & Dusting", preferred_slot: "Tomorrow 09:00 AM - 11:00 AM", instructions: "Leave slip at warden desk if absent.", status: "Pending" }
  ],
  mess: {
    "Monday": {
      "Breakfast": { items: "Aloo Paratha, Curd, Pickle, Tea/Coffee", timings: "07:00 AM - 09:00 AM", special: "Desi Ghee Paratha" },
      "Lunch": { items: "Rajma Masala, Jeera Rice, Tawa Roti, Boondi Raita, Salad", timings: "11:00 AM - 02:30 PM", special: "Kashmiri Rajma" },
      "Snacks": { items: "Veg Cutlet / Bread Pakoda, Ginger Chai", timings: "05:00 PM - 06:00 PM", special: "Crispy Cutlet" },
      "Dinner": { items: "Shahi Paneer / Chicken Curry, Dal Tadka, Phulkas, Rice, Kheer", timings: "08:00 PM - 10:00 PM", special: "Shahi Paneer" }
    },
    "Tuesday": {
      "Breakfast": { items: "Poha with Peanuts, Boiled Eggs, Banana, Milk/Chai", timings: "07:00 AM - 09:00 AM", special: "Indori Poha" },
      "Lunch": { items: "Kadhi Pakoda, Steamed Rice, Phulkas, Aloo Jeera, Salad", timings: "11:00 AM - 02:30 PM", special: "Punjabi Kadhi" },
      "Snacks": { items: "Samosa with Mint & Tamarind Chutney, Tea", timings: "05:00 PM - 06:00 PM", special: "Hot Samosa" },
      "Dinner": { items: "Matar Paneer, Mix Dal, Tandoori Roti, Pulao, Gulab Jamun", timings: "08:00 PM - 10:00 PM", special: "Hot Gulab Jamun" }
    },
    "Wednesday": {
      "Breakfast": { items: "Idli Sambhar, Coconut Chutney, Bread Butter, Tea", timings: "07:00 AM - 09:00 AM", special: "South Indian Special" },
      "Lunch": { items: "Amritsari Chole, Poori / Bhature, Jeera Pulao, Raita", timings: "11:00 AM - 02:30 PM", special: "Chole Bhature" },
      "Snacks": { items: "Steamed Veg Momos with Red Garlic Chutney, Tea", timings: "05:00 PM - 06:00 PM", special: "Steamed Momos" },
      "Dinner": { items: "Paneer Butter Masala / Mutton Curry, Dal Makhani, Naan, Rice, Ice Cream", timings: "08:00 PM - 10:00 PM", special: "Chef Special Dinner" }
    },
    "Thursday": {
      "Breakfast": { items: "Methi Thepla, Curd, Sprouts, Boiled Eggs, Chai", timings: "07:00 AM - 09:00 AM", special: "Gujarati Thepla" },
      "Lunch": { items: "Mix Veg Curry, Dal Fry, Steamed Rice, Roti, Curd", timings: "11:00 AM - 02:30 PM", special: "Seasonal Veg" },
      "Snacks": { items: "Aloo Bonda / Puffs, Masala Chai", timings: "05:00 PM - 06:00 PM", special: "Crispy Puffs" },
      "Dinner": { items: "Dum Aloo Kashmiri, Dal Tadka, Missi Roti, Steamed Rice, Rasgulla", timings: "08:00 PM - 10:00 PM", special: "Kashmiri Dum Aloo" }
    },
    "Friday": {
      "Breakfast": { items: "Gobhi Paratha, White Butter, Curd, Tea/Coffee", timings: "07:00 AM - 09:00 AM", special: "Stuffed Paratha" },
      "Lunch": { items: "Dal Makhani, Butter Naan, Jeera Rice, Boondi Raita, Salad", timings: "11:00 AM - 02:30 PM", special: "Dal Makhani" },
      "Snacks": { items: "Veg Spring Rolls, Sweet Chilli Sauce, Chai", timings: "05:00 PM - 06:00 PM", special: "Spring Rolls" },
      "Dinner": { items: "Kadai Paneer / Butter Chicken, Yellow Dal, Phulkas, Rice, Custard", timings: "08:00 PM - 10:00 PM", special: "Kadai Paneer" }
    },
    "Saturday": {
      "Breakfast": { items: "Chole Bhature, Pickle, Lassi / Tea", timings: "07:00 AM - 09:00 AM", special: "Weekend Feast" },
      "Lunch": { items: "Rajma Masala, Steamed Rice, Tawa Roti, Papad, Salad", timings: "11:00 AM - 02:30 PM", special: "Rajma Chawal" },
      "Snacks": { items: "Bhel Puri / Sev Puri, Cold Drink / Tea", timings: "05:00 PM - 06:00 PM", special: "Bombay Bhel" },
      "Dinner": { items: "Paneer Lababdar / Egg Bhurji, Dal Tadka, Garlic Naan, Pulao, Halwa", timings: "08:00 PM - 10:00 PM", special: "Moong Dal Halwa" }
    },
    "Sunday": {
      "Breakfast": { items: "Puri Bhaji, Halwa, Pickle, Masala Chai", timings: "07:00 AM - 09:00 AM", special: "Sunday Halwa Puri" },
      "Lunch": { items: "Special Dum Biryani (Veg/Chicken), Mirchi Salan, Raita, Gulab Jamun", timings: "11:00 AM - 02:30 PM", special: "Hyderabadi Biryani Feast" },
      "Snacks": { items: "Grilled Sandwich, Potato Wafers, Tea", timings: "05:00 PM - 06:00 PM", special: "Cheese Sandwich" },
      "Dinner": { items: "Malai Kofta, Dal Makhani, Butter Roti, Peas Pulao, Rasmalai", timings: "08:00 PM - 10:00 PM", special: "Grand Sunday Feast" }
    }
  },
  doctors: [
    { doctor_name: "Dr. Rajesh Sharma", qualification: "MBBS, MD (General Medicine)", specialty: "Chief Medical Officer - Viral Fevers, General Ailments & Critical Care", department: "General Medicine", timings: "09:00 AM - 02:00 PM", room_no: "OPD Room 101", experience: "18+ Years Exp", image_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80" },
    { doctor_name: "Dr. Ananya Sen", qualification: "MBBS, MS (Orthopedics)", specialty: "Senior Orthopedic Surgeon - Joint Pain, Sports Injury & Fracture Rehab", department: "Orthopedics & Sports Medicine", timings: "10:00 AM - 01:00 PM", room_no: "OPD Room 104", experience: "12+ Years Exp", image_url: "https://images.unsplash.com/photo-1594824813579-0524458f796d?w=400&auto=format&fit=crop&q=80" },
    { doctor_name: "Dr. Vikramjeet Singh", qualification: "MBBS, MS (ENT)", specialty: "ENT Specialist - Ear Infections, Sinusitis, Throat & Hearing", department: "ENT Department", timings: "02:00 PM - 05:00 PM", room_no: "OPD Room 108", experience: "14+ Years Exp", image_url: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80" },
    { doctor_name: "Dr. Neha Kapoor", qualification: "MBBS, MD (Dermatology)", specialty: "Consultant Dermatologist - Acne, Skin Allergies, Hair & Scalp Health", department: "Dermatology", timings: "11:00 AM - 03:00 PM", room_no: "OPD Room 112", experience: "9+ Years Exp", image_url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80" },
    { doctor_name: "Dr. Amanpreet Kaur", qualification: "BDS, MDS (Oral & Maxillofacial)", specialty: "Dental Surgeon - Scaling, Cavity Filling, Toothache & Root Canal", department: "Dental Sciences", timings: "09:30 AM - 01:30 PM", room_no: "OPD Room 115", experience: "10+ Years Exp", image_url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80" },
    { doctor_name: "Dr. Shalini Mukherjee", qualification: "M.Sc, Ph.D. (Clinical Psychology)", specialty: "Senior Student Counselor - Mental Wellness, Exam Anxiety & Stress", department: "Mental Health & Counseling", timings: "10:00 AM - 04:00 PM", room_no: "OPD Room 202", experience: "11+ Years Exp", image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80" }
  ],
  appointments: [
    { token_code: "UNI-OPD-1042", student_name: "Sarthak Mishra", reg_no: "12204561", phone: "9876543210", hostel_block: "BH-3", room_no: "412", doctor_name: "Dr. Rajesh Sharma", department: "General Medicine", appointment_date: "Today", time_slot: "10:30 AM - 11:00 AM", symptoms: "Seasonal viral fever & mild throat congestion", status: "Confirmed" }
  ],
  feedbacks: [
    { student_name: "Sarthak Mishra", reg_no: "12204561", hostel_block: "BH-3", room_no: "412", overall_rating: 5, feedback_category: "Mess Food & Cleanliness", feedback_text: "Housekeeping was prompt and mess dinner has improved noticeably this week. Really appreciate the online meter reading with photo verification!", services_reviewed: "Room Cleaning, Mess Food, Electricity Meter", status: "Reviewed & Noted by Warden" }
  ],
  todos: [
    { id: 1, task_title: "Submit Data Structures Lab Assignment 3", category: "Assignment", due_date: "Today", priority: "High", completed: 0 },
    { id: 2, task_title: "Collect verified laundry bundle from basement", category: "Hostel", due_date: "Tomorrow", priority: "Medium", completed: 0 },
    { id: 3, task_title: "Renew Artificial Intelligence book at Library", category: "Library", due_date: "15-Sep", priority: "Low", completed: 1 }
  ]
};


// ==================== THEME MANAGEMENT (DARK / LIGHT MODE) ====================
function initTheme() {
  const savedTheme = localStorage.getItem('lpu_portal_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const icon = document.getElementById('theme-icon');
  const text = document.getElementById('theme-text');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (icon) icon.innerText = '☀️';
    if (text) text.innerText = 'Light Mode';
  } else {
    document.body.classList.remove('dark-mode');
    if (icon) icon.innerText = '🌙';
    if (text) text.innerText = 'Dark Mode';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('lpu_portal_theme', next);
  initTheme();
}

// State Management
let currentTab = 'cleaning';
let cart = []; // [{ id, name, price, qty, is_veg }]
let allContacts = [
  {
    "category": "Wardens",
    "title": "Hostel Warden BH-1 & BH-2",
    "name": "Mr. Harpreet Singh",
    "contact_number": "+91 98140 10203",
    "location_or_block": "BH-1 Warden Office (Room 101)",
    "availability": "08:00 AM - 10:00 PM"
  },
  {
    "category": "Wardens",
    "title": "Hostel Warden BH-3 & BH-4",
    "name": "Mr. Rakesh Chander",
    "contact_number": "+91 98140 20304",
    "location_or_block": "BH-3 Warden Office (Room 102)",
    "availability": "08:00 AM - 10:00 PM"
  },
  {
    "category": "Wardens",
    "title": "Chief Warden - Boys Hostels (BH)",
    "name": "Prof. Gurpreet Singh",
    "contact_number": "+91 98760 11223",
    "location_or_block": "Central Hostel Office (BH-3 Ground)",
    "availability": "09:00 AM - 08:00 PM"
  },
  {
    "category": "Wardens",
    "title": "Chief Warden - Girls Hostels (GH)",
    "name": "Dr. Sunita Pathak",
    "contact_number": "+91 98760 44556",
    "location_or_block": "GH Central Block Office",
    "availability": "09:00 AM - 08:00 PM"
  },
  {
    "category": "Wardens",
    "title": "Hostel Warden BH-5 & BH-6",
    "name": "Mr. Anil Kumar",
    "contact_number": "+91 98140 30405",
    "location_or_block": "BH-5 Warden Office (Room 101)",
    "availability": "08:00 AM - 10:00 PM"
  },
  {
    "category": "Wardens",
    "title": "Hostel Warden GH-1 & GH-2",
    "name": "Ms. Neha Sharma",
    "contact_number": "+91 98140 40506",
    "location_or_block": "GH-1 Warden Office (Room 004)",
    "availability": "08:00 AM - 10:00 PM"
  },
  {
    "category": "Deans",
    "title": "Dean, School of Computer Science & Engineering",
    "name": "Dr. Rajeev Sobti",
    "contact_number": "+91 1824 517301",
    "location_or_block": "Block 34 (Dean Office)",
    "availability": "09:00 AM - 05:00 PM"
  },
  {
    "category": "Deans",
    "title": "Pro Vice Chancellor & Dean of Technology",
    "name": "Dr. Lovi Raj Gupta",
    "contact_number": "+91 1824 517005",
    "location_or_block": "Administrative Block (Dean Office)",
    "availability": "09:30 AM - 05:30 PM"
  },
  {
    "category": "Deans",
    "title": "Dean, Mittal School of Business",
    "name": "Dr. Rajesh Verma",
    "contact_number": "+91 1824 517400",
    "location_or_block": "Block 14 (Management Wing)",
    "availability": "09:00 AM - 05:00 PM"
  },
  {
    "category": "Ambulance",
    "title": "24x7 University Ambulance Hotline",
    "name": "Dr. Rajesh Sharma (Chief Medical Officer)",
    "contact_number": "+91 1824 517100",
    "location_or_block": "Uni-Hospital (Near Gate 4)",
    "availability": "24x7 Available"
  },
  {
    "category": "Uni-Hospital",
    "title": "Uni-Hospital Reception & Doctor Booking",
    "name": "Mrs. Sunita Verma (Head Receptionist)",
    "contact_number": "+91 1824 517102",
    "location_or_block": "Uni-Hospital Main Desk",
    "availability": "24x7 Active"
  },
  {
    "category": "Security",
    "title": "LPU Central Security & Control Room",
    "name": "Inspector Balwinder Singh",
    "contact_number": "+91 1824 517000",
    "location_or_block": "Main Control Tower (Gate 1)",
    "availability": "24x7 Active"
  },
  {
    "category": "Helpline",
    "title": "Anti-Ragging Flying Squad",
    "name": "Prof. S.K. Mahajan",
    "contact_number": "+91 1824 517999",
    "location_or_block": "Block 29 (Division of Student Welfare)",
    "availability": "24x7 Toll Free"
  },
  {
    "category": "Helpline",
    "title": "Women Safety Helpline & Proctorial Cell",
    "name": "Dr. Harvinder Kaur",
    "contact_number": "+91 98760 99887",
    "location_or_block": "Block 29 (Room 105)",
    "availability": "24x7 Available"
  },
  {
    "category": "Technicians",
    "title": "Campus Senior Electrician & Power Unit",
    "name": "Mr. Satnam Singh",
    "contact_number": "+91 98881 22334",
    "location_or_block": "Hostel Maintenance Cell",
    "availability": "08:00 AM - 08:00 PM"
  },
  {
    "category": "Technicians",
    "title": "Hostel Plumber & RO Water Tech",
    "name": "Mr. Jagjit Singh",
    "contact_number": "+91 98881 33445",
    "location_or_block": "Hostel Maintenance Cell",
    "availability": "08:00 AM - 07:00 PM"
  },
  {
    "category": "Technicians",
    "title": "Carpenter & Furniture Maintenance",
    "name": "Mr. Mohan Lal",
    "contact_number": "+91 98881 44556",
    "location_or_block": "Central Maintenance Yard",
    "availability": "09:00 AM - 06:00 PM"
  }
];
let currentStoreItems = [];
let salonServicesList = [];
let calendarViewDate = new Date();
let calendarSelectedDate = new Date();
let searchDebounceTimer = null;

// Private Student Domain User Session
let currentStudent = JSON.parse(localStorage.getItem('lpu_student_session')) || {
  reg_no: '12204561',
  student_name: 'Sarthak Mishra',
  hostel_block: 'BH-3',
  room_no: '412',
  department: 'B.Tech Computer Science & Engg',
  phone: '9876543210',
  avatar_initials: 'SM'
};

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  applyStudentDomainSession();
  startLiveClock();
  initCalendar();
  loadCleaningRequests();
  loadMessMenu();
  searchMeterReading();
  calculateApplianceUsage();
  loadBrocsMenu();
  loadMarketplace();
  loadLibraryBooks();
  loadContacts();
  loadStoreItems();
  loadSalonServices();
  loadSalonBookings();
  loadTodos();
  loadHostelFeedbacks();

  // Set today's date in salon modal & todo modal
  const dateInput = document.getElementById('salon-book-date');
  if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }
  const todoDateInput = document.getElementById('todo-modal-date');
  if (todoDateInput) {
    todoDateInput.value = new Date().toISOString().split('T')[0];
  }

  // Close global search when clicking outside
  document.addEventListener('click', (e) => {
    const wrap = document.querySelector('.header-search-wrap');
    if (wrap && !wrap.contains(e.target)) {
      const dropdown = document.getElementById('global-search-dropdown');
      if (dropdown) dropdown.classList.remove('active');
    }
  });

  // Keyboard shortcut Esc to close search dropdown
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const dropdown = document.getElementById('global-search-dropdown');
      if (dropdown) dropdown.classList.remove('active');
    }
  });
});

// Toast System
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : '⚠️'}</span>
    <div>${message}</div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Navigation Tabs
function switchTab(tabId, btn) {
  currentTab = tabId;
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-tab-btn').forEach(el => {
    el.classList.remove('active');
    el.setAttribute('aria-selected', 'false');
  });

  const targetPane = document.getElementById(`${tabId}-tab`);
  if (targetPane) {
    targetPane.classList.add('active');
  }

  // Automatically locate and activate corresponding sidebar button
  let targetBtn = btn;
  if (!targetBtn) {
    targetBtn = document.querySelector(`.nav-tab-btn[onclick*="'${tabId}'"]`) ||
                document.querySelector(`.nav-tab-btn[onclick*='"${tabId}"']`);
  }
  if (targetBtn) {
    targetBtn.classList.add('active');
    targetBtn.setAttribute('aria-selected', 'true');
    targetBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Refresh data on tab switch
  if (tabId === 'cleaning') loadCleaningRequests();
  if (tabId === 'unihospital') { loadUniHospitalDoctors(); loadUniHospitalAppointments(); }
  if (tabId === 'mess') loadMessMenu();
  if (tabId === 'electricity') searchMeterReading();
  if (tabId === 'lebrocs') loadBrocsMenu();
  if (tabId === 'marketplace') loadMarketplace();
  if (tabId === 'library') loadLibraryBooks();
  if (tabId === 'store') loadStoreItems();
  if (tabId === 'salon') { loadSalonServices(); loadSalonBookings(); }
  if (tabId === 'todos') loadTodos();
  if (tabId === 'contacts') loadContactsTab();
  if (tabId === 'feedback') loadHostelFeedbacks();
}

// Modal Helpers
function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add('active');
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove('active');
}

// Drawer Toggle
function toggleDrawer(open) {
  const drawer = document.getElementById('emergency-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (open) {
    drawer.classList.add('open');
    backdrop.classList.add('active');
  } else {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
  }
}

// ==================== 1. CLEANING SERVICE ====================

async function loadCleaningRequests() {
  const block = document.getElementById('cleaning-block-filter') ? document.getElementById('cleaning-block-filter').value : 'BH-3';
  let data = [];
  try {
    const res = await fetch(`/api/cleaning?block=${block}`);
    if (res.ok) data = await res.json();
    else data = LOCAL_DEMO_DB.cleaning;
  } catch (err) {
    data = LOCAL_DEMO_DB.cleaning;
  }
  const tbody = document.getElementById('cleaning-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2rem; color: #64748b;">No cleaning requests found.</td></tr>`;
    return;
  }
  data.forEach(req => {
    let badgeClass = 'badge-pending';
    if (req.status === 'Completed') badgeClass = 'badge-completed';
    if (req.status === 'In Progress') badgeClass = 'badge-inprogress';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#CLN-${req.id}</strong></td>
      <td>
        <div style="font-weight: 600;">${escapeHtml(req.student_name)}</div>
        <div style="font-size: 0.78rem; color: #64748b;">Reg: ${escapeHtml(req.reg_no)}</div>
      </td>
      <td><span class="badge" style="background:#e0f2fe; color:#0369a1;">${req.hostel_block}</span> Room ${escapeHtml(req.room_no)}</td>
      <td>${escapeHtml(req.service_type)}</td>
      <td><span style="font-weight: 500;">⏰ ${escapeHtml(req.preferred_slot)}</span></td>
      <td><small style="color: #475569;">${escapeHtml(req.instructions || 'None')}</small></td>
      <td><span class="badge ${badgeClass}">${req.status}</span></td>
      <td>
        ${req.status !== 'Completed' ? `
          <button class="btn-secondary" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;" onclick="markCleaningCompleted(${req.id})">Mark Done</button>
        ` : `<span style="color:#16a34a; font-weight:600; font-size:0.8rem;">✓ Done</span>`}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function submitCleaningRequest(e) {
  e.preventDefault();
  const payload = {
    student_name: document.getElementById('clean-name').value,
    reg_no: document.getElementById('clean-reg').value,
    hostel_block: document.getElementById('clean-block').value,
    room_no: document.getElementById('clean-room').value,
    service_type: document.getElementById('clean-type').value,
    preferred_slot: document.getElementById('clean-slot').value,
    instructions: document.getElementById('clean-notes').value
  };

  try {
    const res = await fetch('/api/cleaning', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (result.success) {
      showToast('Cleaning service booked! Our staff will arrive in your slot.');
      closeModal('cleaning-modal');
      document.getElementById('cleaning-form').reset();
      loadCleaningRequests();
    } else {
      showToast(result.error || 'Failed to book cleaning', 'error');
    }
  } catch (err) {
    // Offline / GitHub Pages fallback
    payload.id = Date.now() % 10000;
    payload.status = 'Pending';
    LOCAL_DEMO_DB.cleaning.unshift(payload);
    showToast('Cleaning service booked (Demo)! Staff scheduled.');
    closeModal('cleaning-modal');
    document.getElementById('cleaning-form').reset();
    loadCleaningRequests();
  }
}

async function markCleaningCompleted(id) {
  try {
    const res = await fetch(`/api/cleaning/${id}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Completed' })
    });
    const result = await res.json();
    if (result.success) {
      showToast(`Request #CLN-${id} marked as completed.`);
      loadCleaningRequests();
    }
  } catch (err) {
    const item = LOCAL_DEMO_DB.cleaning.find(c => c.id === id);
    if (item) item.status = 'Completed';
    showToast(`Request #CLN-${id} marked as completed.`);
    loadCleaningRequests();
  }
}

// ==================== 2. MESS MENU ====================

async function loadMessMenu() {
  const daySelect = document.getElementById('mess-day-select') || document.getElementById('mess-day-filter');
  const day = daySelect ? daySelect.value : 'Monday';
  let data = null;

  try {
    const res = await fetch(`/api/mess-menu?day=${encodeURIComponent(day)}`);
    if (res.ok) {
      const raw = await res.json();
      if (Array.isArray(raw)) {
        data = {};
        raw.forEach(item => {
          data[item.meal_type] = {
            items: item.items,
            timings: item.timings,
            special: item.special_dish
          };
        });
      } else {
        data = raw;
      }
    } else {
      data = (LOCAL_DEMO_DB && LOCAL_DEMO_DB.mess && LOCAL_DEMO_DB.mess[day]) || LOCAL_DEMO_DB.mess["Monday"];
    }
  } catch (err) {
    data = (LOCAL_DEMO_DB && LOCAL_DEMO_DB.mess && LOCAL_DEMO_DB.mess[day]) || (LOCAL_DEMO_DB && LOCAL_DEMO_DB.mess && LOCAL_DEMO_DB.mess["Monday"]);
  }

  if (!data && LOCAL_DEMO_DB && LOCAL_DEMO_DB.mess) {
    data = LOCAL_DEMO_DB.mess[day] || LOCAL_DEMO_DB.mess["Monday"];
  }

  const grid = document.getElementById('mess-cards-container') || document.getElementById('mess-cards-grid');
  if (!grid || !data) return;
  grid.innerHTML = '';

  const mealIcons = {
    'Breakfast': '🌅',
    'Lunch': '☀️',
    'Snacks': '☕',
    'Dinner': '🌙'
  };

  const order = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
  order.forEach(mType => {
    if (data[mType]) {
      const card = document.createElement('div');
      card.className = 'app-card menu-item-card';
      card.style.border = '1px solid var(--border)';
      card.style.borderRadius = 'var(--radius)';
      card.style.padding = '1.25rem';
      card.style.background = 'var(--surface)';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.justifyContent = 'space-between';
      card.style.boxShadow = 'var(--shadow-sm)';

      const icon = mealIcons[mType] || '🍲';
      const specialHtml = data[mType].special ? `
        <div style="display: inline-block; font-size: 0.78rem; font-weight: 700; color: #15803d; background: #dcfce7; padding: 0.25rem 0.65rem; border-radius: 6px; margin-bottom: 0.75rem; width: fit-content;">
          ⭐ Today's Special: ${escapeHtml(data[mType].special)}
        </div>
      ` : '';

      card.innerHTML = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <h3 style="color: var(--navy); font-size: 1.2rem; font-weight: 700; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
              <span>${icon}</span> ${mType}
            </h3>
            <span class="badge" style="background: #e0f2fe; color: #0369a1; font-weight: 600; font-size: 0.8rem;">⏰ ${escapeHtml(data[mType].timings)}</span>
          </div>
          ${specialHtml}
          <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6; margin-bottom: 1rem; font-weight: 500;">
            ${escapeHtml(data[mType].items)}
          </p>
        </div>
        <div style="font-size: 0.78rem; color: var(--text-muted); border-top: 1px dashed var(--border); padding-top: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
          <span>Mess Halls 1 &amp; 2 &bull; Unlimited Servings</span>
          <span style="color: #15803d; font-weight: 600;">✓ Dietician Approved</span>
        </div>
      `;
      grid.appendChild(card);
    }
  });
}

function openPhotoProofModal() {
  alert("📸 Verified Photo Proof Certified by Caretaker:\n\nSub-Meter ID: LPU-MTR-8823\nHostel: BH-3, Room 412\nTimestamp: 2026-09-12 18:30 IST\nCertified By: Ramesh Kumar (Hostel Supervisor)\n\nAll tamper seals intact & calibrated.");
}

function openPayBillModal() {
  if (!currentBillData) return;
  document.getElementById('pay-modal-room').innerText = `${currentBillData.hostel_block}, Room ${currentBillData.room_no}`;
  document.getElementById('pay-modal-units').innerText = `${parseFloat(currentBillData.units_consumed).toFixed(2)} kWh`;
  document.getElementById('pay-modal-amount').innerText = `₹${parseFloat(currentBillData.calculated_amount).toFixed(2)}`;
  openModal('pay-bill-modal');
}

async function confirmBillPayment() {
  if (!currentBillData) return;
  try {
    const res = await fetch('/api/electricity/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hostel_block: currentBillData.hostel_block,
        room_no: currentBillData.room_no
      })
    });
    const result = await res.json();
    if (result.success) {
      showToast(`Bill Paid! Transaction Reference: ${result.transaction_id}`);
      closeModal('pay-bill-modal');
      searchMeterReading();
    }
  } catch (err) {
    showToast('Payment simulation failed', 'error');
  }
}

function calculateApplianceUsage() {
  const coolerHours = parseFloat(document.getElementById('calc-cooler').value) || 0;
  const kettleHours = parseFloat(document.getElementById('calc-kettle').value) || 0;
  const laptopHours = parseFloat(document.getElementById('calc-laptop').value) || 0;
  const lightsHours = parseFloat(document.getElementById('calc-lights').value) || 0;
  const ironHours = parseFloat(document.getElementById('calc-iron').value) || 0;

  // Watt-hours per day = Watts * Hours
  const dailyWattHours = (180 * coolerHours) + (1200 * kettleHours) + (150 * laptopHours) + (90 * lightsHours) + (1000 * ironHours);
  const dailyUnits = dailyWattHours / 1000.0;
  const monthlyUnits = dailyUnits * 30.0;
  const estimatedMonthlyCost = monthlyUnits * 7.50;

  const totalWatts = (coolerHours > 0 ? 180 : 0) + (kettleHours > 0 ? 1200 : 0) + (laptopHours > 0 ? 150 : 0) + (lightsHours > 0 ? 90 : 0) + (ironHours > 0 ? 1000 : 0);

  document.getElementById('calculator-summary').innerText = `
    Est. Daily: ${dailyUnits.toFixed(2)} kWh/day • Est. 30-Day Bill: ₹${estimatedMonthlyCost.toFixed(1)} (@ ₹7.50/unit)
  `;
}

// ==================== 4. LE BROCS FOOD DELIVERY ====================

async function loadBrocsMenu() {
  const category = document.getElementById('brocs-category-filter').value;
  try {
    const res = await fetch(`/api/lebrocs/menu?category=${category}`);
    const items = await res.json();
    const grid = document.getElementById('brocs-menu-grid');
    grid.innerHTML = '';

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-item-card';
      card.innerHTML = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--navy);">${escapeHtml(item.name)}</h4>
            <span class="badge ${item.is_veg ? 'badge-veg' : 'badge-nonveg'}">
              ${item.is_veg ? '🟢 VEG' : '🔴 NON-VEG'}
            </span>
          </div>
          ${item.badge ? `
            <div style="font-size: 0.75rem; color: #ea580c; font-weight: 700; text-transform: uppercase; margin-bottom: 0.4rem;">
              ${item.badge}
            </div>
          ` : ''}
          <p style="font-size: 0.85rem; color: #64748b; line-height: 1.4; margin-bottom: 1rem;">
            ${escapeHtml(item.description)}
          </p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 0.75rem;">
          <span style="font-size: 1.25rem; font-weight: 800; color: var(--navy);">₹${parseFloat(item.price).toFixed(0)}</span>
          <button class="btn-primary" style="padding: 0.45rem 0.85rem; font-size: 0.85rem;" onclick="addToCart(${item.id}, '${escapeHtml(item.name)}', ${item.price}, ${item.is_veg})">
            + Add to Cart
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}

function addToCart(id, name, price, is_veg) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name, price, qty: 1, is_veg });
  }
  updateCartUI();
  showToast(`Added "${name}" to your cart.`);
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cart-count').innerText = totalCount;
}

function openCartModal() {
  const container = document.getElementById('cart-items-list');
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: #64748b; padding: 1.5rem;">Your cart is empty. Browse the Le Brocs menu to add your favorites!</p>`;
    document.getElementById('cart-total-modal').innerText = '₹0';
    openModal('cart-modal');
    return;
  }

  let total = 0;
  cart.forEach((item, idx) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    const row = document.createElement('div');
    row.style = 'display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0; border-bottom: 1px solid #f1f5f9;';
    row.innerHTML = `
      <div>
        <span style="font-size: 0.85rem; font-weight: 600;">${item.is_veg ? '🟢' : '🔴'} ${escapeHtml(item.name)}</span>
        <div style="font-size: 0.78rem; color: #64748b;">₹${item.price} each</div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <button class="btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.8rem;" onclick="changeCartQty(${idx}, -1)">-</button>
        <span style="font-weight: 700;">${item.qty}</span>
        <button class="btn-secondary" style="padding: 0.2rem 0.5rem; font-size: 0.8rem;" onclick="changeCartQty(${idx}, 1)">+</button>
        <span style="font-weight: 700; width: 60px; text-align: right;">₹${itemTotal}</span>
      </div>
    `;
    container.appendChild(row);
  });

  document.getElementById('cart-total-modal').innerText = `₹${total.toFixed(0)}`;
  openModal('cart-modal');
}

function changeCartQty(index, delta) {
  if (cart[index]) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
  }
  updateCartUI();
  openCartModal();
}

async function submitFoodOrder() {
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }

  const name = document.getElementById('order-name').value.trim();
  const phone = document.getElementById('order-phone').value.trim();
  const block = document.getElementById('order-block').value;
  const room = document.getElementById('order-room').value.trim();
  const payment = document.getElementById('order-payment').value;

  if (!name || !phone || !room) {
    showToast('Please enter delivery name, phone and room number.', 'error');
    return;
  }

  const itemsSummary = cart.map(i => `${i.qty}x ${i.name}`).join(', ');
  const totalAmount = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

  try {
    const res = await fetch('/api/lebrocs/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_name: name,
        phone,
        hostel_block: block,
        room_no: room,
        items_summary: itemsSummary,
        total_amount: totalAmount,
        payment_method: payment
      })
    });
    const result = await res.json();
    if (result.success) {
      showToast(`Order Placed! Order ID: ${result.order_code}. Arriving in 25-35 mins.`);
      cart = [];
      updateCartUI();
      closeModal('cart-modal');
    } else {
      showToast(result.error || 'Failed to place order', 'error');
    }
  } catch (err) {
    showToast('Network error submitting order', 'error');
  }
}

// ==================== 5. SENIOR MARKETPLACE ====================

async function loadMarketplace() {
  const query = document.getElementById('market-search').value.trim();
  const category = document.getElementById('market-cat-filter').value;

  try {
    const res = await fetch(`/api/marketplace?query=${encodeURIComponent(query)}&category=${category}`);
    const items = await res.json();
    const grid = document.getElementById('marketplace-grid');
    grid.innerHTML = '';

    if (items.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 2rem;">No active marketplace listings found.</div>`;
      return;
    }

        const REAL_IMAGES_MAP = {
      'Symphony Personal Room Cooler': 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&auto=format&fit=crop&q=80',
      'Air Cooler': 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&auto=format&fit=crop&q=80',
      'Casio FX-991EX': 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&auto=format&fit=crop&q=80',
      'Calculator': 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&auto=format&fit=crop&q=80',
      'Hercules Geared Cycle': 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80',
      'Cycle': 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80',
      'Bicycle': 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80',
      'Mini Electric Kettle': 'https://images.unsplash.com/photo-1594213114663-d94db9b17125?w=600&auto=format&fit=crop&q=80',
      'Kettle': 'https://images.unsplash.com/photo-1594213114663-d94db9b17125?w=600&auto=format&fit=crop&q=80',
      'Engineering Mini Drafter': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop&q=80',
      'Drafter': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop&q=80',
      'Data Structures & Algorithms': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
      'Textbook': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
      'Book': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80'
    };

    items.forEach(item => {
      let productImg = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80';
      for (const [k, url] of Object.entries(REAL_IMAGES_MAP)) {
        if (item.title.toLowerCase().includes(k.toLowerCase())) {
          productImg = url;
          break;
        }
      }

      const card = document.createElement('div');
      card.className = 'app-card';
      card.innerHTML = `
        <div style="height: 165px; width: 100%; border-radius: 10px; overflow: hidden; margin-bottom: 0.85rem; background: #f1f5f9;">
          <img src="${productImg}" alt="${escapeHtml(item.title)}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--navy);">${escapeHtml(item.title)}</h4>
          <span class="badge" style="background:#e0f2fe; color:#0369a1;">${escapeHtml(item.category)}</span>
        </div>
        <div style="font-size: 0.8rem; color: #059669; font-weight: 600; margin-bottom: 0.5rem;">
          Condition: ${escapeHtml(item.condition)}
        </div>
        <p style="font-size: 0.85rem; color: #475569; line-height: 1.4; margin-bottom: 1rem; flex: 1;">
          ${escapeHtml(item.description || 'No description provided.')}
        </p>
        <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: 8px; padding: 0.6rem 0.75rem; margin-bottom: 1rem; font-size: 0.8rem;">
          <div><strong>Seller:</strong> ${escapeHtml(item.seller_name)}</div>
          <div><strong>Location:</strong> ${escapeHtml(item.hostel_block)}, Room ${escapeHtml(item.room_no)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <div>
            <span style="font-size: 1.3rem; font-weight: 800; color: var(--navy);">₹${parseFloat(item.price).toFixed(0)}</span>
            ${item.original_price ? `<span style="font-size: 0.85rem; text-decoration: line-through; color: #94a3b8; margin-left: 0.35rem;">₹${parseFloat(item.original_price).toFixed(0)}</span>` : ''}
          </div>
          <button class="btn-secondary" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;" onclick="markItemSold(${item.id})">Mark Sold</button>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <a href="tel:${item.phone}" class="btn-call">📞 Call Senior</a>
          <a href="https://wa.me/${item.whatsapp}?text=Hi%2C+interested+in+your+listing+for+${encodeURIComponent(item.title)}" target="_blank" class="btn-call" style="background:#25d366;">💬 WhatsApp</a>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}

async function submitMarketplaceItem(e) {
  e.preventDefault();
  const payload = {
    title: document.getElementById('market-title').value,
    category: document.getElementById('market-category').value,
    condition: document.getElementById('market-condition').value,
    price: parseFloat(document.getElementById('market-price').value),
    original_price: document.getElementById('market-orig-price').value ? parseFloat(document.getElementById('market-orig-price').value) : null,
    description: document.getElementById('market-desc').value,
    seller_name: document.getElementById('market-seller').value,
    hostel_block: document.getElementById('market-block').value,
    room_no: document.getElementById('market-room').value,
    phone: document.getElementById('market-phone').value,
    whatsapp: document.getElementById('market-phone').value
  };

  try {
    const res = await fetch('/api/marketplace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (result.success) {
      showToast('Item posted for sale! Junior students can now reach you.');
      closeModal('post-item-modal');
      document.getElementById('marketplace-form').reset();
      loadMarketplace();
    } else {
      showToast(result.error || 'Failed to post item', 'error');
    }
  } catch (err) {
    showToast('Network error posting item', 'error');
  }
}

async function markItemSold(id) {
  try {
    const res = await fetch(`/api/marketplace/${id}/sold`, { method: 'POST' });
    const result = await res.json();
    if (result.success) {
      showToast('Item marked as sold.');
      loadMarketplace();
    }
  } catch (err) {
    showToast('Error marking item sold', 'error');
  }
}

// ==================== 6. CENTRAL LIBRARY LOCATOR ====================

async function loadLibraryBooks() {
  const search = document.getElementById('lib-search').value.trim();
  const dept = document.getElementById('lib-dept-filter').value;

  try {
    const res = await fetch(`/api/library?search=${encodeURIComponent(search)}&dept=${dept}`);
    const books = await res.json();
    const grid = document.getElementById('library-grid');
    grid.innerHTML = '';

    if (books.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 2rem;">No matching library books found in Central Library catalog.</div>`;
      return;
    }

    books.forEach(b => {
      const card = document.createElement('div');
      card.className = 'app-card';
      card.innerHTML = `
        <div style="margin-bottom: 0.5rem;">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--navy); margin-bottom: 0.2rem;">${escapeHtml(b.title)}</h4>
          <div style="font-size: 0.85rem; color: #64748b;">By ${escapeHtml(b.author)}</div>
        </div>
        <div style="margin-bottom: 0.75rem;">
          <span class="badge" style="background:#f1f5f9; color:#334155;">${escapeHtml(b.department)}</span>
          ${b.isbn ? `<span style="font-size: 0.75rem; color: #94a3b8; margin-left: 0.4rem;">ISBN: ${escapeHtml(b.isbn)}</span>` : ''}
        </div>
        <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 0.75rem; margin-bottom: 1rem;">
          <div style="font-size: 0.82rem; font-weight: 700; color: #c2410c;">📍 Physical Location:</div>
          <div style="font-size: 0.95rem; font-weight: 800; color: var(--navy); margin-top: 0.15rem;">${escapeHtml(b.floor)}</div>
          <div style="font-size: 0.88rem; color: #ea580c; font-weight: 600;">${escapeHtml(b.rack_shelf)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 0.75rem;">
          <span style="font-size: 0.85rem; font-weight: 600; color: ${b.available_copies > 0 ? '#16a34a' : '#dc2626'};">
            ${b.available_copies > 0 ? `🟢 ${b.available_copies} Copies Available` : '🔴 0 Copies Left'}
          </span>
          <button class="btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" ${b.available_copies <= 0 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''} onclick="openReserveBookModal(${b.id}, '${escapeHtml(b.title)}', '${escapeHtml(b.floor)}', '${escapeHtml(b.rack_shelf)}')">
            Reserve Copy
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}

function openReserveBookModal(id, title, floor, shelf) {
  document.getElementById('reserve-book-id').value = id;
  document.getElementById('reserve-book-title').innerText = title;
  document.getElementById('reserve-book-location').innerText = `Location: ${floor} • ${shelf}`;
  openModal('reserve-book-modal');
}

async function submitBookReservation(e) {
  e.preventDefault();
  const payload = {
    book_id: parseInt(document.getElementById('reserve-book-id').value),
    student_name: document.getElementById('reserve-name').value,
    reg_no: document.getElementById('reserve-reg').value,
    hostel_block: document.getElementById('reserve-block').value,
    room_no: document.getElementById('reserve-room').value
  };

  try {
    const res = await fetch('/api/library/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (result.success) {
      showToast(`Reserved! Code: ${result.reservation_code}. Collect within 48 hrs from Central Library Block 36.`);
      closeModal('reserve-book-modal');
      loadLibraryBooks();
    } else {
      showToast(result.error || 'Reservation failed', 'error');
    }
  } catch (err) {
    showToast('Error submitting reservation', 'error');
  }
}

// ==================== 7. CONTACTS & SPEED DIAL ====================

async function loadContacts() {
  loadContactsTab();
  try {
    const res = await fetch('/api/contacts');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        allContacts = data;
      }
    }
  } catch (err) {
    console.warn('Using built-in demo contacts directory');
  }
  loadContactsTab();
}

function populateDrawerContacts(contacts) {
  const drawerList = document.getElementById('drawer-contacts-list');
  drawerList.innerHTML = '';

  contacts.forEach(c => {
    let cardClass = 'contact-card';
    if (c.category === 'Emergency') cardClass += ' emergency';
    else if (c.category === 'Wardens') cardClass += ' warden';
    else if (c.category === 'Technicians') cardClass += ' technician';

    const div = document.createElement('div');
    div.className = cardClass;
    div.innerHTML = `
      <div class="contact-meta">
        <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #64748b;">${c.category}</span>
        <span style="font-size: 0.75rem; color: #16a34a; font-weight: 600;">${c.availability}</span>
      </div>
      <strong style="font-size: 0.92rem; color: var(--navy);">${escapeHtml(c.title)}</strong>
      <div style="font-size: 0.82rem; color: #334155;">${escapeHtml(c.name)}</div>
      <div style="font-size: 0.78rem; color: #64748b;">📍 ${escapeHtml(c.location_or_block)}</div>
      <div class="contact-actions">
        <a href="tel:${c.contact_number.replace(/\s+/g, '')}" class="btn-call">📞 Call Now</a>
        <button class="btn-copy" onclick="copyNumber('${c.contact_number}')">📋 Copy</button>
      </div>
    `;
    drawerList.appendChild(div);
  });
}

function loadContactsTab() {
  const cat = document.getElementById('contacts-cat-filter').value;
  let filtered = allContacts;
  if (cat !== 'ALL') {
    filtered = allContacts.filter(c => c.category.toLowerCase() === cat.toLowerCase());
  }
  const grid = document.getElementById('contacts-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = '<div style="color: #64748b; padding: 2rem; text-align: center; grid-column: 1/-1;">No contacts found in this directory category.</div>';
    return;
  }

  filtered.forEach(c => {
    let badgeColor = '#fee2e2; color: #dc2626;';
    if (c.category === 'Wardens') badgeColor = '#ffedd5; color: #ea580c;';
    if (c.category === 'Deans') badgeColor = '#ede9fe; color: #7c3aed;';
    if (c.category === 'Ambulance') badgeColor = '#fee2e2; color: #b91c1c;';
    if (c.category === 'Uni-Hospital') badgeColor = '#ccfbf1; color: #0f766e;';
    if (c.category === 'Security') badgeColor = '#fef3c7; color: #b45309;';
    if (c.category === 'Technicians') badgeColor = '#e0f2fe; color: #0284c7;';
    if (c.category === 'Helpline') badgeColor = '#dcfce7; color: #16a34a;';

    const card = document.createElement('div');
    card.className = 'app-card';
    card.style.cssText = "display: flex; flex-direction: column; padding: 1.25rem; border: 1px solid var(--border-color); border-radius: 12px; background: var(--surface-card); box-shadow: 0 4px 12px rgba(0,0,0,0.03);";
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
        <span class="badge" style="background:${badgeColor}; font-weight: 700; text-transform: uppercase; font-size: 0.72rem;">${escapeHtml(c.category)}</span>
        <span style="font-size: 0.75rem; color: #16a34a; font-weight: 600;">● ${escapeHtml(c.availability)}</span>
      </div>
      <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--navy); margin-bottom: 0.25rem;">${escapeHtml(c.title)}</h4>
      <div style="font-size: 0.9rem; color: #475569; font-weight: 600; margin-bottom: 0.35rem;">👤 ${escapeHtml(c.name)}</div>
      <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 1rem;">📍 Location: ${escapeHtml(c.location_or_block)}</div>
      <div style="margin-top: auto; display: flex; gap: 0.5rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
        <a href="tel:${c.contact_number.replace(/\s+/g, '')}" class="btn-call" style="flex:1; text-align:center; padding:0.45rem 0.75rem; border-radius:6px; background:#0284c7; color:#fff; text-decoration:none; font-size:0.85rem; font-weight:600;">📞 ${c.contact_number}</a>
        <button class="btn-copy" onclick="copyNumber('${c.contact_number}')" style="padding:0.45rem 0.75rem; border-radius:6px; border:1px solid #cbd5e1; background:var(--surface-alt); cursor:pointer; font-size:0.82rem;">📋 Copy</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function copyNumber(num) {
  navigator.clipboard.writeText(num);
  showToast(`Copied ${num} to clipboard!`);
}

// ==================== 8. CAMPUS STORE & BUILDING INVENTORY ====================

async function loadStoreItems() {
  const query = document.getElementById('store-search') ? document.getElementById('store-search').value.trim() : '';
  const category = document.getElementById('store-cat-filter') ? document.getElementById('store-cat-filter').value : 'ALL';
  const building = document.getElementById('store-building-filter') ? document.getElementById('store-building-filter').value : 'ALL';

  try {
    const res = await fetch(`/api/store/items?query=${encodeURIComponent(query)}&category=${category}&building=${building}`);
    const items = await res.json();
    currentStoreItems = items;
    const grid = document.getElementById('store-items-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (items.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 2.5rem;">No items found matching your filters. Try selecting "All Campus Buildings" or "All Categories".</div>`;
      return;
    }

    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'app-card';

      // Parse other buildings list
      const otherBuildingsList = item.other_buildings || [];
      const stockedOther = otherBuildingsList.filter(b => b.stock !== 'Out of Stock');

      let otherBadgesHtml = '';
      if (stockedOther.length > 0) {
        otherBadgesHtml = stockedOther.map(b => `
          <span class="badge" style="background:#f1f5f9; color:#0f172a; border: 1px solid #cbd5e1; font-size:0.75rem; padding: 0.2rem 0.5rem; margin-right: 0.25rem; margin-bottom: 0.25rem;">
            📍 ${escapeHtml(b.building)} (${escapeHtml(b.stock)})
          </span>
        `).join('');
      } else {
        otherBadgesHtml = '<span style="font-size:0.75rem; color:#94a3b8;">Only stocked at primary location currently.</span>';
      }

      let stockBadgeClass = 'badge-completed';
      if (item.stock_status.toLowerCase().includes('low')) stockBadgeClass = 'badge-pending';
      if (item.stock_status.toLowerCase().includes('out')) stockBadgeClass = 'badge-unpaid';

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--navy); line-height: 1.3;">${escapeHtml(item.item_name)}</h4>
          <span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight: 600; white-space:nowrap; margin-left:0.5rem;">${escapeHtml(item.category)}</span>
        </div>

        <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.75rem;">
          <span style="font-size: 1.35rem; font-weight: 800; color: var(--navy);">₹${parseFloat(item.price).toFixed(0)}</span>
          <span class="badge ${stockBadgeClass}">● ${escapeHtml(item.stock_status)}</span>
        </div>

        <p style="font-size: 0.84rem; color: #475569; line-height: 1.4; margin-bottom: 1rem; flex: 1;">
          ${escapeHtml(item.description || '')}
        </p>

        <!-- Primary Building Location -->
        <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: 8px; padding: 0.75rem; margin-bottom: 0.75rem;">
          <div style="font-size: 0.76rem; font-weight: 700; text-transform: uppercase; color: #ea580c; letter-spacing: 0.04em;">Primary Store Location</div>
          <div style="font-weight: 700; color: var(--navy); font-size: 0.92rem; margin-top: 0.15rem;">🏢 ${escapeHtml(item.primary_building)}</div>
          <div style="font-size: 0.82rem; color: #334155;">${escapeHtml(item.primary_store)}</div>
          <div style="font-size: 0.78rem; color: #64748b;">📍 Floor: ${escapeHtml(item.floor_location)}</div>
        </div>

        <!-- In Which Other Buildings is it Available? -->
        <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 0.75rem; margin-bottom: 1rem;">
          <div style="font-size: 0.76rem; font-weight: 700; text-transform: uppercase; color: #c2410c; margin-bottom: 0.35rem;">
            🏬 Also Available In Other Buildings (${stockedOther.length})
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.2rem;">
            ${otherBadgesHtml}
          </div>
        </div>

        <div style="display: flex; gap: 0.5rem; border-top: 1px solid var(--border); padding-top: 0.75rem;">
          <button class="btn-primary" style="flex: 1; padding: 0.45rem 0.75rem; font-size: 0.85rem; justify-content: center;" onclick="openItemAvailabilityModal(${index})">
            🔍 Check In All Buildings
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}

function openItemAvailabilityModal(index) {
  const item = currentStoreItems[index];
  if (!item) return;

  document.getElementById('avail-modal-item-name').innerText = item.item_name;
  document.getElementById('avail-modal-cat-price').innerText = `${item.category} • Fixed Price: ₹${item.price}`;

  const tbody = document.getElementById('avail-modal-table-body');
  tbody.innerHTML = '';

  // Primary Building Row
  let primaryBadgeClass = 'badge-completed';
  if (item.stock_status.toLowerCase().includes('low')) primaryBadgeClass = 'badge-pending';
  if (item.stock_status.toLowerCase().includes('out')) primaryBadgeClass = 'badge-unpaid';

  const trPrimary = document.createElement('tr');
  trPrimary.style.background = '#fefce8';
  trPrimary.innerHTML = `
    <td><strong>🏢 ${escapeHtml(item.primary_building)}</strong> <span class="badge" style="background:#ea580c; color:white; font-size:0.7rem;">PRIMARY HUB</span></td>
    <td>${escapeHtml(item.primary_store)}</td>
    <td>${escapeHtml(item.floor_location)}</td>
    <td><span class="badge ${primaryBadgeClass}">${escapeHtml(item.stock_status)}</span></td>
  `;
  tbody.appendChild(trPrimary);

  // Other Buildings Rows
  const others = item.other_buildings || [];
  others.forEach(o => {
    let stockClass = 'badge-completed';
    if ((o.stock || '').toLowerCase().includes('low')) stockClass = 'badge-pending';
    if ((o.stock || '').toLowerCase().includes('out')) stockClass = 'badge-unpaid';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>🏢 ${escapeHtml(o.building)}</strong></td>
      <td>${escapeHtml(o.store)}</td>
      <td>${escapeHtml(o.floor)}</td>
      <td><span class="badge ${stockClass}">${escapeHtml(o.stock)}</span></td>
    `;
    tbody.appendChild(tr);
  });

  openModal('store-availability-modal');
}

async function openCampusStoresDirectoryModal() {
  try {
    const res = await fetch('/api/store/buildings');
    const stores = await res.json();
    const tbody = document.getElementById('all-stores-table-body');
    tbody.innerHTML = '';

    stores.forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:700;">🏢 ${escapeHtml(s.building_name)}</span></td>
        <td><strong>${escapeHtml(s.store_name)}</strong></td>
        <td>${escapeHtml(s.floor_location)}</td>
        <td>⏰ ${escapeHtml(s.timings)}</td>
        <td><a href="tel:${(s.contact_no || '').replace(/\s+/g, '')}" style="color: #16a34a; font-weight:600; text-decoration:none;">📞 ${escapeHtml(s.contact_no || 'Campus NOC')}</a></td>
      `;
      tbody.appendChild(tr);
    });

    openModal('all-stores-directory-modal');
  } catch (err) {
    showToast('Failed to load stores directory', 'error');
  }
}

// ==================== 9. LIVE DIGITAL CLOCK ====================

function startLiveClock() {
  function updateClock() {
    const now = new Date();
    const timeEl = document.getElementById('clock-live-time');
    const dateEl = document.getElementById('clock-live-date');

    if (timeEl) {
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 12-hour format
      const formattedHours = String(hours).padStart(2, '0');
      timeEl.innerHTML = `🕒 ${formattedHours}:${minutes}:${seconds} <span style="font-size:0.75rem; color:#fdba74;">${ampm}</span>`;
    }

    if (dateEl) {
      const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
      dateEl.innerText = now.toLocaleDateString('en-IN', options);
    }

    try {
      updateDynamicMealUI();
    } catch (e) {
      // safe fallback
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// ==================== 10. GLOBAL SEARCH SYSTEM ====================

function handleGlobalSearch(e) {
  const query = e.target.value.trim();
  const clearBtn = document.getElementById('global-search-clear');
  const dropdown = document.getElementById('global-search-dropdown');

  if (!query) {
    if (clearBtn) clearBtn.style.display = 'none';
    if (dropdown) {
      dropdown.classList.remove('active');
      dropdown.innerHTML = '';
    }
    return;
  }

  if (clearBtn) clearBtn.style.display = 'block';

  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(async () => {
    try {
      const res = await fetch(`/api/global-search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      renderSearchResults(data.results, query);
    } catch (err) {
      console.error(err);
    }
  }, 220);
}

function clearGlobalSearch() {
  const input = document.getElementById('global-search-input');
  const clearBtn = document.getElementById('global-search-clear');
  const dropdown = document.getElementById('global-search-dropdown');
  if (input) input.value = '';
  if (clearBtn) clearBtn.style.display = 'none';
  if (dropdown) {
    dropdown.classList.remove('active');
    dropdown.innerHTML = '';
  }
}

function renderSearchResults(results, query) {
  const dropdown = document.getElementById('global-search-dropdown');
  if (!dropdown) return;

  dropdown.innerHTML = '';
  dropdown.classList.add('active');

  if (!results || results.length === 0) {
    dropdown.innerHTML = `
      <div style="padding: 1.25rem; text-align: center; color: #64748b; font-size: 0.88rem;">
        No results found across LPU campus for "<strong>${escapeHtml(query)}</strong>"
      </div>
    `;
    return;
  }

  // Header count
  const countBar = document.createElement('div');
  countBar.style = 'padding: 0.5rem 1rem; background: #f8fafc; font-size: 0.78rem; font-weight: 700; color: #64748b; border-bottom: 1px solid #e2e8f0; text-transform: uppercase; letter-spacing: 0.04em;';
  countBar.innerText = `Found ${results.length} results across Campus Modules`;
  dropdown.appendChild(countBar);

  results.forEach(item => {
    const row = document.createElement('div');
    row.className = 'search-result-item';
    row.innerHTML = `
      <div class="search-result-icon">${item.icon}</div>
      <div class="search-result-info">
        <div class="search-result-title">${escapeHtml(item.title)}</div>
        <div class="search-result-sub">${escapeHtml(item.subtitle)}</div>
      </div>
      <span class="badge" style="background: #f1f5f9; color: #475569; font-size: 0.7rem; text-transform: uppercase;">
        ${item.module}
      </span>
    `;
    row.onclick = () => {
      navigateToSearchResult(item.tab);
      dropdown.classList.remove('active');
    };
    dropdown.appendChild(row);
  });
}

function navigateToSearchResult(tabName) {
  // Find the nav button matching the tab
  const tabButtons = document.querySelectorAll('.nav-tab-btn');
  let targetBtn = null;
  tabButtons.forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick') || '';
    if (onclickAttr.includes(`'${tabName}'`)) {
      targetBtn = btn;
    }
  });

  switchTab(tabName, targetBtn);
  window.scrollTo({ top: 180, behavior: 'smooth' });
}

// ==================== 11. CAMPUS & HOSTEL CALENDAR ====================

const CAMPUS_EVENTS_DB = {
  // Keyed by day of week (0 = Sun, 1 = Mon ... 6 = Sat)
  weekly: {
    0: [
      { title: "Grand Sunday Mess Feast", time: "12:30 PM - 03:00 PM", desc: "Special Hyderabadi Dum Biryani, Mirchi Ka Salan, Boondi Raita & Hot Gulab Jamun.", type: "urgent" },
      { title: "Hostel Outing Late Entry Permission", time: "Until 09:30 PM", desc: "Extended Sunday turnstile biometric entry for day scholars & hostellers.", type: "info" }
    ],
    1: [
      { title: "Weekly Housekeeping Deep Sweep", time: "09:00 AM - 05:00 PM", desc: "BH & GH corridors, washrooms and common recreation rooms sanitized.", type: "info" },
      { title: "Mess Special Desi Ghee Aloo Paratha", time: "07:30 AM - 09:30 AM", desc: "Served hot with fresh curd and mint chutney.", type: "normal" }
    ],
    3: [
      { title: "Evening Snacks Steamed Veg Momos", time: "04:30 PM - 06:00 PM", desc: "Campus mess evening snacks feature hot momos and ginger chai.", type: "normal" }
    ],
    5: [
      { title: "Uni-Mall Weekend Food & Music Fest", time: "06:00 PM - 10:30 PM", desc: "Le Brocs burger combos and student musical band performances at Open Amphitheatre.", type: "normal" }
    ],
    6: [
      { title: "Hostel Laundry Bulk Drop-off", time: "08:00 AM - 01:00 PM", desc: "Bed linens, blankets, and towels collection at block basements.", type: "info" }
    ]
  },
  // Keyed by day of month (1 to 31)
  monthly: {
    10: [
      { title: "Electricity Meter Readings Logged", time: "10:00 AM", desc: "Campus power department updates room sub-meter kWh readings for the billing cycle.", type: "info" }
    ],
    15: [
      { title: "Central Library Book Renewal Deadline", time: "All Day", desc: "Avoid overdue fines by renewing issued books at Block 36 or via web portal.", type: "urgent" }
    ],
    20: [
      { title: "Hostel Room Electricity Bill Due Date", time: "Before 11:59 PM", desc: "Pay electricity dues via online fee portal to maintain uninterrupted power supply.", type: "urgent" }
    ],
    25: [
      { title: "Hostel Wardens Open Council Grievance Meet", time: "05:00 PM - 07:00 PM", desc: "Open session at BH-3 / GH Central office for room maintenance & food committee feedback.", type: "normal" }
    ]
  }
};

function initCalendar() {
  calendarViewDate = new Date();
  calendarSelectedDate = new Date();
}

function openCalendarModal() {
  renderCalendar();
  openModal('campus-calendar-modal');
}

function changeCalendarMonth(delta) {
  calendarViewDate.setMonth(calendarViewDate.getMonth() + delta);
  renderCalendar();
}

function goToTodayCalendar() {
  calendarViewDate = new Date();
  calendarSelectedDate = new Date();
  renderCalendar();
}

function renderCalendar() {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const year = calendarViewDate.getFullYear();
  const month = calendarViewDate.getMonth();

  const label = document.getElementById('cal-month-year-label');
  if (label) {
    label.innerText = `${monthNames[month]} ${year}`;
  }

  const grid = document.getElementById('calendar-days-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // Day Headers
  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayHeaders.forEach(dh => {
    const hCell = document.createElement('div');
    hCell.className = 'calendar-header-cell';
    hCell.innerText = dh;
    grid.appendChild(hCell);
  });

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Empty cells for alignment
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-date-cell empty';
    grid.appendChild(emptyCell);
  }

  const today = new Date();

  // Populate Month Days
  for (let d = 1; d <= daysInMonth; d++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'calendar-date-cell';
    dayCell.innerText = d;

    const cellDate = new Date(year, month, d);
    const dayOfWeek = cellDate.getDay();
    const cellMonthStr = String(month + 1).padStart(2, '0');
    const cellDateKey = `${cellMonthStr}-${String(d).padStart(2, '0')}`;

    // Mark weekends (Saturday & Sunday)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      dayCell.classList.add('weekend-day');
      dayCell.title = dayOfWeek === 0 ? "Sunday Holiday" : "Saturday Holiday";
      const badge = document.createElement('span');
      badge.style.cssText = "display:block; font-size:0.6rem; color:#f59e0b; font-weight:700; line-height:1;";
      badge.innerText = "OFF";
      dayCell.appendChild(badge);
    }

    // Mark Festival Holidays
    if (FESTIVAL_HOLIDAYS_DB[cellDateKey]) {
      dayCell.classList.add('festival-day');
      dayCell.title = FESTIVAL_HOLIDAYS_DB[cellDateKey];
      const dot = document.createElement('span');
      dot.className = 'calendar-event-dot';
      dot.style.background = '#ef4444';
      dayCell.appendChild(dot);
    }

    // Check today
    const isToday = (today.getFullYear() === year && today.getMonth() === month && today.getDate() === d);
    if (isToday) dayCell.classList.add('today');

    // Check selected
    const isSelected = (calendarSelectedDate.getFullYear() === year && calendarSelectedDate.getMonth() === month && calendarSelectedDate.getDate() === d);
    if (isSelected) dayCell.classList.add('selected');

    dayCell.onclick = () => {
      calendarSelectedDate = new Date(year, month, d);
      renderCalendar();
    };

    grid.appendChild(dayCell);
  }

  renderSelectedDateEvents();
}

function renderSelectedDateEvents() {
  const eventsList = document.getElementById('cal-events-list');
  const titleLabel = document.getElementById('cal-selected-date-label');
  if (!eventsList) return;

  const selDay = calendarSelectedDate.getDate();
  const selMonth = String(calendarSelectedDate.getMonth() + 1).padStart(2, '0');
  const selDayOfWeek = calendarSelectedDate.getDay(); // 0 = Sun, 6 = Sat
  const dateKey = `${selMonth}-${String(selDay).padStart(2, '0')}`;
  const dateStr = calendarSelectedDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  if (titleLabel) {
    titleLabel.innerText = `📌 Schedule & Timetable for ${dateStr}`;
  }

  eventsList.innerHTML = '';

  // 1. Check Weekend Holiday (Saturday & Sunday)
  const isWeekend = (selDayOfWeek === 0 || selDayOfWeek === 6);
  if (isWeekend) {
    const dayName = selDayOfWeek === 0 ? "Sunday" : "Saturday";
    eventsList.innerHTML += `
      <div class="event-item-card" style="border-left: 4px solid #f59e0b; background: #fffbeb;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <strong style="color: #b45309; font-size: 1rem;">🏖️ Weekend Holiday - ${dayName} (No Classes)</strong>
          <span class="badge" style="background:#fef3c7; color:#b45309; font-weight:700;">OFFICIAL HOLIDAY</span>
        </div>
        <div style="color: #92400e; font-size: 0.85rem; line-height: 1.45;">
          All regular academic lectures and laboratory practicals are <strong>suspended for the weekend</strong>.
          Central Library, sports stadiums, Uni-Mall cafes, and hostel recreation facilities remain fully operational.
        </div>
      </div>
    `;
  }

  // 2. Check Festival Holiday
  const festivalName = FESTIVAL_HOLIDAYS_DB[dateKey];
  if (festivalName) {
    eventsList.innerHTML += `
      <div class="event-item-card urgent" style="border-left: 4px solid #ef4444; background: #fef2f2;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <strong style="color: #b91c1c; font-size: 1rem;">🪔 Official Campus Holiday: ${festivalName}</strong>
          <span class="badge badge-emergency" style="background:#fee2e2; color:#b91c1c; font-weight:700;">FESTIVAL HOLIDAY</span>
        </div>
        <div style="color: #991b1b; font-size: 0.85rem; line-height: 1.45;">
          University closed in celebration of <strong>${festivalName}</strong>. All scheduled academic timetables, tutorials and exams are suspended.
          Emergency medical center and mess catering remain active for resident hostellers.
        </div>
      </div>
    `;
  }

  // 3. If NOT weekend and NOT festival holiday -> Provide Full Academic Timetable
  if (!isWeekend && !festivalName) {
    const timetable = ACADEMIC_TIMETABLE_DB[selDayOfWeek] || [];
    
    eventsList.innerHTML += `
      <div style="background: var(--surface-alt); padding: 0.6rem 0.8rem; border-radius: 8px; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 700; color: var(--navy); font-size: 0.9rem;">📚 Academic Class Timetable (B.Tech CSE)</span>
        <span class="badge badge-blue">Working Day</span>
      </div>
    `;

    timetable.forEach(slot => {
      let badgeStyle = "background:#e0f2fe; color:#0369a1;";
      if (slot.type === "lab") badgeStyle = "background:#fef3c7; color:#b45309;";
      if (slot.type === "break") badgeStyle = "background:#dcfce7; color:#15803d;";
      if (slot.type === "tutorial") badgeStyle = "background:#ede9fe; color:#6d28d9;";

      eventsList.innerHTML += `
        <div class="event-item-card" style="border-left: 4px solid ${slot.type === 'lab' ? '#f59e0b' : (slot.type === 'break' ? '#10b981' : '#0284c7')};">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.2rem;">
            <div>
              <span class="badge" style="${badgeStyle} font-size: 0.72rem; margin-right: 0.4rem; font-weight: 700;">${escapeHtml(slot.code)}</span>
              <strong style="color: var(--navy); font-size: 0.92rem;">${escapeHtml(slot.title)}</strong>
            </div>
            <span class="badge" style="background:#f1f5f9; color:#475569; font-size:0.75rem; white-space: nowrap;">⏰ ${escapeHtml(slot.time)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; color: #64748b; font-size: 0.8rem; margin-top: 0.25rem;">
            <span>📍 ${escapeHtml(slot.venue)}</span>
            <span>👤 ${escapeHtml(slot.faculty)}</span>
          </div>
        </div>
      `;
    });
  }

  // Monthly date-based campus notices
  if (CAMPUS_EVENTS_DB.monthly[selDay]) {
    CAMPUS_EVENTS_DB.monthly[selDay].forEach(ev => {
      eventsList.innerHTML += `
        <div class="event-item-card ${ev.type === 'urgent' ? 'urgent' : 'info'}">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.2rem;">
            <strong style="color: var(--navy);">${escapeHtml(ev.title)}</strong>
            <span class="badge" style="background:#f1f5f9; color:#475569; font-size:0.75rem;">⏰ ${escapeHtml(ev.time)}</span>
          </div>
          <div style="color: #475569; font-size: 0.8rem; line-height: 1.4;">${escapeHtml(ev.desc)}</div>
        </div>
      `;
    });
  }
}

// ==================== 12. CAMPUS SALON & GROOMING ====================
async function loadSalonServices() {
  const branchFilter = document.getElementById('salon-branch-filter') ? document.getElementById('salon-branch-filter').value : 'ALL';
  const genderFilter = document.getElementById('salon-gender-filter') ? document.getElementById('salon-gender-filter').value : 'ALL';

  try {
    const res = await fetch(`/api/salon/services?gender=${genderFilter}`);
    const services = await res.json();
    salonServicesList = services;

    const grid = document.getElementById('salon-services-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const selectEl = document.getElementById('salon-select-service');
    if (selectEl) {
      selectEl.innerHTML = '';
    }

    services.forEach(s => {
      // Populate select dropdown
      if (selectEl) {
        const opt = document.createElement('option');
        opt.value = s.service_name;
        opt.innerText = `${s.service_name} (₹${s.price} • ${s.duration_mins} mins)`;
        selectEl.appendChild(opt);
      }

      // Populate service card
      const card = document.createElement('div');
      card.className = 'app-card';

      let genderBadgeStyle = 'background: #e0f2fe; color: #0284c7;';
      if (s.gender_type === 'Men Only') genderBadgeStyle = 'background: #dbeafe; color: #1d4ed8;';
      if (s.gender_type === 'Women Only') genderBadgeStyle = 'background: #fce7f3; color: #be185d;';

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--navy); line-height: 1.3;">${escapeHtml(s.service_name)}</h4>
          <span class="badge" style="${genderBadgeStyle} white-space:nowrap; margin-left:0.5rem;">${escapeHtml(s.gender_type)}</span>
        </div>

        <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.6rem;">
          <span style="font-size: 1.35rem; font-weight: 800; color: var(--navy);">₹${parseFloat(s.price).toFixed(0)}</span>
          <span style="font-size: 0.8rem; color: #64748b;">⏱️ ${s.duration_mins} Mins</span>
        </div>

        <p style="font-size: 0.84rem; color: #475569; line-height: 1.4; margin-bottom: 1rem; flex: 1;">
          ${escapeHtml(s.description || '')}
        </p>

        <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: 8px; padding: 0.6rem 0.75rem; margin-bottom: 0.75rem; font-size: 0.8rem;">
          <div style="color: #64748b;">Category: <strong>${escapeHtml(s.category)}</strong></div>
          <div style="color: #16a34a; font-weight: 600; margin-top: 0.15rem;">✓ Available Across Campus Salons</div>
        </div>

        <div style="border-top: 1px solid var(--border); padding-top: 0.75rem;">
          <button class="btn-primary" style="width: 100%; justify-content: center; font-size: 0.88rem;" onclick="openBookSalonModal('${escapeHtml(s.service_name)}')">
            Book Priority Slot ✂️
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}

async function loadSalonBookings() {
  const branch = document.getElementById('salon-branch-filter') ? document.getElementById('salon-branch-filter').value : 'ALL';
  try {
    const res = await fetch(`/api/salon/bookings?branch=${branch}`);
    const bookings = await res.json();
    const tbody = document.getElementById('salon-bookings-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (bookings.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 2rem; color: #64748b;">No salon appointments scheduled for this branch yet.</td></tr>`;
      return;
    }

    // Update Live Queue Monitor header cards
    const inQueueOrConfirmed = bookings.filter(b => b.status === 'In Queue' || b.status === 'Confirmed');
    if (inQueueOrConfirmed.length > 0) {
      document.getElementById('salon-live-token').innerText = inQueueOrConfirmed[0].token_code;
      if (inQueueOrConfirmed.length > 1) {
        document.getElementById('salon-next-token').innerText = inQueueOrConfirmed[1].token_code;
      } else {
        document.getElementById('salon-next-token').innerText = "Chair Available";
      }
    } else {
      document.getElementById('salon-live-token').innerText = "All Served";
      document.getElementById('salon-next-token').innerText = "Walk-in Open";
    }

    bookings.forEach(b => {
      let statusBadge = 'badge-completed';
      if (b.status === 'In Queue') statusBadge = 'badge-inprogress';
      if (b.status === 'Confirmed') statusBadge = 'badge-pending';
      if (b.status === 'Cancelled') statusBadge = 'badge-unpaid';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="color: #4338ca;">${escapeHtml(b.token_code)}</strong></td>
        <td>
          <div style="font-weight: 600;">${escapeHtml(b.student_name)}</div>
          <div style="font-size: 0.76rem; color: #64748b;">Reg: ${escapeHtml(b.reg_no)}</div>
        </td>
        <td><span class="badge" style="background:#e0f2fe; color:#0369a1;">${escapeHtml(b.hostel_block)}</span> Rm ${escapeHtml(b.room_no)}</td>
        <td><small style="font-weight:600;">${escapeHtml(b.salon_branch)}</small></td>
        <td>${escapeHtml(b.service_name)}</td>
        <td>
          <div>📅 ${escapeHtml(b.booking_date)}</div>
          <div style="font-size: 0.78rem; font-weight:600; color: #ea580c;">⏰ ${escapeHtml(b.time_slot)}</div>
        </td>
        <td><small style="color: #475569;">${escapeHtml(b.stylist_preference)}</small></td>
        <td><span class="badge ${statusBadge}">${escapeHtml(b.status)}</span></td>
        <td>
          ${b.status !== 'Completed' ? `
            <button class="btn-success" style="padding: 0.25rem 0.5rem; font-size: 0.78rem;" onclick="markSalonCompleted(${b.id})">
              ✓ Done
            </button>
          ` : '<span style="color: #16a34a; font-size: 0.8rem; font-weight:600;">Completed</span>'}
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
  }
}

function openBookSalonModal(preselectedService) {
  if (preselectedService) {
    const selectEl = document.getElementById('salon-select-service');
    if (selectEl) {
      selectEl.value = preselectedService;
    }
  }
  const dateInput = document.getElementById('salon-book-date');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }
  openModal('book-salon-modal');
}

async function submitSalonBooking(e) {
  e.preventDefault();

  const payload = {
    student_name: document.getElementById('salon-student-name').value.trim(),
    reg_no: document.getElementById('salon-student-reg').value.trim(),
    phone: document.getElementById('salon-student-phone').value.trim(),
    hostel_block: document.getElementById('salon-student-block').value,
    room_no: document.getElementById('salon-student-room').value.trim(),
    salon_branch: document.getElementById('salon-select-branch').value,
    service_name: document.getElementById('salon-select-service').value,
    booking_date: document.getElementById('salon-book-date').value,
    time_slot: document.getElementById('salon-book-slot').value,
    stylist_preference: document.getElementById('salon-stylist-pref').value
  };

  try {
    const res = await fetch('/api/salon/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (result.success) {
      showToast(`Slot Booked! Token: ${result.token_code} at ${result.salon_branch}`);
      closeModal('book-salon-modal');
      document.getElementById('book-salon-form').reset();
      // Reset today's date
      const dateInput = document.getElementById('salon-book-date');
      if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
      loadSalonBookings();
    } else {
      showToast(result.error || 'Failed to book salon slot', 'error');
    }
  } catch (err) {
    showToast('Network error while booking salon slot', 'error');
  }
}

async function markSalonCompleted(id) {
  try {
    const res = await fetch(`/api/salon/${id}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Completed' })
    });
    const result = await res.json();
    if (result.success) {
      showToast('Salon session marked as completed.');
      loadSalonBookings();
    }
  } catch (err) {
    const item = LOCAL_DEMO_DB.cleaning.find(c => c.id === id);
    if (item) item.status = 'Completed';
    showToast(`Request #CLN-${id} marked as completed.`);
    loadCleaningRequests();
  }
}

// ==================== 13. STUDENT TO-DO & TASK PLANNER ====================

let currentTodoStatus = 'ALL';

function setTodoStatusFilter(status, btn) {
  currentTodoStatus = status;
  document.querySelectorAll('#todo-filter-all, #todo-filter-pending, #todo-filter-completed').forEach(b => {
    b.style.background = '#f1f5f9';
    b.style.color = '#475569';
    b.style.border = '1px solid #cbd5e1';
  });
  if (btn) {
    btn.style.background = '#0f172a';
    btn.style.color = 'white';
    btn.style.border = 'none';
  }
  loadTodos();
}

async function loadTodos() {
  const category = document.getElementById('todo-category-filter') ? document.getElementById('todo-category-filter').value : 'ALL';
  try {
    const res = await fetch(`/api/todos?status=${currentTodoStatus}&category=${category}`);
    const data = await res.json();

    // Update Progress Stats
    const percentEl = document.getElementById('todo-stat-percent');
    const barEl = document.getElementById('todo-progress-bar');
    const pendingEl = document.getElementById('todo-stat-pending');
    const completedEl = document.getElementById('todo-stat-completed');
    const totalEl = document.getElementById('todo-stat-total');

    if (percentEl) percentEl.innerText = `${data.percent}%`;
    if (barEl) barEl.style.width = `${data.percent}%`;
    if (pendingEl) pendingEl.innerText = `${data.pending} Tasks`;
    if (completedEl) completedEl.innerText = `${data.completed} Tasks`;
    if (totalEl) totalEl.innerText = `${data.total}`;

    const listEl = document.getElementById('todo-items-list');
    if (!listEl) return;
    listEl.innerHTML = '';

    if (!data.todos || data.todos.length === 0) {
      listEl.innerHTML = `
        <div style="background: white; border: 1px dashed var(--border); border-radius: 10px; padding: 2.5rem; text-align: center; color: #64748b;">
          🎉 No tasks found! Use the quick-add bar above to create a task or assignment reminder.
        </div>
      `;
      return;
    }

    data.todos.forEach(item => {
      const card = document.createElement('div');
      card.className = `todo-item-card ${item.is_completed ? 'completed' : ''}`;

      let priorityColor = '#eab308; background:#fef9c3;';
      if (item.priority === 'High') priorityColor = '#dc2626; background:#fee2e2;';
      if (item.priority === 'Low') priorityColor = '#16a34a; background:#dcfce7;';

      const isDone = item.is_completed === 1;

      card.innerHTML = `
        <button class="todo-check-btn ${isDone ? 'checked' : ''}" onclick="toggleTodoStatus(${item.id})" title="${isDone ? 'Mark as Pending' : 'Mark as Completed'}">
          ${isDone ? '✓' : ''}
        </button>
        <div class="todo-content">
          <div class="todo-title ${isDone ? 'completed' : ''}">${escapeHtml(item.title)}</div>
          <div class="todo-meta">
            <span class="badge" style="background:#f1f5f9; color:#475569; font-size:0.75rem;">📁 ${escapeHtml(item.category)}</span>
            <span class="badge" style="color:${priorityColor} font-size:0.75rem; font-weight:700;">${escapeHtml(item.priority)}</span>
            <span>📅 Due: <strong>${escapeHtml(item.due_date)}</strong> ${item.due_time ? `(${escapeHtml(item.due_time)})` : ''}</span>
          </div>
        </div>
        <button class="btn-todo-delete" onclick="deleteTodoItem(${item.id})" title="Delete Task">
          &times;
        </button>
      `;
      listEl.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}

async function submitQuickTodo(e) {
  e.preventDefault();
  const title = document.getElementById('quick-todo-title').value.trim();
  const category = document.getElementById('quick-todo-category').value;
  const priority = document.getElementById('quick-todo-priority').value;

  if (!title) return;

  try {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        category,
        priority,
        due_date: new Date().toISOString().split('T')[0],
        due_time: '11:59 PM'
      })
    });
    const result = await res.json();
    if (result.success) {
      showToast('Task added to your checklist!');
      document.getElementById('quick-todo-title').value = '';
      loadTodos();
    } else {
      showToast(result.error || 'Failed to add task', 'error');
    }
  } catch (err) {
    showToast('Network error adding task', 'error');
  }
}

async function submitDetailedTodo(e) {
  e.preventDefault();
  const title = document.getElementById('todo-modal-title').value.trim();
  const category = document.getElementById('todo-modal-category').value;
  const priority = document.getElementById('todo-modal-priority').value;
  const due_date = document.getElementById('todo-modal-date').value;
  const due_time = document.getElementById('todo-modal-time').value.trim();

  if (!title) return;

  try {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        category,
        priority,
        due_date,
        due_time
      })
    });
    const result = await res.json();
    if (result.success) {
      showToast('Detailed task saved!');
      closeModal('add-todo-modal');
      document.getElementById('add-todo-form').reset();
      const dateInput = document.getElementById('todo-modal-date');
      if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
      loadTodos();
    } else {
      showToast(result.error || 'Failed to create task', 'error');
    }
  } catch (err) {
    showToast('Network error creating task', 'error');
  }
}

async function toggleTodoStatus(id) {
  try {
    const res = await fetch(`/api/todos/${id}/toggle`, { method: 'POST' });
    const result = await res.json();
    if (result.success) {
      showToast(result.is_completed ? 'Task completed! 🎯' : 'Task moved to pending.');
      loadTodos();
    }
  } catch (err) {
    showToast('Error toggling task', 'error');
  }
}

async function deleteTodoItem(id) {
  try {
    const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
      showToast('Task removed from list.');
      loadTodos();
    }
  } catch (err) {
    showToast('Error deleting task', 'error');
  }
}

// Escape HTML utility for security
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==================== STUDENT PRIVATE DOMAIN & AUTHENTICATION ====================

function applyStudentDomainSession() {
  if (!currentStudent) return;

  // Header displays
  const headerReg = document.getElementById('header-reg-display');
  const headerAvatar = document.getElementById('header-avatar-initials');
  if (headerReg) headerReg.textContent = currentStudent.reg_no;
  if (headerAvatar) headerAvatar.textContent = currentStudent.avatar_initials || currentStudent.student_name.slice(0, 2).toUpperCase();

  // Sidebar profile displays
  const sideName = document.getElementById('sidebar-user-name');
  const sideRoom = document.getElementById('sidebar-user-room');
  const sideAvatar = document.getElementById('sidebar-avatar-initials');
  if (sideName) sideName.textContent = currentStudent.student_name;
  if (sideRoom) sideRoom.textContent = `${currentStudent.hostel_block} • Room ${currentStudent.room_no}`;
  if (sideAvatar) sideAvatar.textContent = currentStudent.avatar_initials || currentStudent.student_name.slice(0, 2).toUpperCase();

  // Feedback display
  const fbStudentDisplay = document.getElementById('feedback-student-display');
  if (fbStudentDisplay) {
    fbStudentDisplay.textContent = `${currentStudent.student_name} (${currentStudent.reg_no})`;
  }

  // Pre-fill student fields in modals automatically
  const cleanName = document.getElementById('clean-name');
  const cleanReg = document.getElementById('clean-reg');
  const cleanBlock = document.getElementById('clean-block');
  const cleanRoom = document.getElementById('clean-room');
  if (cleanName) cleanName.value = currentStudent.student_name;
  if (cleanReg) cleanReg.value = currentStudent.reg_no;
  if (cleanBlock) cleanBlock.value = currentStudent.hostel_block;
  if (cleanRoom) cleanRoom.value = currentStudent.room_no;

  const elecBlock = document.getElementById('elec-search-block');
  const elecRoom = document.getElementById('elec-search-room');
  if (elecBlock) elecBlock.value = currentStudent.hostel_block;
  if (elecRoom) elecRoom.value = currentStudent.room_no;

  const marketName = document.getElementById('market-seller');
  const marketBlock = document.getElementById('market-block');
  const marketRoom = document.getElementById('market-room');
  const marketPhone = document.getElementById('market-phone');
  if (marketName) marketName.value = currentStudent.student_name;
  if (marketBlock) marketBlock.value = currentStudent.hostel_block;
  if (marketRoom) marketRoom.value = currentStudent.room_no;
  if (marketPhone) marketPhone.value = currentStudent.phone;
}

function openStudentLoginModal() {
  openModal('student-login-modal');
  const regInput = document.getElementById('login-reg-no');
  if (regInput && currentStudent) regInput.value = currentStudent.reg_no;
}

function fillDemoCredentials() {
  const regInput = document.getElementById('login-reg-no');
  const passInput = document.getElementById('login-password');
  if (regInput) regInput.value = '12204561';
  if (passInput) passInput.value = 'lpu@1234';
  showToast('Demo student credentials filled! Click Log In.');
}

async function handleStudentLogin(e) {
  e.preventDefault();
  const regNo = document.getElementById('login-reg-no').value.trim();
  const password = document.getElementById('login-password').value.trim();

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reg_no: regNo, password: password })
    });
    if (res.ok) {
      const result = await res.json();
      if (result.success && result.user) {
        currentStudent = result.user;
        localStorage.setItem('lpu_student_session', JSON.stringify(currentStudent));
        applyStudentDomainSession();
        closeModal('student-login-modal');
        showToast(`Logged in: ${currentStudent.student_name} (${currentStudent.reg_no})`);
        searchMeterReading();
        loadCleaningRequests();
        loadHostelFeedbacks();
        return;
      }
    }
  } catch (err) {
    console.warn('Local mode authentication');
  }

  // Local fallback demo authentication
  if (regNo === '12204561' || regNo === '12204562' || regNo.length > 0) {
    currentStudent = {
      reg_no: regNo || '12204561',
      student_name: (regNo === '12204562') ? 'Aman Verma' : 'Sarthak Mishra',
      hostel_block: 'BH-3',
      room_no: '412',
      department: 'B.Tech Computer Science & Engg',
      phone: '9876543210',
      avatar_initials: (regNo === '12204562') ? 'AV' : 'SM'
    };
    localStorage.setItem('lpu_student_session', JSON.stringify(currentStudent));
    applyStudentDomainSession();
    closeModal('student-login-modal');
    showToast(`Logged into student domain: ${currentStudent.student_name} (${currentStudent.reg_no})`);
    searchMeterReading();
    loadCleaningRequests();
    loadHostelFeedbacks();
  } else {
    showToast('Use demo credentials: 12204561 / lpu@1234', 'error');
  }
}

// ==================== HOSTEL SERVICES FEEDBACK & CHECKLIST ====================

// Star rating label update on change
document.addEventListener('change', (e) => {
  if (e.target && e.target.name === 'rating_score') {
    const hint = document.getElementById('rating-label-hint');
    if (!hint) return;
    const val = parseInt(e.target.value);
    const hints = {
      5: '5 Stars - Outstanding Experience',
      4: '4 Stars - Good & Satisfactory',
      3: '3 Stars - Average / Minor Issues',
      2: '2 Stars - Poor Quality / Needs Action',
      1: '1 Star - Critical Complaints'
    };
    hint.textContent = hints[val] || `${val} Stars`;
  }
});

async function submitHostelFeedback(e) {
  e.preventDefault();
  const checkedBoxes = document.querySelectorAll('input[name="services_check"]:checked');
  const servicesList = Array.from(checkedBoxes).map(cb => cb.value).join(', ');
  if (!servicesList) {
    showToast('Please select at least one service from the checklist to review.', 'error');
    return;
  }
  const ratingRadio = document.querySelector('input[name="rating_score"]:checked');
  const overallRating = ratingRadio ? parseInt(ratingRadio.value) : 5;
  const category = document.getElementById('fb-category').value;
  const recommend = document.getElementById('fb-recommend').value === '1';
  const description = document.getElementById('fb-description').value.trim();
  if (!description) {
    showToast('Please enter your feedback description.', 'error');
    return;
  }

  const newFeedback = {
    reg_no: currentStudent.reg_no,
    student_name: currentStudent.student_name,
    hostel_block: currentStudent.hostel_block,
    room_no: currentStudent.room_no,
    services_reviewed: servicesList,
    overall_rating: overallRating,
    feedback_category: category,
    feedback_text: description,
    would_recommend: recommend,
    status: "Under Review by Warden"
  };

  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeedback)
    });
    if (res.ok) {
      showToast('Feedback & ratings submitted directly to Warden Desk! ⭐');
      document.getElementById('fb-description').value = '';
      loadHostelFeedbacks();
      return;
    }
  } catch (err) {
    console.warn('Local mode feedback submission');
  }

  // Local storage fallback
  const localFBs = JSON.parse(localStorage.getItem('lpu_local_feedbacks') || '[]');
  localFBs.unshift(newFeedback);
  localStorage.setItem('lpu_local_feedbacks', JSON.stringify(localFBs));
  showToast('Feedback & ratings submitted directly to Warden Desk! ⭐');
  document.getElementById('fb-description').value = '';
  loadHostelFeedbacks();
}

async function loadHostelFeedbacks() {
  const container = document.getElementById('feedback-history-list');
  if (!container) return;

  let feedbacks = [];
  try {
    const regNo = currentStudent ? currentStudent.reg_no : '';
    const res = await fetch(`/api/feedback?reg_no=${encodeURIComponent(regNo)}`);
    if (res.ok) feedbacks = await res.json();
  } catch (err) {
    console.warn('Local mode feedback loading');
  }

  if (!feedbacks || feedbacks.length === 0) {
    const localFBs = JSON.parse(localStorage.getItem('lpu_local_feedbacks') || '[]');
    feedbacks = [...localFBs, ...LOCAL_DEMO_DB.feedbacks];
  }

  container.innerHTML = feedbacks.map(fb => {
    const starsHtml = '★'.repeat(fb.overall_rating) + '☆'.repeat(5 - fb.overall_rating);
    const servicesChips = (fb.services_reviewed || '').split(',').map(s => s.trim()).filter(Boolean);

    return `
      <div class="feedback-history-card">
        <div class="fb-card-top">
          <span class="fb-stars">${starsHtml}</span>
          <span class="fb-category-tag">${escapeHtml(fb.feedback_category)}</span>
        </div>
        <div class="fb-services-chips">
          ${servicesChips.map(sc => `<span class="fb-chip">✓ ${escapeHtml(sc)}</span>`).join('')}
        </div>
        <div class="fb-comment">
          "${escapeHtml(fb.feedback_text)}"
        </div>
        <div class="fb-footer">
          <span>By: <strong>${escapeHtml(fb.student_name)}</strong> (${escapeHtml(fb.hostel_block)}-${escapeHtml(fb.room_no)})</span>
          <span class="fb-warden-status">🛡️ ${escapeHtml(fb.status || 'Under Review by Warden')}</span>
        </div>
      </div>
    `;
  }).join('');
}

// ==================== UNI-HOSPITAL & SPECIALIST DOCTORS ====================
let unihospitalDoctorsList = [];

async function loadUniHospitalDoctors() {
  const grid = document.getElementById('unihospital-doctors-grid');
  const selectEl = document.getElementById('unihos-doctor-select');
  const deptFilter = document.getElementById('unihospital-dept-filter') ? document.getElementById('unihospital-dept-filter').value : 'ALL';

  let doctors = [];
  try {
    const res = await fetch(`/api/unihospital/doctors${deptFilter !== 'ALL' ? '?department=' + encodeURIComponent(deptFilter) : ''}`);
    if (res.ok) doctors = await res.json();
    else doctors = LOCAL_DEMO_DB.doctors;
  } catch (err) {
    doctors = LOCAL_DEMO_DB.doctors;
  }

  if (!doctors || doctors.length === 0) {
    doctors = LOCAL_DEMO_DB.doctors;
  }

  // Filter if local
  if (deptFilter && deptFilter !== 'ALL') {
    doctors = doctors.filter(d => (d.department || '').toLowerCase().includes(deptFilter.toLowerCase()));
  }

  unihospitalDoctorsList = doctors;

  if (selectEl) {
    selectEl.innerHTML = '';
    (LOCAL_DEMO_DB.doctors || doctors).forEach(doc => {
      const opt = document.createElement('option');
      opt.value = doc.doctor_name;
      opt.textContent = `${doc.doctor_name} (${doc.department}) - ${doc.timings}`;
      selectEl.appendChild(opt);
    });
  }

  if (grid) {
    grid.innerHTML = doctors.map(doc => `
      <div class="doctor-card app-card" style="display: flex; flex-direction: column; justify-content: space-between; gap: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; background: var(--surface); box-shadow: var(--shadow-sm);">
        <div>
          <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.75rem;">
            <img src="${escapeHtml(doc.image_url)}" alt="${escapeHtml(doc.doctor_name)}" style="width: 65px; height: 65px; border-radius: 50%; object-fit: cover; border: 3px solid #0284c7; flex-shrink: 0;" onerror="this.src='https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400'">
            <div>
              <span class="badge" style="background:#e0f2fe; color:#0369a1; font-size:0.75rem; font-weight:700;">${escapeHtml(doc.department)}</span>
              <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--navy); margin: 0.2rem 0 0.1rem 0;">${escapeHtml(doc.doctor_name)}</h3>
              <div style="font-size: 0.8rem; color: #64748b; font-weight: 500;">${escapeHtml(doc.qualification)}</div>
            </div>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-main); line-height: 1.4; background: var(--surface-alt, #f8fafc); padding: 0.6rem; border-radius: 8px; margin-bottom: 0.75rem;">
            ${escapeHtml(doc.specialty)}
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #475569; font-weight: 600;">
            <span>📍 ${escapeHtml(doc.room_no)}</span>
            <span>⏰ ${escapeHtml(doc.timings)}</span>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 0.75rem; border-top: 1px dashed var(--border);">
          <span style="font-size: 0.75rem; color: #16a34a; font-weight: 700;">✓ ${escapeHtml(doc.experience)}</span>
          <button class="btn-primary" style="padding: 0.45rem 0.9rem; font-size: 0.82rem;" onclick="openDoctorBookingModal('${escapeHtml(doc.doctor_name)}')">📅 Book OPD</button>
        </div>
      </div>
    `).join('');
  }
}

async function loadUniHospitalAppointments() {
  const tbody = document.getElementById('unihospital-appointments-table-body');
  if (!tbody) return;

  let appointments = [];
  try {
    const regNo = currentStudent ? currentStudent.reg_no : '';
    const res = await fetch(`/api/unihospital/appointments?reg_no=${encodeURIComponent(regNo)}`);
    if (res.ok) appointments = await res.json();
  } catch (err) {
    // Offline mode
  }

  if (!appointments || appointments.length === 0) {
    const localApts = JSON.parse(localStorage.getItem('lpu_local_appointments') || '[]');
    appointments = [...localApts, ...LOCAL_DEMO_DB.appointments];
  }

  if (appointments.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 2rem; color:#64748b;">No OPD appointments booked yet. Click "Book OPD" above to generate your token.</td></tr>';
    return;
  }

  tbody.innerHTML = appointments.map(apt => `
    <tr>
      <td><strong style="color: #0284c7; font-size: 0.95rem;">${escapeHtml(apt.token_code)}</strong></td>
      <td>
        <div style="font-weight: 600;">${escapeHtml(apt.student_name)}</div>
        <div style="font-size: 0.78rem; color: #64748b;">Reg: ${escapeHtml(apt.reg_no)} &bull; ${escapeHtml(apt.hostel_block || '')}-${escapeHtml(apt.room_no || '')}</div>
      </td>
      <td>
        <div style="font-weight: 600; color: var(--navy);">${escapeHtml(apt.doctor_name)}</div>
        <div style="font-size: 0.78rem; color: #0284c7;">${escapeHtml(apt.department)}</div>
      </td>
      <td>
        <div style="font-weight: 600;">${escapeHtml(apt.appointment_date)}</div>
        <div style="font-size: 0.78rem; color: #64748b;">⏰ ${escapeHtml(apt.time_slot)}</div>
      </td>
      <td>
        <small style="color: #475569; max-width: 220px; display: inline-block;">${escapeHtml(apt.symptoms || 'General Checkup')}</small>
      </td>
      <td>
        <span class="badge badge-completed" style="background:#dcfce7; color:#15803d; font-weight:700;">✓ ${escapeHtml(apt.status || 'Confirmed')}</span>
      </td>
      <td>
        <button class="btn-secondary" style="font-size:0.75rem; padding:0.25rem 0.5rem;" onclick="alert('🏥 Uni-Hospital Token: ' + '${escapeHtml(apt.token_code)}' + '\nDoctor: ' + '${escapeHtml(apt.doctor_name)}' + '\nSlot: ' + '${escapeHtml(apt.time_slot)}' + '\nPlease report at Uni-Hospital Ground Floor OPD Counter 10 mins prior.')">Slip</button>
      </td>
    </tr>
  `).join('');
}

function openDoctorBookingModal(doctorName = '') {
  openModal('unihospital-booking-modal');
  const docSelect = document.getElementById('unihos-doctor-select');
  if (docSelect && doctorName) {
    for (let opt of docSelect.options) {
      if (opt.value.includes(doctorName)) {
        opt.selected = true;
        break;
      }
    }
  }

  // Pre-fill student credentials
  const nameInput = document.getElementById('unihos-student-name');
  const regInput = document.getElementById('unihos-reg-no');
  const phoneInput = document.getElementById('unihos-phone');
  const blockInput = document.getElementById('unihos-hostel-block');
  const roomInput = document.getElementById('unihos-room-no');
  const dateInput = document.getElementById('unihos-book-date');

  if (nameInput) nameInput.value = currentStudent.student_name || '';
  if (regInput) regInput.value = currentStudent.reg_no || '';
  if (phoneInput) phoneInput.value = currentStudent.phone || '9876543210';
  if (blockInput) blockInput.value = currentStudent.hostel_block || 'BH-3';
  if (roomInput) roomInput.value = currentStudent.room_no || '412';
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }
}

async function submitDoctorAppointment(e) {
  if (e) e.preventDefault();
  const doctorName = document.getElementById('unihos-doctor-select').value;
  const appointmentDate = document.getElementById('unihos-book-date').value;
  const timeSlot = document.getElementById('unihos-book-slot').value;
  const studentName = document.getElementById('unihos-student-name').value.trim();
  const regNo = document.getElementById('unihos-reg-no').value.trim();
  const phone = document.getElementById('unihos-phone').value.trim();
  const hostelBlock = document.getElementById('unihos-hostel-block').value;
  const roomNo = document.getElementById('unihos-room-no').value.trim();
  const symptoms = document.getElementById('unihos-symptoms').value.trim();

  // Find department
  const selectedDocObj = (unihospitalDoctorsList || []).find(d => d.doctor_name === doctorName);
  const department = selectedDocObj ? selectedDocObj.department : 'General OPD';

  const tokenCode = 'UNI-OPD-' + Math.floor(1000 + Math.random() * 9000);

  const payload = {
    token_code: tokenCode,
    student_name: studentName,
    reg_no: regNo,
    phone: phone,
    hostel_block: hostelBlock,
    room_no: roomNo,
    doctor_name: doctorName,
    department: department,
    appointment_date: appointmentDate,
    time_slot: timeSlot,
    symptoms: symptoms,
    status: 'Confirmed'
  };

  try {
    const res = await fetch('/api/unihospital/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const result = await res.json();
      closeModal('unihospital-booking-modal');
      showToast(`OPD Confirmed! Token #${result.token_code || tokenCode} issued for ${doctorName}`);
      loadUniHospitalAppointments();
      return;
    }
  } catch (err) {
    // Fallback to local
  }

  // Local storage save
  const localApts = JSON.parse(localStorage.getItem('lpu_local_appointments') || '[]');
  localApts.unshift(payload);
  localStorage.setItem('lpu_local_appointments', JSON.stringify(localApts));

  closeModal('unihospital-booking-modal');
  showToast(`OPD Confirmed (Demo)! Token #${tokenCode} issued for ${doctorName}`);
  loadUniHospitalAppointments();
}
