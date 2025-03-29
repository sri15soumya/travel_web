// // Payment method selection
// const paymentMethods = document.querySelectorAll('.payment-method');
// const paymentForms = document.querySelectorAll('.payment-form');

// paymentMethods.forEach(method => {
//     method.addEventListener('click', () => {
//         // Remove active class from all methods
//         paymentMethods.forEach(m => m.classList.remove('active'));
//         // Add active class to clicked method
//         method.classList.add('active');

//         // Hide all forms
//         paymentForms.forEach(form => form.classList.remove('active'));
//         // Show selected form
//         const formId = method.getAttribute('data-form');
//         document.getElementById(formId).classList.add('active');

//         // If UPI is selected, generate QR code
//         if (method.dataset.method === 'upi') {
//             generateQRCode();
//         }
//     });
// });

// // UPI option selection
// const upiOptions = document.querySelectorAll('.upi-option');
// const upiIdForm = document.getElementById('upi-id-form');
// const upiScanForm = document.getElementById('upi-scan-form');

// upiOptions.forEach(option => {
//     option.addEventListener('click', () => {
//         upiOptions.forEach(o => o.classList.remove('active'));
//         option.classList.add('active');

//         if (option.dataset.option === 'id') {
//             upiIdForm.style.display = 'block';
//             upiScanForm.style.display = 'none';
//         } else {
//             upiIdForm.style.display = 'none';
//             upiScanForm.style.display = 'block';
//         }
//     });
// });

// // Card number formatting
// document.getElementById('card-number').addEventListener('input', function (e) {
//     let value = e.target.value.replace(/\D/g, '');
//     value = value.replace(/(.{4})/g, '$1 ').trim();
//     e.target.value = value;
// });

// // Card expiry date formatting
// document.getElementById('expiry-date').addEventListener('input', function (e) {
//     let value = e.target.value.replace(/\D/g, '');
//     if (value.length >= 2) {
//         value = value.slice(0, 2) + '/' + value.slice(2, 4);
//     }
//     e.target.value = value;
// });

// // Form submissions
// async function handleCardPayment(event, type) {
//     event.preventDefault();
//     const form = event.target;
//     const errorMessage = form.querySelector('.error-message');
//     const successMessage = form.querySelector('.success-message');

//     try {
//         // Get form data
//         const formData = {
//             type: type,
//             cardNumber: form.querySelector('#card-number').value.replace(/\s/g, ''),
//             cardHolder: form.querySelector('#card-holder').value,
//             expiryDate: form.querySelector('#expiry-date').value,
//             cvv: form.querySelector('#cvv').value
//         };

//         const response = await fetch('http://your-other-website.com/process-payment', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData)
//         });

//         const data = await response.json();

//         if (response.ok) {
//             successMessage.textContent = 'Payment successful! Redirecting...';
//             successMessage.style.display = 'block';
//             errorMessage.style.display = 'none';

//             setTimeout(() => {
//                 window.location.href = '/payment-success';
//             }, 2000);
//         } else {
//             throw new Error(data.message || 'Payment failed');
//         }
//     } catch (error) {
//         errorMessage.textContent = error.message || 'An error occurred. Please try again.';
//         errorMessage.style.display = 'block';
//         successMessage.style.display = 'none';
//         form.classList.add('shake');

//         setTimeout(() => {
//             form.classList.remove('shake');
//         }, 500);
//     }
// }

// async function handleUPIPayment(event) {
//     event.preventDefault();
//     const form = event.target;
//     const errorMessage = form.querySelector('.error-message');
//     const successMessage = form.querySelector('.success-message');

//     try {
//         const formData = {
//             type: 'upi',
//             upiId: form.querySelector('#upi-id').value
//         };

//         const response = await fetch('http://your-other-website.com/process-payment', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData)
//         });

//         const data = await response.json();

//         if (response.ok) {
//             successMessage.textContent = 'Payment successful! Redirecting...';
//             successMessage.style.display = 'block';
//             errorMessage.style.display = 'none';

//             setTimeout(() => {
//                 window.location.href = '/payment-success';
//             }, 2000);
//         } else {
//             throw new Error(data.message || 'Payment failed');
//         }
//     } catch (error) {
//         errorMessage.textContent = error.message || 'An error occurred. Please try again.';
//         errorMessage.style.display = 'block';
//         successMessage.style.display = 'none';
//         form.classList.add('shake');

//         setTimeout(() => {
//             form.classList.remove('shake');
//         }, 500);
//     }
// }

// // Generate random QR code URL for demo
// document.addEventListener('DOMContentLoaded', () => {
//     const qrCode = document.querySelector('.qr-code img');
//     if (qrCode) {
//         // In a real application, this would be generated by your backend
//         const demoQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=example@upi&pn=Example%20Merchant&am=100.00&cu=INR`;
//         qrCode.src = demoQrUrl;
//     }
// });

// // Get DOM elements
// const profileImage = document.getElementById('profileImage');
// const userName = document.getElementById('userName');
// const userEmail = document.getElementById('userEmail');
// const userPhone = document.getElementById('userPhone');
// const userLocation = document.getElementById('userLocation');
// const cartItems = document.getElementById('cartItems');
// const totalAmount = document.getElementById('totalAmount');

// // // Initialize page

// // document.addEventListener('DOMContentLoaded', async () => {
// //     console.log('Page loaded'); // Debug log

// //     // Check for token
// //     const token = localStorage.getItem('token');
// //     console.log('Token exists:', !!token); // Debug log

// //     if (!token) {
// //         console.log('No token found, redirecting to login');
// //         window.location.href = 'login.html';
// //         return;
// //     }

// //     try {
// //         // Fetch checkout data
// //         console.log('Fetching checkout data...'); // Debug log

// //         const response = await fetch('http://localhost:3000/cart/checkout', {
// //             method: 'GET',
// //             headers: {
// //                 'Authorization': `Bearer ${token}`,
// //                 'Content-Type': 'application/json'
// //             }
// //         });

// //         console.log('Response status:', response.status); // Debug log

// //         if (!response.ok) {
// //             throw new Error(`HTTP error! status: ${response.status}`);
// //         }

// //         const data = await response.json();
// //         console.log('Received data:', data); // Debug log

// //         // Update profile section
// //         if (data.user) {
// //             console.log('Updating user profile...'); // Debug log

// //             // Set profile image
// //             const defaultImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.name)}&background=random&size=200`;
// //             profileImage.src = defaultImageUrl;

// //             // Update user details
// //             userName.textContent = data.user.name || 'N/A';
// //             userEmail.textContent = `Email: ${data.user.email || 'N/A'}`;
// //             userPhone.textContent = `Phone: ${data.user.phone || 'N/A'}`;
// //             userLocation.textContent = `Location: ${data.user.location || 'N/A'}`;
// //         } else {
// //             console.log('No user data received'); // Debug log
// //         }

// //         // Update cart section
// //         if (data.cart && data.cart.length > 0) {
// //             console.log('Updating cart items...'); // Debug log

// //             // Clear existing items
// //             cartItems.innerHTML = '';

// //             // Add each item to the table
// //             data.cart.forEach(item => {
// //                 if (!item || !item.item || !item.cost) return;

// //                 const row = document.createElement('tr');
// //                 row.innerHTML = `
// //                     <td>${item.item}</td>
// //                     <td>1</td>
// //                     <td>₹${item.cost.toFixed(2)}</td>
// //                     <td>₹${item.cost.toFixed(2)}</td>
// //                 `;
// //                 cartItems.appendChild(row);
// //             });

// //             // Update total amount
// //             totalAmount.textContent = `₹${data.total.toFixed(2)}`;
// //         } else {
// //             console.log('No cart items found'); // Debug log
// //             cartItems.innerHTML = '<tr><td colspan="4" style="text-align: center;">No items in cart</td></tr>';
// //             totalAmount.textContent = '₹0';
// //         }

// //     } catch (error) {
// //         console.error('Error fetching data:', error);
// //         alert('Failed to load checkout data. Please try again.');
// //     }
// // });

// document.addEventListener('DOMContentLoaded', async () => {
//     console.log('Page loaded');

//     // Check for token
//     const token = localStorage.getItem('token');
//     console.log('Token:', token);

//     if (!token) {
//         console.log('No token found, redirecting to login');
//         window.location.href = 'login.html';
//         return;
//     }

//     try {
//         // Fetch checkout data
//         console.log('Fetching checkout data...');

//         const response = await fetch('http://localhost:3000/cart/checkout', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log('Response status:', response.status);

//         if (response.status === 401 || response.status === 403) {
//             localStorage.removeItem('token');
//             window.location.href = 'login.html';
//             return;
//         }

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('Received data:', data);

//         // Update profile section
//         if (data.user) {
//             console.log('Updating user profile...');

//             // Set profile image
//             const defaultImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.name)}&background=random&size=200`;
//             document.getElementById('profileImage').src = defaultImageUrl;

//             // Update user details
//             document.getElementById('userName').textContent = data.user.name || 'N/A';
//             document.getElementById('userEmail').textContent = `Email: ${data.user.email || 'N/A'}`;
//             document.getElementById('userPhone').textContent = `Phone: ${data.user.phone || 'N/A'}`;
//             document.getElementById('userLocation').textContent = `Location: ${data.user.location || 'N/A'}`;
//         }

//         // Update cart section
//         const cartItemsElement = document.getElementById('cartItems');
//         const totalAmountElement = document.getElementById('totalAmount');
//         // Update the cart display logic
//         if (data.cart && data.cart.length > 0) {
//             const cartItemsElement = document.getElementById('cartItems');
//             cartItemsElement.innerHTML = '';

//             let total = 0;

//             data.cart.forEach(item => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//             <td>${item.item}</td>
//             <td>1</td>
//             <td>₹${item.cost.toFixed(2)}</td>
//             <td>₹${item.cost.toFixed(2)}</td>
//         `;
//                 cartItemsElement.appendChild(row);
//                 total += item.cost;
//             });

//             document.getElementById('totalAmount').textContent = `₹${total.toFixed(2)}`;
//         }

//     } catch (error) {
//         // console.error('Error fetching checkout data:', error);
//         // alert('Failed to load checkout data. Please try again.');
//     }
// });

// // Replace the existing DOMContentLoaded event listener with this:
// // document.addEventListener('DOMContentLoaded', async () => {
// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //         window.location.href = 'login.html';
// //         return;
// //     }

// //     try {
// //         // Fetch checkout data
// //         const response = await fetch('http://localhost:3000/cart/checkout', {
// //             headers: {
// //                 'Authorization': `Bearer ${token}`,
// //                 'Content-Type': 'application/json'
// //             }
// //         });

// //         if (response.status === 401 || response.status === 403) {
// //             localStorage.removeItem('token');
// //             window.location.href = 'login.html';
// //             return;
// //         }

// //         if (!response.ok) {
// //             throw new Error(`HTTP error! status: ${response.status}`);
// //         }

// //         const data = await response.json();

// //         // Update profile section
// //         const defaultImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.name)}&background=random&size=200`;
// //         profileImage.src = defaultImageUrl;
// //         userName.textContent = data.user.name || 'N/A';
// //         userEmail.textContent = `Email: ${data.user.email || 'N/A'}`;
// //         userPhone.textContent = `Phone: ${data.user.phone || 'N/A'}`;
// //         userLocation.textContent = `Location: ${data.user.location || 'N/A'}`;

// //         // Update cart section
// //         cartItems.innerHTML = '';
// //         if (data.cart && data.cart.length > 0) {
// //             data.cart.forEach(item => {
// //                 const row = document.createElement('tr');
// //                 row.innerHTML = `
// //                     <td>${item.name}</td>
// //                     <td>${item.quantity}</td>
// //                     <td>₹${item.price.toFixed(2)}</td>
// //                     <td>₹${(item.price * item.quantity).toFixed(2)}</td>
// //                 `;
// //                 cartItems.appendChild(row);
// //             });
// //             totalAmount.textContent = `₹${data.total.toFixed(2)}`;
// //         } else {
// //             cartItems.innerHTML = '<tr><td colspan="4" style="text-align: center;">No items in cart</td></tr>';
// //             totalAmount.textContent = '₹0';
// //         }

// //     } catch (error) {
// //         console.error('Error:', error);
// //         alert('Failed to load data. Please try again.');
// //     }
// // });

// // Add this function to test database connection
// async function testDatabaseConnection() {
//     try {
//         const response = await fetch('http://localhost:3000/test-db');
//         const data = await response.json();
//         console.log('Database test result:', data);
//     } catch (error) {
//         console.error('Database test error:', error);
//     }
// }

// // Call the test function when page loads
// document.addEventListener('DOMContentLoaded', testDatabaseConnection);

// // // Process payment
// // async function processPayment(method) {
// //     try {
// //         const amount = totalAmount.textContent;
// //         if (amount === '₹0') {
// //             alert('Cannot process payment for empty cart');
// //             return;
// //         }

// //         if (method === 'card') {
// //             // Validate card details
// //             const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
// //             const cardHolder = document.getElementById('card-holder').value;
// //             const expiryDate = document.getElementById('expiry-date').value;
// //             const cvv = document.getElementById('cvv').value;

// //             if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
// //                 alert('Please fill in all card details');
// //                 return;
// //             }
// //         } else if (method === 'upi') {
// //             const upiId = document.getElementById('upi-id').value;
// //             if (!upiId && document.getElementById('upi-id-section').style.display !== 'none') {
// //                 alert('Please enter UPI ID');
// //                 return;
// //             }
// //         }

// //         // Here you would typically send payment details to your server
// //         alert(`Payment of ${amount} processed successfully via ${method}!`);

// //         // Clear cart and redirect to home
// //         window.location.href = 'index.html';
// //     } catch (error) {
// //         console.error('Payment error:', error);
// //         alert('Failed to process payment. Please try again.');
// //     }
// // }

// // Update the processPayment function in billing.js
// async function processPayment(method) {
//     try {
//         const amount = parseFloat(totalAmount.textContent.replace('₹', ''));
//         if (amount <= 0) {
//             alert('Cannot process payment for empty cart');
//             return;
//         }

//         // Process payment based on method
//         if (method === 'card') {
//             const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
//             const cardHolder = document.getElementById('card-holder').value;
//             const expiryDate = document.getElementById('expiry-date').value;
//             const cvv = document.getElementById('cvv').value;

//             if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
//                 alert('Please fill in all card details');
//                 return;
//             }
//         } else if (method === 'upi') {
//             const upiId = document.getElementById('upi-id').value;
//             if (document.getElementById('upi-id-section').style.display !== 'none' && !upiId) {
//                 alert('Please enter UPI ID');
//                 return;
//             }
//         }

//         // Clear cart after successful payment
//         const token = localStorage.getItem('token');
//         await fetch('http://localhost:3000/cart/clear', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         alert(`Payment of ₹${amount.toFixed(2)} processed successfully via ${method}!`);
//         window.location.href = 'index.html';
//     } catch (error) {
//         console.error('Payment error:', error);
//         alert('Failed to process payment. Please try again.');
//     }
// }

// // Replace the existing processPayment function with this:
// // async function processPayment(method) {
// //     try {
// //         const amount = parseFloat(totalAmount.textContent.replace('₹', ''));
// //         if (amount <= 0) {
// //             alert('Cannot process payment for empty cart');
// //             return;
// //         }

// //         // Process payment based on method
// //         if (method === 'card') {
// //             const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
// //             const cardHolder = document.getElementById('card-holder').value;
// //             const expiryDate = document.getElementById('expiry-date').value;
// //             const cvv = document.getElementById('cvv').value;

// //             if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
// //                 alert('Please fill in all card details');
// //                 return;
// //             }
// //         } else if (method === 'upi') {
// //             const upiId = document.getElementById('upi-id').value;
// //             if (document.getElementById('upi-id-section').style.display !== 'none' && !upiId) {
// //                 alert('Please enter UPI ID');
// //                 return;
// //             }
// //         }

// //         // Clear cart after successful payment
// //         await fetch('http://localhost:3000/cart/clear', {
// //             method: 'POST',
// //             headers: {
// //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
// //             }
// //         });

// //         alert(`Payment of ₹${amount.toFixed(2)} processed successfully via ${method}!`);
// //         window.location.href = 'index.html';
// //     } catch (error) {
// //         console.error('Payment error:', error);
// //         alert('Failed to process payment. Please try again.');
// //     }
// // }

// // Generate QR Code
// async function generateQRCode() {
//     try {
//         const amount = document.getElementById('totalAmount').textContent.replace('₹', '');
//         const merchantUPI = 'merchant@upi'; // Replace with your actual UPI ID
//         const merchantName = 'Your Business Name'; // Replace with your business name

//         // Create UPI payment URL
//         const upiUrl = `upi://pay?pa=${merchantUPI}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR`;

//         // Generate QR code using an API (you can use any QR code generation API)
//         const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

//         // Update QR code image
//         document.getElementById('qr-code-img').src = qrCodeUrl;
//     } catch (error) {
//         console.error('Error generating QR code:', error);
//         alert('Failed to generate QR code. Please try again.');
//     }
// } 

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Billing page loaded');
    
    // 1. Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login');
        window.location.href = 'login.html';
        return;
    }

    try {
        // 2. Fetch checkout data from server
        const response = await fetch('http://localhost:3000/cart/checkout', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        // 3. Handle authentication errors
        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 4. Process successful response
        const data = await response.json();
        console.log('Received checkout data:', data);

        // 5. Update user profile section
        updateUserProfile(data.user);
        
        // 6. Update cart items and calculate total
        updateCartItems(data.cart);

        // 7. Initialize payment methods
        setupPaymentMethods();

    } catch (error) {
        console.error('Error during checkout:', error);
        alert('Failed to load checkout data. Please try again.');
    }
});

function updateUserProfile(user) {
    if (!user) return;

    // Set profile image using UI Avatars API
    const defaultImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=200`;
    document.getElementById('profileImage').src = defaultImageUrl;

    // Update user details
    document.getElementById('userName').textContent = user.name || 'N/A';
    document.getElementById('userEmail').textContent = `Email: ${user.email || 'N/A'}`;
    document.getElementById('userPhone').textContent = `Phone: ${user.phone || 'N/A'}`;
    document.getElementById('userLocation').textContent = `Location: ${user.location || 'N/A'}`;
}

function updateCartItems(cartItems) {
    const cartItemsElement = document.getElementById('cartItems');
    const totalAmountElement = document.getElementById('totalAmount');
    
    // Clear existing items
    cartItemsElement.innerHTML = '';

    if (!cartItems || cartItems.length === 0) {
        cartItemsElement.innerHTML = '<tr><td colspan="4" style="text-align: center;">No items in cart</td></tr>';
        totalAmountElement.textContent = '₹0';
        return;
    }

    // Calculate total and populate cart items
    let total = 0;
    cartItems.forEach(item => {
        if (!item || !item.item || !item.cost) return;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.item}</td>
            <td>1</td>
            <td>₹${item.cost.toFixed(2)}</td>
            <td>₹${item.cost.toFixed(2)}</td>
        `;
        cartItemsElement.appendChild(row);
        total += item.cost;
    });

    // Update total amount
    totalAmountElement.textContent = `₹${total.toFixed(2)}`;
}

function setupPaymentMethods() {
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentForms = document.querySelectorAll('.payment-form');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            // Remove active class from all methods
            paymentMethods.forEach(m => m.classList.remove('active'));
            // Add active class to clicked method
            method.classList.add('active');
            
            // Hide all forms
            paymentForms.forEach(form => form.style.display = 'none');
            // Show selected form
            const formId = method.getAttribute('data-form');
            document.getElementById(formId).style.display = 'block';

            // If UPI is selected, generate QR code
            if (method.dataset.method === 'upi') {
                generateQRCode();
            }
        });
    });

    // UPI option selection
    const upiOptions = document.querySelectorAll('.upi-option');
    upiOptions.forEach(option => {
        option.addEventListener('click', () => {
            upiOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            
            if (option.dataset.option === 'id') {
                document.getElementById('upi-id-section').style.display = 'block';
                document.getElementById('upi-scan-section').style.display = 'none';
            } else {
                document.getElementById('upi-id-section').style.display = 'none';
                document.getElementById('upi-scan-section').style.display = 'block';
                generateQRCode();
            }
        });
    });

    // Card number formatting
    document.getElementById('card-number')?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = value;
    });

    // Card expiry date formatting
    document.getElementById('expiry-date')?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0,2) + '/' + value.slice(2,4);
        }
        e.target.value = value;
    });
}

function generateQRCode() {
    try {
        const amount = parseFloat(document.getElementById('totalAmount').textContent.replace('₹', ''));
        if (isNaN(amount) || amount <= 0) {
            console.error('Invalid amount for QR code');
            return;
        }

        const merchantUPI = 'merchant@upi'; // Replace with your actual UPI ID
        const merchantName = 'Goa Tourism'; // Replace with your business name
        
        // Create UPI payment URL
        const upiUrl = `upi://pay?pa=${merchantUPI}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR`;
        
        // Generate QR code using an API
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
        
        // Update QR code image
        document.getElementById('qr-code-img').src = qrCodeUrl;
    } catch (error) {
        console.error('Error generating QR code:', error);
    }
}

async function processPayment(method) {
    try {
        const amount = parseFloat(document.getElementById('totalAmount').textContent.replace('₹', ''));
        if (isNaN(amount) || amount <= 0) {
            alert('Cannot process payment for empty cart');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        // Validate payment details based on method
        if (method === 'card') {
            const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
            const cardHolder = document.getElementById('card-holder').value;
            const expiryDate = document.getElementById('expiry-date').value;
            const cvv = document.getElementById('cvv').value;

            if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
                alert('Please fill in all card details');
                return;
            }
        } else if (method === 'upi') {
            const upiId = document.getElementById('upi-id')?.value;
            if (document.getElementById('upi-id-section').style.display !== 'none' && !upiId) {
                alert('Please enter UPI ID');
                return;
            }
        }

        // Process payment with backend
        const response = await fetch(`http://localhost:3000/payments/${method}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount,
                ...(method === 'card' ? {
                    cardNumber: document.getElementById('card-number').value.replace(/\s/g, ''),
                    cardHolder: document.getElementById('card-holder').value,
                    expiryDate: document.getElementById('expiry-date').value,
                    cvv: document.getElementById('cvv').value
                } : {
                    upiId: document.getElementById('upi-id')?.value || 'qr_scan'
                })
            })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        // Clear cart after successful payment
        await fetch('http://localhost:3000/cart/clear', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        alert(`Payment of ₹${amount.toFixed(2)} successful!`);
        window.location.href = 'confirmation.html';

    } catch (error) {
        console.error('Payment error:', error);
        alert(`Payment failed: ${error.message}`);
    }
}