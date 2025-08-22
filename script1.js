// Global variables
let map;
let currentLanguage = 'en';
let currentFontSize = 16;
let highContrastMode = false;
let userLocation = null;
let markers = [];
let heatLayer = null;

// Translation data
const translations = {
    en: {
        'title': 'Feel Safe, Celebrate Freely — We\'re With You This Pujo',
        'subtitle': 'Real-time guidance for safer, smarter pandal hopping.',
        'search': 'Search a Pandal',
        'locate': 'Locate Me',
        'sos': 'SOS / Help Center',
        'search-placeholder': 'Search for a puja name or area...',
        'from-placeholder': 'From: Your location',
        'to-placeholder': 'To: Selected pandal',
        'route-planner': 'Route Planner',
        'plan-route': 'Plan Accessible Route',
        'filters': 'Map Filters',
        'accessible-pandals': 'Show only Accessible Pandals',
        'low-crowd': 'Show Low Crowd Areas',
        'volunteer-desks': 'Show Volunteer Help Desks',
        'facilities-near-me': 'Show Facilities near Me',
        'transportation': 'Transportation Options',
        'metro-schedule': 'Metro Schedule',
        'train-schedule': 'Train Schedule',
        'bus-schedule': 'Bus Routes',
        'line': 'Line',
        'station': 'Nearest Station',
        'frequency': 'Frequency',
        'last-train': 'Last Train',
        'train': 'Train',
        'from': 'From',
        'to': 'To',
        'departure': 'Departure',
        'route': 'Route',
        'stops': 'Major Stops',
        'fare': 'Fare',
        'service': 'Service',
        'nearby-facilities': 'Nearby Facilities',
        'emergency': 'Emergency Numbers',
        'quick-links': 'Quick Links',
        'lost-found': 'Lost & Found',
        'volunteer': 'Volunteer Signup',
        'report': 'Report an Issue',
        'saved-routes': 'Saved Routes',
        'save-route': 'Save Current Route'
    },
    bn: {
        'title': 'নিরাপদ থাকুন, স্বাধীনভাবে উদযাপন করুন — আমরা এই পুজোতে আপনার পাশে আছি',
        'subtitle': 'নিরাপদ ও বুদ্ধিমান পণ্ডল হপিংয়ের জন্য রিয়েল-টাইম গাইডেন্স।',
        'search': 'একটি পণ্ডল অনুসন্ধান করুন',
        'locate': 'আমাকে খুঁজুন',
        'sos': 'SOS / সাহায্য কেন্দ্র',
        'search-placeholder': 'একটি পুজোর নাম বা এলাকা অনুসন্ধান করুন...',
        'from-placeholder': 'থেকে: আপনার অবস্থান',
        'to-placeholder': 'পর্যন্ত: নির্বাচিত পণ্ডল',
        'route-planner': 'রুট প্ল্যানার',
        'plan-route': 'অ্যাক্সেসযোগ্য রুট পরিকল্পনা করুন',
        'filters': 'ম্যাপ ফিল্টার',
        'accessible-pandals': 'শুধুমাত্র অ্যাক্সেসযোগ্য পণ্ডল দেখান',
        'low-crowd': 'কম ভিড়ের এলাকা দেখান',
        'volunteer-desks': 'স্বেচ্ছাসেবক সাহায্য ডেস্ক দেখান',
        'facilities-near-me': 'আমার কাছাকাছি সুবিধা দেখান',
        'transportation': 'পরিবহন অপশন',
        'metro-schedule': 'মেট্রো সময়সূচী',
        'train-schedule': 'ট্রেন সময়সূচী',
        'bus-schedule': 'বাস রুট',
        'line': 'লাইন',
        'station': 'সবচেয়ে কাছাকাছি স্টেশন',
        'frequency': 'ফ্রিকোয়েন্সি',
        'last-train': 'শেষ ট্রেন',
        'train': 'ট্রেন',
        'from': 'থেকে',
        'to': 'পর্যন্ত',
        'departure': 'ছেড়ে যাওয়া',
        'route': 'রুট',
        'stops': 'প্রধান স্টপ',
        'fare': 'ভাড়া',
        'service': 'পরিষেবা',
        'nearby-facilities': 'কাছাকাছি সুবিধা',
        'emergency': 'জরুরি নম্বর',
        'quick-links': 'দ্রুত লিঙ্ক',
        'lost-found': 'হারানো ও পাওয়া',
        'volunteer': 'স্বেচ্ছাসেবক সাইনআপ',
        'report': 'একটি সমস্যা রিপোর্ট করুন',
        'saved-routes': 'সংরক্ষিত রুট',
        'save-route': 'বর্তমান রুট সংরক্ষণ করুন'
    }
};

// Initialize map
function initMap() {
    map = L.map('map').setView([22.5726, 88.3639], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add sample markers
    addSampleMarkers();
    
    // Get user location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            L.marker([userLocation.lat, userLocation.lng])
                .addTo(map)
                .bindPopup('Your Location')
                .openPopup();
            map.setView([userLocation.lat, userLocation.lng], 16);
        }, error => {
            console.error('Geolocation error:', error);
            showNotification('Unable to get your location. Please enable location services.');
        });
    } else {
        showNotification('Geolocation is not supported by your browser.');
    }
}

// Add sample markers
function addSampleMarkers() {
    const sampleData = [
        {
            type: 'pandal',
            name: 'Sovabazar Sarbojanin',
            lat: 22.5904,
            lng: 88.3730,
            accessible: true,
            crowd: 'moderate',
            services: ['Toilet', 'Wheelchair Ramp', 'First Aid']
        },
        {
            type: 'pandal',
            name: 'Ahiritola Sarbojanin',
            lat: 22.5800,
            lng: 88.3700,
            accessible: true,
            crowd: 'heavy',
            services: ['Toilet', 'Security']
        },
        {
            type: 'toilet',
            name: 'Public Toilet',
            lat: 22.5850,
            lng: 88.3750,
            accessible: true
        },
        {
            type: 'firstaid',
            name: 'First Aid Booth',
            lat: 22.5880,
            lng: 88.3720
        },
        {
            type: 'security',
            name: 'Police Help Booth',
            lat: 22.5820,
            lng: 88.3780
        },
        {
            type: 'volunteer',
            name: 'Volunteer Desk',
            lat: 22.5870,
            lng: 88.3740
        }
    ];
    
    // Clear existing markers
    markers.forEach(({ marker }) => marker.remove());
    markers = [];
    
    sampleData.forEach(data => {
        const icon = getMarkerIcon(data.type, data.accessible);
        const marker = L.marker([data.lat, data.lng], { icon })
            .addTo(map)
            .bindPopup(createPopupContent(data));
        
        markers.push({ marker, data });
    });
}

// Get marker icon
function getMarkerIcon(type, accessible = false) {
    const icons = {
        pandal: '🏛️',
        toilet: '🚻',
        firstaid: '🩺',
        security: '🚓',
        volunteer: '👩‍🦰',
        emergency: '🚨',
        family: '👪',
        fairground: '🎢',
        food: '🛍️'
    };
    
    const className = 'custom-marker';
    const html = `<div class="${className}">${icons[type] || '📍'}</div>`;
    
    return L.divIcon({
        html: html,
        className: 'custom-div-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });
}

// Create popup content
function createPopupContent(data) {
    let services = '';
    if (data.services) {
        services = '<div><strong>Services:</strong> ' + data.services.join(', ') + '</div>';
    }
    
    let crowdInfo = '';
    if (data.crowd) {
        const crowdText = {
            low: 'Low Crowd',
            moderate: 'Moderate Crowd',
            heavy: 'Heavy Crowd'
        };
        crowdInfo = '<div><i class="fas fa-users"></i> ' + crowdText[data.crowd] + '</div>';
    }
    
    let accessibleInfo = '';
    if (data.accessible) {
        accessibleInfo = '<div><i class="fas fa-wheelchair"></i> Wheelchair Accessible</div>';
    }
    
    return `
        <div class="popup-content">
            <div class="popup-title">${data.name}</div>
            ${services}
            ${crowdInfo}
            ${accessibleInfo}
        </div>
    `;
}

// Language switching
function setLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update dynamic content (e.g., facility cards)
    updateFacilityCards();
    
    showNotification(`Language changed to ${lang === 'en' ? 'English' : 'বাংলা'}`);
}

// Font size adjustment
function adjustFontSize(action) {
    if (action === 'increase' && currentFontSize < 24) {
        currentFontSize += 2;
    } else if (action === 'decrease' && currentFontSize > 12) {
        currentFontSize -= 2;
    }
    document.body.style.fontSize = currentFontSize + 'px';
    showNotification(`Font size ${action === 'increase' ? 'increased' : 'decreased'}`);
}

// High contrast mode
function toggleHighContrast() {
    highContrastMode = !highContrastMode;
    document.body.classList.toggle('high-contrast');
    
    if (highContrastMode) {
        document.body.style.backgroundColor = '#000';
        document.body.style.color = '#fff';
        document.querySelectorAll('.facility-card, .filter-panel, .search-section, .route-planner, .transport-panel').forEach(el => {
            el.style.backgroundColor = '#000';
            el.style.color = '#fff';
            el.style.borderColor = '#fff';
        });
    } else {
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        document.querySelectorAll('.facility-card, .filter-panel, .search-section, .route-planner, .transport-panel').forEach(el => {
            el.style.backgroundColor = '';
            el.style.color = '';
            el.style.borderColor = '';
        });
    }
    showNotification(`High contrast mode ${highContrastMode ? 'enabled' : 'disabled'}`);
}

// Text to speech
function speakText() {
    if ('speechSynthesis' in window) {
        const text = document.body.innerText;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = currentLanguage === 'bn' ? 'bn-BD' : 'en-US';
        speechSynthesis.speak(utterance);
        showNotification('Reading content aloud...');
    } else {
        showNotification('Text-to-speech is not supported in your browser.');
    }
}

// Search functions
function searchPandal() {
    document.getElementById('searchInput').focus();
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    if (searchTerm) {
        showNotification(`Searching for "${searchTerm}"...`);
        const foundMarker = markers.find(({ data }) => data.name.toLowerCase().includes(searchTerm));
        if (foundMarker) {
            map.setView([foundMarker.data.lat, foundMarker.data.lng], 15);
            foundMarker.marker.openPopup();
        } else {
            showNotification('No matching pandal or facility found.');
        }
    } else {
        showNotification('Please enter a search term.');
    }
}

function locateMe() {
    if (userLocation) {
        map.setView([userLocation.lat, userLocation.lng], 16);
        showNotification('Located your position!');
    } else {
        showNotification('Please enable location services.');
    }
}

function showSOS() {
    showNotification('Emergency services have been notified!');
    // In a real app, this would trigger actual SOS calls
}

// Route planning
function planRoute() {
    const from = document.getElementById('fromLocation').value.trim();
    const to = document.getElementById('toLocation').value.trim();
    
    if (from && to) {
        showNotification('Planning accessible route...');
        // Simulate route planning
        setTimeout(() => {
            showNotification('Route planned! Accessible path highlighted on map.');
        }, 2000);
    } else {
        showNotification('Please enter both locations.');
    }
}

// Heatmap toggle
function toggleHeatmap(type) {
    document.querySelectorAll('.heatmap-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    showNotification(`Showing ${type} crowd areas`);
    // In a real app, this would update the heatmap layer
}

// Filter functions
function applyFilters() {
    const showAccessible = document.getElementById('accessiblePandals').checked;
    const showLowCrowd = document.getElementById('lowCrowd').checked;
    const showVolunteer = document.getElementById('volunteerDesks').checked;
    const showNearMe = document.getElementById('facilitiesNearMe').checked;
    
    markers.forEach(({ marker, data }) => {
        let shouldShow = true;
        
        if (showAccessible && data.type === 'pandal' && !data.accessible) {
            shouldShow = false;
        }
        
        if (showLowCrowd && data.crowd && data.crowd !== 'low') {
            shouldShow = false;
        }
        
        if (showVolunteer && data.type !== 'volunteer') {
            shouldShow = false;
        }
        
        if (showNearMe && userLocation) {
            const distance = getDistance(userLocation.lat, userLocation.lng, data.lat, data.lng);
            if (distance > 1) { // Show only within 1km
                shouldShow = false;
            }
        }
        
        if (shouldShow) {
            marker.addTo(map);
        } else {
            marker.remove();
        }
    });
    
    showNotification('Filters applied!');
}

// Calculate distance between two points (in km)
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

// Transportation functions
function showTransport(type) {
    document.querySelectorAll('.transport-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    document.getElementById('metroTimetable').style.display = 'none';
    document.getElementById('trainTimetable').style.display = 'none';
    document.getElementById('busTimetable').style.display = 'none';
    
    document.getElementById(type + 'Timetable').style.display = 'block';
}

// Safety functions
function showLostFound() {
    showNotification('Lost & Found section would open here.');
}

function volunteerSignup() {
    showNotification('Volunteer signup form would open here.');
}

function reportIssue() {
    showNotification('Issue reporting form would open here.');
}

// Saved routes
function saveCurrentRoute() {
    showNotification('Current route saved!');
}

function loadSavedRoute(id) {
    showNotification(`Loading saved route ${id}...`);
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update facility cards
function updateFacilityCards() {
    const sampleFacilities = [
        {
            name: 'Sovabazar Sarbojanin',
            type: 'pandal',
            icon: '🏛️',
            distance: '0.5 km',
            services: ['Wheelchair Accessible', 'First Aid', 'Toilet']
        },
        {
            name: 'Ahiritola Public Toilet',
            type: 'toilet',
            icon: '🚻',
            distance: '0.3 km',
            accessible: true
        },
        {
            name: 'Volunteer Help Desk',
            type: 'volunteer',
            icon: '👩‍🦰',
            distance: '0.2 km'
        }
    ];
    
    const facilityCardsContainer = document.getElementById('facilityCards');
    facilityCardsContainer.innerHTML = '';
    
    sampleFacilities.forEach(facility => {
        const card = document.createElement('div');
        card.className = 'facility-card';
        card.innerHTML = `
            <div class="row align-items-center">
                <div class="col-auto">
                    <div class="facility-icon">${facility.icon}</div>
                </div>
                <div class="col">
                    <h5 class="facility-title">${facility.name}</h5>
                    <p class="mb-1">${facility.distance} away</p>
                    ${facility.services ? '<small class="text-muted">' + facility.services.join(', ') + '</small>' : ''}
                </div>
            </div>
        `;
        facilityCardsContainer.appendChild(card);
    });
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    updateFacilityCards();
    setLanguage('en'); // Set default language
    
    // Add event listeners for language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
    });
});