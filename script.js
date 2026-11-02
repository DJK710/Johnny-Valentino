// Main JavaScript for Johhny Valentino Website

// DOM elements
const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');
const photoSlider = document.getElementById('photo-slider');
const contactForm = document.getElementById('contact-form');

// Mobile menu toggle
if (menuToggle && navList) {
    menuToggle.addEventListener('click', (event) => {
        // Prevent the click from propagating to the document
        event.stopPropagation();
        
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Toggle hamburger menu animation
        const bars = menuToggle.querySelectorAll('.bar');
        if (menuToggle.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a nav link or anywhere else on the page
if (navList) {
    // Close on nav link click
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navList.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnMenuToggle && navList.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Function to close the menu
function closeMenu() {
    menuToggle.classList.remove('active');
    navList.classList.remove('active');
    
    const bars = menuToggle.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
}

// Simple auto-sliding photo slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all slides
    const slides = document.querySelectorAll('#photo-slider .slide');
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        // Show the selected slide
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Initialize slider if it exists
    if (slides.length > 0) {
        // Set initial slide
        showSlide(0);
        
        // Auto-advance slides every 5 seconds
        setInterval(nextSlide, 5000);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Get the target's position accounting for the sticky header
            const header = document.querySelector('header');
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your user ID
    emailjs.init("BXCl0Dc5iKxAdsP90"); // Replace with your actual EmailJS user ID
    
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show loading message
            formStatus.innerHTML = '<p>Verzenden...</p>';
            formStatus.style.color = '#333';
            
            // Prepare template parameters
            const templateParams = {
                user_name: document.getElementById('name').value,
                user_email: document.getElementById('email').value,
                user_phone: document.getElementById('phone').value || 'Niet opgegeven',
                event_type: document.getElementById('event-type').value,
                event_date: document.getElementById('event-date').value,
                event_location: document.getElementById('event-location').value,
                message: document.getElementById('extra-info').value || 'Geen extra informatie'
            };
            
            // Send email
            emailjs.send('service_7m8vr97', 'template_8t4ka69', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    formStatus.innerHTML = '<p>Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.</p>';
                    formStatus.style.color = 'white';
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    formStatus.innerHTML = '<p>Er is iets misgegaan. Probeer het later opnieuw of neem contact met ons op via telefoon.</p>';
                    formStatus.style.color = 'red';
                });
        });
    }
});

// Form validation
const requiredInputs = document.querySelectorAll('input[required]');
requiredInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
});

// Add loading="lazy" attribute to all images for better performance
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

// Add animation to elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.section, .faq-item, .gallery-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('fade-in');
        }
    });
}

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add fade-in CSS animation dynamically
const style = document.createElement('style');
style.innerHTML = `
    .fade-in {
        animation: fadeIn 1s ease-in-out forwards;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .section, .faq-item, .gallery-item {
        opacity: 0;
    }
`;
document.head.appendChild(style);