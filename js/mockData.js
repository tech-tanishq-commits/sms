// Shared mock data and initial states for Campus Hostel Portal Suite

const MOCK_DATA = {
  hostelInfo: {
    name: "Campus Hostel & Mess Portal",
    campus: "University Campus Central",
    blocks: ["Block A (Boys)", "Block B (Boys)", "Block C (Girls)", "Block D (Girls)"],
    currentBlock: "Block A (Boys)",
    currentRoom: "Room 408 - 4th Floor"
  },

  messSchedule: {
    today: "Saturday Special Menu",
    nextMeal: "Dinner (7:30 PM - 9:30 PM)",
    statusAlert: "Dinner is being served now in Mess Hall 1 & 2",
    meals: {
      breakfast: {
        title: "Breakfast",
        time: "7:30 AM - 9:30 AM",
        status: "Completed",
        items: [
          { name: "Aloo Paratha with Curd & Pickle", type: "veg", calories: "380 kcal", icon: "🥞" },
          { name: "Poha with Sev, Onion & Peanuts", type: "veg", calories: "240 kcal", icon: "🥣" },
          { name: "Boiled Eggs (2 pcs with Black Pepper)", type: "non-veg", calories: "155 kcal", icon: "🥚" },
          { name: "Fresh Banana & Papaya Slices", type: "veg", calories: "105 kcal", icon: "🍌" },
          { name: "Special Cardamom Masala Chai / Milk", type: "veg", calories: "120 kcal", icon: "☕" }
        ]
      },
      lunch: {
        title: "Lunch",
        time: "12:30 PM - 2:30 PM",
        status: "Completed",
        items: [
          { name: "Paneer Butter Masala", type: "veg", calories: "420 kcal", icon: "🍲" },
          { name: "Dal Tadka (Double Fry with Garlic)", type: "veg", calories: "210 kcal", icon: "🥣" },
          { name: "Jeera Rice & Tawa Butter Roti", type: "veg", calories: "310 kcal", icon: "🍚" },
          { name: "Chicken Curry (Non-Veg Coupon Token)", type: "non-veg", calories: "450 kcal", icon: "🍗" },
          { name: "Boondi Raita & Fresh Green Salad", type: "veg", calories: "110 kcal", icon: "🥗" }
        ]
      },
      snacks: {
        title: "Evening Snacks",
        time: "5:00 PM - 6:00 PM",
        status: "Completed",
        items: [
          { name: "Crispy Vegetable Cutlet with Mint Chutney", type: "veg", calories: "220 kcal", icon: "🥪" },
          { name: "Ginger Adrak Chai / Hot Coffee", type: "veg", calories: "90 kcal", icon: "☕" },
          { name: "Sweet Corn Chaat with Lemon", type: "veg", calories: "140 kcal", icon: "🌽" }
        ]
      },
      dinner: {
        title: "Dinner",
        time: "7:30 PM - 9:30 PM",
        status: "Serving Now",
        highlight: "Chef's Weekend Special",
        items: [
          { name: "Kadai Paneer / Shahi Malai Kofta", type: "veg", calories: "390 kcal", icon: "🥘" },
          { name: "Butter Chicken / Egg Masala Special", type: "non-veg", calories: "480 kcal", icon: "🍗" },
          { name: "Yellow Dal Fry & Steamed Basmati Rice", type: "veg", calories: "280 kcal", icon: "🍚" },
          { name: "Hot Tandoori Roti & Phulkas", type: "veg", calories: "260 kcal", icon: "🫓" },
          { name: "Hot Gulab Jamun with Rose Syrup (2 pcs)", type: "veg", calories: "290 kcal", icon: "🍯" }
        ]
      }
    }
  },

  medicalProducts: [
    {
      id: "med-1",
      name: "Paracetamol 650mg (Dolo 650)",
      category: "Fever & Pain Relief",
      price: 32,
      pack: "Strip of 15 tablets",
      stockText: "In Stock at Campus Dispensary",
      inStock: true,
      icon: "💊",
      desc: "Fast relief from fever, body aches and headaches."
    },
    {
      id: "med-2",
      name: "Electral ORS Powder (Energy Sachet)",
      category: "Hydration & Weakness",
      price: 22,
      pack: "Pack of 2 sachets",
      stockText: "In Stock at Campus Dispensary",
      inStock: true,
      icon: "🥤",
      desc: "Essential electrolyte replenishment for dehydration & weakness."
    },
    {
      id: "med-3",
      name: "Volini Pain Relief Spray",
      category: "Sports & Muscle Sprain",
      price: 135,
      pack: "55g spray bottle",
      stockText: "In Stock at Campus Dispensary",
      inStock: true,
      icon: "💨",
      desc: "Quick spray relief for gym sprains, back pain, joint stiffness."
    },
    {
      id: "med-4",
      name: "Betadine Antiseptic + Band-Aids",
      category: "First Aid & Wound Care",
      price: 65,
      pack: "20g tube + 10 waterproof bandages",
      stockText: "In Stock at Campus Dispensary",
      inStock: true,
      icon: "🩹",
      desc: "Microbicidal ointment with sterilized waterproof dressings."
    },
    {
      id: "med-5",
      name: "Digital Fever Thermometer",
      category: "Health Monitors",
      price: 180,
      pack: "1 unit with protective case",
      stockText: "In Stock at Campus Dispensary",
      inStock: true,
      icon: "🌡️",
      desc: "Fast 10-second digital reading with fever alarm buzzer."
    },
    {
      id: "med-6",
      name: "Vicks Vaporub + Inhaler Stick Combo",
      category: "Cold & Congestion",
      price: 85,
      pack: "25ml jar + pocket inhaler",
      stockText: "In Stock at Campus Dispensary",
      inStock: true,
      icon: "🌿",
      desc: "Effective steam & nasal inhalation relief from cold and blocked nose."
    },
    {
      id: "med-7",
      name: "Eno Fruit Salt (Lemon Flavour)",
      category: "Acidity & Digestion",
      price: 10,
      pack: "Single instant action sachet",
      stockText: "In Stock at Campus Dispensary",
      inStock: true,
      icon: "🍋",
      desc: "Neutralizes stomach acidity in 6 seconds."
    },
    {
      id: "med-8",
      name: "Strepsils Honey & Lemon Lozenges",
      category: "Throat Care",
      price: 36,
      pack: "Pack of 8 soothing lozenges",
      stockText: "In Stock at Campus Dispensary",
      inStock: true,
      icon: "🍯",
      desc: "Antibacterial throat relief for sore throat and persistent cough."
    }
  ],

  emergencyContacts: [
    { title: "Hostel Chief Warden", name: "Prof. R. K. Sharma", phone: "+91 98765 43210", category: "Warden", icon: "👨‍🏫", badge: "24/7 Available", location: "Warden Quarters Q-4" },
    { title: "Block A Caretaker & Key Custodian", name: "Mr. Satish Verma", phone: "+91 98112 34567", category: "Caretaker", icon: "🔑", badge: "Ground Floor Office", location: "Block A Room 002" },
    { title: "Campus Ambulance & Trauma Cell", name: "Emergency Medical Unit", phone: "+91 98000 10800", category: "Medical", icon: "🚑", badge: "Priority Immediate", location: "Dispensary Ground" },
    { title: "Campus Security Main Gate", name: "Security Control Room", phone: "+91 98777 66554", category: "Security", icon: "🛡️", badge: "24/7 Gate Patrol", location: "Main Entry Gate 1" },
    { title: "Hostel Electrician & Power Breakdown", name: "Mr. Manoj Kumar", phone: "+91 98333 22110", category: "Maintenance", icon: "⚡", badge: "8:00 AM - 10:00 PM", location: "Substation Block" },
    { title: "Plumber & Water Supply Emergency", name: "Mr. Ramesh Yadav", phone: "+91 98222 11009", category: "Maintenance", icon: "🔧", badge: "8:00 AM - 8:00 PM", location: "Pump House Behind Block B" },
    { title: "Campus Anti-Ragging Helpline", name: "National UGC Committee", phone: "1800-180-5522", category: "Security", icon: "⚖️", badge: "Toll-Free National", location: "Central Administration" }
  ],

  // Departmental store inventory with cross-building stock tracker
  storeInventory: [
    {
      id: "store-1",
      name: "Classmate Long Notebook (Ruled 180 pgs)",
      category: "Stationery",
      price: 65,
      currentBuilding: "Block A Store",
      inStockHere: true,
      quantityHere: 28,
      icon: "📓",
      otherBuildings: [
        { building: "Block B Store", quantity: 15, available: true },
        { building: "Block C Store", quantity: 30, available: true },
        { building: "Central Food Court Store", quantity: 50, available: true }
      ]
    },
    {
      id: "store-2",
      name: "Maggi 2-Minute Noodles (Pack of 4)",
      category: "Snacks & Food",
      price: 56,
      currentBuilding: "Block A Store",
      inStockHere: false, // OUT OF STOCK IN BLOCK A
      quantityHere: 0,
      icon: "🍜",
      otherBuildings: [
        { building: "Block B Store", quantity: 18, available: true },
        { building: "Block D Store", quantity: 24, available: true },
        { building: "Central Food Court Store", quantity: 45, available: true }
      ]
    },
    {
      id: "store-3",
      name: "Dettol Original Bathing Soap (125g)",
      category: "Toiletries",
      price: 45,
      currentBuilding: "Block A Store",
      inStockHere: true,
      quantityHere: 12,
      icon: "🧼",
      otherBuildings: [
        { building: "Block C Store", quantity: 8, available: true },
        { building: "Block D Store", quantity: 19, available: true }
      ]
    },
    {
      id: "store-4",
      name: "Amul Taaza Toned Milk (500ml Tetra)",
      category: "Dairy & Beverages",
      price: 28,
      currentBuilding: "Block A Store",
      inStockHere: false, // OUT OF STOCK IN BLOCK A
      quantityHere: 0,
      icon: "🥛",
      otherBuildings: [
        { building: "Block C Store", quantity: 14, available: true },
        { building: "Central Food Court Store", quantity: 32, available: true }
      ]
    },
    {
      id: "store-5",
      name: "Pilot V5 Hi-Tecpoint Pen (Blue)",
      category: "Stationery",
      price: 50,
      currentBuilding: "Block A Store",
      inStockHere: true,
      quantityHere: 40,
      icon: "🖊️",
      otherBuildings: [
        { building: "Block B Store", quantity: 22, available: true },
        { building: "Central Food Court Store", quantity: 60, available: true }
      ]
    },
    {
      id: "store-6",
      name: "Colgate Total Toothpaste (150g)",
      category: "Toiletries",
      price: 110,
      currentBuilding: "Block A Store",
      inStockHere: false, // OUT OF STOCK IN BLOCK A
      quantityHere: 0,
      icon: "🪥",
      otherBuildings: [
        { building: "Block B Store", quantity: 9, available: true },
        { building: "Block C Store", quantity: 16, available: true }
      ]
    },
    {
      id: "store-7",
      name: "Lay's Magic Masala Chips (Family Pack)",
      category: "Snacks & Food",
      price: 30,
      currentBuilding: "Block A Store",
      inStockHere: true,
      quantityHere: 19,
      icon: "🥔",
      otherBuildings: [
        { building: "Block B Store", quantity: 25, available: true },
        { building: "Block D Store", quantity: 30, available: true }
      ]
    },
    {
      id: "store-8",
      name: "Anchor Extension Cord (4 Sockets + Surge Switch)",
      category: "Daily Essentials",
      price: 350,
      currentBuilding: "Block A Store",
      inStockHere: false, // OUT OF STOCK IN BLOCK A
      quantityHere: 0,
      icon: "🔌",
      otherBuildings: [
        { building: "Block B Store", quantity: 4, available: true },
        { building: "Central Food Court Store", quantity: 11, available: true }
      ]
    },
    {
      id: "store-9",
      name: "Plastic Bucket & Mug Set (20 Liters)",
      category: "Daily Essentials",
      price: 220,
      currentBuilding: "Block A Store",
      inStockHere: true,
      quantityHere: 7,
      icon: "🪣",
      otherBuildings: [
        { building: "Block C Store", quantity: 12, available: true },
        { building: "Block D Store", quantity: 15, available: true }
      ]
    },
    {
      id: "store-10",
      name: "Nescafe Classic Instant Coffee Jar (50g)",
      category: "Dairy & Beverages",
      price: 165,
      currentBuilding: "Block A Store",
      inStockHere: true,
      quantityHere: 15,
      icon: "☕",
      otherBuildings: [
        { building: "Block B Store", quantity: 10, available: true },
        { building: "Central Food Court Store", quantity: 25, available: true }
      ]
    }
  ],

  // Student OLX Marketplace listings
  marketplaceListings: [
    {
      id: "olx-1",
      title: "Prestige 1.5L Stainless Steel Electric Kettle",
      dealType: "sell",
      price: 650,
      rentUnit: "",
      category: "Appliances",
      condition: "Like New (3 mos used)",
      description: "Working smoothly, auto cut-off indicator, clean rust-free interior. Great for late night hot water and noodles.",
      seller: {
        name: "Arjun Mehta",
        phone: "9871122334",
        rollNumber: "21BCE10482",
        block: "Block A, Room 312",
        verifiedStudent: true,
        idProofUploaded: true
      },
      postedDate: "Yesterday",
      imageEmoji: "🫖",
      imageUrl: "https://images.unsplash.com/photo-1594213114663-d94db9b17125?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "olx-2",
      title: "Hero Sprint 21-Gear Mountain Bicycle",
      dealType: "rent",
      price: 300,
      rentUnit: "per month",
      category: "Bicycles & Mobility",
      condition: "Good Condition",
      description: "Dual disc brakes, smooth Shimano shifters, sturdy steel lock included. Ready to ride across campus.",
      seller: {
        name: "Vikram Singhania",
        phone: "9810987654",
        rollNumber: "20ME10115",
        block: "Block B, Room 204",
        verifiedStudent: true,
        idProofUploaded: true
      },
      postedDate: "2 days ago",
      imageEmoji: "🚲",
      imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "olx-3",
      title: "Engineering Mathematics + DS Algorithms Textbook Bundle",
      dealType: "sell",
      price: 450,
      rentUnit: "",
      category: "Books & Study Material",
      condition: "Neat & highlighted",
      description: "Higher Engineering Mathematics by B.S. Grewal and Introduction to Algorithms book with formula sheets.",
      seller: {
        name: "Pooja Deshmukh",
        phone: "9823456789",
        rollNumber: "22CSE2091",
        block: "Block C, Room 510",
        verifiedStudent: true,
        idProofUploaded: true
      },
      postedDate: "3 days ago",
      imageEmoji: "📚",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "olx-4",
      title: "Crompton Personal Air Cooler (Compact Size)",
      dealType: "sell",
      price: 1800,
      rentUnit: "",
      category: "Appliances",
      condition: "Good (Cools effectively)",
      description: "Compact room cooler with smooth 360 wheels, honeycomb pads cleaned last week. Powerful air throw.",
      seller: {
        name: "Karan Patel",
        phone: "9765432109",
        rollNumber: "21ECE1084",
        block: "Block A, Room 418",
        verifiedStudent: true,
        idProofUploaded: true
      },
      postedDate: "Just now",
      imageEmoji: "💨",
      imageUrl: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "olx-5",
      title: "Casio FX-991EX ClassWiz Scientific Calculator",
      dealType: "rent",
      price: 150,
      rentUnit: "per exam week",
      category: "Electronics",
      condition: "Excellent condition",
      description: "Original natural textbook display calculator. Available for rent during mid-terms and finals.",
      seller: {
        name: "Neha Sundaram",
        phone: "9834561278",
        rollNumber: "23BBA3012",
        block: "Block D, Room 102",
        verifiedStudent: true,
        idProofUploaded: true
      },
      postedDate: "4 days ago",
      imageEmoji: "🧮",
      imageUrl: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&auto=format&fit=crop&q=80"
    }
  ]
};

if (typeof window !== "undefined") {
  window.MOCK_DATA = MOCK_DATA;
}
