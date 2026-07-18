// Payment Selection

const payments = document.querySelectorAll(".payment");

payments.forEach(payment => {

payment.addEventListener("click", () => {

payments.forEach(p => p.classList.remove("active"));

payment.classList.add("active");

payment.querySelector("input").checked = true;

});

});

// Delete Product

document.querySelectorAll(".delete").forEach(btn => {

btn.onclick = function(){

this.parentElement.remove();

};

});

// Order Button

document.getElementById("orderBtn").addEventListener("click", () => {

alert("🎉 Your order has been placed successfully!");

window.location.href = "order-sucess.html";

});

// Coupon (demo logic: any non-empty code applies a flat $5 discount)

const originalSubtotal = 25.98;
let checkoutDiscount = 0;

function updateCheckoutSummary() {
  const total = Math.max(0, originalSubtotal - checkoutDiscount);
  document.getElementById("discountAmount").textContent = `-$${checkoutDiscount.toFixed(2)}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

document.getElementById("applyCouponBtn").addEventListener("click", () => {
  const code = document.getElementById("couponInput").value.trim();
  checkoutDiscount = code ? 5 : 0;
  updateCheckoutSummary();
});
