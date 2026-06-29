// Cargar navbar desde archivo separado
async function loadNavbar() {
    try {
        const response = await fetch('navbar.html');
        const navbarHTML = await response.text();
        
        // Insertar navbar al inicio del body
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
        
        // Agregar estilos de animación globales si no existen
        if (!document.getElementById('navbar-animations')) {
            const style = document.createElement('style');
            style.id = 'navbar-animations';
            style.textContent = `
                /* BOTÓN MENÚ MÓVIL */
                #menu-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 8px;
                    color: #4b5563;
                    font-size: 24px;
                    transition: all 0.3s ease;
                    height: 44px;
                    width: 44px;
                    border-radius: 8px;
                }

                #menu-toggle:hover {
                    background-color: #f3f4f6;
                    color: #1e40af;
                    transform: scale(1.05);
                }

                /* Icono hamburguesa - rotación suave */
                .hamburger-icon {
                    transition: transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1), 
                                color 0.3s ease;
                    display: inline-block;
                }

                #menu-toggle.active {
                    background-color: #dbeafe;
                    color: #1e40af;
                }

                #menu-toggle.active .hamburger-icon {
                    transform: rotate(180deg);
                }

                @media (min-width: 768px) {
                    #menu-toggle {
                        display: none !important;
                    }
                }

                /* MENÚ MÓVIL - Animación fluida con max-height */
                .mobile-menu {
                    display: none;
                    flex-direction: column;
                    gap: 0;
                    padding: 12px 0;
                    background: linear-gradient(180deg, #ffffff 0%, #fafbff 100%);
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    z-index: 98;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
                    width: 100%;
                    border-bottom: 1px solid #e5e7eb;
                    border-top: 2px solid #1e40af;
                    max-height: 0;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
                    opacity: 0;
                }

                @keyframes slideDown {
                    0% {
                        opacity: 0;
                        transform: translateY(-15px);
                        max-height: 0;
                    }
                    1% {
                        display: flex;
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                        max-height: 550px;
                    }
                }

                @keyframes slideUp {
                    0% {
                        opacity: 1;
                        transform: translateY(0);
                        max-height: 550px;
                    }
                    99% {
                        display: flex;
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-15px);
                        max-height: 0;
                    }
                }

                .mobile-menu.active {
                    display: flex !important;
                    max-height: 550px;
                    overflow-y: auto;
                    opacity: 1;
                    animation: slideDown 0.4s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
                }

                @media (min-width: 768px) {
                    .mobile-menu {
                        display: none !important;
                    }
                }

                .mobile-menu-link {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 13px 16px;
                    font-size: 14px;
                    border-bottom: 1px solid #e5e7eb;
                    text-decoration: none;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    color: #4b5563;
                    font-weight: 500;
                    position: relative;
                    overflow: hidden;
                }

                .mobile-menu-link::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 5px;
                    background: linear-gradient(180deg, #1e40af 0%, #1e3a8a 100%);
                    transform: scaleY(0);
                    transform-origin: center;
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .mobile-menu-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, rgba(30, 64, 175, 0) 0%, rgba(30, 64, 175, 0.3) 50%, rgba(30, 64, 175, 0) 100%);
                    transform: scaleX(0);
                    transform-origin: center;
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .mobile-menu-link:hover {
                    background-color: #f0f5ff;
                    color: #1e40af;
                    padding-left: 22px;
                }

                .mobile-menu-link:hover .material-icons {
                    transform: scale(1.15) rotate(5deg);
                    color: #1e40af;
                }

                .mobile-menu-link:active {
                    background-color: #dbeafe;
                    transform: scale(0.98);
                }

                .mobile-menu-link.mobile-menu-link-active {
                    background-color: #f0f5ff;
                    color: #1e40af;
                    font-weight: 600;
                    padding-left: 21px;
                }

                .mobile-menu-link.mobile-menu-link-active::before {
                    transform: scaleY(1);
                    animation: activeBarSlide 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .mobile-menu-link.mobile-menu-link-active::after {
                    transform: scaleX(1);
                }

                .mobile-menu-link.mobile-menu-link-active .material-icons {
                    color: #1e40af;
                    transform: scale(1.2);
                }

                @keyframes activeBarSlide {
                    0% {
                        transform: scaleY(0);
                    }
                    60% {
                        transform: scaleY(1.1);
                    }
                    100% {
                        transform: scaleY(1);
                    }
                }

                .mobile-menu-link .material-icons {
                    font-size: 22px;
                    color: inherit;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 22px;
                }

                .mobile-menu-link:last-child {
                    border-bottom: none;
                }

                @media (max-width: 640px) {
                    .mobile-menu-link {
                        padding: 12px 14px;
                        font-size: 13px;
                        gap: 12px;
                    }
                    
                    .mobile-menu-link:hover {
                        padding-left: 20px;
                    }

                    .mobile-menu-link.mobile-menu-link-active {
                        padding-left: 19px;
                    }
                }

                .mobile-menu-container {
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                    padding: 0;
                    background: transparent;
                    position: relative;
                }

                /* NAVBAR HERO SOLO EN INDEX */
                body.home-navbar-hero #main-header {
                    background-color: transparent !important;
                    background: transparent !important;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    border-bottom-color: transparent !important;
                    box-shadow: none !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }

                body.home-navbar-hero #main-header .max-w-7xl {
                    background: transparent;
                }

                body.home-navbar-hero {
                    --home-navbar-offset: 80px;
                }

                @media (min-width: 768px) {
                    body.home-navbar-hero {
                        --home-navbar-offset: 96px;
                    }
                }

                body.home-navbar-hero #hero,
                body.home-navbar-scrolled #hero {
                    padding-top: var(--home-navbar-offset);
                }

                body.home-navbar-hero #main-header .flex.items-center,
                body.home-navbar-hero #main-header .max-w-7xl,
                body.home-navbar-hero #main-header nav,
                body.home-navbar-hero #main-header #mobile-menu {
                    background: transparent !important;
                }

                body.home-navbar-hero #main-header,
                body.home-navbar-hero #main-header a,
                body.home-navbar-hero #main-header button,
                body.home-navbar-hero #main-header .material-icons,
                body.home-navbar-hero #main-header img,
                body.home-navbar-hero #main-header nav a {
                    transition: background-color 0.35s ease, color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease, transform 0.35s ease, backdrop-filter 0.35s ease;
                }

                body.home-navbar-hero #main-header nav a,
                body.home-navbar-hero #main-header .hamburger-icon {
                    color: #ffffff !important;
                    text-shadow: 0 1px 10px rgba(0, 0, 0, 0.24);
                }

                body.home-navbar-hero #main-header img[alt="COPARMEX Logo"] {
                    filter: brightness(0) invert(1);
                }

                body.home-navbar-hero #main-header nav a:hover {
                    color: #ffffff;
                }

                body.home-navbar-hero #main-header nav a.text-blue-700,
                body.home-navbar-hero #main-header nav a.nav-link-active {
                    color: #ffffff;
                    border-bottom-color: rgba(255, 255, 255, 0.95);
                }

                body.home-navbar-hero #main-header #menu-toggle {
                    color: #ffffff !important;
                    background-color: transparent !important;
                    border: 1px solid rgba(255, 255, 255, 0.35);
                    box-shadow: none !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }

                body.home-navbar-hero #main-header #menu-toggle:hover {
                    background-color: transparent !important;
                    color: #ffffff;
                }

                body.home-navbar-hero #main-header .hamburger-btn,
                body.home-navbar-hero #main-header .hamburger-btn:hover {
                    background: transparent !important;
                }

                body.home-navbar-scrolled #main-header {
                    background-color: rgba(255, 255, 255, 0.96) !important;
                    background: rgba(255, 255, 255, 0.96) !important;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    border-bottom-color: rgba(194, 198, 211, 0.8);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                }

                body.home-navbar-scrolled #main-header nav a,
                body.home-navbar-scrolled #main-header .hamburger-icon,
                body.home-navbar-scrolled #main-header #menu-toggle {
                    color: #4b5563;
                    text-shadow: none;
                }

                body.home-navbar-scrolled #main-header nav a:hover {
                    color: #1e40af;
                }

                body.home-navbar-scrolled #main-header nav a.text-blue-700,
                body.home-navbar-scrolled #main-header nav a.nav-link-active {
                    color: #1e40af;
                    border-bottom-color: #1e40af;
                }

                body.home-navbar-scrolled #main-header #menu-toggle {
                    background: transparent;
                    border-color: transparent;
                }

                body.home-navbar-scrolled #main-header #menu-toggle:hover {
                    background-color: #f3f4f6;
                    color: #1e40af;
                }

                body.home-navbar-scrolled #main-header .hamburger-icon {
                    color: inherit;
                }

                body.home-navbar-scrolled #main-header img[alt="COPARMEX Logo"] {
                    filter: none;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Detectar página actual y marcar link como activo
        const currentPage = getCurrentPage();
        setupHomeNavbarState(currentPage);
        highlightCurrentPage(currentPage);
        
        // Inicializar mobile menu toggle
        initMobileMenu();
        
        // Agregar listener para cambios dinámicos de página
        setupPageChangeListener();
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
    if (path.includes('quienes-somos.html')) return 'quienes-somos';
    return 'index';
}

function highlightCurrentPage(page) {
    const links = document.querySelectorAll('a.nav-link');
    links.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        
        if (linkPage === page) {
            // Agregar estilos al link activo
            link.classList.add('nav-link-active');
            link.classList.add('text-blue-700');
            link.classList.add('font-bold');
            
            // En mobile menu, agregar indicador visual dinámico
            if (link.classList.contains('mobile-menu-link')) {
                link.classList.add('mobile-menu-link-active');
                
                // Trigger animation
                void link.offsetWidth; // Force reflow para reiniciar la animación
                link.style.animation = 'none';
                setTimeout(() => {
                    link.style.animation = '';
                }, 10);
            }
        } else {
            // Remover estilos de links inactivos
            link.classList.remove('nav-link-active');
            link.classList.remove('text-blue-700');
            link.classList.remove('font-bold');
            link.classList.remove('mobile-menu-link-active');
        }
    });
    
    console.log('✨ Página actualizada a:', page);
}

function setupPageChangeListener() {
    // Escuchar cambios de URL cuando el usuario navega
    window.addEventListener('popstate', () => {
        const currentPage = getCurrentPage();
        setupHomeNavbarState(currentPage);
        highlightCurrentPage(currentPage);
    });
}

function setupHomeNavbarState(page) {
    const body = document.body;
    body.classList.remove('home-navbar-hero', 'home-navbar-scrolled');

    const applySolidNavbarState = () => {
        const header = document.getElementById('main-header');
        const logo = document.querySelector('#main-header img[alt="COPARMEX Logo"]');
        const menuToggle = document.getElementById('menu-toggle');
        const desktopLinks = document.querySelectorAll('#main-header nav:not(#mobile-menu) a.nav-link');
        const mobileLinks = document.querySelectorAll('#main-header .mobile-menu-link');

        if (!header) {
            return;
        }

        body.classList.add('home-navbar-scrolled');
        body.classList.remove('home-navbar-hero');

        header.classList.add('bg-white', 'shadow-sm', 'border-gray-100');
        header.style.cssText = 'position: sticky; top: 0; left: 0; right: 0; background-color: rgba(255, 255, 255, 0.98) !important; background: rgba(255, 255, 255, 0.98) !important; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important; border-bottom-color: rgba(229, 231, 235, 0.95) !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important;';

        if (logo) {
            logo.style.setProperty('filter', 'none', 'important');
        }

        desktopLinks.forEach((link) => {
            link.style.setProperty('color', '#111827', 'important');
            link.style.setProperty('text-shadow', 'none', 'important');
        });

        mobileLinks.forEach((link) => {
            link.style.setProperty('color', '#111827', 'important');
        });

        if (menuToggle) {
            menuToggle.style.setProperty('background-color', 'transparent', 'important');
            menuToggle.style.setProperty('border-color', 'transparent', 'important');
            menuToggle.style.setProperty('box-shadow', 'none', 'important');
            menuToggle.style.setProperty('backdrop-filter', 'none', 'important');
            menuToggle.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
            menuToggle.style.setProperty('color', '#111827', 'important');
        }
    };

    if (page !== 'index') {
        applySolidNavbarState();
        return;
    }

    const hero = document.getElementById('hero');
    if (!hero) {
        return;
    }

    const isDesktopNavbar = window.matchMedia('(min-width: 768px)').matches;

    if (!isDesktopNavbar) {
        body.classList.add('home-navbar-scrolled');
        return;
    }

    const applyNavbarState = (isHeroState) => {
        const header = document.getElementById('main-header');
        const logo = document.querySelector('#main-header img[alt="COPARMEX Logo"]');
        const menuToggle = document.getElementById('menu-toggle');

        if (!header) {
            return;
        }

        if (isHeroState) {
            body.classList.add('home-navbar-hero');
            body.classList.remove('home-navbar-scrolled');

            header.classList.remove('bg-white', 'shadow-sm', 'border-gray-100');

            header.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; background-color: transparent !important; background: transparent !important; box-shadow: none !important; border-bottom-color: transparent !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important;';
            header.style.setProperty('box-shadow', 'none', 'important');
            header.style.setProperty('border-bottom-color', 'transparent', 'important');
            header.style.setProperty('backdrop-filter', 'none', 'important');
            header.style.setProperty('-webkit-backdrop-filter', 'none', 'important');

            if (logo) {
                logo.style.setProperty('filter', 'brightness(0) invert(1)', 'important');
            }

            if (menuToggle) {
                menuToggle.style.setProperty('background-color', 'transparent', 'important');
                menuToggle.style.setProperty('border-color', 'rgba(255, 255, 255, 0.35)', 'important');
                menuToggle.style.setProperty('box-shadow', 'none', 'important');
                menuToggle.style.setProperty('backdrop-filter', 'none', 'important');
                menuToggle.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
                menuToggle.style.setProperty('color', '#ffffff', 'important');
            }
        } else {
            body.classList.add('home-navbar-scrolled');
            body.classList.remove('home-navbar-hero');

            header.classList.add('bg-white', 'shadow-sm', 'border-gray-100');

            header.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; background-color: rgba(255, 255, 255, 0.96) !important; background: rgba(255, 255, 255, 0.96) !important; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important; border-bottom-color: rgba(194, 198, 211, 0.8) !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important;';

            if (logo) {
                logo.style.setProperty('filter', 'none', 'important');
            }

            if (menuToggle) {
                menuToggle.style.setProperty('background-color', 'transparent', 'important');
                menuToggle.style.setProperty('border-color', 'transparent', 'important');
                menuToggle.style.setProperty('box-shadow', 'none', 'important');
                menuToggle.style.setProperty('backdrop-filter', 'none', 'important');
                menuToggle.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
                menuToggle.style.setProperty('color', '#4b5563', 'important');
            }
        }
    };

    const syncNavbarState = () => {
        const heroRect = hero.getBoundingClientRect();
        const isHeroState = heroRect.top <= 24 && heroRect.bottom > 24;
        applyNavbarState(isHeroState);
    };

    syncNavbarState();

    if (window.IntersectionObserver) {
        const heroObserver = new IntersectionObserver((entries) => {
            const entry = entries[0];
            const heroRect = entry.boundingClientRect;
            applyNavbarState(heroRect.top <= 24 && heroRect.bottom > 24);
        }, {
            threshold: 0,
            rootMargin: '-24px 0px 0px 0px'
        });

        heroObserver.observe(hero);
        window.__homeNavbarHeroObserver = heroObserver;
    }

    if (!window.__homeNavbarScrollHandlerAttached) {
        window.addEventListener('scroll', () => {
            if (document.body.classList.contains('home-navbar-hero') || document.body.classList.contains('home-navbar-scrolled')) {
                syncNavbarState();
            }
        }, { passive: true });

        window.addEventListener('resize', syncNavbarState, { passive: true });
        window.__homeNavbarScrollHandlerAttached = true;
    }
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    if (!menuToggle || !mobileMenu) {
        console.warn('⚠️ Elementos del menú móvil no encontrados');
        return;
    }
    
    // Variable para rastrear estado
    let isMenuOpen = false;
    
    // Toggle del menú
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            // Abrir menú con max-height
            mobileMenu.classList.add('active');
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            
            // Cambiar icono de menu a close (X)
            hamburgerIcon.textContent = 'close';
        } else {
            // Cerrar menú con max-height
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Cambiar icono de close (X) a menu
            hamburgerIcon.textContent = 'menu';
        }
        
        console.log('📱 Menú móvil:', isMenuOpen ? 'Abierto' : 'Cerrado');
    });
    
    // Cerrar menú al hacer click en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const page = link.getAttribute('data-page');
            
            // Agregar feedback visual de click
            link.style.animation = 'none';
            void link.offsetWidth; // Force reflow
            
            // Actualizar indicador activo inmediatamente
            highlightCurrentPage(page);
            
            // Cerrar menú con pequeño delay para feedback visual
            setTimeout(() => {
                if (isMenuOpen) {
                    isMenuOpen = false;
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    hamburgerIcon.textContent = 'menu';
                    console.log('📱 Menú cerrado después de click en:', page);
                }
            }, 100);
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (isMenuOpen && 
            !mobileMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            isMenuOpen = false;
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            hamburgerIcon.textContent = 'menu';
            console.log('📱 Menú cerrado (click externo)');
        }
    });
    
    // Cerrar menú con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            isMenuOpen = false;
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            hamburgerIcon.textContent = 'menu';
            console.log('📱 Menú cerrado (tecla ESC)');
        }
    });
    
    console.log('✅ Mobile Menu inicializado correctamente con indicador dinámico');
}

// Cargar navbar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
    loadNavbar();
}
