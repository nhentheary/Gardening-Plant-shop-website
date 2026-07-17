/* ============================================
   PLANT-GUIDE-DATA.JS
   One entry per plant, keyed by the same "slug"
   used in plant-care.html's data-name attribute
   (spaces → hyphens, lowercase).
   Add a new plant by adding a new key here —
   the guide page and card links will pick it up
   automatically, no HTML duplication needed.
   ============================================ */

const PLANT_GUIDES = {

  "snake-plant": {
    name: "Snake Plant",
    tagline: "Nearly indestructible — thrives on neglect and low light.",
    difficulty: "easy",
    image: "https://i.pinimg.com/736x/49/35/0c/49350c0cbb35cb620b085ba6f08677df.jpg",
    stats: { water: "Low", light: "Low–medium", temp: "18–27°C", humidity: "Low" },
    watering: "Let the soil dry out completely between waterings — roughly every 2–3 weeks indoors, less in winter. Overwatering is by far the most common way to lose a snake plant, so when in doubt, wait a few more days.",
    light: "Tolerates low light but grows fastest in bright, indirect light. Avoid direct afternoon sun, which can scorch the leaves.",
    soil: "Use a fast-draining cactus or succulent mix. Repot only every 3–5 years, as snake plants prefer being slightly root-bound.",
    humidity: "Comfortable in normal household humidity. Keep it away from cold drafts and away from heating vents.",
    problems: [
      "Mushy, yellowing leaves — usually overwatering; let the soil dry out fully before watering again.",
      "Curling or thin leaves — often underwatering combined with very bright light; water a little sooner.",
      "Brown leaf tips — typically low humidity or a buildup of mineral salts; try filtered water."
    ],
    tips: [
      "Water into the soil, not over the leaves, to avoid rot at the base.",
      "A great first plant for low-light apartments or offices.",
      "Propagates easily from leaf cuttings placed in water."
    ],
    facts: [
      { label: "Native to", value: "West Africa" },
      { label: "Toxic to pets", value: "Mildly, if ingested" },
      { label: "Growth rate", value: "Slow" },
      { label: "Air purifying", value: "Yes" }
    ]
  },

  "monstera": {
    name: "Monstera",
    tagline: "Loves bright, indirect light and a weekly drink of water.",
    difficulty: "medium",
    image: "https://i.pinimg.com/736x/68/b9/21/68b9213c2c5fe9f5e4d7938b3ffb254e.jpg",
    stats: { water: "Weekly", light: "Bright indirect", temp: "18–29°C", humidity: "Medium–high" },
    watering: "Water when the top 5cm of soil feels dry, typically once a week in the growing season and less often in winter. Always let excess water drain fully — Monstera hates sitting in soggy soil.",
    light: "Bright, indirect light brings out the best leaf splitting (fenestration). A few feet from an east or west-facing window is ideal; too little light means smaller, unsplit leaves.",
    soil: "A chunky, well-draining aroid mix (potting soil with added bark and perlite) works best. Repot every 1–2 years as the plant matures, sizing up one pot size at a time.",
    humidity: "Prefers humidity above 50%. A pebble tray, humidifier, or grouping with other plants helps, especially in dry, air-conditioned rooms.",
    problems: [
      "No leaf splitting — usually not enough light; move it closer to a bright window.",
      "Yellow lower leaves — often overwatering; check that the pot drains well.",
      "Brown, crispy edges — low humidity or a buildup of fertilizer salts."
    ],
    tips: [
      "Give it a moss pole or trellis to climb — the leaves grow larger with support.",
      "Wipe dust off the large leaves monthly so they can photosynthesize efficiently.",
      "Aerial roots are normal; you can tuck them into the soil or let them hang."
    ],
    facts: [
      { label: "Native to", value: "Central America" },
      { label: "Toxic to pets", value: "Yes, mildly" },
      { label: "Growth rate", value: "Fast" },
      { label: "Mature size", value: "Up to 3m indoors" }
    ]
  },

  "fiddle-leaf-fig": {
    name: "Fiddle-Leaf Fig",
    tagline: "Fussy about light and dislikes being moved once settled.",
    difficulty: "hard",
    image: "https://i.pinimg.com/1200x/8a/e5/76/8ae5761850d92c3873765f63bf179bf7.jpg",
    stats: { water: "Moderate", light: "Bright indirect", temp: "16–24°C", humidity: "Medium" },
    watering: "Water thoroughly when the top 3–5cm of soil is dry, usually every 7–10 days. Consistency matters more than frequency — both over- and under-watering cause dropped leaves.",
    light: "Needs several hours of bright, indirect light daily; a south or west-facing window is ideal. Rotate the pot a quarter turn every week or two for even growth.",
    soil: "A well-draining potting mix with added perlite. Repot every 1–2 years in spring, moving up only one pot size to avoid overwatering issues in oversized soil volume.",
    humidity: "Prefers moderate to high humidity and steady temperatures. Keep it away from drafts, air vents, and doors that open to the outside.",
    problems: [
      "Brown spots on leaves — commonly overwatering or inconsistent watering schedule.",
      "Sudden leaf drop — usually caused by being moved, cold drafts, or a big change in light.",
      "Small new leaves — often not enough light; move closer to a window."
    ],
    tips: [
      "Pick one good spot and leave it there — fiddle-leaf figs dislike being relocated.",
      "Dust the large leaves regularly so the plant can absorb light efficiently.",
      "Use the same type of water each time (filtered or rested tap water) to reduce leaf-spotting from mineral buildup."
    ],
    facts: [
      { label: "Native to", value: "West Africa" },
      { label: "Toxic to pets", value: "Yes, mildly" },
      { label: "Growth rate", value: "Moderate" },
      { label: "Mature size", value: "Up to 3m indoors" }
    ]
  },

  "echeveria": {
    name: "Echeveria",
    tagline: "A classic rosette succulent that thrives in bright light.",
    difficulty: "easy",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600",
    stats: { water: "Very low", light: "Full sun", temp: "10–27°C", humidity: "Low" },
    watering: "Use the soak-and-dry method: water thoroughly, then let the soil dry out completely before watering again — usually every 2–3 weeks. Water at the base to keep the rosette dry.",
    light: "Needs at least 6 hours of bright light daily. Outdoors it can handle full sun; indoors, place it on the sunniest windowsill you have to prevent it from stretching (etiolating).",
    soil: "A gritty, fast-draining succulent or cactus mix is essential. Repot every 1–2 years, always into a pot with drainage holes.",
    humidity: "Prefers dry air and good airflow. High humidity combined with wet soil is the main cause of rot.",
    problems: [
      "Stretched, leggy growth — not enough light; move to a brighter spot.",
      "Mushy, translucent leaves — overwatering or poor drainage; let the soil dry out fully.",
      "Shriveled leaves — underwatering; give it a thorough soak."
    ],
    tips: [
      "Terracotta pots help excess moisture evaporate faster than plastic.",
      "Propagate easily from healthy leaves — let them callous over for a day before placing on soil.",
      "Avoid getting water on the leaves, which can cause spotting or rot."
    ],
    facts: [
      { label: "Native to", value: "Mexico & Central America" },
      { label: "Toxic to pets", value: "Non-toxic" },
      { label: "Growth rate", value: "Slow" },
      { label: "Mature size", value: "10–30cm wide" }
    ]
  },

  "peace-lily": {
    name: "Peace Lily",
    tagline: "Elegant white blooms that droop dramatically when thirsty.",
    difficulty: "medium",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=600",
    stats: { water: "Moderate", light: "Low–indirect", temp: "18–27°C", humidity: "High" },
    watering: "Keep the soil lightly moist but never soggy — water when the top 2–3cm feels dry, roughly once a week. The leaves droop noticeably when the plant needs water, making it easy to read.",
    light: "Tolerates low light but blooms more reliably in medium to bright indirect light. Avoid direct sun, which scorches the leaves.",
    soil: "A standard, well-draining potting mix works well. Repot every 1–2 years or once roots start circling the bottom of the pot.",
    humidity: "Loves humidity — mist occasionally or place near a humidifier, especially in dry indoor air. Bathroom spots with indirect light work well.",
    problems: [
      "Drooping leaves — almost always thirst; water and it should perk back up within hours.",
      "Brown leaf tips — often low humidity or tap water with high mineral content; try filtered water.",
      "No flowers — usually not enough light; move to a brighter (but still indirect) spot."
    ],
    tips: [
      "Wipe the leaves occasionally to keep them glossy and dust-free.",
      "Trim spent flower stalks at the base once blooms fade.",
      "Keep away from pets — it's toxic if chewed or ingested."
    ],
    facts: [
      { label: "Native to", value: "Tropical Americas" },
      { label: "Toxic to pets", value: "Yes" },
      { label: "Growth rate", value: "Moderate" },
      { label: "Air purifying", value: "Yes" }
    ]
  },

  "pothos": {
    name: "Pothos",
    tagline: "Fast-growing trailing plant that thrives in almost any condition.",
    difficulty: "easy",
    image: "https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=600",
    stats: { water: "Low", light: "Any light", temp: "15–29°C", humidity: "Low–medium" },
    watering: "Let the top 3–5cm of soil dry out between waterings, usually every 1–2 weeks. Pothos is forgiving and will tell you it's thirsty with slightly droopy, softer leaves.",
    light: "Adapts to almost any light level, from low light to bright indirect. Variegated varieties keep their patterning best in brighter light.",
    soil: "Any well-draining general potting mix works fine. Repot every 1–2 years, or whenever roots start poking out of the drainage holes.",
    humidity: "Not picky — handles normal household humidity without issue, making it a solid choice for offices and dry apartments.",
    problems: [
      "Leggy vines with small leaves — usually low light; trim and move to a brighter spot to encourage fuller growth.",
      "Yellow leaves — most often overwatering; let the soil dry out more between waterings.",
      "Losing variegation — happens in low light on variegated varieties; more light helps restore the pattern on new growth."
    ],
    tips: [
      "One of the easiest plants to propagate — cut just below a node and root in water.",
      "Trim regularly to keep it bushy rather than one long trailing vine.",
      "Great for hanging baskets, shelves, or trained onto a pole to climb."
    ],
    facts: [
      { label: "Native to", value: "Southeast Asia" },
      { label: "Toxic to pets", value: "Yes, mildly" },
      { label: "Growth rate", value: "Fast" },
      { label: "Air purifying", value: "Yes" }
    ]
  }

};