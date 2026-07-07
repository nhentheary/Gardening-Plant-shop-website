// ── ACTIVE NAV LINK ──
const navLinks = document.querySelectorAll('.navbar-links a');
const currentPage = window.location.pathname.split('/').pop();

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage ||
        (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
    });

// ── HAMBURGER TOGGLE ──
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.navbar-links');

    if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
    });
    }

// ── CART BADGE COUNT ──
function updateCartCount() {
    const cart  = JSON.parse(localStorage.getItem('plantora-cart')) || [];
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent  = cart.length;
        badge.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}
updateCartCount();