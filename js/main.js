// ── HAMBURGER MENU ──
function toggleMenu() {
    const menu = document.querySelector('.navbar-links');
    const burger = document.querySelector('.hamburger');
    menu.classList.toggle('open');
    burger.classList.toggle('active');
}

// close menu when link clicked
document.querySelectorAll('.navbar-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.navbar-links').classList.remove('open');
        document.querySelector('.hamburger').classList.remove('active');
    });
});

// ── ACTIVE NAV LINK ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar-links a').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) link.classList.add('active');
});

// ── CART BADGE ──
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('plantora-cart')) || [];
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = cart.length;
        badge.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}
updateCartCount();