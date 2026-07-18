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

function updateNavCartBadge() {
  const badge = document.querySelector(".cart-badge");
  if (!badge) return;

  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);

  badge.textContent = total;
  badge.style.display = total > 0 ? "flex" : "none";
}

let appliedDiscount = 0;

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cartItemsContainer");
  const emptyMessage = document.getElementById("emptyCartMessage");
  const cartCount = document.getElementById("cartCount");

  cartCount.textContent = `Your Cart (${cart.length} Item${cart.length === 1 ? "" : "s"})`;

  container.innerHTML = "";

  if (cart.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";

    cart.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.dataset.id = item.id;

      row.innerHTML = `
        <img src="${item.image}" class="product-img" alt="${item.name}">

        <div class="product-info">
          <h4>${item.name}</h4>
        </div>

        <div class="quantity-box">
          <button class="minus">-</button>
          <span class="qty">${item.qty}</span>
          <button class="plus">+</button>
        </div>

        <h5 class="price" data-price="${item.price}">
          $${(item.price * item.qty).toFixed(2)}
        </h5>

        <button class="remove">
          <i class="bi bi-trash3"></i>
        </button>
      `;

      container.appendChild(row);

      if (index < cart.length - 1) {
        container.appendChild(document.createElement("hr"));
      }
    });
  }

  updateSummary();
  updateNavCartBadge();
}

function updateSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = Math.max(0, subtotal - appliedDiscount);

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("discount").textContent = `-$${appliedDiscount.toFixed(2)}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

// Quantity + remove (event delegation, since rows are re-rendered)
document.getElementById("cartItemsContainer").addEventListener("click", (e) => {
  const row = e.target.closest(".cart-item");
  if (!row) return;

  const id = Number(row.dataset.id);
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  if (e.target.closest(".plus")) {
    item.qty += 1;
    saveCart(cart);
    renderCart();
  } else if (e.target.closest(".minus")) {
    if (item.qty > 1) {
      item.qty -= 1;
      saveCart(cart);
      renderCart();
    }
  } else if (e.target.closest(".remove")) {
    const updatedCart = cart.filter(i => i.id !== id);
    saveCart(updatedCart);
    renderCart();
  }
});

// Coupon (demo logic: any non-empty code applies a flat $5 discount)
document.getElementById("applyCouponBtn").addEventListener("click", () => {
  const code = document.getElementById("couponInput").value.trim();
  appliedDiscount = code ? 5 : 0;
  updateSummary();
});

// Continue shopping
document.getElementById("continueShoppingBtn").addEventListener("click", () => {
  window.location.href = "shop.html";
});

// Proceed to checkout
document.getElementById("checkoutBtn").addEventListener("click", () => {
  window.location.href = "checkout.html";
});

// Init
renderCart();
