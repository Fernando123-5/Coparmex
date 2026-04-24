/**
 * Componente: Mobile Menu
 * Maneja la funcionalidad del menú móvil
 */

class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('menu-toggle');
        this.mobileMenu = document.getElementById('mobile-menu');

        this.init();
    }

    init() {
        if (!this.menuToggle || !this.mobileMenu) {
            Utils.log('Elementos del menú móvil no encontrados', 'warn');
            return;
        }

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

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!this.menuToggle.contains(e.target) && 
                !this.mobileMenu.contains(e.target)) {
                this.closeMenu();
            }
        });

        Utils.log('MobileMenu inicializado', 'debug');
    }

    toggleMenu() {
        this.mobileMenu.classList.toggle('hidden');
    }

    openMenu() {
        this.mobileMenu.classList.remove('hidden');
    }

    closeMenu() {
        this.mobileMenu.classList.add('hidden');
    }

    destroy() {
        Utils.log('MobileMenu destruido', 'debug');
    }
}
