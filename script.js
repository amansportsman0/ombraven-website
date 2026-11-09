/**
 * OMBRAVEN Technology Group - Main Script
 * Beginner-friendly JavaScript for navigation, form handling, and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking regular links (not dropdown toggle)
        const navLinks = navMenu.querySelectorAll('.nav-link:not(.dropdown-toggle)');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Also close when clicking dropdown submenu links
        const dropdownLinks = navMenu.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // ============================================
    // Mobile Dropdown Toggle
    // ============================================
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(function(dropdown) {
        const dropdownLink = dropdown.querySelector('.dropdown-toggle');
        
        if (dropdownLink) {
            dropdownLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // ============================================
    // Header Scroll Effect
    // ============================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ============================================
    // Active Navigation Link Highlighting
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    function highlightNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(function(item) {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    
    // ============================================
    // Contact Form Handling (WhatsApp Click-to-Chat)
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const WHATSAPP_NUMBER = '918709727239';
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            // Required-field validation
            if (!name || !email || !service || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Build professional formatted enquiry message
            const enquiryMessage = 
                'Hello OMBRAVEN Team,\n\n' +
                'I would like to enquire about your digital services.\n\n' +
                'Full Name: ' + name + '\n' +
                'Email Address: ' + email + '\n' +
                'Service Interest: ' + service + '\n\n' +
                'Message:\n' + message + '\n\n' +
                'Please share more details and how we can proceed.';
            
            // Encode and open WhatsApp
            const encodedMessage = encodeURIComponent(enquiryMessage);
            const whatsappURL = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodedMessage;
            
            showFormMessage('WhatsApp is opening. Please press Send to submit your enquiry.', 'success');
            
            // Open WhatsApp in a new tab/window
            window.open(whatsappURL, '_blank', 'noopener,noreferrer');
            
            // Optional: reset form after a short delay so user can see the message
            setTimeout(function() {
                contactForm.reset();
            }, 500);
        });
    }
    
    function showFormMessage(text, type) {
        if (formMessage) {
            formMessage.textContent = text;
            formMessage.className = 'form-message ' + type;
            
            // Auto-hide after 6 seconds
            setTimeout(function() {
                formMessage.className = 'form-message';
                formMessage.textContent = '';
            }, 6000);
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // Initialize
    // ============================================
    highlightNav();
    
});
