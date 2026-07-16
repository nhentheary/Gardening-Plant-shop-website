// =========================================================================
// PLANTORA NAVBAR INTERACTIVITY (js/navbar.js)
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // -------------------------------------------------------------
    // 1. MOBILE NAVBAR HAMBURGER MENU
    // -------------------------------------------------------------
    const hamburger = document.querySelector(".hamburger");
    const navbarLinks = document.querySelector(".navbar-links");

    if (hamburger && navbarLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navbarLinks.classList.toggle("active");
            
            // Toggle the display style for the mobile menu
            if (navbarLinks.classList.contains("active")) {
                navbarLinks.style.display = "flex";
                navbarLinks.style.flexDirection = "column";
            } else {
                navbarLinks.style.display = "";
            }
        });
    }

    // -------------------------------------------------------------
    // 2. SEARCH INPUT BAR
    // -------------------------------------------------------------
    const searchInput = document.querySelector(".navbar-search input");
    if (searchInput) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && searchInput.value.trim() !== "") {
                alert(`Searching Plantora for: "${searchInput.value}"`);
            }
        });
    }
});