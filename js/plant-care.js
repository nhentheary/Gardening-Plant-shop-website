/* ============================================
   PLANT-CARE.JS
   Live search + filter + sort for the care guide
   cards grid on plant-care.html.
   All filters (search text, category tab, difficulty,
   light) combine together — sort is applied last.
   ============================================ */

(function () {

  const searchInput   = document.getElementById("careSearch");
  const difficultySel  = document.getElementById("difficultyFilter");
  const lightSel        = document.getElementById("lightFilter");
  const sortSel          = document.getElementById("sortFilter");
  const tabs               = document.querySelectorAll(".pc-tab");
  const grid                = document.getElementById("careGrid");
  const cards                = Array.from(grid.querySelectorAll(".pc-card"));
  const emptyState             = document.getElementById("emptyState");

  let activeCategory = "all";

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const difficulty = difficultySel.value;
    const light = lightSel.value;

    let visibleCount = 0;

    cards.forEach(function (card) {
      const name = card.dataset.name || "";
      const cat = card.dataset.cat || "";
      const cardDifficulty = card.dataset.difficulty || "";
      const cardLight = card.dataset.light || "";

      const matchesSearch = query === "" || name.includes(query);
      const matchesCategory = activeCategory === "all" || cat === activeCategory;
      const matchesDifficulty = difficulty === "" || cardDifficulty === difficulty;
      const matchesLight = light === "" || cardLight === light;

      const isVisible = matchesSearch && matchesCategory && matchesDifficulty && matchesLight;

      card.classList.toggle("hidden", !isVisible);
      if (isVisible) visibleCount++;
    });

    emptyState.style.display = visibleCount === 0 ? "flex" : "none";
    grid.style.display = visibleCount === 0 ? "none" : "grid";

    applySort();
  }

  function applySort() {
    const sortBy = sortSel.value;
    if (!sortBy) return;

    const visibleCards = cards.filter(function (card) {
      return !card.classList.contains("hidden");
    });

    visibleCards.sort(function (a, b) {
      if (sortBy === "az") {
        return a.dataset.name.localeCompare(b.dataset.name);
      }
      if (sortBy === "easy") {
        const order = { easy: 0, medium: 1, hard: 2 };
        return order[a.dataset.difficulty] - order[b.dataset.difficulty];
      }
      // "popular" — no popularity data yet, keep original DOM order
      return 0;
    });

    visibleCards.forEach(function (card) {
      grid.appendChild(card);
    });
  }

  function setActiveTab(clickedTab) {
    tabs.forEach(function (tab) { tab.classList.remove("active"); });
    clickedTab.classList.add("active");
    activeCategory = clickedTab.dataset.cat;
  }

  // ── EVENTS ──

  // live search as the user types
  searchInput.addEventListener("input", applyFilters);

  // pressing Enter in the search box just confirms the current live result,
  // no extra action needed, but prevent accidental form submission
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") e.preventDefault();
  });

  difficultySel.addEventListener("change", applyFilters);
  lightSel.addEventListener("change", applyFilters);
  sortSel.addEventListener("change", applyFilters);

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      setActiveTab(tab);
      applyFilters();
    });
  });

  // exposed for the empty-state "Clear filters" button (inline onclick in HTML)
  window.resetFilters = function () {
    searchInput.value = "";
    difficultySel.value = "";
    lightSel.value = "";
    sortSel.value = "";
    setActiveTab(document.querySelector('.pc-tab[data-cat="all"]'));
    applyFilters();
  };

  // initial render
  applyFilters();

})();