// Campus OLX - Student Marketplace Controller

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Load listings from localStorage or fallback to initial mock data
  const localSavedListings = JSON.parse(localStorage.getItem('campus_olx_listings'));
  const listings = localSavedListings || [...window.MOCK_DATA.marketplaceListings];

  let currentDealFilter = 'all';
  let currentCategory = 'all';
  let searchQuery = '';
  let uploadedIdProofDataUrl = null;

  const grid = document.getElementById('olxListingsGrid');
  const searchInput = document.getElementById('olxSearchInput');
  const dealButtons = document.querySelectorAll('.deal-type-btn');
  const categorySelect = document.getElementById('olxCategorySelect');

  // Modal elements
  const postAdModal = document.getElementById('postAdModal');
  const openPostAdModalBtn = document.getElementById('openPostAdModalBtn');
  const closePostAdModalBtn = document.getElementById('closePostAdModalBtn');
  const postAdForm = document.getElementById('postAdForm');
  const idCardInput = document.getElementById('idCardPhotoInput');
  const idCardPrompt = document.getElementById('idCardPrompt');
  const idCardPreviewBox = document.getElementById('idCardPreviewBox');
  const idCardPreviewImg = document.getElementById('idCardPreviewImg');

  // Modal open / close
  if (openPostAdModalBtn) {
    openPostAdModalBtn.addEventListener('click', () => {
      postAdModal.classList.remove('hidden');
    });
  }
  if (closePostAdModalBtn) {
    closePostAdModalBtn.addEventListener('click', () => {
      postAdModal.classList.add('hidden');
    });
  }

  // ID Card photo upload handling
  if (idCardInput) {
    idCardInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          uploadedIdProofDataUrl = event.target.result;
          idCardPreviewImg.src = uploadedIdProofDataUrl;
          idCardPreviewBox.classList.remove('hidden');
          idCardPrompt.classList.add('hidden');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Render listings
  const renderListings = () => {
    if (!grid) return;

    let filtered = listings;

    if (currentDealFilter !== 'all') {
      filtered = filtered.filter(l => l.dealType === currentDealFilter);
    }

    if (currentCategory !== 'all') {
      filtered = filtered.filter(l => l.category === currentCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(l => 
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.seller.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <div class="text-4xl mb-3">📦</div>
          <h3 class="font-bold text-slate-800 text-lg">No Listings Found</h3>
          <p class="text-sm text-slate-400 mt-1">Be the first to post an item for sale or rent in your hostel!</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const isRent = item.dealType === 'rent';

      return `
        <div class="glass-card p-5 flex flex-col justify-between hover:shadow-xl transition border border-slate-200">
          <div>
            <!-- Real Product Image -->
            <div class="relative w-full h-44 rounded-xl overflow-hidden mb-3 bg-slate-100 border border-slate-200">
              <img src="${item.imageUrl || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80'}" alt="${item.title}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80'">
              <div class="absolute top-2.5 right-2.5">
                <span class="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow ${
                  isRent ? 'bg-purple-600 text-white' : 'bg-emerald-600 text-white'
                }">
                  ${isRent ? '🔄 For Rent' : '🏷️ For Sale'}
                </span>
              </div>
            </div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-[11px] font-bold text-orange-600 uppercase tracking-wide">${item.category}</span>
              <span class="text-[10px] text-slate-400">${item.postedDate}</span>
            </div>

            <!-- Title & Price -->
            <span class="text-[11px] font-bold text-orange-600 uppercase tracking-wide">${item.category}</span>
            <h3 class="font-bold text-slate-900 text-base mt-0.5 leading-snug">${item.title}</h3>
            
            <div class="mt-2 flex items-baseline gap-1.5">
              <span class="text-2xl font-extrabold text-slate-900">₹${item.price}</span>
              ${isRent ? `<span class="text-xs text-slate-500 font-medium">/ ${item.rentUnit || 'month'}</span>` : ''}
            </div>

            <p class="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">${item.description}</p>
            <p class="text-[11px] text-slate-400 mt-1">Condition: <span class="font-semibold text-slate-600">${item.condition}</span></p>

            <!-- MANDATORY STUDENT VERIFICATION PILL -->
            <div class="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-xs font-bold text-slate-800">${item.seller.name}</span>
                <span class="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  <i data-lucide="shield-check" class="w-3 h-3 text-emerald-600"></i> Verified ID
                </span>
              </div>
              <div class="text-[11px] text-slate-500 space-y-0.5">
                <p>Roll No: <strong class="font-mono text-slate-700">${item.seller.rollNumber}</strong></p>
                <p>Location: <strong>${item.seller.block}</strong></p>
              </div>
            </div>
          </div>

          <!-- Contact Buttons -->
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
            <a href="tel:${item.seller.phone}" class="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition">
              <i data-lucide="phone" class="w-3.5 h-3.5"></i> Call Seller
            </a>
            <a href="https://wa.me/91${item.seller.phone}?text=Hi%20${encodeURIComponent(item.seller.name)},%20I%20saw%20your%20listing%20for%20${encodeURIComponent(item.title)}%20on%20CampusOLX!" target="_blank" class="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> WhatsApp
            </a>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  };

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderListings();
    });
  }

  // Deal type buttons
  dealButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dealButtons.forEach(b => {
        b.className = 'deal-type-btn px-4 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition';
      });
      btn.className = 'deal-type-btn px-4 py-1.5 rounded-lg text-xs font-bold bg-white text-orange-600 shadow-sm transition';
      currentDealFilter = btn.getAttribute('data-deal');
      renderListings();
    });
  });

  // Category select
  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      currentCategory = e.target.value;
      renderListings();
    });
  }

  // Form submit: Post new Ad with mandatory ID proof check
  if (postAdForm) {
    postAdForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!uploadedIdProofDataUrl) {
        alert('Please upload a photo of your Student ID card to verify your listing!');
        return;
      }

      const dealType = document.querySelector('input[name="modalDealType"]:checked').value;
      const title = document.getElementById('adTitle').value;
      const category = document.getElementById('adCategory').value;
      const price = parseFloat(document.getElementById('adPrice').value);
      const rentUnit = document.getElementById('adRentUnit').value || 'per month';
      const description = document.getElementById('adDesc').value;

      const sellerName = document.getElementById('sellerName').value;
      const sellerPhone = document.getElementById('sellerPhone').value;
      const sellerRoll = document.getElementById('sellerRoll').value;
      const sellerBlock = document.getElementById('sellerBlock').value;

      const emojis = {
        'Appliances': '⚡',
        'Bicycles & Mobility': '🚲',
        'Books & Study Material': '📚',
        'Electronics': '🔌'
      };

      const newListing = {
        id: 'olx-' + Date.now(),
        title,
        dealType,
        price,
        rentUnit: dealType === 'rent' ? rentUnit : '',
        category,
        condition: 'Student Verified',
        description,
        seller: {
          name: sellerName,
          phone: sellerPhone,
          rollNumber: sellerRoll,
          block: sellerBlock,
          verifiedStudent: true,
          idProofUploaded: true,
          idProofPhoto: uploadedIdProofDataUrl
        },
        postedDate: 'Just now',
        imageEmoji: emojis[category] || '📦'
      };

      listings.unshift(newListing);
      localStorage.setItem('campus_olx_listings', JSON.stringify(listings));
      renderListings();

      // Reset
      postAdForm.reset();
      uploadedIdProofDataUrl = null;
      idCardPreviewBox.classList.add('hidden');
      idCardPrompt.classList.remove('hidden');
      postAdModal.classList.add('hidden');

      alert(`Your ad for "${title}" has been published with the Verified Student ID badge!`);
    });
  }

  renderListings();
});
