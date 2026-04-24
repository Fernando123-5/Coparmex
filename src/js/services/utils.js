/**
 * Utilidades globales de COPARMEX
 * Funciones reutilizables para el proyecto
 */

class Utils {
    /**
     * Detecta si el navegador soporta animaciones CSS
     * @returns {boolean}
     */
    static supportsAnimation() {
        const animation = document.createElement('div').style.animation;
        return animation !== undefined;
    }

    /**
     * Detecta soporte para Intersection Observer
     * @returns {boolean}
     */
    static supportsIntersectionObserver() {
        return typeof IntersectionObserver !== 'undefined';
    }

    /**
     * Detecta si el dispositivo es móvil
     * @returns {boolean}
     */
    static isMobile() {
        return window.innerWidth <= CONFIG.BREAKPOINTS.MOBILE;
    }

    /**
     * Detecta si el dispositivo es tablet
     * @returns {boolean}
     */
    static isTablet() {
        return window.innerWidth > CONFIG.BREAKPOINTS.MOBILE && 
               window.innerWidth <= CONFIG.BREAKPOINTS.TABLET;
    }

    /**
     * Detecta si el dispositivo es desktop
     * @returns {boolean}
     */
    static isDesktop() {
        return window.innerWidth > CONFIG.BREAKPOINTS.TABLET;
    }

    /**
     * Logger personalizado
     * @param {string} message
     * @param {string} level
     */
    static log(message, level = 'info') {
        if (!CONFIG.LOGGING.ENABLED) return;
        
        const timestamp = new Date().toLocaleTimeString();
        const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
        
        switch (level) {
            case 'error':
                console.error(`${prefix} ${message}`);
                break;
            case 'warn':
                console.warn(`${prefix} ${message}`);
                break;
            case 'debug':
                console.debug(`${prefix} ${message}`);
                break;
            default:
                console.log(`${prefix} ${message}`);
        }
    }

    /**
     * Debounce - Limita la frecuencia de llamadas a una función
     * @param {Function} func
     * @param {number} delay
     * @returns {Function}
     */
    static debounce(func, delay = 300) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    /**
     * Throttle - Limita la frecuencia máxima de llamadas a una función
     * @param {Function} func
     * @param {number} limit
     * @returns {Function}
     */
    static throttle(func, limit = 300) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Prefiere animaciones reducidas según preferencias del sistema
     * @returns {boolean}
     */
    static prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Detecta si está en modo oscuro
     * @returns {boolean}
     */
    static isDarkMode() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
}

// Log inicial
Utils.log(`COPARMEX v${CONFIG.APP_VERSION} cargado en modo ${CONFIG.ENVIRONMENT}`, 'info');
Utils.log(`Soporte de Animaciones: ${Utils.supportsAnimation()}`, 'debug');
Utils.log(`Soporte de Intersection Observer: ${Utils.supportsIntersectionObserver()}`, 'debug');
Utils.log(`Tipo de dispositivo: ${Utils.isMobile() ? 'Mobile' : Utils.isTablet() ? 'Tablet' : 'Desktop'}`, 'debug');
