/* ===================================
   HERO CAROUSEL FUNCTIONALITY
   =================================== */

class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.carousel-indicator');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        // Usar valores de CONFIG o defaults si no está disponible
        this.autoPlayDelay = (CONFIG?.carousel?.autoPlayDelay) || 5000;
        this.transitionDuration = (CONFIG?.carousel?.transitionDuration) || 1000;

        this.init();
    }

    init() {
        // Mostrar el primer slide
        this.showSlide(0);

        // Event listeners para botones
        document.getElementById('prevBtn').addEventListener('click', () => this.prevSlide());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());

        // Event listeners para indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.showSlide(index));
        });

        // Auto-play
        this.startAutoPlay();

        // Pausar en hover/touch
        const heroCarousel = document.getElementById('heroCarousel');
        heroCarousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        heroCarousel.addEventListener('mouseleave', () => this.startAutoPlay());
        heroCarousel.addEventListener('touchstart', () => this.stopAutoPlay());
        heroCarousel.addEventListener('touchend', () => this.startAutoPlay());

        // Navegación por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        console.log('✅ HeroCarousel inicializado');
    }

    showSlide(index) {
        // Validar índice
        if (index < 0) {
            this.currentIndex = this.slides.length - 1;
        } else if (index >= this.slides.length) {
            this.currentIndex = 0;
        } else {
            this.currentIndex = index;
        }

        // Remover clase active de todos los slides e indicadores
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));

        // Añadir clase active al slide e indicador actual
        this.slides[this.currentIndex].classList.add('active');
        this.indicators[this.currentIndex].classList.add('active');
    }

    nextSlide() {
        this.showSlide(this.currentIndex + 1);
        this.resetAutoPlay();
    }

    prevSlide() {
        this.showSlide(this.currentIndex - 1);
        this.resetAutoPlay();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.showSlide(this.currentIndex + 1);
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

/* ===================================
   SPONSORS CAROUSEL FUNCTIONALITY
   =================================== */

class SponsorsCarousel {
    constructor() {
        this.carousel = document.getElementById('sponsorsCarousel');
        this.items = document.querySelectorAll('.sponsor-item');
        this.itemWidth = 0;
        this.totalWidth = 0;
        this.scrollPosition = 0;

        this.init();
    }

    init() {
        if (!this.carousel) return;

        // Listeners para detener animación en hover
        this.carousel.addEventListener('mouseenter', () => {
            this.carousel.style.animationPlayState = 'paused';
        });

        this.carousel.addEventListener('mouseleave', () => {
            this.carousel.style.animationPlayState = 'running';
        });

        console.log('✅ SponsorsCarousel inicializado');
    }
}

/* ===================================
   MOBILE MENU TOGGLE
   =================================== */

class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('menu-toggle');
        this.mobileMenu = document.getElementById('mobile-menu');

        this.init();
    }

    init() {
        this.menuToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Cerrar menú al hacer click en un link
        const links = this.mobileMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        console.log('✅ MobileMenu inicializado');
    }

    toggleMenu() {
        this.mobileMenu.classList.toggle('hidden');
    }

    closeMenu() {
        this.mobileMenu.classList.add('hidden');
    }
}

/* ===================================
   SMOOTH SCROLL PARA LINKS
   =================================== */

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

        console.log('✅ SmoothScroll inicializado');
    }
}

/* ===================================
   INTERSECTION OBSERVER PARA ANIMACIONES
   =================================== */

class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
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

        console.log('✅ ScrollAnimations inicializado');
    }
}

/* ===================================
   INICIALIZACIÓN GLOBAL
   =================================== */

const inicializar = () => {
    console.log('🚀 Inicializando COPARMEX...');

    // Inicializar hero carousel
    new HeroCarousel();

    // Inicializar sponsors carousel
    new SponsorsCarousel();

    // Inicializar mobile menu
    new MobileMenu();

    // Inicializar smooth scroll
    new SmoothScroll();

    // Inicializar animaciones de scroll
    new ScrollAnimations();

    console.log('✅ COPARMEX cargada correctamente');
    console.log('📊 Configuración:', CONFIG);
};

// Esperar a que CONFIG esté listo y el DOM esté cargado
const iniciarCuandoListo = () => {
    if (CONFIG && CONFIG.carousel) {
        inicializar();
    } else {
        // Si CONFIG aún no está listo, reintentar
        setTimeout(iniciarCuandoListo, 100);
    }
};

document.addEventListener('DOMContentLoaded', iniciarCuandoListo);

// Si CONFIG ya se cargó antes de DOMContentLoaded, iniciar igual
window.addEventListener('configLoaded', () => {
    if (document.readyState === 'loading') {
        // DOM aún carga, esperar a DOMContentLoaded
    } else {
        // DOM ya está listo, iniciar ahora
        inicializar();
    }
});
