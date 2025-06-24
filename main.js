// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed/sticky header height
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('mobile-menu-open')) {
                mobileMenu.classList.remove('mobile-menu-open');
                mobileMenu.classList.add('mobile-menu-closed');
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            if (mobileMenu.classList.contains('mobile-menu-open')) {
                mobileMenu.classList.remove('mobile-menu-open');
                mobileMenu.classList.add('mobile-menu-closed');
            } else {
                mobileMenu.classList.remove('mobile-menu-closed');
                mobileMenu.classList.add('mobile-menu-open');
            }
        });
    }

    // Contact Form Submission (Frontend only - no backend functionality)
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission

            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                formMessage.textContent = 'Awesome! Your message is on its way to Joe. I\'ll get back to you faster than a speeding bullet (well, almost!).';
                formMessage.classList.remove('hidden', 'text-red-500');
                formMessage.classList.add('text-green-500');
                contactForm.reset(); // Clear the form
            } else {
                formMessage.textContent = 'Oops! Looks like you missed a spot. Please fill in all fields so I can help you out.';
                formMessage.classList.remove('hidden', 'text-green-500');
                formMessage.classList.add('text-red-500');
            }
            formMessage.style.display = 'block'; // Ensure message is visible
        });
    }

    // Update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Scroll to top button logic
    const scrollToTopButton = document.querySelector('.scroll-top'); // Changed to class selector
    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling down 300px
                scrollToTopButton.classList.remove('hidden');
            } else {
                scrollToTopButton.classList.add('hidden');
            }
        });

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Three.js setup for Hero Section Background
    let scene, camera, renderer, object;
    const heroCanvas = document.getElementById('hero-canvas');
    const heroSection = document.getElementById('home'); // The parent container for the canvas

    function initThreeJS() {
        if (!heroCanvas || !heroSection) {
            console.warn("Hero canvas or section not found. Three.js not initializing.");
            // Fallback if elements are missing
            if (heroSection) {
                heroSection.style.backgroundImage = 'linear-gradient(to right bottom, rgba(26, 32, 44, 0.9), rgba(0, 0, 0, 0.7)), url(\'https://placehold.co/1200x600/1a202c/ffffff?text=Modern+City+Skyline\')';
            }
            if (heroCanvas) {
                heroCanvas.style.display = 'none';
            }
            return;
        }

        try {
            // Scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x111111); // Slightly dark background

            // Camera
            camera = new THREE.PerspectiveCamera(75, heroSection.clientWidth / heroSection.clientHeight, 0.1, 1000);
            camera.position.z = 5;

            // Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true, canvas: heroCanvas, alpha: true });
            renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            
            // Object (A simple dodecahedron for an abstract look)
            const geometry = new THREE.DodecahedronGeometry(2, 0);
            const material = new THREE.MeshPhongMaterial({
                color: 0xef4444, // Red color
                specular: 0x555555,
                shininess: 30,
                transparent: true,
                opacity: 0.7
            });
            object = new THREE.Mesh(geometry, material);
            scene.add(object);

            // Lighting
            const ambientLight = new THREE.AmbientLight(0x404040);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(0, 1, 1).normalize();
            scene.add(directionalLight);

            // Animation loop
            const animateThreeJS = () => {
                requestAnimationFrame(animateThreeJS);
                if (object) {
                    object.rotation.x += 0.002;
                    object.rotation.y += 0.003;
                }
                if (renderer && scene && camera) {
                    renderer.render(scene, camera);
                }
            };
            animateThreeJS();

        } catch (error) {
            console.error("Error initializing Three.js:", error);
            // Fallback: If Three.js fails, ensure the hero background still looks okay
            if (heroSection) {
                heroSection.style.backgroundImage = 'linear-gradient(to right bottom, rgba(26, 32, 44, 0.9), rgba(0, 0, 0, 0.7)), url(\'https://placehold.co/1200x600/1a202c/ffffff?text=Modern+City+Skyline\')';
            }
            if (heroCanvas) {
                heroCanvas.style.display = 'none';
            }
        }
    }

    // Handle window resizing for Three.js
    function onWindowResize() {
        if (heroCanvas && camera && renderer && heroSection) {
            camera.aspect = heroSection.clientWidth / heroSection.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
        }
    }

    window.addEventListener('resize', onWindowResize, false);


    // Anime.js animations
    function initAnimeJS() {
        // Ensure anime is available globally from the CDN
        if (window.anime) {
            // Animate hero headline on load
            window.anime({
                targets: '.hero-content h1',
                translateY: [-50, 0],
                opacity: [0, 1],
                duration: 1200,
                easing: 'easeOutExpo',
                delay: 300
            });

            // Animate hero paragraph on load
            window.anime({
                targets: '.hero-content p',
                translateY: [-30, 0],
                opacity: [0, 1],
                duration: 1200,
                easing: 'easeOutExpo',
                delay: 500
            });

            // Animate primary buttons on hover
            document.querySelectorAll('.btn-primary').forEach(button => {
                // Attach event listeners directly, no need for anime.js hover
                // Tailwind classes are already handling the hover effects for .btn-primary
            });

            // Animate cards on hover (subtle lift)
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    window.anime({
                        targets: card,
                        translateY: -5,
                        boxShadow: '0 8px 10px rgba(0,0,0,0.15), 0 4px 6px rgba(0,0,0,0.1)',
                        duration: 200,
                        easing: 'easeOutQuad'
                    });
                });
                card.addEventListener('mouseleave', () => {
                    window.anime({
                        targets: card,
                        translateY: 0,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
                        duration: 200,
                        easing: 'easeOutQuad'
                    });
                });
            });
        } else {
            console.warn("anime.js not found. Animations will not play.");
        }
    }

    // Initialize Three.js and Anime.js when the DOM is ready
    // A small delay to ensure CDN scripts are loaded
    setTimeout(() => {
        initThreeJS();
        initAnimeJS();
    }, 100);
});
