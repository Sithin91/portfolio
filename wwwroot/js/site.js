// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Scroll animation for sections
document.addEventListener('DOMContentLoaded', function() {
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
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Auto-hide navbar on mobile after clicking a nav link
                const navbarCollapse = document.querySelector('.navbar-collapse');
                const navbarToggler = document.querySelector('.navbar-toggler');
                
                if (navbarCollapse && navbarToggler) {
                    // Check if navbar is expanded (mobile view)
                    if (navbarCollapse.classList.contains('show')) {
                        // Use Bootstrap's collapse method to hide the navbar
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                            toggle: false
                        });
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // Real-time form validation
    const formInputs = document.querySelectorAll('.form-control-modern');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });

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
        let currentPercent = 0;
        const duration = 2000; // 2 seconds
        const increment = targetPercent / (duration / 50);
        
        // Check if mobile view
        const isMobile = window.innerWidth <= 768;
        const progressColor = isMobile ? '#00d084' : 'var(--primary-color)';
        
        const timer = setInterval(() => {
            currentPercent += increment;
            if (currentPercent >= targetPercent) {
                currentPercent = targetPercent;
                clearInterval(timer);
            }
            
            // Update the conic gradient with appropriate color
            circle.style.background = `conic-gradient(${progressColor} 0% ${currentPercent}%, #e9ecef ${currentPercent}% 100%)`;
            
            // Update the percentage text
            percentText.textContent = Math.round(currentPercent) + '%';
        }, 50);
    }

    // Back to Top Button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) { // Show after scrolling 300px
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
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
        heroSection.addEventListener('mousemove', function(e) {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            // Apply subtle parallax effect to hero content
            const moveX = deltaX * 10;
            const moveY = deltaY * 10;
            
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
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
        
        // Animate particles on mouse move
        heroSection.addEventListener('mousemove', function(e) {
            const rect = heroSection.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            particles.forEach((particle, index) => {
                const delay = index * 50;
                setTimeout(() => {
                    particle.style.opacity = '1';
                    particle.style.transform = `translate(${(x - 50) * 0.1}px, ${(y - 50) * 0.1}px)`;
                }, delay);
            });
        });
        
        heroSection.addEventListener('mouseleave', function() {
            particles.forEach(particle => {
                particle.style.opacity = '0';
                particle.style.transform = 'translate(0px, 0px)';
            });
        });
    }
});
