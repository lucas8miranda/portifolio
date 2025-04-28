document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
    
    // Form Submission
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formEntries = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', formEntries);
            
            // Reset form
            form.reset();
            
            // Show success message
            alert('Mensagem enviada com sucesso!');
        });
    }
    
    // Add animation to burger menu for toggle state
    const addBurgerAnimation = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            .burger.toggle .line1 {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            .burger.toggle .line2 {
                opacity: 0;
            }
            .burger.toggle .line3 {
                transform: rotate(45deg) translate(-5px, -6px);
            }
            @keyframes navLinkFade {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    addBurgerAnimation();
    
    // Add scroll reveal animation
    const scrollReveal = () => {
        const revealElements = document.querySelectorAll('.project-card, .timeline-item, .skill-item');
        
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const revealPoint = 150;
            
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('reveal');
                }
            });
        };
        
        // Add CSS for reveal animation
        const style = document.createElement('style');
        style.innerHTML = `
            .project-card, .timeline-item, .skill-item {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .reveal {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
        
        // Initial check and add event listener
        revealOnScroll();
        window.addEventListener('scroll', revealOnScroll);
    };
    
    scrollReveal();
    
    // Back to top button functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    const links = document.querySelectorAll('.nav-links a');
    
    // Add index attributes for staggered animation
    navLinks.forEach((link, index) => {
        link.style.setProperty('--i', index);
    });
    
    // Show/hide back to top button on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Hide back to top button when clicked
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Hide button after scroll
        setTimeout(() => {
            backToTopBtn.classList.remove('show');
        }, 800);
    });
    
    // Add active class to nav links on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section, header');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id') || 'home';
            }
        });
        
        links.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' && current === 'home') {
                link.classList.add('active');
            } else if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add scroll progress indicator
    function updateScrollProgress() {
        const scrollProgress = document.querySelector('.nav-progress-bar');
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollableHeight) * 100;
        
        scrollProgress.style.width = scrolled + '%';
        
        // Add scrolled class to nav
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Improve scroll reveal with staggered animations
    function enhancedScrollReveal() {
        const revealElements = document.querySelectorAll('.project-card, .timeline-item, .skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add delay based on index for staggered effect
                    setTimeout(() => {
                        entry.target.classList.add('show');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => observer.observe(el));
    }

    // Call this function when DOM is loaded
    enhancedScrollReveal();
    updateScrollProgress(); // Initial call
}); 