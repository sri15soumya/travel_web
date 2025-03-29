document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.querySelector('.error-message');
    const rememberMe = document.getElementById('remember-me');

    // Check for remembered username
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
        document.getElementById('username').value = rememberedUsername;
        rememberMe.checked = true;
    }

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
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

                // Remember username if checkbox is checked
                if (rememberMe.checked) {
                    localStorage.setItem('rememberedUsername', username);
                } else {
                    localStorage.removeItem('rememberedUsername');
                }

                // Show success message and redirect to index.html
                showSuccess('Login successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 1500);
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            showError(error.message || 'An error occurred during login');
            console.error('Login error:', error);
        }
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
        successDiv.style.cssText = `
            background-color: #ecfdf3;
            color: #027a48;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            text-align: center;
        `;
        loginForm.appendChild(successDiv);
    }
}); 