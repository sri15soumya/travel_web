// document.getElementById("filter-btn").addEventListener("click", filterCruises);

// // Cruise Data with Prices
// const cruises = [
//     {
//         image: "./mumbai-mumbai-itinerary-desktop-image-01.webp",
//         date: "Apr 04 - Apr 07 2025",
//         month: "April",
//         route: "Mumbai - Goa - At Sea - Mumbai",
//         nights: "3N/4D",
//         ports: "Mumbai | Goa | Mumbai",
//         offers: "Kids Sail Free*",
//         destination: "Mumbai",
//         price: "₹25,000"
//     },
//     {
//         image: "goa-lakshadweep.jpg",
//         date: "May 10 - May 15 2025",
//         month: "May",
//         route: "Goa - Lakshadweep - Kochi - Goa",
//         nights: "5N/6D",
//         ports: "Goa | Lakshadweep | Kochi",
//         offers: "Early Bird Discount",
//         destination: "Goa",
//         price: "₹40,000"
//     },
//     {
//         image: "chennai-jaffna.jpg",
//         date: "Jun 05 - Jun 12 2025",
//         month: "June",
//         route: "Chennai - Jaffna - Langkawi - Chennai",
//         nights: "7N/8D",
//         ports: "Chennai | Jaffna | Langkawi",
//         offers: "Flat 15% Off",
//         destination: "Chennai",
//         price: "₹55,000"
//     },
//     {
//         image: "mumbai-kochi.jpg",
//         date: "Mar 15 - Mar 20 2025",
//         month: "March",
//         route: "Mumbai - Kochi - Lakshadweep - Mumbai",
//         nights: "5N/6D",
//         ports: "Mumbai | Kochi | Lakshadweep",
//         offers: "Couple Special Package",
//         destination: "Mumbai",
//         price: "₹38,000"
//     },
//     {
//         image: "kochi-langkawi.jpg",
//         date: "Apr 20 - Apr 26 2025",
//         month: "April",
//         route: "Kochi - Langkawi - At Sea - Kochi",
//         nights: "7N/8D",
//         ports: "Kochi | Langkawi",
//         offers: "Complimentary Excursion",
//         destination: "Kochi",
//         price: "₹60,000"
//     },
//     {
//         image: "goa-mumbai.jpg",
//         date: "May 30 - Jun 02 2025",
//         month: "May",
//         route: "Goa - Mumbai - At Sea - Goa",
//         nights: "3N/4D",
//         ports: "Goa | Mumbai",
//         offers: "Kids Go Free",
//         destination: "Goa",
//         price: "₹22,000"
//     },
//     {
//         image: "lakshadweep-jaffna.jpg",
//         date: "Jun 10 - Jun 16 2025",
//         month: "June",
//         route: "Lakshadweep - Jaffna - Chennai",
//         nights: "5N/6D",
//         ports: "Lakshadweep | Jaffna | Chennai",
//         offers: "Early Bird 10% Off",
//         destination: "Lakshadweep",
//         price: "₹42,000"
//     },
// ];

// // Function to display cruises
// function displayCruises(filteredCruises) {
//     const container = document.getElementById("cruise-container");
//     container.innerHTML = "";

//     if (filteredCruises.length === 0) {
//         container.innerHTML = "<p>No cruises match your selection.</p>";
//         return;
//     }

//     filteredCruises.forEach(cruise => {
//         const card = document.createElement("div");
//         card.classList.add("cruise-card");

//         card.innerHTML = `
//             <img src="images/${cruise.image}" alt="Cruise Image">
//             <div class="cruise-info">
//                 <p style="color: #740099; font-weight: bold;">${cruise.date}</p>
//                 <h3>${cruise.route} (${cruise.nights})</h3>
//                 <p><strong>Visiting Ports:</strong> ${cruise.ports}</p>
//                 <p class="available-offers">${cruise.offers}</p>
//                 <p><strong>Price:</strong> ${cruise.price}</p>
//                 <button class="add-to-cart-btn">Add to Cart</button>
//             </div>
//         `;
//         container.appendChild(card);
//     });
// }

// // Function to filter cruises
// function filterCruises() {
//     const selectedDestination = document.getElementById("destination").value;
//     const selectedMonth = document.getElementById("month").value;
//     const selectedNights = document.getElementById("nights").value;

//     const filteredCruises = cruises.filter(cruise => {
//         return (selectedDestination === "all" || cruise.destination === selectedDestination) &&
//                (selectedMonth === "all" || cruise.month === selectedMonth) &&
//                (selectedNights === "all" || cruise.nights === selectedNights);
//     });

//     displayCruises(filteredCruises);
// }

// // Show all cruises initially
// displayCruises(cruises);

document.getElementById("filter-btn").addEventListener("click", filterCruises);

// Cruise Data with Prices (updated with unique online image URLs)
const cruises = [
    {
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/mumbai-mumbai-itinerary-desktop-image-01.webp",
        date: "Apr 04 - Apr 07 2025",
        month: "April",
        route: "Mumbai - Goa - At Sea - Mumbai",
        nights: "3N/4D",
        ports: "Mumbai | Goa | Mumbai",
        offers: "Kids Sail Free*",
        destination: "Mumbai",
        price: "₹25,000"
    },
    {
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/mumbai-laksh-mumbai-itineray-desktop-image-01.webp",
        date: "May 10 - May 15 2025",
        month: "May",
        route: "Goa - Lakshadweep - Kochi - Goa",
        nights: "5N/6D",
        ports: "Goa | Lakshadweep | Kochi",
        offers: "Early Bird Discount",
        destination: "Goa",
        price: "₹40,000"
    },
    {
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/chennai-chennai-itinerary-mobile-image-01.webp",
        date: "Jun 05 - Jun 12 2025",
        month: "June",
        route: "Chennai - Jaffna - Langkawi - Chennai",
        nights: "7N/8D",
        ports: "Chennai | Jaffna | Langkawi",
        offers: "Flat 15% Off",
        destination: "Chennai",
        price: "₹55,000"
    },
    {
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-laksh-mumbai-itinerary-desktop-image-01.webp",
        date: "Mar 15 - Mar 20 2025",
        month: "March",
        route: "Mumbai - Kochi - Lakshadweep - Mumbai",
        nights: "5N/6D",
        ports: "Mumbai | Kochi | Lakshadweep",
        offers: "Couple Special Package",
        destination: "Mumbai",
        price: "₹38,000"
    },
    {
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/gallery-image-01.webp",
        date: "Apr 20 - Apr 26 2025",
        month: "April",
        route: "Kochi - Langkawi - At Sea - Kochi",
        nights: "7N/8D",
        ports: "Kochi | Langkawi",
        offers: "Complimentary Excursion",
        destination: "Kochi",
        price: "₹60,000"
    },
    {
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/mumabi-kochi-itinerary-desktop-image-01.webp",
        date: "May 30 - Jun 02 2025",
        month: "May",
        route: "Goa - Mumbai - At Sea - Goa",
        nights: "3N/4D",
        ports: "Goa | Mumbai",
        offers: "Kids Go Free",
        destination: "Goa",
        price: "₹22,000"
    },
    {
        image: "https://images.cordeliacruises.com/cordelia_v2/public/images/kochi-chennai-itinerary.webp",
        date: "Jun 10 - Jun 16 2025",
        month: "June",
        route: "Lakshadweep - Jaffna - Chennai",
        nights: "5N/6D",
        ports: "Lakshadweep | Jaffna | Chennai",
        offers: "Early Bird 10% Off",
        destination: "Lakshadweep",
        price: "₹42,000"
    },
];

// Function to display cruises
function displayCruises(filteredCruises) {
    const container = document.getElementById("cruise-container");
    container.innerHTML = "";

    if (filteredCruises.length === 0) {
        container.innerHTML = "<p>No cruises match your selection.</p>";
        return;
    }

    filteredCruises.forEach(cruise => {
        const card = document.createElement("div");
        card.classList.add("cruise-card");

        card.innerHTML = `
            <img src="${cruise.image}" alt="Cruise Image">
            <div class="cruise-info">
                <p style="color: #740099; font-weight: bold;">${cruise.date}</p>
                <h3>${cruise.route} (${cruise.nights})</h3>
                <p><strong>Visiting Ports:</strong> ${cruise.ports}</p>
                <p class="available-offers">${cruise.offers}</p>
                <p><strong>Price:</strong> ${cruise.price}</p>
                <button class="add-to-cart-btn">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        `;
        container.appendChild(card);

        // Add click event listener to the button
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', function() {
            if (!this.classList.contains('added')) {
                this.innerHTML = '<i class="fas fa-check"></i>Added to Cart';
                this.classList.add('added');
            }
        });
    });
}

// Function to filter cruises
function filterCruises() {
    const selectedDestination = document.getElementById("destination").value;
    const selectedMonth = document.getElementById("month").value;
    const selectedNights = document.getElementById("nights").value;

    const filteredCruises = cruises.filter(cruise => {
        return (selectedDestination === "all" || cruise.destination === selectedDestination) &&
               (selectedMonth === "all" || cruise.month === selectedMonth) &&
               (selectedNights === "all" || cruise.nights === selectedNights);
    });

    displayCruises(filteredCruises);
}

// Show all cruises initially
displayCruises(cruises);
