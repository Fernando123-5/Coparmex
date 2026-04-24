/**
 * Configuración Global de COPARMEX
 * Este archivo contiene todas las constantes y configuraciones de la aplicación
 */

const CONFIG = {
    // Configuración de la aplicación
    APP_NAME: 'COPARMEX',
    APP_VERSION: '1.0.0',
    ENVIRONMENT: 'production',

    // Configuración del carousel hero
    CAROUSEL: {
        AUTO_PLAY_DELAY: 5000, // milisegundos
        TRANSITION_DURATION: 1000, // milisegundos
    },

    // Configuración del carousel de sponsors
    SPONSORS_CAROUSEL: {
        AUTO_SCROLL_DURATION: 30, // segundos
    },

    // URLs de API (preparado para futura integración)
    API: {
        BASE_URL: 'https://api.coparmex.com',
        ENDPOINTS: {
            NOTICIAS: '/api/noticias',
            EVENTOS: '/api/eventos',
            DATA: '/api/data',
            CONTACTO: '/api/contacto',
        },
        TIMEOUT: 10000, // milisegundos
    },

    // Breakpoints de responsive design
    BREAKPOINTS: {
        MOBILE: 640,
        TABLET: 1024,
        DESKTOP: 1025,
    },
};

console.log(`🔧 ${CONFIG.APP_NAME} v${CONFIG.APP_VERSION} - ${CONFIG.ENVIRONMENT}`);
