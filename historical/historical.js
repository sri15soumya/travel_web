document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart items array from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Update cart display on page load
    updateCart();
    updateButtonStates();

    // Add click event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => addToCart(button));
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        const cartIcon = document.getElementById('cart-icon');
        const cartDropdown = document.getElementById('cart-dropdown');
        if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
            cartDropdown.classList.remove('active');
        }
    });

    // Toggle cart dropdown
    window.toggleCart = function() {
        const cartDropdown = document.getElementById('cart-dropdown');
        cartDropdown.classList.toggle('active');
    }

    // Update cart display
    function updateCart() {
        const cartCount = document.getElementById('cart-count');
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalPrice = document.getElementById('cart-total-price');

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
    window.removeItem = function(index) {
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
            const tourName = button.closest('.tour-card').querySelector('h3').textContent;
            if (tourName === removedItem.item) {
                button.innerHTML = '<i class="fas fa-shopping-cart me-2"></i>Add to Cart';
                button.classList.remove("added");
                button.disabled = false;
            }
        });
    }

    // Add to cart function
    function addToCart(button) {
        const tourCard = button.closest('.tour-card');
        const tourName = tourCard.querySelector('h3').textContent;
        const priceText = tourCard.querySelector('.price').textContent;
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));

        // Add item to cart
        cartItems.push({ item: tourName, cost: price });
        
        // Update cart display
        updateCart();

        // Update button state
        button.innerHTML = '<i class="fas fa-check me-2"></i>Added';
        button.classList.add("added");
        button.disabled = true;

        // Show cart dropdown
        document.getElementById('cart-dropdown').classList.add('active');

        // Show notification
        showNotification('Item added to cart!');
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
    window.checkout = async function() {
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

    // Update button states
    function updateButtonStates() {
        const buttons = document.querySelectorAll('.add-to-cart');
        buttons.forEach(button => {
            const tourCard = button.closest('.tour-card');
            const tourName = tourCard.querySelector('h3').textContent;
            const isInCart = cartItems.some(item => item.item === tourName);
            if (isInCart) {
                button.innerHTML = '<i class="fas fa-check me-2"></i>Added';
                button.classList.add("added");
                button.disabled = true;
            }
        });
    }

    // Initialize filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tourCards = document.querySelectorAll('.tour-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            tourCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Tour data for modal content
    const tourData = {
        'taj-mahal': {
            title: 'Taj Mahal & Agra Fort',
            duration: '2 Days / 1 Night',
            price: '₹8,500',
            locations: 'Agra, Uttar Pradesh',
            description: 'Experience the epitome of Mughal architecture with this tour of the Taj Mahal, one of the Seven Wonders of the World, and the magnificent Agra Fort, both UNESCO World Heritage Sites.',
            itinerary: [
                {
                    day: 'Day 1: Arrival & Taj Mahal Visit',
                    activities: [
                        'Morning arrival in Agra',
                        'Check-in at hotel',
                        'Afternoon visit to Taj Mahal (sunset view)',
                        'Evening visit to Mehtab Bagh for panoramic views',
                        'Dinner at a rooftop restaurant with Taj view'
                    ]
                },
                {
                    day: 'Day 2: Agra Fort & Departure',
                    activities: [
                        'Sunrise visit to Taj Mahal (optional)',
                        'Breakfast at hotel',
                        'Visit Agra Fort - the walled city',
                        'Explore local marble inlay workshops',
                        'Afternoon departure'
                    ]
                }
            ],
            inclusions: [
                'AC accommodation for 1 night',
                'All monument entry fees',
                'Expert guide for historical insights',
                'Mineral water during sightseeing'
            ],
            exclusions: [
                'Meals (except breakfast)',
                'Camera fees at monuments',
                'Personal expenses',
                'Any additional activities'
            ],
            whyChoose: [
                'Exclusive sunrise/sunset visits to Taj Mahal',
                'Small group sizes for better experience',
                'Certified archaeological guides',
                'Flexible itinerary options'
            ]
        },
        'hampi': {
            title: 'Hampi Ruins Exploration',
            duration: '3 Days / 2 Nights',
            price: '₹12,000',
            locations: 'Hampi, Karnataka',
            description: 'Discover the ruins of the magnificent Vijayanagara Empire, a UNESCO World Heritage Site, with its stunning temples, royal enclosures, and boulder-strewn landscapes.',
            itinerary: [
                {
                    day: 'Day 1: Arrival & Royal Enclosure',
                    activities: [
                        'Arrival in Hampi',
                        'Check-in at heritage property',
                        'Visit the Royal Enclosure with Mahanavami Dibba',
                        'Explore Queen\'s Bath and Lotus Mahal',
                        'Sunset at Hemakuta Hill temples'
                    ]
                },
                {
                    day: 'Day 2: Temple Exploration',
                    activities: [
                        'Sunrise visit to Virupaksha Temple',
                        'Explore Vittala Temple complex with stone chariot',
                        'Coracle ride on Tungabhadra River',
                        'Visit Achyutaraya Temple and market area',
                        'Evening at leisure'
                    ]
                },
                {
                    day: 'Day 3: Departure',
                    activities: [
                        'Visit Hazara Rama Temple',
                        'Explore underground Shiva Temple',
                        'Check-out and departure'
                    ]
                }
            ],
            inclusions: [
                '2 nights in heritage accommodation',
                'All monument entry fees',
                'Local guide for all sightseeing',
                'Coracle boat ride'
            ],
            exclusions: [
                'Meals (except breakfast)',
                'Transport to/from Hampi',
                'Personal expenses',
                'Any additional activities'
            ],
            whyChoose: [
                'Stay in heritage properties',
                'Expert local guides',
                'Comprehensive coverage of all major sites',
                'Flexible schedule'
            ]
        },
        'khajuraho': {
            title: 'Khajuraho Temples',
            duration: '2 Days / 1 Night',
            price: '₹9,500',
            locations: 'Khajuraho, Madhya Pradesh',
            description: 'Explore the exquisite temple complex of Khajuraho, a UNESCO World Heritage Site famous for its Nagara-style architecture and intricate erotic sculptures.',
            itinerary: [
                {
                    day: 'Day 1: Western Group Temples',
                    activities: [
                        'Arrival in Khajuraho',
                        'Check-in at hotel',
                        'Afternoon visit to Western Group temples',
                        'Evening light and sound show',
                        'Dinner at local restaurant'
                    ]
                },
                {
                    day: 'Day 2: Eastern Group & Departure',
                    activities: [
                        'Visit Eastern Group temples',
                        'Explore Jain temples',
                        'Visit Archaeological Museum',
                        'Afternoon departure'
                    ]
                }
            ],
            inclusions: [
                '1 night accommodation',
                'All temple entry fees',
                'Light and sound show ticket',
                'Expert guide services'
            ],
            exclusions: [
                'Meals (except breakfast)',
                'Transport to/from Khajuraho',
                'Personal expenses',
                'Camera fees'
            ],
            whyChoose: [
                'Detailed architectural explanations',
                'Small group sizes',
                'Flexible timing options',
                'Certified guides'
            ]
        },
        'mahabalipuram': {
            title: 'Mahabalipuram Heritage',
            duration: '2 Days / 1 Night',
            price: '₹7,500',
            locations: 'Mahabalipuram, Tamil Nadu',
            description: 'Discover the ancient port city of the Pallavas with its magnificent rock-cut temples and sculptures, a UNESCO World Heritage Site on the Coromandel Coast.',
            itinerary: [
                {
                    day: 'Day 1: Shore Temple & Monuments',
                    activities: [
                        'Arrival in Mahabalipuram',
                        'Check-in at beach resort',
                        'Visit Shore Temple and Five Rathas',
                        'Explore Arjuna\'s Penance bas-relief',
                        'Sunset at beach'
                    ]
                },
                {
                    day: 'Day 2: Departure',
                    activities: [
                        'Visit Tiger Cave and other monuments',
                        'Explore local sculpture workshops',
                        'Check-out and departure'
                    ]
                }
            ],
            inclusions: [
                '1 night beachfront accommodation',
                'All monument entry fees',
                'Local guide services',
                'Mineral water during sightseeing'
            ],
            exclusions: [
                'Meals (except breakfast)',
                'Transport to/from Mahabalipuram',
                'Personal expenses',
                'Any additional activities'
            ],
            whyChoose: [
                'Beachfront accommodation',
                'Expert local guides',
                'Comprehensive coverage of all major sites',
                'Flexible schedule'
            ]
        },
        'delhi': {
            title: 'Delhi Heritage Walk',
            duration: '1 Day',
            price: '₹4,000',
            locations: 'Delhi',
            description: 'Explore the rich historical legacy of India\'s capital through its magnificent monuments spanning several empires and centuries of history.',
            itinerary: [
                {
                    day: 'Full Day Delhi Heritage Tour',
                    activities: [
                        'Morning visit to Qutub Minar complex',
                        'Explore Mehrauli Archaeological Park',
                        'Visit Humayun\'s Tomb (UNESCO site)',
                        'Walk through Lodhi Gardens',
                        'Explore Safdarjung Tomb',
                        'Evening visit to India Gate and Rajpath'
                    ]
                }
            ],
            inclusions: [
                'AC vehicle for full day',
                'Expert heritage guide',
                'All monument entry fees',
                'Mineral water during tour'
            ],
            exclusions: [
                'Meals',
                'Personal expenses',
                'Any additional activities',
                'Hotel pickup/drop (can be arranged at extra cost)'
            ],
            whyChoose: [
                'Comprehensive coverage of Delhi\'s heritage',
                'Expert archaeological guides',
                'Small group sizes',
                'Flexible itinerary options'
            ]
        },
        'konark': {
            title: 'Konark Sun Temple',
            duration: '2 Days / 1 Night',
            price: '₹6,500',
            locations: 'Konark, Odisha',
            description: 'Marvel at the magnificent Sun Temple of Konark, a UNESCO World Heritage Site designed as a gigantic chariot with exquisitely carved stone wheels, pillars and walls.',
            itinerary: [
                {
                    day: 'Day 1: Arrival & Temple Visit',
                    activities: [
                        'Arrival in Konark',
                        'Check-in at hotel',
                        'Detailed exploration of Sun Temple',
                        'Visit Archaeological Museum',
                        'Evening at nearby Chandrabhaga beach'
                    ]
                },
                {
                    day: 'Day 2: Departure',
                    activities: [
                        'Morning visit to nearby temples',
                        'Explore local craft villages',
                        'Check-out and departure'
                    ]
                }
            ],
            inclusions: [
                '1 night accommodation',
                'Temple entry fees',
                'Local guide services',
                'Mineral water during sightseeing'
            ],
            exclusions: [
                'Meals (except breakfast)',
                'Transport to/from Konark',
                'Personal expenses',
                'Any additional activities'
            ],
            whyChoose: [
                'Detailed architectural explanations',
                'Small group sizes',
                'Expert local guides',
                'Flexible timing options'
            ]
        }
    };

    // Modal functionality
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const viewDetailButtons = document.querySelectorAll('.view-details');
    const closeModal = document.querySelector('.close-modal');

    viewDetailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tourId = button.getAttribute('data-tour');
            const tour = tourData[tourId];

            // Populate modal content
            modalContent.innerHTML = `
                <h2>${tour.title}</h2>
                <div class="tour-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${tour.locations}</span>
                    <span><i class="far fa-clock"></i> ${tour.duration}</span>
                    <span><i class="fas fa-rupee-sign"></i> ${tour.price}</span>
                </div>
                
                <p>${tour.description}</p>
                
                <h3>Itinerary</h3>
                ${tour.itinerary.map(day => `
                    <div class="itinerary-day">
                        <div class="day-title">${day.day}</div>
                        <ul>
                            ${day.activities.map(activity => `<li>${activity}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
                
                <div class="inclusions-exclusions">
                    <div>
                        <h3>Inclusions</h3>
                        <ul>
                            ${tour.inclusions.map(item => `
                                <li class="inclusion-item">
                                    <i class="fas fa-check-circle"></i> ${item}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div>
                        <h3>Exclusions</h3>
                        <ul>
                            ${tour.exclusions.map(item => `
                                <li class="exclusion-item">
                                    <i class="fas fa-times-circle"></i> ${item}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                
                <h3>Why Choose This Tour?</h3>
                <ul>
                    ${tour.whyChoose.map(item => `<li>${item}</li>`).join('')}
                </ul>
                
                <div class="modal-actions">
                    <button class="btn add-to-cart">Add to Cart</button>
                </div>
            `;

            // Show modal
            modal.classList.add('active');
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});