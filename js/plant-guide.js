/* ============================================
   PLANT-GUIDE.JS
   Reads ?slug=snake-plant from the URL, pulls the
   matching entry from PLANT_GUIDES (plant-guide-data.js),
   and fills in the guide template.
   ============================================ */

(function () {

  function getSlug() {
    const params = new URLSearchParams(window.location.search);
    return (params.get("slug") || "").toLowerCase().trim();
  }

  function toTitleSlug(name) {
    return name.toLowerCase().replace(/\s+/g, "-");
  }

  function renderList(ulEl, items) {
    ulEl.innerHTML = "";
    items.forEach(function (text) {
      const li = document.createElement("li");
      li.textContent = text;
      ulEl.appendChild(li);
    });
  }

  function renderFacts(ulEl, facts) {
    ulEl.innerHTML = "";
    facts.forEach(function (fact) {
      const li = document.createElement("li");
      li.innerHTML = '<span class="pg-fact-label">' + fact.label + '</span><span class="pg-fact-value">' + fact.value + '</span>';
      ulEl.appendChild(li);
    });
  }

  function renderRelated(slug, data) {
    const grid = document.getElementById("pgRelatedGrid");
    grid.innerHTML = "";

    const others = Object.keys(data).filter(function (key) { return key !== slug; });
    // shuffle-lite: pick up to 3, prioritizing same difficulty first
    const current = data[slug];
    others.sort(function (a, b) {
      const aMatch = data[a].difficulty === current.difficulty ? 0 : 1;
      const bMatch = data[b].difficulty === current.difficulty ? 0 : 1;
      return aMatch - bMatch;
    });

    others.slice(0, 3).forEach(function (key) {
      const p = data[key];
      const card = document.createElement("a");
      card.href = "plant-guide.html?slug=" + key;
      card.className = "pg-related-card";
      card.innerHTML =
        '<div class="pg-related-img-wrap">' +
          '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
          '<span class="pc-difficulty ' + p.difficulty + '">' + capitalize(p.difficulty) + '</span>' +
        '</div>' +
        '<div class="pg-related-body">' +
          '<h3>' + p.name + '</h3>' +
          '<p>' + p.tagline + '</p>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function render() {
    const slug = getSlug();
    const data = PLANT_GUIDES;
    const entry = data[slug];

    if (!entry) {
      document.getElementById("pgNotFound").style.display = "flex";
      document.getElementById("pgContent").style.display = "none";
      document.title = "Care Guide Not Found — Plantora";
      return;
    }

    document.getElementById("pgNotFound").style.display = "none";
    document.getElementById("pgContent").style.display = "block";

    document.title = entry.name + " Care Guide — Plantora";
    document.getElementById("pgBreadcrumbName").textContent = entry.name;

    document.getElementById("pgHeroImg").src = entry.image;
    document.getElementById("pgHeroImg").alt = entry.name;

    const diffEl = document.getElementById("pgDifficulty");
    diffEl.textContent = capitalize(entry.difficulty);
    diffEl.className = "pc-difficulty " + entry.difficulty;

    document.getElementById("pgName").textContent = entry.name;
    document.getElementById("pgTagline").textContent = entry.tagline;

    document.getElementById("pgStatWater").textContent = entry.stats.water;
    document.getElementById("pgStatLight").textContent = entry.stats.light;
    document.getElementById("pgStatTemp").textContent = entry.stats.temp;
    document.getElementById("pgStatHumidity").textContent = entry.stats.humidity;

    document.getElementById("pgWatering").textContent = entry.watering;
    document.getElementById("pgLight").textContent = entry.light;
    document.getElementById("pgSoil").textContent = entry.soil;
    document.getElementById("pgHumidity").textContent = entry.humidity;

    renderList(document.getElementById("pgProblems"), entry.problems);
    renderList(document.getElementById("pgTips"), entry.tips);
    renderFacts(document.getElementById("pgFacts"), entry.facts);

    renderRelated(slug, data);
  }

  document.addEventListener("DOMContentLoaded", render);

})();