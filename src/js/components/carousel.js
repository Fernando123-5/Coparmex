/**
 * Componente: Hero Carousel
 * Maneja la funcionalidad del carrusel principal de hero
 */

class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.carousel-indicator');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = CONFIG.CAROUSEL.AUTO_PLAY_DELAY;

        this.init();
    }

    init() {
        if (this.slides.length === 0) {
            Utils.log('No se encontraron slides', 'warn');
            return;
        }

        // Mostrar el primer slide
        this.showSlide(0);

        // Event listeners para botones
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

        // Event listeners para indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.showSlide(index));
        });

        // Auto-play
        this.startAutoPlay();

        // Pausar en hover/touch
        const heroCarousel = document.getElementById('heroCarousel');
        if (heroCarousel) {
            heroCarousel.addEventListener('mouseenter', () => this.stopAutoPlay());
            heroCarousel.addEventListener('mouseleave', () => this.startAutoPlay());
            heroCarousel.addEventListener('touchstart', () => this.stopAutoPlay());
            heroCarousel.addEventListener('touchend', () => this.startAutoPlay());
        }

        // Navegación por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        Utils.log('HeroCarousel inicializado', 'debug');
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
        if (Utils.prefersReducedMotion()) {
            Utils.log('Auto-play deshabilitado por prefers-reduced-motion', 'debug');
            return;
        }

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

    destroy() {
        this.stopAutoPlay();
        Utils.log('HeroCarousel destruido', 'debug');
    }
}
