// =======================
// Language translations
// =======================
const translations = {
    bn: {
        title: 'উৎসববন্ধু',
        subtitle: 'পুজোর পথে, আপনার বন্ধু!',
        'nav-home': 'হোম',
        'nav-guide': 'পুজো ট্যুর গাইড',
        'nav-contact': 'যোগাযোগ',
        'hero-title': 'দুর্গাপুজো হোক নিরাপদ, সহজ ও স্মরণীয়!',
        'hero-description': 'লাইভ ভিড় আপডেট, নিরাপদ পথ, পরিবেশ-বান্ধব প্যান্ডেল এবং আরও অনেক কিছু – সব এক প্ল্যাটফর্মে।',
        'cta-explore': 'এখনই দেখুন',
        'emergency-title': 'জরুরী সহায়তা',
        'emergency-desc': 'কাছাকাছি হাসপাতাল এবং থানা সহ এক-ট্যাপ সাহায্য।',
        'guide-title': 'পুজো ট্যুর গাইড',
        'guide-desc': 'আপনার পুজো ভ্রমণকে আরও রঙিন ও স্মরণীয় করে তুলুন – সেরা প্যান্ডেল ও উৎসবের পথে আপনাকে নিয়ে যাবে আমাদের গাইড!',
        'volunteer-title': 'স্বেচ্ছাসেবক হোন',
        'volunteer-desc': 'পূজার দিনগুলিতে সাহায্য করার জন্য স্বেচ্ছাসেবক হিসাবে যোগ দিন।',
        'contact-title': 'যোগাযোগ',
        'contact-desc': 'সহজে হারানো জিনিস বা নিখোঁজ ব্যক্তিদের রিপোর্ট করুন বা খুঁজে বের করুন।',
        'cta-view': 'দেখুন',
        'footer-text': '© 2025 PujaSathi | মা আসেন ভক্তির সাগরে, আনন্দে ভরে প্রতিটি অন্তর |',
        'privacy': 'গোপনীয়তা নীতি',
        'terms': 'সেবার শর্তাবলী'
    },
    en: {
        title: 'FestivalFriend',
        subtitle: 'Your companion on the path of celebration!',
        'nav-home': 'Home',
        'nav-guide': 'Puja Tour Guide',
        'nav-contact': 'Contact',
        'hero-title': 'Make Durga Puja Safe, Easy & Memorable!',
        'hero-description': 'Live crowd updates, safe routes, eco-friendly pandals and much more – all on one platform.',
        'cta-explore': 'Explore Now',
        'emergency-title': 'Emergency Help',
        'emergency-desc': 'One-tap assistance with nearby hospitals and police stations.',
        'guide-title': 'Puja Tour Guide',
        'guide-desc': 'Make your puja journey more colorful and memorable – our guide will take you to the best pandals and festival routes!',
        'volunteer-title': 'Become a Volunteer',
        'volunteer-desc': 'Join as a volunteer to help during the puja days.',
        'contact-title': 'Contact',
        'contact-desc': 'Easily report or find lost items or missing persons.',
        'cta-view': 'View',
        'footer-text': '© 2025 PujaSathi | Ma comes to the ocean of devotion, filling every heart with joy |',
        'privacy': 'Privacy Policy',
        'terms': 'Terms of Service'
    },
    hi: {
        title: 'उत्सवबंधु',
        subtitle: 'उत्सव के पथ पर, आपका साथी!',
        'nav-home': 'होम',
        'nav-guide': 'पूजा टूर गाइड',
        'nav-contact': 'संपर्क',
        'hero-title': 'दुर्गा पूजा हो सुरक्षित, आसान और यादगार!',
        'hero-description': 'लाइव भीड़ अपडेट, सुरक्षित रास्ते, पर्यावरण-अनुकूल पंडाल और बहुत कुछ – सब एक प्लेटफॉर्म पर।',
        'cta-explore': 'अभी देखें',
        'emergency-title': 'आपातकालीन सहायता',
        'emergency-desc': 'नजदीकी अस्पताल और थाने के साथ एक-टैप सहायता।',
        'guide-title': 'पूजा टूर गाइड',
        'guide-desc': 'अपनी पूजा यात्रा को और भी रंगीन और यादगार बनाएं – बेहतरीन पंडाल और उत्सव के रास्ते पर हमारा गाइड आपको ले जाएगा!',
        'volunteer-title': 'स्वयंसेवक बनें',
        'volunteer-desc': 'पूजा के दिनों में मदद करने के लिए स्वयंसेवक के रूप में जुड़ें।',
        'contact-title': 'संपर्क',
        'contact-desc': 'आसानी से खोई हुई चीजों या लापता व्यक्तियों की रिपोर्ट करें या खोजें।',
        'cta-view': 'देखें',
        'footer-text': '© 2025 PujaSathi | मां आती हैं भक्ति के सागर में, खुशी से भर देती हैं हर दिल |',
        'privacy': 'गोपनীয়ता नीति',
        'terms': 'सेवा की शर्तें'
    }
};

// =======================
// Language switching
// =======================
let currentLang = 'bn';

function updateLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Update body class for font changes (do not wipe other classes)
    document.body.classList.remove('english', 'hindi');
    if (lang === 'en') document.body.classList.add('english');
    if (lang === 'hi') document.body.classList.add('hindi');

    // Update all translatable elements
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            // Check if the element is an H3 with an internal span
            if (element.tagName === 'SPAN' && element.parentElement.tagName === 'H3') {
                element.textContent = translations[lang][key];
            } else {
                // For all other elements, set the text content directly
                element.textContent = translations[lang][key];
            }
        }
    });

    // Highlight active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Save user preference
    localStorage.setItem('preferred-language', lang);
}

// =======================
// On page ready
// =======================
document.addEventListener('DOMContentLoaded', function () {
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && translations[savedLang]) {
        updateLanguage(savedLang);
    } else {
        updateLanguage(currentLang); // default
    }

    // Bind language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });

    // Smooth fade-in animation on load
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animationDelay = `${index * 0.1}s`;
            element.style.animation = 'fadeInUp 0.6s ease forwards';
        }, index * 100);
    });

    // Intersection observer for scroll animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => observer.observe(element));

    // Hover effects for feature boxes
    document.querySelectorAll('.feature-box').forEach(box => {
        box.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        box.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Ripple effect on buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
});