document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingBar = document.getElementById('loading-bar');
    
    setTimeout(() => {
        loadingBar.style.width = '30%';
    }, 200);
    
    setTimeout(() => {
        loadingBar.style.width = '60%';
    }, 700);
    
    setTimeout(() => {
        loadingBar.style.width = '100%';
    }, 1200);
    
    // Hide loading screen when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500); 
    });
    
    // Scoll reveal
    const sections = document.querySelectorAll('section');
    
    const revealSection = function() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('opacity-100');
                section.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    };
    
    sections.forEach(section => {
        section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
    });
    
    window.addEventListener('scroll', revealSection);
    revealSection();
});