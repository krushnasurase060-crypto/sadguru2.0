// Main JavaScript for Sadguru Developers Real Estate Website

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize public website (admin features removed)
    initPublicWebsite();
});

// ===================== PUBLIC WEBSITE FUNCTIONS =====================

function initPublicWebsite() {
    // Initialize navbar
    initNavbar();
    
    // Initialize property data and display
    initProperties();
    
    // Initialize filters
    initFilters();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize smooth scrolling
    initSmoothScroll();
}

// Navbar functionality
function initNavbar() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Make sure elements exist
    if (!navToggle || !navMenu) {
        console.warn('Nav elements not found');
        return;
    }
    
    // Add click event to toggle button
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        updateToggleIcon();
    });
    
    // Helper function to update toggle icon
    function updateToggleIcon() {
        if (navMenu.classList.contains('active')) {
            navToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                updateToggleIcon();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            updateToggleIcon();
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Property data
const properties = [
    {
        id: 1,
        title: "Bunglow no 27",
        price: "25-30 lakhs",
        location: "Savedi",
        type: "bunglow",
        
        description: "Good Bunglow ",
        bedrooms: 2,
        bathrooms: 2,
        area: "3500",
        status: "available"
    },
    {
        id: 2,
        title: "Premium Apartment Downtown",
        price: "85 Lakhs",
        location: "South City",
        type: "apartment",
       
        description: "3BHK apartment with city view and premium finishes.",
        bedrooms: 3,
        bathrooms: 2,
        area: "1800",
        status: "available"
    },
    {
        id: 3,
        title: "Commercial Space Business District",
        price: "4.2 Cr",
        location: "East City",
        type: "commercial",
       
        description: "Prime commercial space in business district.",
        area: "5000",
        status: "available"
    },
    {
        id: 4,
        title: "Montu Surase",
        price: "7.0 Cr",
        location: "Pipline Road",
        type: "Apartment",
        
        description: "Prime residential plot with all approvals.",
        area: "2400",
        status: "available"
    },
    {
        id: 5,
        title: "Modern 2BHK Apartment",
        price: "65 Lakhs",
        location: "North City",
        type: "apartment",
        
        description: "Modern 2BHK apartment with premium amenities.",
        bedrooms: 2,
        bathrooms: 2,
        area: "1200",
        status: "available"
    },
    {
        id: 6,
        title: "Luxury Penthouse",
        price: "3.5 Cr",
        location: "South City",
        type: "apartment",
       
        description: "Penthouse with panoramic views and luxury finishes.",
        bedrooms: 4,
        bathrooms: 4,
        area: "4200",
        status: "reserved"
    },
     {
        id: 7,
        title: "Additional property",
        price: "1.0-1.1 Cr",
        location: "Wadgaon Gupta",
        type: "Commercial",
       
        description: "Good Commercial property.",
        bedrooms: 5,
        bathrooms: 2,
        area: "3000sq",
        status: "available"
    }
];

// Initialize properties display
function initProperties() {
    displayProperties('propertiesGrid', properties.slice(0, 3));
    displayProperties('exploreGrid', properties);
}

// Display properties in a grid
function displayProperties(containerId, propertiesToDisplay) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (propertiesToDisplay.length === 0) {
        container.innerHTML = '<p class="empty-message">No properties found matching your criteria.</p>';
        return;
    }
    
    propertiesToDisplay.forEach(property => {
        const propertyCard = createPropertyCard(property);
        container.appendChild(propertyCard);
    });
}

// Create property card HTML
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.setAttribute('data-id', property.id);
    
    // Determine status class
    let statusClass = '';
    let statusText = '';
    switch(property.status) {
        case 'available':
            statusClass = 'status-available';
            statusText = 'Available';
            break;
        case 'sold':
            statusClass = 'status-sold';
            statusText = 'Sold';
            break;
        case 'reserved':
            statusClass = 'status-reserved';
            statusText = 'Reserved';
            break;
    }
    
    // Property features HTML
    const featuresHtml = property.bedrooms ? `
        <div class="property-features">
            <div class="property-feature">
                <i class="fas fa-bed"></i>
                <span>${property.bedrooms} Beds</span>
            </div>
            <div class="property-feature">
                <i class="fas fa-bath"></i>
                <span>${property.bathrooms} Baths</span>
            </div>
            <div class="property-feature">
                <i class="fas fa-ruler-combined"></i>
                <span>${property.area} sq.ft</span>
            </div>
        </div>
    ` : '';
    
    // Render image or video (video mapping provided by video.js)
    let mediaHtml = '';
    const videoSrc = (typeof getPropertyVideo === 'function') ? getPropertyVideo(property.id) : null;
    if (videoSrc) {
        mediaHtml = `
        <div class="property-image">
            <video autoplay muted loop playsinline>
                <source src="${videoSrc}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        `;
    } else {
        mediaHtml = `
        <div class="property-image">
            <img src="${property.image}" alt="${property.title}">
        </div>
        `;
    }

    card.innerHTML = `
        ${mediaHtml}
        <div class="property-info">
            <div class="property-number">Property No: ${property.id}</div>
            <div class="property-price">₹${property.price}</div>
            <h3 class="property-title">${property.title}</h3>
            <div class="property-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${property.location}</span>
            </div>
            ${featuresHtml}
            <div class="property-status ${statusClass}">${statusText}</div>
        </div>
    `;
    // Info button (bottom-right)
    const infoBtn = document.createElement('button');
    infoBtn.className = 'property-info-btn';
    infoBtn.setAttribute('aria-label', 'Property Info');
    infoBtn.innerHTML = '<i class="fas fa-info-circle"></i>';
    infoBtn.addEventListener('click', () => openPropertyInfo(property.id));
    card.appendChild(infoBtn);
    
    return card;
}

// Initialize filters
function initFilters() {
    const filterBtn = document.getElementById('filterBtn');
    const resetBtn = document.getElementById('resetFilterBtn');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', applyFilters);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
}

// Apply filters to properties
function applyFilters() {
    const locationFilter = (document.getElementById('locationFilter').value || 'all').trim().toLowerCase();
    const priceFilter = (document.getElementById('priceFilter').value || 'all').trim();
    const typeFilter = (document.getElementById('typeFilter').value || 'all').trim().toLowerCase();

    // Helper: parse property price string into numeric lakhs (number)
    function parsePriceToLakhs(priceStr) {
        if (!priceStr && priceStr !== 0) return NaN;
        const s = String(priceStr).toLowerCase().replace(/,/g, '').trim();

        // Crore (Cr / crore)
        const crMatch = s.match(/([\d.]+)\s*(cr|crore)/);
        if (crMatch) return parseFloat(crMatch[1]) * 100;

        // Lakhs variants
        const lakhMatch = s.match(/([\d.]+)\s*(lakh|lakhs|lacs|lac)/);
        if (lakhMatch) return parseFloat(lakhMatch[1]);

        // If the string is a plain number, assume it's in lakhs
        const num = parseFloat(s);
        if (!isNaN(num)) return num;

        return NaN;
    }

    const filteredProperties = properties.filter(property => {
        // Location filter (case-insensitive, substring match to be tolerant)
        if (locationFilter !== 'all') {
            const propLoc = (property.location || '').toLowerCase();
            if (!propLoc.includes(locationFilter)) return false;
        }

        // Type filter (case-insensitive)
        if (typeFilter !== 'all') {
            if ((property.type || '').toLowerCase() !== typeFilter) return false;
        }

        // Price filter (handle lakhs and crores)
        if (priceFilter !== 'all') {
            const priceRange = priceFilter.split('-');
            const propertyLakhs = parsePriceToLakhs(property.price);
            if (isNaN(propertyLakhs)) return false;

            if (priceRange.length === 2) {
                const min = parseFloat(priceRange[0]);
                const max = parseFloat(priceRange[1]);
                if (propertyLakhs < min || propertyLakhs > max) return false;
            } else if (priceFilter === '200+') {
                if (propertyLakhs < 200) return false;
            }
        }

        return true;
    });

    displayProperties('exploreGrid', filteredProperties);
}

// Reset filters
function resetFilters() {
    document.getElementById('locationFilter').value = 'all';
    document.getElementById('priceFilter').value = 'all';
    document.getElementById('typeFilter').value = 'all';
    displayProperties('exploreGrid', properties);
}

// Initialize contact form
function initContactForm() {
    const inquiryForm = document.getElementById('inquiryForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                // Save inquiry to localStorage
                saveInquiry();
                
                // Show success modal
                successModal.style.display = 'flex';
                
                // Reset form
                inquiryForm.reset();
            }
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
}

// Validate contact form
function validateContactForm() {
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    
    // Name validation
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }
    
    // Email validation
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    // Phone validation
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^\d{10}$/;
    if (phone === '') {
        document.getElementById('phoneError').textContent = 'Phone number is required';
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number';
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    }
    
    // Message validation
    const message = document.getElementById('message').value.trim();
    if (message === '') {
        document.getElementById('messageError').textContent = 'Message is required';
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }
    
    return isValid;
}

// Save inquiry to localStorage
function saveInquiry() {
    // Get existing inquiries or initialize empty array
    let inquiries = JSON.parse(localStorage.getItem('sadguruInquiries')) || [];
    
    // Create new inquiry object
    const newInquiry = {
        id: inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id)) + 1 : 1,
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        location: document.getElementById('location').value.trim(),
        message: document.getElementById('message').value.trim(),
        purpose: document.getElementById('purpose').value,
        date: new Date().toLocaleDateString('en-IN')
    };
    
    // Add to inquiries array
    inquiries.push(newInquiry);
    
    // Save back to localStorage
    localStorage.setItem('sadguruInquiries', JSON.stringify(inquiries));
    
    return newInquiry.id;
}

// Initialize smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ---------------- Property Info Modal (loads data from info.json) ----------------
let _propertyInfoCache = null;

function loadInfoJson() {
    if (_propertyInfoCache) return Promise.resolve(_propertyInfoCache);
    return fetch('info.json')
        .then(r => r.json())
        .then(data => { _propertyInfoCache = data; return data; })
        .catch(err => { console.error('Failed to load info.json', err); return []; });
}

function openPropertyInfo(propertyId) {
    loadInfoJson().then(data => {
        const info = (data || []).find(i => parseInt(i.id) === parseInt(propertyId));
        const modal = document.getElementById('propertyInfoModal');
        const body = document.getElementById('propertyInfoBody');
        const title = document.getElementById('propertyInfoTitle');

        if (!modal || !body || !title) return;

        // Title
        const prop = properties.find(p => p.id === propertyId);
        title.textContent = prop ? prop.title : `Property ${propertyId}`;

        // Video source: prefer `mainVideo` from info.json, otherwise use mapping
        const mappedVideo = (typeof getPropertyVideo === 'function') ? getPropertyVideo(propertyId) : null;
        const videoSource = (info && info.mainVideo) ? info.mainVideo : mappedVideo;
        const videoHtml = videoSource ? `
            <div class="property-video">
                <video controls autoplay muted loop playsinline>
                    <source src="${videoSource}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        ` : '';

        // Details from info.json (fallback to property data)
        const exactLocation = info && info.exactLocation ? info.exactLocation : (prop ? prop.location : 'N/A');
        const size = info && info.sizeSqFt ? info.sizeSqFt : (prop && prop.area ? prop.area : 'N/A');
        const estimate = info && info.estimatedPrice ? info.estimatedPrice : (prop ? prop.price : 'N/A');
        const specs = info && Array.isArray(info.specifications) ? info.specifications : [];
        const description = info && info.description ? info.description : (prop ? prop.description : '');

        const specsHtml = specs.length ? specs.map(s => `<span class="spec-chip">${s}</span>`).join('') : '';

        body.innerHTML = `
            ${videoHtml}
            <div class="property-details">
                <div class="price-badge">${estimate}</div>
                <div class="property-location-line">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>${exactLocation}</div>
                </div>
                <h4>Size</h4>
                <p>${size} sq.ft</p>
                <h4>Specifications</h4>
                <div class="property-specs">${specsHtml}</div>
                <h4>Description</h4>
                <p>${description}</p>
                <div class="property-cta">
                    <a class="btn btn-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSfeJRA7ljDyfWlQq1JUlGv7gcd0-i1ZnVMLsL4_NOA8PFxkYg/viewform?usp=publish-editor" target="_blank">Schedule Visit</a>
                </div>
            </div>
        `;

        modal.style.display = 'flex';

        // Close handlers
        const closeBtn = document.getElementById('propertyInfoClose');
        function closeModal() { modal.style.display = 'none'; }
        if (closeBtn) {
            closeBtn.onclick = closeModal;
        }

        // click outside to close
        window.addEventListener('click', function onOutsideClick(e) {
            if (e.target === modal) {
                closeModal();
                window.removeEventListener('click', onOutsideClick);
            }
        });

        // Esc key
        function onEsc(e) { if (e.key === 'Escape') { closeModal(); window.removeEventListener('keydown', onEsc); } }
        window.addEventListener('keydown', onEsc);
    });
}
// Admin panel removed: all admin-only functions deleted