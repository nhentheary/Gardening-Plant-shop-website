// ================================
// PRODUCT DATA
// (kept in sync with js/shop.js)
// ================================

const products = [
    { id: 1, name: "Echeveria Elegans", desc: "A classic rosette succulent, perfect for sunny spots.", price: 5.99, rating: 4.0, category: "succulents", tag: "best", image: "../images/plants/catalog/echeveria-elegans.jpg" },
    { id: 2, name: "Monstera Deliciosa", desc: "A bold tropical statement plant with iconic split leaves.", price: 24.99, rating: 4.8, category: "indoor", tag: "best", image: "../images/plants/catalog/monstera-deliciosa.jpg" },
    { id: 3, name: "Snake Plant", desc: "Low maintenance and air-purifying, thrives almost anywhere.", price: 14.50, rating: 4.6, category: "indoor", tag: "new", image: "../images/plants/catalog/snake-plant.jpg" },
    { id: 4, name: "Lavender Bush", desc: "Fragrant purple blooms perfect for an outdoor garden.", price: 9.99, rating: 4.3, category: "outdoor", tag: "sale", image: "../images/plants/catalog/lavender-bush.jpg" },
    { id: 5, name: "Golden Pothos", desc: "A trailing vine that thrives in low light conditions.", price: 8.75, rating: 4.5, category: "indoor", tag: "best", image: "../images/plants/catalog/golden-pothos.jpg" },
    { id: 6, name: "Aloe Vera", desc: "A hardy succulent known for its soothing gel.", price: 6.50, rating: 4.2, category: "succulents", tag: "new", image: "../images/plants/catalog/aloe-vera.jpg" },
    { id: 7, name: "Rosemary Herb Pot", desc: "Aromatic herb for cooking, thrives outdoors in full sun.", price: 7.20, rating: 4.1, category: "herb", tag: "sale", image: "../images/plants/catalog/rosemary-herb.jpg" },
    { id: 8, name: "Fiddle Leaf Fig", desc: "A striking indoor tree with large glossy leaves.", price: 32.00, rating: 4.7, category: "indoor", tag: "best", image: "../images/plants/catalog/fiddle-leaf-fig.jpg" },
    { id: 9, name: "Haworthia Zebra", desc: "A compact striped succulent, ideal for small spaces.", price: 5.25, rating: 4.0, category: "succulents", tag: "new", image: "../images/plants/catalog/haworthia-zebra.jpg" },
    { id: 10, name: "Boston Fern", desc: "Lush feathery fronds that love humidity and shade.", price: 11.99, rating: 4.4, category: "outdoor", tag: "sale", image: "../images/plants/catalog/boston-fern.jpg" },
    { id: 11, name: "Peace Lily", desc: "Elegant white blooms and excellent air purification.", price: 15.75, rating: 4.6, category: "indoor", tag: "best", image: "../images/plants/catalog/peace-lily.jpg" },
    { id: 12, name: "Jade Plant", desc: "A symbol of good luck, easy-care and long-lived.", price: 6.99, rating: 4.3, category: "succulents", tag: "new", image: "../images/plants/catalog/jade-plant.jpg" },
  ];
  
  // ================================
  // LOAD PRODUCT FROM URL ?id=
  // ================================
  
  const params = new URLSearchParams(window.location.search);
  const requestedId = Number(params.get("id"));
  const currentProduct = products.find(p => p.id === requestedId) || products[1]; // fallback: Monstera
  
  function starsMarkup(rating) {
    const full = Math.floor(rating);
    const hasHalf = rating - full >= 0.5;
    let html = "";
    for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
    if (hasHalf) html += '<i class="fa-solid fa-star-half-stroke"></i>';
    while ((html.match(/<i/g) || []).length < 5) html += '<i class="fa-regular fa-star"></i>';
    return html;
  }
  
  function populateProduct(product) {
    document.title = `${product.name} | Plantora`;
  
    document.getElementById("productCategory").textContent = product.category.toUpperCase();
    document.getElementById("productTitle").textContent = product.name;
    document.getElementById("productDescription").textContent = product.desc;
  
    document.getElementById("productStars").innerHTML = starsMarkup(product.rating);
    document.getElementById("reviewText").textContent = `${product.rating.toFixed(1)} rating`;
  
    document.getElementById("newPrice").textContent = `$${product.price.toFixed(2)}`;
    const oldPriceEl = document.getElementById("oldPrice");
    if (product.tag === "sale") {
      oldPriceEl.textContent = `$${(product.price * 1.25).toFixed(2)}`;
      oldPriceEl.style.display = "inline";
    } else {
      oldPriceEl.style.display = "none";
    }
  
    mainImage.src = product.image;
    mainImage.alt = product.name;
  
    const thumbs = document.querySelectorAll("#thumbnailImages .thumbnail");
    thumbs.forEach((t, i) => {
      t.src = product.image;
      t.alt = product.name;
      t.classList.toggle("active", i === 0);
    });
  
    addCartBtn.dataset.id = product.id;
  }
  
  // ================================
  // PRODUCT IMAGE GALLERY
  // ================================
  
  const mainImage = document.getElementById("mainProductImage");
  const thumbnails = document.querySelectorAll(".thumbnail");
  
  thumbnails.forEach((thumbnail) => {
  
      thumbnail.addEventListener("click", () => {
  
          // Change main image
          mainImage.src = thumbnail.src;
  
          // Remove active class
          thumbnails.forEach(img => img.classList.remove("active"));
  
          // Add active class
          thumbnail.classList.add("active");
  
      });
  
  });
  
  // ================================
  // QUANTITY BUTTON
  // ================================
  
  const minusBtn = document.getElementById("minus");
  const plusBtn = document.getElementById("plus");
  const quantity = document.getElementById("quantity");
  
  let count = 1;
  
  plusBtn.addEventListener("click", () => {
  
      count++;
  
      quantity.textContent = count;
  
  });
  
  minusBtn.addEventListener("click", () => {
  
      if(count > 1){
  
          count--;
  
          quantity.textContent = count;
  
      }
  
  });
  
  // ================================
  // WISHLIST BUTTON
  // ================================
  
  const wishlistBtn = document.querySelector(".wishlist");
  const heartIcon = wishlistBtn.querySelector("i");
  
  wishlistBtn.addEventListener("click", () => {
  
      heartIcon.classList.toggle("fa-regular");
      heartIcon.classList.toggle("fa-solid");
  
      wishlistBtn.classList.toggle("liked");
  
  });
  
  // ================================
  // CART STORAGE + BADGE
  // (kept in sync with js/shop.js)
  // ================================
  
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
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
  
    badge.textContent = total;
    badge.style.display = total > 0 ? "flex" : "none";
  }
  
  function addToCart(productId, qty) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
  
    const cart = getCart();
    const existing = cart.find(item => item.id === productId);
  
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty });
    }
  
    saveCart(cart);
    updateCartBadge();
  }
  
  // ================================
  // ADD TO CART BUTTON
  // ================================
  
  const addCartBtn = document.querySelector(".add-cart");
  
  addCartBtn.addEventListener("click", () => {
  
      addToCart(Number(addCartBtn.dataset.id), count);
  
      const originalText = addCartBtn.innerHTML;
  
      addCartBtn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
  
      addCartBtn.style.background = "#2E8B57";
  
      setTimeout(() => {
  
          addCartBtn.innerHTML = originalText;
  
          addCartBtn.style.background = "#0C5C35";
  
      }, 1800);
  
  });
  
  // ================================
  // BUTTON HOVER EFFECT
  // ================================
  
  const buttons = document.querySelectorAll("button");
  
  buttons.forEach(button => {
  
      button.addEventListener("mousedown", () => {
  
          button.style.transform = "scale(0.96)";
  
      });
  
      button.addEventListener("mouseup", () => {
  
          button.style.transform = "scale(1)";
  
      });
  
      button.addEventListener("mouseleave", () => {
  
          button.style.transform = "scale(1)";
  
      });
  
  });
  
  // ================================
  // PRODUCT IMAGE ANIMATION
  // ================================
  
  mainImage.addEventListener("load", () => {
  
      mainImage.style.opacity = "0";
  
      setTimeout(() => {
  
          mainImage.style.transition = "0.3s";
  
          mainImage.style.opacity = "1";
  
      }, 100);
  
  });
  
  // ================================
  // INIT
  // ================================
  
  populateProduct(currentProduct);
  updateCartBadge();
