const LAST_ORDER_KEY = "plantoraLastOrder";

function currency(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function getLastOrder() {
  try {
    return JSON.parse(localStorage.getItem(LAST_ORDER_KEY));
  } catch {
    return null;
  }
}

function renderOrder() {
  const order = getLastOrder();
  const itemsContainer = document.getElementById("orderItems");

  if (!order || !Array.isArray(order.items)) {
    document.getElementById("success-title").textContent = "Your Order Details";
    document.querySelector(".success > p").textContent = "No recent order was found. You can continue shopping anytime.";
    itemsContainer.innerHTML = '<div class="item"><span>Order</span><span>Not available</span></div>';
    return;
  }

  document.getElementById("orderNumber").textContent = `#${order.id}`;
  document.getElementById("deliveryDate").textContent = new Intl.DateTimeFormat("en", {
    month: "short", day: "numeric", year: "numeric"
  }).format(new Date(order.estimatedDelivery));
  document.getElementById("orderTotal").textContent = currency(order.total);

  itemsContainer.innerHTML = "";
  order.items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "item";
    const name = document.createElement("span");
    name.textContent = `${item.name} ×${item.qty}`;
    const price = document.createElement("span");
    price.textContent = currency(item.price * item.qty);
    row.append(name, price);
    itemsContainer.appendChild(row);
  });

  if (order.discount > 0) {
    const discount = document.createElement("div");
    discount.className = "item";
    discount.innerHTML = `<span>Discount</span><span>-${currency(order.discount)}</span>`;
    itemsContainer.appendChild(discount);
  }
}

document.getElementById("trackBtn").addEventListener("click", () => {
  const order = getLastOrder();
  alert(order ? `Your order #${order.id} is being prepared.` : "Tracking will be available once an order has been placed.");
});

document.getElementById("shopBtn").addEventListener("click", () => {
  window.location.href = "shop.html";
});

renderOrder();
