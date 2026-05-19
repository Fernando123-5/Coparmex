// Cargar navbar desde archivo separado
async function loadNavbar() {
    try {
        const response = await fetch('navbar.html');
        const navbarHTML = await response.text();
        
        // Insertar navbar al inicio del body
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
        
        // Detectar página actual y marcar link como activo
        const currentPage = getCurrentPage();
        highlightCurrentPage(currentPage);
        
        // Inicializar mobile menu toggle
        initMobileMenu();
    } catch (error) {
        console.error('Error cargando navbar:', error);
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('agenda.html')) return 'agenda';
    if (path.includes('socios.html')) return 'socios';
    if (path.includes('eventos.html')) return 'eventos';
    if (path.includes('data.html')) return 'data';
    if (path.includes('transparencia.html')) return 'transparencia';
    return 'index';
}

function highlightCurrentPage(page) {
    const links = document.querySelectorAll('[data-page]');
    links.forEach(link => {
        if (link.dataset.page === page) {
            link.classList.remove('text-gray-600', 'hover:text-blue-700');
            link.classList.add('text-blue-700', 'font-bold', 'border-b-2', 'border-blue-700', 'pb-1');
        }
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuToggle || !mobileMenu) return;
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
}

// Cargar navbar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
    loadNavbar();
}
