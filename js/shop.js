

const plantData = {
    all: [
        {
            name: "Classic Echeveria",
            desc: "Beautiful low-maintenance desert succulent featuring compact, elegant rosettes.",
            price: 25.00,
            discount: 0,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: "Silver Snake Plant",
            desc: "Sturdy upright sword-shaped leaves that excel at purifying your indoor oxygen.",
            price: 35.00,
            discount: 10,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: "Vibrant Fittonia",
            desc: "Stunning colored nerve patterns that thrive in high humidity environments.",
            price: 20.00,
            discount: 0,
            image: "images/plants/Echeveria Elegans.jpg"
        }
    ],
    bestSeller: [
        {
            name: "Golden Pothos Vine",
            desc: "Fast-growing trailing foliage that looks wonderful cascading from high shelves.",
            price: 28.00,
            discount: 0,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: "Monstera Deliciosa",
            desc: "Iconic split leaves that bring an instant tropical jungle vibe into your room.",
            price: 45.00,
            discount: 15,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: "Emerald ZZ Plant ",
            desc: "Virtually indestructible shiny green stems that survive perfectly in low light.",
            price: 32.00,
            discount: 0,
            image: "images/plants/Echeveria Elegans.jpg"
        }
    ],
    onSales: [
        {
            name: "Ruby Rubber Plant ",
            desc: "Thick glossy burgundy leaves that add a dramatic modern accent to any decor.",
            price: 40.00,
            discount: 20,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: "Velvet Calathea  ",
            desc: "Deep purple decorative undersides that fold up beautifully during the night.",
            price: 38.00,
            discount: 25,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: " Dwarf Jade Bonsai",
            desc: "Charming miniature tree structure with thick woody trunks and fleshy leaves.",
            price: 30.00,
            discount: 30,
            image: "images/plants/Echeveria Elegans.jpg"
        }
    ],
    newArrivals: [
        {
            name: "Pink Princess Phil",
            desc: "Rare breathtaking variegated pink splashes cutting across deep green foliage.",
            price: 65.00,
            discount: 0,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: "Strict Fern Boston",
            desc: "Feathery arching bright fronds creating a classic lush timetable appearance.",
            price: 24.00,
            discount: 5,
            image: "images/plants/Echeveria Elegans.jpg"
        },
        {
            name: "Swiss Cheese Vine ",
            desc: "Climbing pattern of perforated windows that adapt effortlessly to moss poles.",
            price: 27.00,
            discount: 0,
            image: "images/plants/Echeveria Elegans.jpg"
        }
    ]
};

// Example Tab click listener setup to handle the dynamic changing:
function renderPlants(type) {
    const container = document.getElementById("plants-container"); // Adjust to match your HTML container ID
    container.innerHTML = "";
    
    // Grabs selected category or defaults to all plants
    const selectedPlants = plantData[type] || plantData.all;
    
    selectedPlants.forEach(plant => {
        const finalPrice = plant.discount > 0 ? (plant.price * (1 - plant.discount / 100)).toFixed(2) : plant.price.toFixed(2);
        const originalPriceHTML = plant.discount > 0 ? `<span class="old-price">$${plant.price.toFixed(2)}</span>` : '';
        
        container.innerHTML += `
            <div class="plant-card">
                <img src="${plant.image}" alt="${plant.name}" class="plant-img">
                <h3 class="plant-title">${plant.name}</h3>
                <p class="plant-desc">${plant.desc}</p>
                <div class="price-wrapper">
                    <span class="current-price">$${finalPrice}</span>
                    ${originalPriceHTML}
                </div>
                <div class="size-box">Standard Size</div>
            </div>
        `;
    });
}

// Wire up your click listeners for the tabs ("All Plants", "Best Seller", "On Sales", "New Arrivals")
// to call renderPlants('all'), renderPlants('bestSeller'), renderPlants('onSales'), or renderPlants('newArrivals')