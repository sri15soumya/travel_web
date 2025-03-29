// Get cart items from localStorage or server
let cartItems = [];

// Initialize the page
window.onload = async function() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '../login.html';
            return;
        }

        // Get cart items from localStorage
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            cartItems = JSON.parse(storedCartItems);
            displayCartSummary();
        } else {
            // If no items in localStorage, try fetching from server
            const response = await fetch('http://localhost:3000/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }

            cartItems = await response.json();
            displayCartSummary();
        }
    } catch (error) {
        console.error('Error loading cart:', error);
        showNotification('Failed to load cart items');
    }
};

// Display cart summary
function displayCartSummary() {
    const cartSummary = document.getElementById('cart-summary');
    const totalAmount = document.getElementById('total-amount');
    
    cartSummary.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.item}</span>
            <span>₹${item.cost}</span>
        `;
        cartSummary.appendChild(itemElement);
        total += item.cost;
    });

    totalAmount.textContent = `₹${total}`;
}

// Handle payment method selection
function selectPaymentMethod(method) {
    // Remove selected class from all payment methods
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
    });

    // Add selected class to clicked method
    const selectedMethod = document.querySelector(`.payment-method`);
    if (selectedMethod) {
        selectedMethod.classList.add('selected');
    }

    // Show/hide QR code for UPI
    const qrCode = document.getElementById('qr-code');
    qrCode.style.display = method === 'upi' ? 'block' : 'none';
}

// Process payment
async function processPayment() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '../login.html';
            return;
        }

        // Simulate payment processing
        const response = await fetch('http://localhost:3000/verify-upi-payment', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cartItems,
                total: cartItems.reduce((sum, item) => sum + item.cost, 0)
            })
        });

        if (!response.ok) {
            throw new Error('Payment failed');
        }

        // Clear cart from localStorage
        localStorage.removeItem('cartItems');

        // Clear cart from server
        await fetch('http://localhost:3000/cart/remove', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: cartItems
            })
        });

        // Redirect to success page
        window.location.href = 'payment-success.html';
    } catch (error) {
        console.error('Payment error:', error);
        showNotification('Payment failed. Please try again.');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
} 