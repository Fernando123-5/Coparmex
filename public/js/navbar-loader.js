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
    if (path.includes('beneficios.html')) return 'beneficios';
    if (path.includes('comisiones.html')) return 'comisiones';
    return 'index';
}

function highlightCurrentPage(page) {
    const links = document.querySelectorAll('[data-page]');
    links.forEach(link => {
        if (link.dataset.page === page) {
            link.classList.add('mobile-menu-link-active');
            link.classList.add('text-blue-700');
            link.classList.add('font-bold');
        } else {
            link.classList.remove('mobile-menu-link-active');
            link.classList.remove('text-blue-700');
        }
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuToggle || !mobileMenu) {
        console.warn('⚠️ Elementos del menú móvil no encontrados');
        return;
    }
    
    // Toggle del menú
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active', isActive);
        menuToggle.setAttribute('aria-expanded', isActive);
        
        console.log('📱 Menú móvil:', isActive ? 'Abierto' : 'Cerrado');
    });
    
    // Cerrar menú al hacer click en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
        }
    });
    
    // Cerrar menú con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
        }
    });
    
    console.log('✅ Mobile Menu inicializado correctamente');
}

// Cargar navbar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
    loadNavbar();
}
