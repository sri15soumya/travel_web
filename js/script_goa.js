document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Safety Guide Animations
    const elements = document.querySelectorAll("#safe .tip, #safe .weather-box, #safe .emergency-box, #safe .advice");

    elements.forEach((element, index) => {
        gsap.fromTo(
            element,
            {
                opacity: 0,
                x: index % 2 === 0 ? -250 : 250 // Even elements slide from left, odd from right
            },
            {
                opacity: 1,
                x: 0,
                duration: 2, // Slower animation
                ease: "power2.out", // Smooth easing
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%", // Start animation when element is 85% visible
                    end: "top 20%", // When element reaches 20%, it starts hiding
                    toggleActions: "play none none reverse", // Play on scroll down, reverse on scroll up
                }
            }
        );
    });

    // Add hover animations for cards
    const cards = document.querySelectorAll(".hotel-card, .restaurant-card");
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1.02,
                ease: "power2.out"
            });
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
            });
        });
    });

    // Active Navigation State
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function setActiveNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Add scroll event listener for active state
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink(); // Set initial active state

    // Mobile Navigation Menu
    const initializeNavigation = () => {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            // Ensure nav links are visible on page load for desktop
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
                navLinks.style.left = '0';
            }

            navToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!event.target.closest('.nav-toggle') && !event.target.closest('.nav-links')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });

            // Close menu when clicking on a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }
    };

    // Initialize navigation
    initializeNavigation();

    // Re-initialize on window resize
    window.addEventListener('resize', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
                navLinks.style.left = '0';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.left = '-100%';
            }
        }
    });

    // Smooth scroll functionality
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Cart functionality
let cartItems = [];
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');

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

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.getAttribute('data-item');
        const cost = parseInt(button.getAttribute('data-cost'));

        // Add item to cart
        cartItems.push({ item, cost });
        updateCart();

        // Update button state
        button.textContent = "Added";
        button.classList.add("added");
        button.disabled = true;

        // Show cart dropdown
        cartDropdown.classList.add('active');

        // Show notification
        showNotification('Item added to cart!');
    });
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

// // Checkout function
// function checkout() {
//     if (cartItems.length === 0) {
//         showNotification('Your cart is empty!');
//         return;
//     }
    
//     const total = cartItems.reduce((sum, item) => sum + item.cost, 0);
//     showNotification(`Checkout successful! Total: ₹${total}`);
//     cartItems = [];
//     updateCart();
//     cartDropdown.classList.remove('active');
// }

// Update the checkout function in script_goa.js
async function checkout() {
    if (cartItems.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
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
