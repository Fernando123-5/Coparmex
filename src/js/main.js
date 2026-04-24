/**
 * Main.js - Punto de entrada de la aplicación COPARMEX
 * Inicializa todos los componentes y servicios
 */

document.addEventListener('DOMContentLoaded', () => {
    Utils.log('=== Inicializando COPARMEX ===', 'info');

    try {
        // Inicializar componentes
        const heroCarousel = new HeroCarousel();
        const sponsorsCarousel = new SponsorsCarousel();
        const mobileMenu = new MobileMenu();
        const smoothScroll = new SmoothScroll();
        const scrollAnimations = new ScrollAnimations();
        const lazyLoading = new LazyLoading();

        // Guardar referencias globales para debugging
        window.COPARMEX = {
            components: {
                heroCarousel,
                sponsorsCarousel,
                mobileMenu,
                smoothScroll,
                scrollAnimations,
                lazyLoading,
            },
            services: {
                api: apiService,
            },
            utils: Utils,
            config: CONFIG,
        };

        Utils.log('✅ COPARMEX cargada correctamente', 'info');
        Utils.log(`Soporte de Animaciones: ${Utils.supportsAnimation()}`, 'debug');
        Utils.log(`Soporte de Intersection Observer: ${Utils.supportsIntersectionObserver()}`, 'debug');
        
    } catch (error) {
        Utils.log(`Error inicializando COPARMEX: ${error.message}`, 'error');
        console.error(error);
    }
});

// Cleanup al descargar la página
window.addEventListener('beforeunload', () => {
    if (window.COPARMEX) {
        Object.values(window.COPARMEX.components).forEach(component => {
            if (component && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
        Utils.log('Limpieza de componentes completada', 'debug');
    }
});
