// Navigation Component
class Navigation {
    constructor() {
        this.token = localStorage.getItem('token');
        this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    }

    createNavbar() {
        const nav = document.createElement('nav');
        nav.className = 'navbar';
        nav.innerHTML = `
            <div class="nav-content">
                <div class="nav-left">
                    <a href="index.html" class="logo">
                        <img src="assets/images/travel_logo.jpg" alt="Travel Logo" class="logo-img">
                        <span>WANDERLUST</span>
                    </a>
                </div>
                <div class="nav-center">
                    <a href="#home">Home</a>
                    <a href="#book">Book</a>
                    <a href="#packages">Packages</a>
                    <a href="#services">Services</a>
                    <a href="#gallery">Gallery</a>
                    <a href="#review">Review</a>
                    <a href="#contact">Contact</a>
                </div>
                <div class="nav-right">
                    ${this.token ? `
                        <div class="user-menu">
                            <img src="${this.userData.profileImage || 'assets/images/default-profile.jpg'}" alt="Profile" id="nav-profile-img" class="nav-profile-img">
                            <span id="nav-username">${this.userData.username || 'User'}</span>
                            <div class="dropdown-menu">
                                <a href="profile.html" class="dropdown-item">
                                    <i class="fas fa-user"></i>
                                    My Profile
                                </a>
                                <a href="billing.html" class="dropdown-item">
                                    <i class="fas fa-file-invoice"></i>
                                    Billing
                                </a>
                                <a href="#" class="dropdown-item" id="logout-btn">
                                    <i class="fas fa-sign-out-alt"></i>
                                    Sign Out
                                </a>
                            </div>
                        </div>
                    ` : `
                        <a href="login.html" class="login-btn">Login</a>
                    `}
                </div>
            </div>
        `;

        document.body.insertBefore(nav, document.body.firstChild);

        // Handle logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                window.location.href = 'login.html';
            });
        }

        // Handle search button click
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                // Add your search functionality here
                console.log('Search clicked');
            });
        }

        // Handle user menu interactions
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            let isDropdownVisible = false;
            
            userMenu.addEventListener('click', function(e) {
                const dropdown = this.querySelector('.dropdown-menu');
                if (dropdown) {
                    if (!isDropdownVisible) {
                        dropdown.style.opacity = '1';
                        dropdown.style.visibility = 'visible';
                        dropdown.style.transform = 'translateY(0)';
                        isDropdownVisible = true;
                    } else {
                        dropdown.style.opacity = '0';
                        dropdown.style.visibility = 'hidden';
                        dropdown.style.transform = 'translateY(-10px)';
                        isDropdownVisible = false;
                    }
                }
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!userMenu.contains(e.target)) {
                    const dropdown = userMenu.querySelector('.dropdown-menu');
                    if (dropdown) {
                        dropdown.style.opacity = '0';
                        dropdown.style.visibility = 'hidden';
                        dropdown.style.transform = 'translateY(-10px)';
                        isDropdownVisible = false;
                    }
                }
            });
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    }

    checkAuth() {
        if (!this.token && !window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
    }
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', function() {
    const navigation = new Navigation();
    navigation.createNavbar();
    navigation.checkAuth();
}); 