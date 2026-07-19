const CART_KEY = "plantoraCart";
const LAST_ORDER_KEY = "plantoraLastOrder";
let checkoutDiscount = 0;

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

function imagePath(image) {
  if (!image || /^(https?:|data:|\/)/.test(image) || image.startsWith("../")) return image;
  return `../${image}`;
}

function updateCartBadge() {
  const badge = document.querySelector(".cart-badge");
  if (!badge) return;

  const count = getCart().reduce((total, item) => total + item.qty, 0);
  badge.textContent = count;
  badge.style.display = count ? "flex" : "none";
}

function updateCheckoutSummary() {
  const subtotal = getCart().reduce((total, item) => total + (item.price * item.qty), 0);
  const total = Math.max(0, subtotal - checkoutDiscount);

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("discountAmount").textContent = `-$${checkoutDiscount.toFixed(2)}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

function renderCheckoutItems() {
  const itemsContainer = document.getElementById("checkoutItems");
  const emptyMessage = document.getElementById("emptyCheckoutMessage");
  const orderButton = document.getElementById("orderBtn");
  const cart = getCart();

  itemsContainer.innerHTML = "";
  emptyMessage.hidden = cart.length > 0;
  orderButton.disabled = cart.length === 0;

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "product";
    row.dataset.id = item.id;

    const image = document.createElement("img");
    image.src = imagePath(item.image);
    image.alt = item.name;

    const details = document.createElement("div");
    const name = document.createElement("h4");
    name.textContent = item.name;
    const quantity = document.createElement("small");
    quantity.textContent = `Quantity: ${item.qty}`;
    details.append(name, quantity);

    const price = document.createElement("b");
    price.textContent = `$${(item.price * item.qty).toFixed(2)}`;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete";
    remove.setAttribute("aria-label", `Remove ${item.name} from order`);
    remove.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

    row.append(image, details, price, remove);
    itemsContainer.appendChild(row);
  });

  updateCheckoutSummary();
  updateCartBadge();
}

function updateCardDetails() {
  const selectedPayment = document.querySelector('input[name="payment"]:checked');
  const cardDetails = document.getElementById("cardDetails");
  const showCardDetails = selectedPayment?.value === "Credit / Debit Card";

  cardDetails.hidden = !showCardDetails;
  cardDetails.querySelectorAll("input").forEach((input) => {
    input.disabled = !showCardDetails;
  });
}

document.querySelectorAll(".payment").forEach((payment) => {
  payment.addEventListener("click", () => {
    document.querySelectorAll(".payment").forEach((item) => item.classList.remove("active"));
    payment.classList.add("active");
    payment.querySelector("input").checked = true;
    updateCardDetails();
  });
});

document.getElementById("checkoutItems").addEventListener("click", (event) => {
  const remove = event.target.closest(".delete");
  if (!remove) return;

  const row = remove.closest(".product");
  const id = Number(row.dataset.id);
  saveCart(getCart().filter((item) => item.id !== id));
  renderCheckoutItems();
});

document.getElementById("applyCouponBtn").addEventListener("click", () => {
  checkoutDiscount = document.getElementById("couponInput").value.trim() ? 5 : 0;
  updateCheckoutSummary();
});

document.getElementById("orderBtn").addEventListener("click", () => {
  const cart = getCart();
  if (!cart.length) return;

  const delivery = {
    name: document.getElementById("fullName").value.trim(),
    address: document.getElementById("streetAddress").value.trim(),
    city: document.getElementById("city").value.trim(),
    phone: document.getElementById("phone").value.trim()
  };

  if (Object.values(delivery).some((value) => !value)) {
    alert("Please complete your delivery details before placing your order.");
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const payment = document.querySelector('input[name="payment"]:checked').value;
  const order = {
    id: `PL-${Date.now().toString().slice(-6)}`,
    items: cart,
    subtotal,
    discount: checkoutDiscount,
    total: Math.max(0, subtotal - checkoutDiscount),
    delivery,
    payment,
    estimatedDelivery: deliveryDate.toISOString(),
    placedAt: new Date().toISOString()
  };

  localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  localStorage.removeItem(CART_KEY);
  window.location.href = "order-success.html";
});

renderCheckoutItems();
updateCardDetails();
