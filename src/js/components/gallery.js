/**
 * Componente: Gallery
 * Maneja la funcionalidad del carrusel de sponsors y galerías de imágenes
 */

class SponsorsCarousel {
    constructor() {
        this.carousel = document.getElementById('sponsorsCarousel');
        this.items = document.querySelectorAll('.sponsor-item');

        this.init();
    }

    init() {
        if (!this.carousel || this.items.length === 0) {
            Utils.log('Carrusel de sponsors no encontrado o vacío', 'warn');
            return;
        }

        // Listeners para detener animación en hover
        this.carousel.addEventListener('mouseenter', () => {
            this.carousel.style.animationPlayState = 'paused';
        });

        this.carousel.addEventListener('mouseleave', () => {
            this.carousel.style.animationPlayState = 'running';
        });

        Utils.log('SponsorsCarousel inicializado', 'debug');
    }

    destroy() {
        Utils.log('SponsorsCarousel destruido', 'debug');
    }
}

/**
 * Scroll Animations - Anima elementos cuando entran en viewport
 */
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        if (!Utils.supportsIntersectionObserver()) {
            Utils.log('Intersection Observer no soportado', 'warn');
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar elementos con clase 'animate-on-scroll'
        const animatableElements = document.querySelectorAll('.news-card, .data-card');
        animatableElements.forEach(element => {
            observer.observe(element);
        });

        Utils.log('ScrollAnimations inicializado', 'debug');
    }

    destroy() {
        Utils.log('ScrollAnimations destruido', 'debug');
    }
}

/**
 * Smooth Scroll - Navegación suave a secciones
 */
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href !== '#' && href !== '#0') {
                    e.preventDefault();
                    
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80; // Account for sticky header
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        Utils.log('SmoothScroll inicializado', 'debug');
    }

    destroy() {
        Utils.log('SmoothScroll destruido', 'debug');
    }
}

/**
 * Lazy Loading de imágenes
 */
class LazyLoading {
    constructor() {
        this.init();
    }

    init() {
        if (!Utils.supportsIntersectionObserver()) {
            Utils.log('Lazy loading no soportado', 'warn');
            return;
        }

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));

        Utils.log('LazyLoading inicializado', 'debug');
    }

    destroy() {
        Utils.log('LazyLoading destruido', 'debug');
    }
}
