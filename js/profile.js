document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Function to show toast notification
    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = toast.querySelector('.toast-message');
        toast.className = `toast ${type}`;
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Function to update profile images
    function updateProfileImages(name) {
        const defaultImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7F56D9&color=fff&size=200`;
        document.getElementById('profile-img').src = defaultImageUrl;
        document.getElementById('nav-profile-img').src = defaultImageUrl;
    }

    try {
        // Fetch user profile data
        const response = await fetch('http://localhost:3000/user/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        const userData = await response.json();

        // Update profile information
        document.getElementById('profile-name').textContent = userData.name;
        document.getElementById('nav-username').textContent = userData.name;
        document.getElementById('profile-role').textContent = userData.role || 'Customer';
        document.getElementById('full-name').value = userData.name;
        document.getElementById('email').value = userData.email;
        document.getElementById('phone').value = userData.phone || '';
        document.getElementById('location').value = userData.location || '';

        // Update profile images
        updateProfileImages(userData.name);

        // Handle profile form submission
        document.getElementById('profile-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const formData = {
                    name: document.getElementById('full-name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    location: document.getElementById('location').value
                };

                const updateResponse = await fetch('http://localhost:3000/user/profile/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                });

                if (!updateResponse.ok) {
                    throw new Error('Failed to update profile');
                }

                const updatedUser = await updateResponse.json();
                
                // Update displayed information
                document.getElementById('profile-name').textContent = updatedUser.name;
                document.getElementById('nav-username').textContent = updatedUser.name;
                updateProfileImages(updatedUser.name);

                showToast('Profile updated successfully');
            } catch (error) {
                console.error('Error updating profile:', error);
                showToast('Failed to update profile', 'error');
            }
        });

        // Handle password form submission
        document.getElementById('password-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (newPassword !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                return;
            }

            try {
                const passwordData = {
                    currentPassword: document.getElementById('current-password').value,
                    newPassword: newPassword
                };

                const passwordResponse = await fetch('http://localhost:3000/user/password/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(passwordData)
                });

                if (!passwordResponse.ok) {
                    const error = await passwordResponse.json();
                    throw new Error(error.message || 'Failed to update password');
                }

                // Clear password fields
                document.getElementById('current-password').value = '';
                document.getElementById('new-password').value = '';
                document.getElementById('confirm-password').value = '';

                showToast('Password updated successfully');
            } catch (error) {
                console.error('Error updating password:', error);
                showToast(error.message || 'Failed to update password', 'error');
            }
        });

        // Handle logout
        document.getElementById('logout-btn').addEventListener('click', function() {
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        });

    } catch (error) {
        console.error('Error loading profile:', error);
        showToast('Failed to load profile information', 'error');
    }
}); 