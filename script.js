// Mobile menu toggle
const mobileMenu = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

const menuItems = document.querySelectorAll('nav ul li a');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Video pause on scroll
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function pauseVideosOnScroll() {
    const videos = document.querySelectorAll('.video-section video');
    videos.forEach(video => {
        if (!isElementInViewport(video)) {
            video.pause();
        }
    });
}

window.addEventListener('scroll', pauseVideosOnScroll);
