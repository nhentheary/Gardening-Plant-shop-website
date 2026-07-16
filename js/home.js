// =========================================================================
// PLANTORA HOME PAGE INTERACTIVITY (js/home.js)
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // -------------------------------------------------------------
    // 1. EXPANDED PRODUCT DATA
    // -------------------------------------------------------------
    const plantData = {
        all: [
            { name: "Classic Echeveria", desc: "Beautiful low-maintenance desert succulent featuring compact, elegant rosettes.", price: 8.90, oldPrice: null, badge: "🔥 Best", badgeClass: "badge-best", category: "bestseller", img: "images/plants/Echeveria Elegans.jpg" },
            { name: "Silver Snake Plant", desc: "Sturdy upright sword-shaped leaves that excel at purifying your indoor oxygen.", price: 5.90, oldPrice: 7.50, badge: "-20%", badgeClass: "badge-sale", category: "onsale", img: "images/plants/Snake Plant.jpg" },
            { name: "Vibrant Fittonia", desc: "Do find and grow stunning colored nerve patterns that thrive in damp environments.", price: 6.90, oldPrice: null, badge: "", badgeClass: "", category: "all", img: "images/plants/Pothos.jpg" },
            { name: "Strict Fern Boston", desc: "Try to look at the feathery arching bright fronds that give a soft, lush node.", price: 7.90, oldPrice: null, badge: "✨ New", badgeClass: "badge-new", category: "newarrivals", img: "images/plants/Aloe Vera.jpg" }
        ],
        bestseller: [
            { name: "Classic Echeveria", desc: "Beautiful low-maintenance desert succulent featuring compact, elegant rosettes.", price: 8.90, oldPrice: null, badge: "🔥 Best", badgeClass: "badge-best", category: "bestseller", img: "images/plants/Echeveria Elegans.jpg" },
            { name: "Golden Pothos Vine", desc: "Fast-growing trailing foliage that looks wonderful cascading from high shelves.", price: 9.50, oldPrice: null, badge: "🔥 Best", badgeClass: "badge-best", category: "bestseller", img: "images/plants/Pothos.jpg" },
            { name: "Monstera Deliciosa", desc: "See how these iconic split leaves can bring a fast, tropical vibe to a modern room.", price: 14.90, oldPrice: null, badge: "🔥 Best", badgeClass: "badge-best", category: "bestseller", img: "images/plants/Green Cream Minimalist Plants Presentation.png" },
            { name: "Emerald ZZ Plant ", desc: "Do grow these tough, shiny green stems that survive well in deep, dark shade.", price: 11.20, oldPrice: null, badge: "🔥 Best", badgeClass: "badge-best", category: "bestseller", img: "images/plants/Snake Plant.jpg" }
        ],
        newarrivals: [
            { name: "Strict Fern Boston", desc: "See this feathery arching bright fronds creating a classic lush timetable appearance.", price: 7.90, oldPrice: null, badge: "✨ New", badgeClass: "badge-new", category: "newarrivals", img: "images/plants/Aloe Vera.jpg" },
            { name: "Pink Princess Phil", desc: "Rare breathtaking variegated pink splashes cutting across deep green foliage.", price: 24.50, oldPrice: null, badge: "✨ New", badgeClass: "badge-new", category: "newarrivals", img: "images/plants/Pothos.jpg" },
            { name: "Swiss Cheese Vine ", desc: "Climbing pattern of perforated windows that adapt effortlessly to moss poles.", price: 8.90, oldPrice: null, badge: "✨ New", badgeClass: "badge-new", category: "newarrivals", img: "images/plants/Echeveria Elegans.jpg" },
            { name: "Dwarf Lemon Tree ", desc: "See this delightful container-friendly citrus tree offering aromatic winter blossoms.", price: 19.90, oldPrice: null, badge: "✨ New", badgeClass: "badge-new", category: "newarrivals", img: "images/plants/Green Cream Minimalist Plants Presentation.png" }
        ],
        onsale: [
            { name: "Silver Snake Plant", desc: "Sturdy upright sword-shaped leaves that excel at purifying your indoor oxygen.", price: 5.90, oldPrice: 7.50, badge: "-20%", badgeClass: "badge-sale", category: "onsale", img: "images/plants/Snake Plant.jpg" },
            { name: "Ruby Rubber Plant ", desc: "Thick glossy burgundy leaves that add a dramatic modern accent to any decor.", price: 9.60, oldPrice: 12.00, badge: "-20%", badgeClass: "badge-sale", category: "onsale", img: "images/plants/Echeveria Elegans.jpg" },
            { name: "Velvet Calathea  ", desc: "Deep purple decorative undersides that fold up beautifully during the night.", price: 7.90, oldPrice: 10.50, badge: "-25%", badgeClass: "badge-sale", category: "onsale", img: "images/plants/Pothos.jpg" },
            { name: "Dwarf Jade Bonsai", desc: "See this charming miniature tree structure with thick woody trunks and fleshy leaves.", price: 10.50, oldPrice: 15.00, badge: "-30%", badgeClass: "badge-sale", category: "onsale", img: "images/plants/Aloe Vera.jpg" }
        ],
        favorite: [
            { name: "Classic Peace Lily", desc: "Elegant pristine white blooms that dramatically filter common indoor toxins.", price: 9.90, oldPrice: null, badge: "❤️ Fav", badgeClass: "badge-best", category: "favorite", img: "images/plants/Aloe Vera.jpg" },
            { name: "Starlight Caladium", desc: "Admire these hseart-shaped striking variegated foliage with brilliant paper-white veins.", price: 8.50, oldPrice: 10.00, badge: "❤️ Sale", badgeClass: "badge-sale", category: "favorite", img: "images/plants/Echeveria Elegans.jpg" },
            { name: "Lucky Money Tree  ", desc: "Braided miniature wooden trunks topped with vibrant umbrella-shaped fronds.", price: 12.80, oldPrice: null, badge: "❤️ Fav", badgeClass: "badge-best", category: "favorite", img: "images/plants/Green Cream Minimalist Plants Presentation.png" },
            { name: "Majesty Parlor Palm", desc: "Do grow feathery, deep green fronds that build a relaxing tropical canopy indoors.", price: 15.00, oldPrice: null, badge: "❤️ Fav", badgeClass: "badge-best", category: "favorite", img: "images/plants/Pothos.jpg" }
        ]
    };

    // -------------------------------------------------------------
    // 2. DYNAMIC TAB FILTERING & RENDERING
    // -------------------------------------------------------------
    const tabButtons = document.querySelectorAll(".products-tabs .tab-btn");
    const productsGrid = document.getElementById("productsGrid");

    function renderCategory(categoryKey) {
        if (!productsGrid) return;
        
        productsGrid.innerHTML = "";
        const selectedPlants = plantData[categoryKey] || plantData.all;

        selectedPlants.forEach(plant => {
            const badgeHTML = plant.badge ? `<span class="product-badge ${plant.badgeClass}">${plant.badge}</span>` : '';
            const priceHTML = plant.oldPrice 
                ? `<div class="price-group"><span class="product-price">$${plant.price.toFixed(2)}</span><span class="product-price-old">$${plant.oldPrice.toFixed(2)}</span></div>`
                : `<span class="product-price">$${plant.price.toFixed(2)}</span>`;

            productsGrid.innerHTML += `
                <div class="product-card" data-category="${plant.category}">
                    <div class="product-img-wrap">
                        ${badgeHTML}
                        <img src="${plant.img}" alt="${plant.name}" class="product-img">
                        <button class="wishlist-btn"><i class="ti ti-heart"></i></button>
                    </div>
                    <div class="product-info">
                        <h4 class="product-name">${plant.name}</h4>
                        <p class="product-desc">${plant.desc}</p>
                        <div class="product-footer">
                            ${priceHTML}
                            <div class="product-stars">
                                <i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i>
                                <i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i>
                                <i class="ti ti-star"></i><span>4.8</span>
                            </div>
                        </div>
                        <button class="btn-add-cart"><i class="ti ti-shopping-cart"></i> Add to Cart</button>
                    </div>
                </div>
            `;
        });

        attachWishlistListeners();
    }

    // Tab Event Listeners
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            renderCategory(button.getAttribute("data-tab"));
        });
    });

    // -------------------------------------------------------------
    // 3. WISHLIST TOGGLE BUTTONS
    // -------------------------------------------------------------
    function attachWishlistListeners() {
        document.querySelectorAll(".wishlist-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const icon = btn.querySelector("i");
                icon.classList.toggle("ti-heart");
                icon.classList.toggle("ti-heart-filled");
            });
        });
    }

    // Initialize display
    renderCategory("all");
});