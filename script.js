// ===== Navigation Functionality =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== Smooth Scroll =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Email & Phone Protection =====
// Reveal email on click (protects from crawlers)
document.addEventListener('DOMContentLoaded', () => {
    const emailLinks = document.querySelectorAll('.email-protected');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const user = link.getAttribute('data-user');
            const domain = link.getAttribute('data-domain');
            const email = user + '@' + domain;
            link.href = 'mailto:' + email;
            link.textContent = email;
            link.classList.add('revealed');
        });
    });

    const phoneLinks = document.querySelectorAll('.phone-protected');
    phoneLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const phone = link.getAttribute('data-phone');
            link.href = 'tel:' + phone;
            link.textContent = phone;
            link.classList.add('revealed');
        });
    });
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot check - if filled, it's likely a bot
    const honeypot = document.getElementById('website');
    if (honeypot && honeypot.value !== '') {
        console.warn('Honeypot triggered - likely spam');
        showMessage('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
        return; // Silently reject but don't tell the bot
    }

    // Human verification check
    const humanVerification = document.getElementById('humanVerification');
    if (!humanVerification.checked) {
        showMessage('Please confirm you are human before submitting.', 'error');
        return;
    }

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        project: document.getElementById('project').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent.substring(0, 50) // Basic fingerprinting
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.project || !formData.message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Simulate form submission (replace with actual API call)
    try {
        // ===== IMPORTANT: BACKEND INTEGRATION REQUIRED =====
        // To actually send emails, you need to integrate with a backend service.
        // Options:
        // 1. EmailJS: https://www.emailjs.com/
        // 2. Formspree: https://formspree.io/
        // 3. Your own backend API
        // 4. Netlify Forms: Add netlify attribute to form tag
        //
        // Example EmailJS integration:
        // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
        //     .then(() => { showMessage('Success!', 'success'); });
        //
        // For now, we'll log to console and show success message
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Log form data (for demonstration - remove in production)
        console.log('Form submitted with verification:', formData);

        // Show success message
        showMessage('Thank you for your message! I will get back to you within 24 hours.', 'success');
        
        // Reset form
        contactForm.reset();

        // Optional: Send to backend API
        // Uncomment and configure this when you have a backend:
        /*
        const response = await fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showMessage('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Server error');
        }
        */
        
    } catch (error) {
        showMessage('Sorry, there was an error sending your message. Please try emailing me directly.', 'error');
        console.error('Form submission error:', error);
    } finally {
        // Restore button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateOnScroll = document.querySelectorAll(
    '.skill-category, .timeline-item, .testimonial-card, .about-content'
);

animateOnScroll.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ===== Typing Effect for Hero Title (Optional Enhancement) =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    // Keep the typing effect subtle by only animating on first load
    // You can enable this by uncommenting the code below:
    
    /*
    heroTitle.innerHTML = '';
    let charIndex = 0;
    
    function typeText() {
        if (charIndex < originalText.length) {
            heroTitle.innerHTML = originalText.slice(0, charIndex + 1);
            charIndex++;
            setTimeout(typeText, 50);
        }
    }
    
    setTimeout(typeText, 500);
    */
}

// ===== Stats Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===== Project Type Selector Enhancement =====
const projectSelect = document.getElementById('project');
if (projectSelect) {
    projectSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            e.target.style.color = 'var(--text-primary)';
        }
    });
}

// ===== Email Protection (Simple obfuscation) =====
// This helps prevent spam bots from harvesting email addresses
// In production, consider using a contact form backend instead
document.addEventListener('DOMContentLoaded', () => {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // You can add analytics tracking here
            console.log('Email link clicked');
        });
    });
});

// ===== Smooth Page Load =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Helper Functions =====

// Debounce function for scroll events
function debounce(func, wait = 20) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll event listener
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== Form Field Validation =====
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--primary-color)';
    });
});

// ===== Copy to Clipboard (for email) =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show temporary notification
        const notification = document.createElement('div');
        notification.textContent = 'Email copied to clipboard!';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.background = 'var(--primary-color)';
        notification.style.color = 'white';
        notification.style.padding = '1rem 2rem';
        notification.style.borderRadius = '0.5rem';
        notification.style.boxShadow = 'var(--shadow-lg)';
        notification.style.zIndex = '10000';
        notification.style.animation = 'fadeInUp 0.3s ease';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email:', err);
    });
}

// ===== Print Functionality (Optional) =====
function printResume() {
    window.print();
}

// ===== Dark Mode Toggle (Optional - can be added later) =====
// Uncomment to enable dark mode functionality:
/*
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.style.position = 'fixed';
darkModeToggle.style.bottom = '20px';
darkModeToggle.style.left = '20px';
darkModeToggle.style.padding = '1rem';
darkModeToggle.style.borderRadius = '50%';
darkModeToggle.style.border = 'none';
darkModeToggle.style.background = 'var(--primary-color)';
darkModeToggle.style.color = 'white';
darkModeToggle.style.cursor = 'pointer';
darkModeToggle.style.fontSize = '1.5rem';
darkModeToggle.style.boxShadow = 'var(--shadow-lg)';
darkModeToggle.style.zIndex = '1000';

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

document.body.appendChild(darkModeToggle);
*/

// ===== Performance Optimization =====
// Lazy load images if you add them later
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

console.log('Portfolio website loaded successfully! 🚀');
