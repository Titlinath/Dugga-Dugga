// 📁 volunteers.js - JavaScript for Volunteers Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Role Filtering (if implemented)
    // const roleCards = document.querySelectorAll('.role-card');
    // const roleFilter = document.getElementById('role-filter');
    
    // if (roleFilter) {
    //     roleFilter.addEventListener('change', function() {
    //         const selectedRole = this.value;
    //         roleCards.forEach(card => {
    //             if (card.dataset.role === selectedRole || selectedRole === 'all') {
    //                 card.style.display = 'block';
    //             } else {
    //                 card.style.display = 'none';
    //             }
    //         });
    // }
    
    // FAQ Accordion Toggle
    const faqCards = document.querySelectorAll('.faq-card');
    
    faqCards.forEach(card => {
        card.querySelector('h3').addEventListener('click', function() {
            // Close other open FAQs
            faqCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                    otherCard.querySelector('p').style.display = 'none';
                }
            });
            
            // Toggle current FAQ
            card.classList.toggle('active');
            const content = card.querySelector('p');
            content.style.display = card.classList.contains('active') ? 'block' : 'none';
        });
    });
    
    // Volunteer Signup Form Handling
    const volunteerForm = document.getElementById('volunteer-form');
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const fullName = document.getElementById('full-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            if (!fullName || !email || !phone) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Phone validation (10-digit Indian format)
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }
            
            // Form is valid - show success (in real app: submit to API)
            alert('Thank you for signing up as a volunteer!\n\nWe will contact you soon with further details.');
            volunteerForm.reset();
            
            // In a real implementation:
            // fetch('/api/volunteers', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         fullName,
            //         email,
            //         phone,
            //         area: document.getElementById('area').value,
            //         availability: document.getElementById('availability').value,
            //         role: document.getElementById('role').value,
            //         emergencyContact: document.getElementById('emergency-contact').value
            //     })
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         alert('Thank you for volunteering!');
            //         volunteerForm.reset();
            //     } else {
            //         alert('Error: ' + data.message);
            //     }
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     alert('Failed to submit. Please try again.');
            // });
        });
    }
    
    // Role Selection Preview
    const roleSelect = document.getElementById('role');
    if (roleSelect) {
        roleSelect.addEventListener('change', function() {
            const roleName = this.options[this.selectedIndex].text;
            document.getElementById('selected-role').textContent = roleName;
        });
    }
    
    // Language Toggle (if not handled globally)
    // const langButtons = document.querySelectorAll('.lang-btn');
    // langButtons.forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         const lang = this.dataset.lang;
    //         // In real app: set cookie/localStorage and reload or translate content
    //         alert(`Language would be set to: ${lang}`);
    //     });
    // });
});