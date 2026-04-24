/**
 * Servicio de API para COPARMEX
 * Prepara la estructura para conectar con un backend en el futuro
 */

class APIService {
    constructor() {
        this.baseURL = CONFIG.API.BASE_URL;
        this.timeout = CONFIG.API.TIMEOUT;
    }

    /**
     * Realiza una petición fetch con timeout
     * @param {string} url
     * @param {object} options
     * @returns {Promise}
     */
    async request(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            Utils.log(`Error en petición: ${error.message}`, 'error');
            throw error;
        }
    }

    /**
     * GET - Obtener datos
     * @param {string} endpoint
     * @returns {Promise}
     */
    async get(endpoint) {
        return this.request(`${this.baseURL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * POST - Crear datos
     * @param {string} endpoint
     * @param {object} data
     * @returns {Promise}
     */
    async post(endpoint, data) {
        return this.request(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    /**
     * PUT - Actualizar datos
     * @param {string} endpoint
     * @param {object} data
     * @returns {Promise}
     */
    async put(endpoint, data) {
        return this.request(`${this.baseURL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    /**
     * DELETE - Eliminar datos
     * @param {string} endpoint
     * @returns {Promise}
     */
    async delete(endpoint) {
        return this.request(`${this.baseURL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Métodos específicos para COPARMEX

    /**
     * Obtener todas las noticias
     * @returns {Promise}
     */
    async getNoticias() {
        return this.get(CONFIG.API.ENDPOINTS.NOTICIAS);
    }

    /**
     * Obtener todos los eventos
     * @returns {Promise}
     */
    async getEventos() {
        return this.get(CONFIG.API.ENDPOINTS.EVENTOS);
    }

    /**
     * Obtener datos de estadísticas
     * @returns {Promise}
     */
    async getData() {
        return this.get(CONFIG.API.ENDPOINTS.DATA);
    }

    /**
     * Enviar formulario de contacto
     * @param {object} formData
     * @returns {Promise}
     */
    async sendContacto(formData) {
        return this.post(CONFIG.API.ENDPOINTS.CONTACTO, formData);
    }
}

// Instancia global del servicio de API
const apiService = new APIService();
Utils.log('Servicio de API inicializado', 'debug');
