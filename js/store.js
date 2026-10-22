// Campus Departmental Store - Controller Logic

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  let currentCategory = 'all';
  let searchQuery = '';

  const storeGrid = document.getElementById('storeGrid');
  const countLabel = document.getElementById('productCountLabel');
  const searchInput = document.getElementById('storeSearchInput');
  const catButtons = document.querySelectorAll('.store-cat-btn');
  const buildingSelector = document.getElementById('selectedStoreBuilding');

  const renderStoreItems = () => {
    if (!storeGrid) return;

    let items = window.MOCK_DATA.storeInventory;

    // Filter category
    if (currentCategory !== 'all') {
      items = items.filter(i => i.category === currentCategory);
    }

    // Filter search
    if (searchQuery) {
      items = items.filter(i => 
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    countLabel.textContent = `Showing ${items.length} items`;

    if (items.length === 0) {
      storeGrid.innerHTML = `
        <div class="col-span-full text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <div class="text-4xl mb-3">🔍</div>
          <h3 class="font-bold text-slate-800 text-lg">No Products Found</h3>
          <p class="text-sm text-slate-400 mt-1">Try searching for something else like "Maggi", "Milk", or change the category filter.</p>
        </div>
      `;
      return;
    }

    storeGrid.innerHTML = items.map(item => {
      const isAvailableHere = item.inStockHere;
      const currentStoreName = buildingSelector ? buildingSelector.value : 'Block A Store';

      return `
        <div class="glass-card p-5 flex flex-col justify-between hover:shadow-lg transition ${!isAvailableHere ? 'border-amber-200 bg-amber-50/20' : 'border-slate-200'}">
          <div>
            <!-- Header status badge -->
            <div class="flex items-start justify-between gap-3 mb-3">
              <span class="text-3xl p-2.5 rounded-2xl ${isAvailableHere ? 'bg-indigo-50 border border-indigo-100' : 'bg-amber-50 border border-amber-200'}">
                ${item.icon}
              </span>
              ${isAvailableHere ? `
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
                  In Stock (${item.quantityHere} left)
                </span>
              ` : `
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  <span class="w-2 h-2 rounded-full bg-amber-600"></span>
                  Out of Stock in this building
                </span>
              `}
            </div>

            <!-- Title & category -->
            <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-600">${item.category}</span>
            <h3 class="font-bold text-slate-900 text-base mt-0.5 leading-snug">${item.name}</h3>
            
            <div class="mt-2 text-xs text-slate-500">
              Campus Price: <strong class="text-slate-900 font-extrabold text-base">₹${item.price}</strong>
            </div>

            <!-- CROSS-BUILDING AVAILABILITY SECTION -->
            <div class="mt-4 pt-3 border-t border-slate-100">
              ${!isAvailableHere ? `
                <div class="bg-amber-50 border border-amber-200 p-3 rounded-xl">
                  <p class="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-2">
                    <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-600"></i>
                    Available in other buildings:
                  </p>
                  <div class="space-y-1.5">
                    ${item.otherBuildings.map(ob => `
                      <div class="flex items-center justify-between text-xs">
                        <span class="font-semibold text-slate-700 flex items-center gap-1">
                          🏢 ${ob.building}
                        </span>
                        <span class="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          ${ob.quantity} units available
                        </span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : `
                <div class="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg flex items-center justify-between">
                  <span class="flex items-center gap-1">
                    <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600"></i> Also at ${item.otherBuildings.length} other campus stores
                  </span>
                  <span class="text-indigo-600 font-semibold cursor-pointer hover:underline" onclick="alert('Available across: ${item.otherBuildings.map(b => b.building + ' (' + b.quantity + ')').join(', ')}')">View All</span>
                </div>
              `}
            </div>
          </div>

          <div class="mt-4 pt-2">
            <button class="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
              isAvailableHere 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm' 
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
            }" onclick="alert('${item.name} reserved for in-store pickup at ${isAvailableHere ? currentStoreName : item.otherBuildings[0].building}!')">
              <i data-lucide="${isAvailableHere ? 'shopping-cart' : 'navigation'}" class="w-3.5 h-3.5"></i>
              ${isAvailableHere ? 'Reserve for Quick Pickup' : `Navigate to ${item.otherBuildings[0].building}`}
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  };

  // Search input event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderStoreItems();
    });
  }

  // Category buttons
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => {
        b.className = 'store-cat-btn px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition shrink-0';
      });
      btn.className = 'store-cat-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white transition shrink-0';
      currentCategory = btn.getAttribute('data-category');
      renderStoreItems();
    });
  });

  // Building selector
  if (buildingSelector) {
    buildingSelector.addEventListener('change', () => {
      renderStoreItems();
    });
  }

  renderStoreItems();
});
