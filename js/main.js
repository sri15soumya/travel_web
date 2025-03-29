document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    const navigation = new Navigation();
    navigation.createNavbar();
    navigation.checkAuth();

    // Load destinations
    loadDestinations();
    
    // Load services
    loadServices();
    
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

function loadDestinations() {
    const destinations = [
        {
            name: 'Adventure Travel',
            image: 'assets/images/adventure.avif',
            description: 'Experience thrilling adventures around the world'
        },
        {
            name: 'Cruise Travel',
            image: 'assets/images/cruise travel.avif',
            description: 'Luxury cruises to exotic destinations'
        },
        {
            name: 'Group Travel',
            image: 'assets/images/grouptravel.avif',
            description: 'Travel with friends and family'
        },
        {
            name: 'Leisure Travel',
            image: 'assets/images/leisure.jpg',
            description: 'Relaxing getaways for your perfect vacation'
        }
    ];

    const destinationGrid = document.querySelector('.destination-grid');
    if (destinationGrid) {
        destinations.forEach(dest => {
            const card = createDestinationCard(dest);
            destinationGrid.appendChild(card);
        });
    }
}

function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.innerHTML = `
        <img src="${destination.image}" alt="${destination.name}">
        <div class="card-content">
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
        </div>
    `;
    return card;
}

function loadServices() {
    const services = [
        {
            title: 'Flight Booking',
            description: 'Book flights to destinations worldwide',
            icon: '✈️'
        },
        {
            title: 'Hotel Reservations',
            description: 'Find and book the perfect accommodation',
            icon: '🏨'
        },
        {
            title: 'Tour Packages',
            description: 'Curated tour packages for your travel needs',
            icon: '🎒'
        },
        {
            title: 'Travel Insurance',
            description: 'Comprehensive travel insurance coverage',
            icon: '🛡️'
        }
    ];

    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        services.forEach(service => {
            const card = createServiceCard(service);
            servicesGrid.appendChild(card);
        });
    }
}

function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
        <div class="service-icon">${service.icon}</div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
    `;
    return card;
}

async function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    try {
        const response = await fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        if (response.ok) {
            showToast('Message sent successfully!');
            form.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        showToast('Failed to send message. Please try again.', 'error');
    }
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
} 