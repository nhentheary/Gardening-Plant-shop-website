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
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('plantoraCart')) || [];
    } catch {
        cart = [];
    }
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const total = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
        badge.textContent = total;
        badge.style.display = total > 0 ? 'flex' : 'none';
    }
}
updateCartCount();
