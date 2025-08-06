// Global variables
let currentLanguage = 'en';
let stepsToday = 0;
let wearableConnected = false; // Status for Bluetooth connection

// Translation data - Expanded for calculator, buttons, and more
const translations = {
    en: {
        'headline': 'Just like Ma watches over you, so do we.',
        'tagline': 'A safety-first initiative to ensure a secure and joyful Pujo for all.',
        'safety-map-title': 'Interactive Safety Map',
        'real-time-location': 'Toggle Real-Time Location',
        'search-zone-placeholder': 'Search for safe zones or exits',
        'search-zone-button': 'Search',
        'helpline-title': 'Helpline & Quick Contacts',
        'police': 'Police',
        'medical': 'Medical',
        'report-incident': 'Report an Incident',
        'report-button': 'Report',
        'whatsapp': 'WhatsApp',
        'step-calculator-title': 'Step Footprint Calculator 🦶',
        'step-input-placeholder': 'Enter steps walked today',
        'calculate-button': 'Calculate',
        'steps-today': 'Steps Today:',
        'carbon-avoided': 'Carbon Footprint Avoided:',
        'stars-earned': 'Stars Earned:',
        'safety-tips-title': 'Women’s & Public Safety Tips',
        'travel-safety': 'Travel Safety',
        'travel-safety-desc': 'Always share your live location with a trusted contact.',
        'avoid-crowd': 'Avoid Getting Lost in Crowd',
        'avoid-crowd-desc': 'Memorize nearby landmarks and stay close to the edges of crowds.',
        'emergency-gestures': 'Emergency Gestures & Code Words',
        'emergency-gestures-desc': 'Use local code words or gestures to signal for help discreetly.',
        'safety-badge': 'Safety Badge Checklist',
        'power-bank': 'Power bank',
        'id-card': 'ID card',
        'landmark': 'Nearby landmark memorized',
        'location-shared': 'Location shared',
        'volunteer-title': 'Become a Safety Volunteer',
        'register-button': 'Register Interest',
        'volunteer-testimonial': 'Being a volunteer during Pujo has been one of the most rewarding experiences of my life. I feel proud to contribute to the safety of my community.',
        'chatbot-title': 'Chatbot + FAQ',
        'chatbot-header': 'Ask Me Anything',
        'chatbot-message': 'Hi! How can I assist you today?',
        'chatbot-input-placeholder': 'Type your question here...',
        'send-button': 'Send',
        'footer-text': 'Made with ❤️ for a Safer Pujo',
        'partners': 'Partners: Kolkata Police | Local NGOs | Student Groups',
        'step-tip-high': 'Great job! You’ve walked a lot today, reducing your carbon footprint significantly.',
        'step-tip-medium': 'Good effort! Keep walking to earn more stars and reduce emissions.',
        'step-tip-low': 'Every step counts! Try walking more to stay healthy and eco-friendly.',
        'report-alert': 'This action would open a detailed report form.',
        'bot-help': 'Please contact the nearest police station or helpline for assistance.',
        'bot-lost': 'Stay where you are and contact the Lost & Found helpline immediately.',
        'bot-default': 'I’m here to help. Please ask a specific question about safety or Pujo.',
        'map-placeholder': 'Map loading...',
        'bluetooth-sync-prompt': 'Sync with your wearable device:',
        'sync-wearable-button': 'Connect Device',
        'sync-status-connecting': 'Connecting...',
        'sync-status-connected': 'Device Connected!',
        'sync-status-failed': 'Connection Failed. Please try again.',
        'sync-status-no-device': 'No compatible Bluetooth device found.'
    },
    bn: {
        'headline': 'মায়ের চোখ যেমন আপনার উপর, আমরাও ঠিক তেমনি পাশে আছি।',
        'tagline': 'একটি নিরাপত্তা-প্রথম উদ্যোগ যাতে সবার জন্য একটি নিরাপদ এবং আনন্দোত্সব পুজো নিশ্চিত হয়।',
        'safety-map-title': 'অংতর্ভুক্ত নিরাপত্তা মানচিত্র',
        'real-time-location': 'রিয়েল-টাইম অবস্থান টগল করুন',
        'search-zone-placeholder': 'নিরাপদ অঞ্চল বা প্রস্থান খুঁজুন',
        'search-zone-button': 'খুঁজুন',
        'helpline-title': 'হেল্পলাইন এবং দ্রুত যোগাযোগ',
        'police': 'পুলিশ',
        'medical': 'মেডিকেল',
        'report-incident': 'ঘটনা রিপোর্ট করুন',
        'report-button': 'রিপোর্ট',
        'whatsapp': 'হ্যাটসঅ্যাপ',
        'step-calculator-title': 'পদচিহ্ন ফুটপ্রিন্ট ক্যালকুলেটর 🦶',
        'step-input-placeholder': 'আজ হাঁটা পদসংখ্যা লিখুন',
        'calculate-button': 'ক্যালকুলেট',
        'steps-today': 'আজকের পদসংখ্যা:',
        'carbon-avoided': 'কার্বন ফুটপ্রিন্ট বেঁচে গেছে:',
        'stars-earned': 'অর্জিত তারা:',
        'safety-tips-title': 'মহিলা ও জনসাধারণের নিরাপত্তা টিপস',
        'travel-safety': 'ভ্রমণ নিরাপত্তা',
        'travel-safety-desc': 'সবসময় আপনার লাইভ অবস্থান একজন বিশ্বস্ত ব্যক্তির সাথে শেয়ার করুন।',
        'avoid-crowd': 'ভিড়ে হারিয়ে যাওয়া এড়িয়ে চলুন',
        'avoid-crowd-desc': 'নিকটস্থ ল্যান্ডমার্ক মুখস্থ করুন এবং ভিড়ের কিনারায় থাকুন।',
        'emergency-gestures': 'জরুরি ইশারা এবং কোড শব্দ',
        'emergency-gestures-desc': 'সাহায্যের জন্য গোপনে স্থানীয় কোড শব্দ বা ইশারা ব্যবহার করুন।',
        'safety-badge': 'নিরাপত্তা ব্যাজ চেকলিস্ট',
        'power-bank': 'পাওয়ার ব্যাংক',
        'id-card': 'আইডি কার্ড',
        'landmark': 'নিকটস্থ ল্যান্ডমার্ক মুখস্থ',
        'location-shared': 'অবস্থান শেয়ার করা হয়েছে',
        'volunteer-title': 'নিরাপত্তা স্বেচ্ছাসেবী হোন',
        'register-button': 'আগ্রহ নিবন্ধন করুন',
        'volunteer-testimonial': 'পুজো সময় স্বেচ্ছাসেবী হিসেবে কাজ করা আমার জীবনের সবচেয়ে পুরস্কারিত অভিজ্ঞতা একটি। আমি আমার সম্প্রদায়ের নিরাপত্তায় অবদান রাখতে গর্বিত।',
        'chatbot-title': 'চ্যাটবট + FAQ',
        'chatbot-header': 'আমাকে যে কিছু জিজ্ঞাসা করুন',
        'chatbot-message': 'হ্যালো! আজ আপনাকে কিভাবে সহায়তা করতে পারি?',
        'chatbot-input-placeholder': 'আপনার প্রশ্ন লিখুন...',
        'send-button': 'পাঠান',
        'footer-text': 'একটি নিরাপদ পুজোর জন্য ❤️ দিয়ে তৈরি',
        'partners': 'সহযোগী: কলকাতা পুলিশ | স্থানীয় এনজিও | ছাত্র গোষ্ঠী',
        'step-tip-high': 'ভালো কাজ! আপনি আজ অনেক হাঁটেছেন, আপনার কার্বন ফুটপ্রিন্ট বেশি কমিয়েছেন।',
        'step-tip-medium': 'ভালো প্রয়াস! আরও তারা অর্জন এবং কার্বন কমাতে আরও হাঁটুন।',
        'step-tip-low': 'প্রতিটি পদ গুরুত্বপূর্ণ! স্বাস্থ্যসম্মত এবং পরিবেশ-বান্ধব থাকতে আরও হাঁটতে চেষ্টা করুন।',
        'report-alert': 'এই অ্যাকশনটি একটি বিস্তারিত রিপোর্ট ফর্ম খুলবে।',
        'bot-help': 'সহায়তার জন্য দয়া করে নিকটতম পুলিশ স্টেশন বা হেল্পলাইনের সাথে যোগাযোগ করুন।',
        'bot-lost': 'আপনি যেখানে আছেন সেখানেই থাকুন এবং অবিলম্বে হারানো ও পাওয়া হেল্পলাইনের সাথে যোগাযোগ করুন।',
        'bot-default': 'আমি সহায়তার জন্য এখানে আছি। অনুগ্রহ করে নিরাপত্তা বা পুজো সম্পর্কে একটি নির্দিষ্ট প্রশ্ন জিজ্ঞাসা করুন।',
        'map-placeholder': 'মানচিত্র লোড হচ্ছে...',
        'bluetooth-sync-prompt': 'আপনার পরিধানযোগ্য ডিভাইসের সাথে সিঙ্ক করুন:',
        'sync-wearable-button': 'ডিভাইস সংযোগ করুন',
        'sync-status-connecting': 'সংযোগ করা হচ্ছে...',
        'sync-status-connected': 'ডিভাইস সংযুক্ত!',
        'sync-status-failed': 'সংযোগ ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।',
        'sync-status-no-device': 'কোন সামঞ্জস্যপূর্ণ ব্লুটুথ ডিভাইস পাওয়া যায়নি।'
    },
};

// --- General Functions ---
function setLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    updateTranslations();
    updateCalculatorTips(); // Update tips after language change
}

function updateTranslations() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
}

// Notification system (can be added if needed, similar to previous version)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification'; // Assumes a .notification class exists in CSS
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// --- Map Related Functions (Placeholders) ---
function initializeSafetyMap() {
    const mapContainer = document.getElementById('safety-map');
    // In a real application, you would initialize Leaflet or Google Maps here.
    // For now, we'll just show the placeholder text.
    console.log("Map initialization placeholder.");
}

function toggleRealTimeLocation() {
    alert(translations[currentLanguage]['real-time-location']); // Placeholder action
}

function searchSafeZone() {
    const searchInput = document.getElementById('search-zone');
    const query = searchInput.value.trim();
    if (query) {
        alert(`Searching for "${query}" in safe zones.`); // Placeholder action
    } else {
        alert('Please enter a zone to search.');
    }
}

// --- Helpline and Reporting Functions ---
function openWhatsApp(number) {
    // Placeholder for WhatsApp integration
    // In a real app, this would construct a WhatsApp link.
    // For testing, show an alert.
    alert(`Would open WhatsApp chat for number: ${number}`);
}

function openReportForm() {
    // Placeholder for report form
    alert(translations[currentLanguage]['report-alert']);
}

// --- Step Footprint Calculator Functions ---

// Constants for calculation (can be adjusted)
const CARBON_PER_STEP = 0.00015; // kg CO2 per step (slightly lower, more eco-conscious)
const STARS_PER_STEP = 1000; // 1 star per 1000 steps

function calculateFootprint() {
    const stepInput = document.getElementById('step-input');
    stepsToday = parseInt(stepInput.value) || 0;

    const carbonAvoided = (stepsToday * CARBON_PER_STEP).toFixed(2);
    const starsEarned = Math.floor(stepsToday / STARS_PER_STEP);

    // Update result display
    document.getElementById('steps-count').textContent = stepsToday;
    document.getElementById('carbon-avoided').textContent = `${carbonAvoided} kg`;
    document.getElementById('stars-earned').textContent = starsEarned;

    updateCalculatorTips();
}

function updateCalculatorTips() {
    const stepTipElement = document.getElementById('step-tip');
    if (stepsToday === 0) {
        stepTipElement.textContent = ''; // Clear tips if steps are 0
        return;
    }

    let tipText = '';
    if (stepsToday >= 7000) { // Increased threshold for "high"
        tipText = translations[currentLanguage]['step-tip-high'];
    } else if (stepsToday >= 2000) { // Increased threshold for "medium"
        tipText = translations[currentLanguage]['step-tip-medium'];
    } else {
        tipText = translations[currentLanguage]['step-tip-low'];
    }
    stepTipElement.textContent = tipText;
}


// --- Bluetooth Sync Functionality (Placeholder) ---
function syncWearable() {
    const syncStatusElement = document.getElementById('sync-status');
    syncStatusElement.textContent = translations[currentLanguage]['sync-status-connecting'];
    syncStatusElement.style.color = 'var(--primary-color)'; // Indicate connecting

    // Simulate Bluetooth connection attempt
    setTimeout(() => {
        // In a real scenario, this would involve Web Bluetooth API or similar.
        // For this example, we'll simulate a random success/failure.
        const success = Math.random() > 0.3; // 70% chance of success

        if (success) {
            wearableConnected = true;
            syncStatusElement.textContent = translations[currentLanguage]['sync-status-connected'];
            syncStatusElement.style.color = 'var(--accent-2)'; // Green for success
            // Optionally, automatically trigger calculateFootprint() if steps are available
            // For simplicity, we require manual input or a placeholder for fetched steps.
            alert('Wearable device connected! You can now manually enter steps or sync them if the feature were fully implemented.');
        } else {
            wearableConnected = false;
            syncStatusElement.textContent = translations[currentLanguage]['sync-status-no-device']; // Simulating no device found as a common failure
            syncStatusElement.style.color = 'var(--error-red)';
            alert(translations[currentLanguage]['sync-status-failed']);
        }
    }, 2000); // Simulate a 2-second connection attempt
}


// --- Chatbot Functions ---
function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    const chatbotBody = document.getElementById('chatbot-body');

    if (!message) return; // Do nothing if input is empty

    // Display user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'chatbot-message user';
    userMessageDiv.textContent = message;
    chatbotBody.appendChild(userMessageDiv);

    // Simulate bot response
    const botResponse = getBotResponse(message);
    setTimeout(() => {
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'chatbot-message bot';
        botMessageDiv.textContent = botResponse;
        chatbotBody.appendChild(botMessageDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight; // Scroll to bottom
    }, 800); // Simulate typing delay

    input.value = ''; // Clear input field
    chatbotBody.scrollTop = chatbotBody.scrollHeight; // Scroll to bottom
}

function getBotResponse(message) {
    const lowerCaseMessage = message.toLowerCase();

    // More specific Bengali responses for common queries
    if (currentLanguage === 'bn') {
        if (lowerCaseMessage.includes('হেল্প') || lowerCaseMessage.includes('সাহায্য')) {
            return translations.bn['bot-help'];
        } else if (lowerCaseMessage.includes('হারিয়ে') || lowerCaseMessage.includes('ফোন')) {
            return translations.bn['bot-lost'];
        } else if (lowerCaseMessage.includes('মানচিত্র') || lowerCaseMessage.includes('কোথায়')) {
            return translations.bn['bot-default']; // Default for map related, might need specific logic
        } else if (lowerCaseMessage.includes('পদক্ষেপ') || lowerCaseMessage.includes('হাঁটা')) {
            return `আপনি ${stepsToday} ধাপ হেঁটেছেন। কার্বন ফুটপ্রিন্ট এড়াতে এটি একটি দুর্দান্ত উপায়!`;
        }
    } else { // English responses
        if (lowerCaseMessage.includes('help') || lowerCaseMessage.includes('assist')) {
            return translations.en['bot-help'];
        } else if (lowerCaseMessage.includes('lost') || lowerCaseMessage.includes('phone')) {
            return translations.en['bot-lost'];
        } else if (lowerCaseMessage.includes('map') || lowerCaseMessage.includes('where')) {
            return translations.en['bot-default']; // Default for map related, might need specific logic
        } else if (lowerCaseMessage.includes('steps') || lowerCaseMessage.includes('walked')) {
            return `You've walked ${stepsToday} steps. That's a great way to reduce your carbon footprint!`;
        }
    }
    // Default response if no specific match
    return translations[currentLanguage]['bot-default'];
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLanguage); // Set default language and translate UI

    // Add event listeners for language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
    });

    // Add event listener for calculator button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateFootprint);
    }

    // Add event listener for chatbot input (Enter key)
    const chatbotInput = document.getElementById('chatbot-input');
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Initialize map placeholder
    initializeSafetyMap();

    // Initial check for tips based on loaded/default values
    updateCalculatorTips();
});