document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Logic ---
    const hamButton = document.getElementById('hamBtn');
    const navMenu = document.getElementById('menu-nav');

    // We'll only set up the menu logic if both the button and the menu exist
    if (hamButton && navMenu) {
        // Toggle menu on hamburger click
        hamButton.addEventListener('click', (e) => {
            e.preventDefault();
            navMenu.classList.toggle('responsive');
        });

        // Close menu when a nav link is clicked on mobile
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('responsive')) {
                    navMenu.classList.remove('responsive');
                }
            });
        });
    }

    // --- Slider Logic ---
    const slides = document.querySelectorAll('.sliders__item');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds

        function nextSlide() {
            const leavingSlide = slides[currentSlide];
            currentSlide = (currentSlide + 1) % slides.length;
            const activeSlide = slides[currentSlide];

            // Make the next slide active (moves from right to center)
            activeSlide.classList.add('sliders__item--visible');

            // Mark the old slide as leaving (moves from center to left)
            leavingSlide.classList.add('sliders__item--leaving');
            leavingSlide.classList.remove('sliders__item--visible');

            // After the transition, reset the 'leaving' slide to its default
            // position (off-screen right) so it's ready for its next turn.
            setTimeout(() => {
                leavingSlide.style.transition = 'none'; // Disable transition for instant move
                leavingSlide.classList.remove('sliders__item--leaving');
                // Force browser to apply the style change immediately
                leavingSlide.offsetHeight; 
                // Re-enable transition for future animations
                leavingSlide.style.transition = 'transform 1s ease-in-out';
            }, 1000); // Must match the CSS transition duration (1s)
        }

        // Initial state: first slide is visible, others are in default (off-screen right)
        slides[0].classList.add('sliders__item--visible');

        setInterval(nextSlide, slideInterval); // Start the carousel
    }

    // --- Active Menu on Scroll Logic ---
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.menu__nav a');

    if (sections.length > 0 && menuLinks.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    menuLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: "-50% 0px -50% 0px" }); // Highlight when section is in the middle of the screen

        sections.forEach(section => observer.observe(section));
    }
});