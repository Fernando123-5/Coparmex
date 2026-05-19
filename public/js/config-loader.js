/**
 * CONFIG LOADER - Se carga ANTES de script.js en todas las páginas
 * Asegura que CONFIG esté disponible globalmente
 */

// Declarar CONFIG como variable global
window.CONFIG = window.CONFIG || {};

// Función para cargar la configuración desde config.json
const loadConfig = async () => {
    try {
        const response = await fetch('./config.json');
        const data = await response.json();
        window.CONFIG = data;
        console.log('✓ CONFIG cargada correctamente desde config.json');
        window.dispatchEvent(new Event('configLoaded'));
    } catch (error) {
        console.error('❌ Error cargando config.json:', error);
        // Usar configuración por defecto si falla
        window.CONFIG = {
            carousel: {
                autoPlayDelay: 5000,
                transitionDuration: 1000
            }
        };
        window.dispatchEvent(new Event('configLoaded'));
    }
};

// Iniciar carga inmediatamente
loadConfig();
