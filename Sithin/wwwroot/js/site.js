// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const THEME_KEY = 'portfolio-theme-preference';
    
    // Load saved theme or use system preference on first visit
    function loadTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        
        if (savedTheme) {
            // Use saved preference
            applyTheme(savedTheme);
        } else {
            // Check system preference on first visit
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        }
    }
    
    // Apply theme and update UI
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            htmlElement.setAttribute('data-bs-theme', 'dark');
            updateToggleIcon('sun');
        } else {
            document.body.classList.remove('dark-mode');
            htmlElement.setAttribute('data-bs-theme', 'light');
            updateToggleIcon('moon');
        }
        localStorage.setItem(THEME_KEY, theme);
    }
    
    // Update toggle button icon
    function updateToggleIcon(icon) {
        if (themeToggle) {
            themeToggle.innerHTML = `<i class="fas fa-${icon}"></i>`;
        }
    }
    
    // Toggle between light and dark
    function toggleTheme() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        applyTheme(isDarkMode ? 'light' : 'dark');
    }
    
    // Event listener for toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Load theme on page load
    loadTheme();
}

// ============================================
// SCROLL ANIMATION FOR SECTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Hamburger menu animation
    const hamburger = document.querySelector('.hamburger');
    const mobileSidebar = document.getElementById('mobileSidebar');
    
    if (hamburger && mobileSidebar) {
        // Toggle hamburger icon when offcanvas opens/closes
        mobileSidebar.addEventListener('show.bs.offcanvas', function () {
            hamburger.classList.add('active');
        });
        
        mobileSidebar.addEventListener('hide.bs.offcanvas', function () {
            hamburger.classList.remove('active');
        });
    }
    
    // Typing animation for name
    const typingElement = document.getElementById('typing-name');
    const nameText = 'Sithin Adiyeri';
    let index = 0;

    function typeWriter() {
        if (index < nameText.length) {
            typingElement.textContent += nameText.charAt(index);
            index++;
            setTimeout(typeWriter, 150); // Adjust speed here
        } else {
            // Stop blinking cursor after typing is complete
            setTimeout(() => {
                typingElement.style.borderRight = 'none';
            }, 500);
        }
    }

    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);

    const sections = document.querySelectorAll('section');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Auto-close offcanvas sidebar on mobile after clicking
                const offcanvasElement = document.getElementById('mobileSidebar');
                if (offcanvasElement) {
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                    if (bsOffcanvas) {
                        bsOffcanvas.hide();
                    }
                }
            }
        });
    });

    // Real-time form validation using event delegation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('blur', function(e) {
            if (e.target.classList.contains('form-control-modern')) {
                validateField(e.target);
            }
        }, true);

        contactForm.addEventListener('input', function(e) {
            if (e.target.classList.contains('form-control-modern') && e.target.classList.contains('is-invalid')) {
                validateField(e.target);
            }
        }, true);
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Remove existing validation classes
        field.classList.remove('is-valid', 'is-invalid');

        // Remove existing feedback
        const existingFeedback = field.parentNode.querySelector('.invalid-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        // Validation logic
        switch (field.name) {
            case 'name':
                if (!value) {
                    isValid = false;
                    message = 'Name is required.';
                } else if (value.length < 2) {
                    isValid = false;
                    message = 'Name must be at least 2 characters.';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    isValid = false;
                    message = 'Email is required.';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'Please enter a valid email address.';
                }
                break;
            case 'subject':
                if (!value) {
                    isValid = false;
                    message = 'Subject is required.';
                } else if (value.length < 5) {
                    isValid = false;
                    message = 'Subject must be at least 5 characters.';
                }
                break;
            case 'message':
                if (!value) {
                    isValid = false;
                    message = 'Message is required.';
                } else if (value.length < 10) {
                    isValid = false;
                    message = 'Message must be at least 10 characters.';
                }
                break;
        }

        // Apply validation styling
        if (value && isValid) {
            field.classList.add('is-valid');
        } else if (value && !isValid) {
            field.classList.add('is-invalid');

            // Add feedback message
            const feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            feedback.textContent = message;
            field.parentNode.appendChild(feedback);
        }
    }

    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = `
            <div class="alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show" role="alert">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        // Insert message before the form
        const form = document.querySelector('.contact-form');
        if (form) {
            form.parentNode.insertBefore(messageDiv, form);
        }

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                const alert = messageDiv.querySelector('.alert');
                if (alert) {
                    alert.classList.remove('show');
                    setTimeout(() => {
                        if (messageDiv.parentNode) {
                            messageDiv.parentNode.removeChild(messageDiv);
                        }
                    }, 150);
                }
            }, 5000);
        }
    }

    // Skill circle animation
    const skillCircles = document.querySelectorAll('.skill-circle');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const percent = parseInt(circle.getAttribute('data-percent'));
                const percentText = circle.querySelector('.skill-percent');
                
                animateSkillCircle(circle, percent, percentText);
                skillObserver.unobserve(circle);
            }
        });
    }, { threshold: 0.5 });

    skillCircles.forEach(circle => {
        skillObserver.observe(circle);
    });

    function animateSkillCircle(circle, targetPercent, percentText) {
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentPercent = progress * targetPercent;
            
            // Update the conic gradient with gradient color
            circle.style.background = `conic-gradient(from 0deg, #2563eb 0%, #7c3aed ${currentPercent}%, #e9ecef ${currentPercent}% 100%)`;
            
            // Update the percentage text
            percentText.textContent = Math.round(currentPercent) + '%';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }

    // Back to Top Button functionality
    const backToTopButton = document.getElementById('backToTop');
    let scrollTimeout;
    
    // Show/hide button based on scroll position (debounced)
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            return;
        }
        scrollTimeout = setTimeout(function() {
            if (window.pageYOffset > 300) { // Show after scrolling 300px
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
            scrollTimeout = null;
        }, 100);
    }, { passive: true });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hero Section Mouse Interaction Effect
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-section .container');
    
    if (heroSection && heroContent) {
        let ticking = false;
        let lastMouseEvent = null;
        
        heroSection.addEventListener('mousemove', function(e) {
            lastMouseEvent = e;
            
            if (!ticking) {
                requestAnimationFrame(function() {
                    const rect = heroSection.getBoundingClientRect();
                    const x = lastMouseEvent.clientX - rect.left;
                    const y = lastMouseEvent.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const deltaX = (x - centerX) / centerX;
                    const deltaY = (y - centerY) / centerY;
                    
                    // Apply subtle parallax effect to hero content
                    const moveX = deltaX * 10;
                    const moveY = deltaY * 10;
                    
                    heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Reset position when mouse leaves
        heroSection.addEventListener('mouseleave', function() {
            heroContent.style.transform = 'translate(0px, 0px)';
        });
        
        // Add floating particles effect
        createFloatingParticles();
    }
    
    function createFloatingParticles() {
        const particles = [];
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
                animation: float ${3 + Math.random() * 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            heroSection.appendChild(particle);
            particles.push(particle);
        }
        
        // Animate particles on mouse move (throttled)
        let particleTicking = false;
        let lastParticleEvent = null;
        
        heroSection.addEventListener('mousemove', function(e) {
            lastParticleEvent = e;
            
            if (!particleTicking) {
                requestAnimationFrame(function() {
                    const rect = heroSection.getBoundingClientRect();
                    const x = ((lastParticleEvent.clientX - rect.left) / rect.width) * 100;
                    const y = ((lastParticleEvent.clientY - rect.top) / rect.height) * 100;
                    
                    particles.forEach((particle) => {
                        particle.style.opacity = '1';
                        particle.style.transform = `translate(${(x - 50) * 0.1}px, ${(y - 50) * 0.1}px)`;
                    });
                    particleTicking = false;
                });
                particleTicking = true;
            }
        });
        
        heroSection.addEventListener('mouseleave', function() {
            particles.forEach(particle => {
                particle.style.opacity = '0';
                particle.style.transform = 'translate(0px, 0px)';
            });
        });
    }
});
