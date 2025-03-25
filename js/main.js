// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.progress');
    const loadingStatus = document.querySelector('.loading-status');
    const loadingText = document.querySelector('.loading-text');
    
    const loadingTexts = [
        'Preparing your fitness journey...',
        'Loading workout plans...',
        'Setting up training schedules...',
        'Almost ready...',
        'Welcome to Kayla Fitness!'
    ];

    let progress = 0;
    let lastUpdate = 0;
    const minIncrement = 0.5;
    const maxIncrement = 2;
    const updateInterval = 30; // Smaller interval for smoother updates

    const updateLoadingText = (progress) => {
        const index = Math.floor((progress / 100) * (loadingTexts.length - 1));
        if (loadingText && loadingTexts[index]) {
            loadingText.style.opacity = '0';
            setTimeout(() => {
                loadingText.textContent = loadingTexts[index];
                loadingText.style.opacity = '1';
            }, 200);
        }
    };

    const incrementProgress = () => {
        const now = Date.now();
        const timeDiff = now - lastUpdate;
        
        if (timeDiff < updateInterval) return;
        
        lastUpdate = now;
        
        // Smoother progress calculation
        const remaining = 100 - progress;
        let increment;
        
        if (remaining > 50) {
            increment = Math.random() * (maxIncrement - minIncrement) + minIncrement;
        } else if (remaining > 20) {
            increment = Math.random() * (minIncrement * 2) + minIncrement / 2;
        } else {
            increment = Math.random() * minIncrement;
        }
        
        progress = Math.min(progress + increment, 99.9);
        
        progressBar.style.width = `${progress}%`;
        updateLoadingText(progress);
        
        if (progress < 99.9) {
            requestAnimationFrame(incrementProgress);
        }
    };

    // Start progress animation
    requestAnimationFrame(incrementProgress);

    // Simulate content loading
    window.addEventListener('load', () => {
        progress = 100;
        progressBar.style.width = '100%';
        updateLoadingText(100);
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 600);
        }, 500);
    });

    // Fallback to ensure loading screen is removed
    setTimeout(() => {
        if (loadingScreen.style.display !== 'none') {
            progress = 100;
            progressBar.style.width = '100%';
            updateLoadingText(100);
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 600);
        }
    }, 8000);
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    const toggleMenu = () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
            
            // Smooth scroll to section
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300); // Wait for menu animation to complete
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        navbar.style.padding = '15px 0';
    } else {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.8)';
        navbar.style.padding = '20px 0';
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Reveal Elements on Scroll
const revealElements = document.querySelectorAll('.service-card, .schedule-item, .testimonial-card');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); 