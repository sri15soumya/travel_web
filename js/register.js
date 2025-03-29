// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^A-Za-z0-9]/)) strength += 25;
    
    const strengthBar = document.querySelector('.password-strength-bar');
    strengthBar.style.width = strength + '%';
    
    if (strength <= 25) {
        strengthBar.style.backgroundColor = '#dc3545';
    } else if (strength <= 50) {
        strengthBar.style.backgroundColor = '#ffc107';
    } else if (strength <= 75) {
        strengthBar.style.backgroundColor = '#17a2b8';
    } else {
        strengthBar.style.backgroundColor = '#28a745';
    }
}

// Password input listener
document.getElementById('password').addEventListener('input', (e) => {
    checkPasswordStrength(e.target.value);
});

// Confirm password validation
document.getElementById('confirm-password').addEventListener('input', (e) => {
    const password = document.getElementById('password').value;
    if (e.target.value !== password) {
        e.target.setCustomValidity('Passwords do not match');
    } else {
        e.target.setCustomValidity('');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const errorMessage = document.querySelector('.error-message');

    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Basic validation
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            showError('Password must be at least 8 characters long');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    username,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Store authentication token
                localStorage.setItem('token', data.token);
                
                // Store user data
                localStorage.setItem('userData', JSON.stringify(data.user));

                // Show success message and redirect
                showSuccess('Registration successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            showError(error.message || 'An error occurred during registration');
            console.error('Registration error:', error);
        }
    });

    // Real-time validation
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const usernameInput = document.getElementById('username');

    passwordInput.addEventListener('input', function() {
        const progressBar = document.querySelector('.password-strength');
        const value = this.value;
        let strength = 0;

        if (value.length >= 8) strength++;
        if (value.match(/[a-z]/)) strength++;
        if (value.match(/[A-Z]/)) strength++;
        if (value.match(/[0-9]/)) strength++;
        if (value.match(/[^a-zA-Z0-9]/)) strength++;

        progressBar.style.width = (strength * 20) + '%';
        progressBar.style.backgroundColor = 
            strength <= 2 ? '#dc3545' :
            strength <= 3 ? '#ffc107' :
            '#28a745';
    });

    confirmPasswordInput.addEventListener('input', function() {
        if (this.value !== passwordInput.value) {
            this.setCustomValidity('Passwords must match');
        } else {
            this.setCustomValidity('');
        }
    });

    usernameInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-Z0-9_]/g, '');
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        registerForm.appendChild(successDiv);
    }
}); 