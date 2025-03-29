const pilgrimagePlaces = [
    {
        name: "Varanasi",
        location: "Uttar Pradesh",
        description: "One of the oldest cities, known for the Ganga Aarti.",
        image: "./varanasi.jpg",
        price: "₹ 200 per person",
        services: [
            "Guided tour of temples",
            "Ganga Aarti special pass",
            "Local vegetarian food",
            "Accommodation near Ghats"
        ]
    },
    {
        name: "Tirupati Balaji",
        location: "Andhra Pradesh",
        description: "Famous temple of Lord Venkateswara.",
        image: "./tirupati.avif",
        price: "₹ 250 per person",
        services: [
            "VIP darshan pass",
            "Prasadam package",
            "Special puja arrangements",
            "Hotel booking assistance"
        ]
    },
    {
        name: "Ajmer Sharif Dargah",
        location: "Rajasthan",
        description: "Sufi shrine of Khwaja Moinuddin Chishti.",
        image: "./ajmersharif.jpg",
        price: "₹ 180 per person",
        services: [
            "Qawwali night experience",
            "Special ziyarat pass",
            "Food for devotees",
            "Nearby hotel booking"
        ]
    },
    {
        name: "Velankanni Church",
        location: "Tamil Nadu",
        description: "Basilica of Our Lady of Good Health, a major pilgrimage site.",
        image: "./vanikani_church.jpg",
        price: "₹ 220 per person",
        services: [
            "Daily mass & blessings",
            "Pilgrim guesthouse",
            "Spiritual counseling",
            "Local guided tours"
        ]
    },
    {
        name: "Bodh Gaya",
        location: "Bihar",
        description: "Mahabodhi Temple, where Buddha attained enlightenment.",
        image: "./bodh+gaya.jpg",
        price: "₹ 210 per person",
        services: [
            "Meditation sessions",
            "Monastery stay",
            "Bodhi tree darshan",
            "Buddhist scripture classes"
        ]
    },
    {
        name: "Golden Temple",
        location: "Punjab",
        description: "The holiest site for Sikhs in Amritsar.",
        image: "./golden_temple.jpg",
        price: "₹ 230 per person",
        services: [
            "Free community meals (Langar)",
            "Holy Sarovar visit",
            "Historical museum tour",
            "Guest accommodation"
        ]
    }
];

function displayPlaces() {
    const list = document.getElementById("places-list");
    list.innerHTML = "";

    pilgrimagePlaces.forEach((place, index) => {
        const card = document.createElement("div");
        card.className = "place-card";
        card.innerHTML = `
            <img src="${place.image}" alt="${place.name}">
            <h3>${place.name}</h3>
            <p><strong>Location:</strong> ${place.location}</p>
            <p>${place.description}</p>
            <p><strong>Price:</strong> ${place.price}</p>
            <button onclick="showServices(${index})">View Services</button>
            <a href="#" class="join-now">Join Now</a>
        `;
        list.appendChild(card);
    });
}

function showServices(index) {
    const place = pilgrimagePlaces[index];

    document.getElementById("modal-title").textContent = place.name;
    document.getElementById("modal-description").textContent = place.description;

    const serviceList = document.getElementById("modal-services");
    serviceList.innerHTML = "";

    place.services.forEach(service => {
        const li = document.createElement("li");
        li.textContent = service;
        serviceList.appendChild(li);
    });

    document.getElementById("services-modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("services-modal").style.display = "none";
}

window.onload = displayPlaces;
function closeModal() {
    document.getElementById("services-modal").style.display = "none";
}

