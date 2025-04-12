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

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', 
            navToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
        );
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});