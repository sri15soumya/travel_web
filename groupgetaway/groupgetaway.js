// Sample data for groups with all requested destinations
const sampleGroups = [
    // Manali Trips
    {
        id: 1,
        name: "Manali Adventure Trek",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/8b/19/39/morning-sunlight-in-manali.jpg?w=1600&h=600&s=1",
        destination: "Manali",
        tripStartDate: "2023-11-10",
        tripEndDate: "2023-11-17",
        tripGuide: "Rajiv Thakur",
        members: 6,
        maxMembers: 10,
        ageGroup: "18-25",
        gender: "male",
        tripType: "adventure",
        price: "₹18,500",
        description: "Experience the thrill of trekking in the Himalayas around Manali, covering Hampta Pass and exploring the beautiful valleys.",
        itinerary: [
            {
                day: "Day 1: Arrival in Manali",
                title: "Orientation & Local Sightseeing",
                description: "Arrive in Manali, check-in to hotel. Visit Hadimba Temple and Old Manali in the evening.",
                highlights: [
                    "Hadimba Temple visit",
                    "Old Manali exploration",
                    "Welcome dinner"
                ],
                meals: "Dinner included",
                accommodation: "Hotel in Manali"
            },
            {
                day: "Day 2: Trek to Jogini Falls",
                title: "Acclimatization Trek",
                description: "Moderate trek to Jogini Falls to acclimatize to the altitude (2,560m).",
                highlights: [
                    "Scenic waterfall views",
                    "Village walk through Vashisht",
                    "Hot springs visit"
                ],
                meals: "Breakfast, Lunch, Dinner",
                accommodation: "Hotel in Manali",
                distance: "5km trek (3-4 hours)"
            }
        ],
        includes: [
            "All accommodations",
            "Professional trekking guide",
            "Meals during trek",
            "Trekking permits",
            "Local transportation"
        ],
        requirements: [
            "Good physical fitness",
            "Trekking shoes",
            "Warm clothing",
            "Daypack (30-40L)"
        ]
    },
    
    // Rishikesh Trips
    {
        id: 2,
        name: "Rishikesh Yoga & Rafting",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/4d/47/32/rishikesh.jpg?w=2400&h=1000&s=1",
        destination: "Rishikesh",
        tripStartDate: "2023-12-05",
        tripEndDate: "2023-12-10",
        tripGuide: "Yogi Mahesh",
        members: 8,
        maxMembers: 12,
        ageGroup: "26-35",
        gender: "male",
        tripType: "spiritual",
        price: "₹12,999",
        description: "Combine yoga and adventure in Rishikesh with daily yoga sessions, white water rafting, and spiritual experiences.",
        itinerary: [
            {
                day: "Day 1: Arrival & Ganga Aarti",
                title: "Welcome to Rishikesh",
                description: "Check-in to riverside camp. Evening Ganga Aarti at Triveni Ghat.",
                highlights: [
                    "Riverside camping",
                    "Evening aarti ceremony",
                    "Yoga introduction"
                ],
                meals: "Dinner included",
                accommodation: "Riverside camp"
            }
        ],
        includes: [
            "Daily yoga sessions",
            "White water rafting",
            "Accommodation in camps",
            "All meals",
            "Meditation classes"
        ],
        requirements: [
            "Comfortable clothing for yoga",
            "Swimwear for rafting",
            "Open mind for spiritual practices"
        ]
    },
    
    // Gangtok Trips
    {
        id: 3,
        name: "Gangtok & North Sikkim Tour",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/ed/a6/d8/lake-tsomgo-the-footprint.jpg?w=1600&h=600&s=1",
        destination: "Gangtok",
        tripStartDate: "2024-03-15",
        tripEndDate: "2024-03-22",
        tripGuide: "Tenzin Bhutia",
        members: 5,
        maxMembers: 8,
        ageGroup: "36-45",
        gender: "female",
        tripType: "cultural",
        price: "₹24,750",
        description: "Explore the cultural and natural wonders of Gangtok and North Sikkim, including Tsomgo Lake and Lachung Valley.",
        itinerary: [
            {
                day: "Day 1: Arrival in Gangtok",
                title: "City Orientation",
                description: "Arrive in Gangtok, visit Rumtek Monastery and local markets.",
                highlights: [
                    "Rumtek Monastery",
                    "MG Marg walk",
                    "Local cuisine tasting"
                ],
                meals: "Dinner included",
                accommodation: "Hotel in Gangtok"
            }
        ],
        includes: [
            "All accommodations",
            "Permits and entry fees",
            "Local transportation",
            "Guide services",
            "Most meals"
        ],
        requirements: [
            "Warm clothing",
            "Comfortable walking shoes",
            "Valid ID for permits"
        ]
    },
    
    // Coorg Trips
    {
        id: 4,
        name: "Coorg Coffee Plantation Stay",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/4d/47/10/kodagu-coorg.jpg?w=2400&h=1000&s=1",
        destination: "Coorg",
        tripStartDate: "2024-01-10",
        tripEndDate: "2024-01-14",
        tripGuide: "Anita Muthanna",
        members: 4,
        maxMembers: 6,
        ageGroup: "46+",
        gender: "mixed",
        tripType: "relaxation",
        price: "₹16,800",
        description: "Relax in a coffee plantation homestay, learn about coffee making, and enjoy the serene beauty of Coorg.",
        itinerary: [
            {
                day: "Day 1: Arrival & Plantation Tour",
                title: "Coffee Experience",
                description: "Arrive at plantation homestay. Evening tour of coffee estate and processing unit.",
                highlights: [
                    "Coffee plantation walk",
                    "Processing demonstration",
                    "Sunset views"
                ],
                meals: "Dinner included",
                accommodation: "Plantation homestay"
            }
        ],
        includes: [
            "Plantation stay accommodation",
            "All meals (local cuisine)",
            "Coffee making workshop",
            "Local sightseeing",
            "Nature walks"
        ],
        requirements: [
            "Casual comfortable clothing",
            "Walking shoes",
            "Camera for beautiful landscapes"
        ]
    },
    
    // Ooty Trips
    {
        id: 5,
        name: "Ooty Heritage & Nature Tour",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/a4/1c/4c/caption.jpg?w=600&h=600&s=1",
        destination: "Ooty",
        tripStartDate: "2024-02-20",
        tripEndDate: "2024-02-25",
        tripGuide: "David Raj",
        members: 7,
        maxMembers: 10,
        ageGroup: "26-35",
        gender: "mixed",
        tripType: "cultural",
        price: "₹14,500",
        description: "Explore the colonial heritage and natural beauty of Ooty, including tea gardens and botanical parks.",
        itinerary: [
            {
                day: "Day 1: Arrival & Toy Train Ride",
                title: "Nilgiri Mountain Railway",
                description: "Arrive in Ooty, check-in to heritage hotel. Evening toy train ride from Ooty to Coonoor.",
                highlights: [
                    "Heritage hotel stay",
                    "Toy train experience",
                    "Tea garden views"
                ],
                meals: "Dinner included",
                accommodation: "Heritage hotel in Ooty"
            }
        ],
        includes: [
            "Heritage accommodation",
            "Toy train tickets",
            "Entrance fees to attractions",
            "Guide services",
            "Breakfast and dinner"
        ],
        requirements: [
            "Light woolens (cool weather)",
            "Comfortable walking shoes",
            "Camera for scenic views"
        ]
    },
    
    // Daman and Diu Trips
    {
        id: 6,
        name: "Daman & Diu Beach Retreat",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/be/f3/87/jampore-beach.jpg?w=1200&h=800&s=1",
        destination: "Daman and Diu",
        tripStartDate: "2023-12-15",
        tripEndDate: "2023-12-20",
        tripGuide: "Rohan Fernandes",
        members: 5,
        maxMembers: 8,
        ageGroup: "18-25",
        gender: "mixed",
        tripType: "relaxation",
        price: "₹11,200",
        description: "Relax on the beautiful beaches of Daman and Diu, explore Portuguese heritage, and enjoy water sports.",
        itinerary: [
            {
                day: "Day 1: Arrival & Beach Time",
                title: "Welcome to Diu",
                description: "Arrive in Diu, check-in to beach resort. Evening at Nagoa Beach.",
                highlights: [
                    "Beachfront accommodation",
                    "Sunset at Nagoa Beach",
                    "Seafood dinner"
                ],
                meals: "Dinner included",
                accommodation: "Beach resort in Diu"
            }
        ],
        includes: [
            "Beach resort stay",
            "Some water sports activities",
            "Local sightseeing",
            "Breakfast and dinner",
            "Guide services"
        ],
        requirements: [
            "Beachwear",
            "Sunscreen and hat",
            "Valid ID for alcohol (Daman is duty-free)"
        ]
    },
    
    // Additional combinations
    

];

// Initialize cart items array and DOM elements
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');

// Update cart display on page load
window.onload = function() {
    updateCart();
    fetchPackages();
};

// Toggle cart dropdown
function toggleCart() {
    cartDropdown.classList.toggle('active');
}

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
        cartDropdown.classList.remove('active');
    }
});

// Update cart display
function updateCart() {
    // Update cart count
    cartCount.textContent = cartItems.length;

    // Clear current items
    cartItemsContainer.innerHTML = '';

    // Add items to cart
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.item}</div>
                <div class="cart-item-price">₹${item.cost}</div>
            </div>
            <div class="remove-item" onclick="removeItem(${index})">
                <i class="fas fa-trash"></i>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update total price
    const total = cartItems.reduce((sum, item) => sum + item.cost, 0);
    cartTotalPrice.textContent = `₹${total}`;

    // Store cart items in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Remove item from cart
function removeItem(index) {
    // Store the item before removing it
    const removedItem = cartItems[index];
    
    // Remove the item from the array
    cartItems.splice(index, 1);
    
    // Update the cart display
    updateCart();
    showNotification('Item removed from cart!');
    
    // Reset the corresponding "Add to Cart" button
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        if (button.getAttribute('data-item') === removedItem.item) {
            button.textContent = "Add to Cart";
            button.classList.remove("added");
            button.disabled = false;
        }
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Checkout function
async function checkout() {
    if (cartItems.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '../login.html';
            return;
        }

        // Add each item to the server cart
        for (const item of cartItems) {
            await fetch('http://localhost:3000/cart/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    item: item.item,
                    cost: item.cost
                })
            });
        }

        // Redirect to billing page
        window.location.href = 'billing.html';
        
    } catch (error) {
        console.error('Checkout error:', error);
        showNotification('Failed to checkout. Please try again.');
    }
}

// Fetch and display available groups
function fetchPackages() {
    const ageGroup = document.getElementById("ageGroup").value;
    const gender = document.getElementById("gender").value;
    

    // Filter groups based on selection
    let filteredGroups = sampleGroups.filter(group => {
        const ageMatch = ageGroup === "all" || group.ageGroup === ageGroup;
        const genderMatch = gender === "all" || group.gender === gender || (gender === "mixed" && group.gender === "all");
       
        return ageMatch && genderMatch ;
    });

    displayResults(filteredGroups);
}

// Display results in the UI
function displayResults(groups) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (groups.length === 0) {
        resultsDiv.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-users-slash fa-4x mb-3 text-muted"></i>
                <h4 class="text-muted">No groups found matching your criteria</h4>
                <p class="text-muted">Try adjusting your filters or check back later</p>
                <button onclick="resetFilters()" class="btn btn-outline-primary mt-3">
                    <i class="fas fa-redo me-2"></i>Reset Filters
                </button>
            </div>
        `;
        return;
    }

    groups.forEach(group => {
        const availableSeats = group.maxMembers - group.members;
        const progressPercent = (group.members / group.maxMembers) * 100;
        const badgeClass = `badge-${group.tripType}`;
        const price = parseInt(group.price.replace(/[^0-9]/g, '')); // Extract numeric value from price

        const groupCard = document.createElement("div");
        groupCard.className = "col-md-6 col-lg-4";
        groupCard.innerHTML = `
            <div class="group-card">
                <img src="${group.image}" alt="Group Image" class="group-img">
                <div class="group-info">
                    <div class="d-flex justify-content-between align-items-start">
                        <h3 class="group-title">${group.name}</h3>
                        <span class="badge ${badgeClass}">${group.tripType.charAt(0).toUpperCase() + group.tripType.slice(1)}</span>
                    </div>
                    
                    <div class="group-meta">
                        <div><i class="fas fa-map-marker-alt"></i> ${group.destination}</div>
                        <div><i class="fas fa-calendar-alt"></i> ${formatDate(group.tripStartDate)} - ${formatDate(group.tripEndDate)}</div>
                        <div><i class="fas fa-user-tie"></i> Guide: ${group.tripGuide}</div>
                        <div><i class="fas fa-users"></i> Age: ${group.ageGroup} years</div>
                        <div><i class="fas fa-${group.gender === 'female' ? 'female' : group.gender === 'male' ? 'male' : 'users'}"></i> ${group.gender === 'mixed' ? 'Mixed Group' : group.gender === 'female' ? 'Female Only' : group.gender === 'male' ? 'Male Only' : 'All Genders'}</div>
                        <div><i class="fas fa-rupee-sign"></i> ${group.price}</div>
                    </div>
                    
                    <p class="group-description">${group.description}</p>
                    
                    <div class="progress mt-3 mb-2">
                        <div class="progress-bar" 
                             style="width: ${progressPercent}%" 
                             aria-valuenow="${group.members}" 
                             aria-valuemin="0" 
                             aria-valuemax="${group.maxMembers}">
                        </div>
                    </div>
                    
                    <p class="group-stats">
                        ${group.members}/${group.maxMembers} members (${availableSeats} seats left)
                    </p>
                    
                    <div class="group-buttons">
                        <button class="btn btn-details" onclick="showDetailedView(${group.id})">
                            <i class="fas fa-info-circle me-2"></i>View Details
                        </button>
                        <button class="btn btn-primary add-to-cart" data-item="${group.name}" data-cost="${price}" onclick="addToCart(this)">
                            <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        resultsDiv.appendChild(groupCard);
    });

    // Update button states for items already in cart
    cartItems.forEach(item => {
        const buttons = document.querySelectorAll('.add-to-cart');
        buttons.forEach(button => {
            if (button.getAttribute('data-item') === item.item) {
                button.textContent = "Added";
                button.classList.add("added");
                button.disabled = true;
            }
        });
    });
}

// Format date to display
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Reset all filters
function resetFilters() {
    document.getElementById("ageGroup").value = "all";
    document.getElementById("gender").value = "all";
    document.getElementById("tripType").value = "all";
    fetchPackages();
}

// Show detailed view modal
function showDetailedView(groupId) {
    const group = sampleGroups.find(g => g.id === groupId);
    if (!group) return;

    const detailedContent = document.getElementById("detailed-content");
    detailedContent.innerHTML = `
        <div class="detailed-header">
            <h2 class="detailed-title">${group.name}</h2>
            <p class="detailed-subtitle">
                <i class="fas fa-map-marker-alt me-2"></i>${group.destination} | 
                <i class="fas fa-calendar-alt me-2"></i>${group.tripStartDate} to ${group.tripEndDate} | 
                <i class="fas fa-${group.gender === 'female' ? 'female' : group.gender === 'male' ? 'male' : 'users'} me-2"></i>${group.gender === 'mixed' ? 'Mixed Group' : group.gender === 'female' ? 'Female Only' : group.gender === 'male' ? 'Male Only' : 'All Genders'} | 
                <i class="fas fa-users me-2"></i>${group.ageGroup.replace("-", "-")} years
            </p>
            <span class="price-badge">${group.price}</span>
        </div>

        <div class="detailed-body">
            <div class="mb-4">
                <h3><i class="fas fa-info-circle me-2"></i>Trip Overview</h3>
                <p>${group.description}</p>
            </div>

            <h3 class="mb-3"><i class="fas fa-route me-2"></i>Detailed Itinerary</h3>
            ${group.itinerary.map(day => `
                <div class="itinerary-day">
                    <div class="day-header">
                        <h4 class="day-title">${day.day}</h4>
                        ${day.distance ? `<small class="text-muted">${day.distance}</small>` : ''}
                    </div>
                    <h5>${day.title}</h5>
                    <div class="day-content">
                        <p>${day.description}</p>
                        ${day.meals ? `<p><strong>Meals:</strong> ${day.meals}</p>` : ''}
                        ${day.accommodation ? `<p><strong>Accommodation:</strong> ${day.accommodation}</p>` : ''}
                        ${day.altitude ? `<p><strong>Altitude:</strong> ${day.altitude}</p>` : ''}
                        
                        ${day.highlights ? `
                        <div class="day-highlights">
                            <h6><i class="fas fa-star me-2"></i>Highlights</h6>
                            <div>
                                ${day.highlights.map(highlight => `
                                    <div class="highlight-item">
                                        <i class="fas fa-check"></i>
                                        <span>${highlight}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `).join('')}

            <div class="details-grid mt-4">
                <div class="details-card">
                    <h4><i class="fas fa-check-circle me-2"></i>What's Included</h4>
                    <ul>
                        ${group.includes.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>

                <div class="details-card">
                    <h4><i class="fas fa-clipboard-list me-2"></i>Requirements</h4>
                    <ul>
                        ${group.requirements.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="text-center mt-4">
                <button class="btn btn-primary btn-lg" onclick="addToCart(${group.id})">
                    <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                </button>
            </div>
        </div>
    `;

    document.getElementById("details-modal").style.display = "flex";
}

// Close details modal
function closeDetailsModal() {
    document.getElementById("details-modal").style.display = "none";
}

// Add to cart function
function addToCart(button) {
    const item = button.getAttribute('data-item');
    const cost = parseInt(button.getAttribute('data-cost'));

    // Add item to cart
    cartItems.push({ item, cost });
    
    // Update cart display
    updateCart();

    // Update button state
    button.textContent = "Added";
    button.classList.add("added");
    button.disabled = true;

    // Show cart dropdown
    cartDropdown.classList.add('active');

    // Show notification
    showNotification('Item added to cart!');
}