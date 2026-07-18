

const plantData = {
    all: [
        {
            name: "Classic Echeveria",
            desc: "Beautiful low-maintenance desert succulent featuring compact, elegant rosettes.",
            price: 25.00,
            discount: 0,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: "Silver Snake Plant",
            desc: "Sturdy upright sword-shaped leaves that excel at purifying your indoor oxygen.",
            price: 35.00,
            discount: 10,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: "Vibrant Fittonia",
            desc: "Stunning colored nerve patterns that thrive in high humidity environments.",
            price: 20.00,
            discount: 0,
            image: "images/plants/Echeveria Elegans.jpg"
        }
    ],
    bestSeller: [
        {
            name: "Golden Pothos Vine",
            desc: "Fast-growing trailing foliage that looks wonderful cascading from high shelves.",
            price: 28.00,
            discount: 0,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: "Monstera Deliciosa",
            desc: "Iconic split leaves that bring an instant tropical jungle vibe into your room.",
            price: 45.00,
            discount: 15,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: "Emerald ZZ Plant ",
            desc: "Virtually indestructible shiny green stems that survive perfectly in low light.",
            price: 32.00,
            discount: 0,
            image: "images/plants/Echeveria Elegans.jpg"
        }
    ],
    onSales: [
        {
            name: "Ruby Rubber Plant ",
            desc: "Thick glossy burgundy leaves that add a dramatic modern accent to any decor.",
            price: 40.00,
            discount: 20,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: "Velvet Calathea  ",
            desc: "Deep purple decorative undersides that fold up beautifully during the night.",
            price: 38.00,
            discount: 25,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: " Dwarf Jade Bonsai",
            desc: "Charming miniature tree structure with thick woody trunks and fleshy leaves.",
            price: 30.00,
            discount: 30,
            image: "images/plants/Echeveria Elegans.jpg"
        }
    ],
    newArrivals: [
        {
            name: "Pink Princess Phil",
            desc: "Rare breathtaking variegated pink splashes cutting across deep green foliage.",
            price: 65.00,
            discount: 0,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: "Strict Fern Boston",
            desc: "Feathery arching bright fronds creating a classic lush timetable appearance.",
            price: 24.00,
            discount: 5,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: "Swiss Cheese Vine ",
            desc: "Climbing pattern of perforated windows that adapt effortlessly to moss poles.",
            price: 27.00,
            discount: 0,
            image: "images/plants/Echeveria Elegans.jpg"
        }
    ]
};

// Example Tab click listener setup to handle the dynamic changing:
function renderPlants(type) {
    const container = document.getElementById("plants-container"); // Adjust to match your HTML container ID
    container.innerHTML = "";
    
    // Grabs selected category or defaults to all plants
    const selectedPlants = plantData[type] || plantData.all;
    
    selectedPlants.forEach(plant => {
        const finalPrice = plant.discount > 0 ? (plant.price * (1 - plant.discount / 100)).toFixed(2) : plant.price.toFixed(2);
        const originalPriceHTML = plant.discount > 0 ? `<span class="old-price">$${plant.price.toFixed(2)}</span>` : '';
        
        container.innerHTML += `
            <div class="plant-card">
                <img src="${plant.image}" alt="${plant.name}" class="plant-img">
                <h3 class="plant-title">${plant.name}</h3>
                <p class="plant-desc">${plant.desc}</p>
                <div class="price-wrapper">
                    <span class="current-price">$${finalPrice}</span>
                    ${originalPriceHTML}
                </div>
                <div class="size-box">Standard Size</div>
            </div>
        `;
    });
}


// Wire up your click listeners for the tabs ("All Plants", "Best Seller", "On Sales", "New Arrivals")
// to call renderPlants('all'), renderPlants('bestSeller'), renderPlants('onSales'), or renderPlants('newArrivals')
/* =========================================================
   PLANTORA SHOP — SCRIPT
========================================================= */

const products = [
    { id: 1, name: "Echeveria Elegans", desc: "A classic rosette succulent, perfect for sunny spots.", price: 5.99, rating: 4.0, category: "succulents", tag: "best", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&q=80" },
    { id: 2, name: "Monstera Deliciosa", desc: "A bold tropical statement plant with iconic split leaves.", price: 24.99, rating: 4.8, category: "indoor", tag: "best", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80" },
    { id: 3, name: "Snake Plant", desc: "Low maintenance and air-purifying, thrives almost anywhere.", price: 14.50, rating: 4.6, category: "indoor", tag: "new", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400&q=80" },
    { id: 4, name: "Lavender Bush", desc: "Fragrant purple blooms perfect for an outdoor garden.", price: 9.99, rating: 4.3, category: "outdoor", tag: "sale", image: "https://images.unsplash.com/photo-1595239543301-e196a3a0f5ec?w=400&q=80" },
    { id: 5, name: "Golden Pothos", desc: "A trailing vine that thrives in low light conditions.", price: 8.75, rating: 4.5, category: "indoor", tag: "best", image: "https://images.unsplash.com/photo-1622673037023-7f5c74f5e4f6?w=400&q=80" },
    { id: 6, name: "Aloe Vera", desc: "A hardy succulent known for its soothing gel.", price: 6.50, rating: 4.2, category: "succulents", tag: "new", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400&q=80" },
    { id: 7, name: "Rosemary Herb Pot", desc: "Aromatic herb for cooking, thrives outdoors in full sun.", price: 7.20, rating: 4.1, category: "outdoor", tag: "sale", image: "https://images.unsplash.com/photo-1524598171353-e13e2f4bf4a0?w=400&q=80" },
    { id: 8, name: "Fiddle Leaf Fig", desc: "A striking indoor tree with large glossy leaves.", price: 32.00, rating: 4.7, category: "indoor", tag: "best", image: "https://images.unsplash.com/photo-1597055181449-b9d92bdd4c4b?w=400&q=80" },
    { id: 9, name: "Haworthia Zebra", desc: "A compact striped succulent, ideal for small spaces.", price: 5.25, rating: 4.0, category: "succulents", tag: "new", image: "https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=400&q=80" },
    { id: 10, name: "Boston Fern", desc: "Lush feathery fronds that love humidity and shade.", price: 11.99, rating: 4.4, category: "outdoor", tag: "sale", image: "https://images.unsplash.com/photo-1463154545680-70ffcb2c3e18?w=400&q=80" },
    { id: 11, name: "Peace Lily", desc: "Elegant white blooms and excellent air purification.", price: 15.75, rating: 4.6, category: "indoor", tag: "best", image: "https://images.unsplash.com/photo-1567689472102-eaa7e5f57c85?w=400&q=80" },
    { id: 12, name: "Jade Plant", desc: "A symbol of good luck, easy-care and long-lived.", price: 6.99, rating: 4.3, category: "succulents", tag: "new", image: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&q=80" },
  ];
  
  const PAGE_SIZE = 4;
  
  let state = {
    filter: "all",
    sortFeature: "feature",
    sortPrice: "price",
    category: "all",
    page: 1,
  };

  const requestedFilter = new URLSearchParams(window.location.search).get("filter");
  const validFilters = new Set(["all", "best", "new", "sale", "indoor", "outdoor", "succulents"]);
  if (validFilters.has(requestedFilter)) {
    state.filter = requestedFilter;
  }
  
  const grid = document.getElementById("productGrid");
  const pagination = document.getElementById("pagination");

  const initialFilterPill = document.querySelector(`.pill[data-filter="${state.filter}"]`);
  if (initialFilterPill) {
    document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
    initialFilterPill.classList.add("active");
  }
  
  function starString(rating) {
    const full = Math.round(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  }
  
  function getFilteredProducts() {
    let list = products.slice();
  
    if (state.filter !== "all") {
      list = list.filter(p => p.tag === state.filter || p.category === state.filter);
    }
  
    if (state.category !== "all") {
      list = list.filter(p => p.category === state.category);
    }
  
    if (state.sortPrice === "low-high") {
      list.sort((a, b) => a.price - b.price);
    } else if (state.sortPrice === "high-low") {
      list.sort((a, b) => b.price - a.price);
    }
  
    if (state.sortFeature === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (state.sortFeature === "popular") {
      list.sort((a, b) => (b.tag === "best" ? 1 : 0) - (a.tag === "best" ? 1 : 0));
    }
  
    return list;
  }
  
  function renderProducts() {
    const filtered = getFilteredProducts();
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  
    if (state.page > totalPages) {
      state.page = totalPages;
    }
  
    const start = (state.page - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);
  
    grid.innerHTML = "";
  
    if (pageItems.length === 0) {
      grid.innerHTML = "<p style='grid-column: 1 / -1; text-align:center; color:#6B7268;'>No plants match these filters yet.</p>";
    }
  
    pageItems.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-image">
          ${p.tag === "best" ? '<span class="badge">🔥 Best</span>' : ''}
          ${p.tag === "new" ? '<span class="badge">New</span>' : ''}
          ${p.tag === "sale" ? '<span class="badge">Sale</span>' : ''}
          <button class="wishlist-btn" aria-label="Add to wishlist">♡</button>
          <a href="product-detail.html?id=${p.id}">
            <img src="${p.image}" alt="${p.name}">
          </a>
        </div>
        <div class="product-body">
          <a href="product-detail.html?id=${p.id}" class="product-title-link"><h3>${p.name}</h3></a>
          <p>${p.desc}</p>
          <div class="product-meta">
            <span class="price">$${p.price.toFixed(2)}</span>
            <span class="rating"><span class="stars">${starString(p.rating)}</span> ${p.rating.toFixed(1)}</span>
          </div>
          <button class="add-to-cart" data-id="${p.id}">Add to Cart</button>
        </div>
      `;
      grid.appendChild(card);
    });
  
    renderPagination(totalPages);
  }
  
  function renderPagination(totalPages) {
    pagination.innerHTML = "";
  
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.className = "page-btn" + (i === state.page ? " active" : "");
      btn.textContent = i;
      btn.addEventListener("click", () => {
        state.page = i;
        renderProducts();
        window.scrollTo({ top: grid.offsetTop - 100, behavior: "smooth" });
      });
      pagination.appendChild(btn);
    }
  }
  
  // Filter pills
  document.getElementById("filterPills").addEventListener("click", (e) => {
    const btn = e.target.closest(".pill");
    if (!btn) return;
  
    document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
  
    state.filter = btn.dataset.filter;
    state.page = 1;
    renderProducts();
  });
  
  // Sort / category selects
  document.getElementById("sortFeature").addEventListener("change", (e) => {
    state.sortFeature = e.target.value;
    renderProducts();
  });
  
  document.getElementById("sortPrice").addEventListener("change", (e) => {
    state.sortPrice = e.target.value;
    renderProducts();
  });
  
  document.getElementById("filterCategory").addEventListener("change", (e) => {
    state.category = e.target.value;
    state.page = 1;
    renderProducts();
  });
  
  // Cart storage + badge
  const CART_KEY = "plantoraCart";
  
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }
  
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
  
  function updateCartBadge() {
    const badge = document.querySelector(".cart-badge");
    if (!badge) return;
  
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
  
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }
  
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
  
    const cart = getCart();
    const existing = cart.find(item => item.id === productId);
  
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
    }
  
    saveCart(cart);
    updateCartBadge();
  }
  
  // Add to cart feedback
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart");
    if (!btn) return;
  
    addToCart(Number(btn.dataset.id));
  
    const originalText = btn.textContent;
    btn.textContent = "Added ✓";
    btn.classList.add("added");
  
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove("added");
    }, 1200);
  });
  
  // Mobile nav toggle
  const hamburgerBtn = document.querySelector(".hamburger");
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      document.querySelector(".navbar").classList.toggle("open");
    });
  }
  
  // Newsletter form
  document.getElementById("newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const button = e.target.querySelector("button");
    const originalText = button.textContent;
  
    button.textContent = "Subscribed ✓";
    input.value = "";
  
    setTimeout(() => {
      button.textContent = originalText;
    }, 1800);
  });
  
  // Init
  renderProducts();
  updateCartBadge();
