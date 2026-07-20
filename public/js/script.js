/* ===================================
   HERO CAROUSEL FUNCTIONALITY
   =================================== */

class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.carousel-indicator');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        // Usar valores de CONFIG o defaults si no está disponible
        const config = window.CONFIG || { carousel: {} };
        this.autoPlayDelay = (config?.carousel?.autoPlayDelay) || 5000;
        this.transitionDuration = (config?.carousel?.transitionDuration) || 1000;

        this.init();
    }

    init() {
        // Verificar que existan elementos del carrusel
        if (this.slides.length === 0 || this.indicators.length === 0) {
            console.log('⚠️  HeroCarousel: No se encontraron elementos del carrusel en esta página');
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
        heroCarousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        heroCarousel.addEventListener('mouseleave', () => this.startAutoPlay());
        heroCarousel.addEventListener('touchstart', () => this.stopAutoPlay());
        heroCarousel.addEventListener('touchend', () => this.startAutoPlay());

        // Navegación por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        console.log('✅ HeroCarousel inicializado');
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
}

/* ===================================
   SPONSORS CAROUSEL FUNCTIONALITY
   =================================== */

class SponsorsCarousel {
    constructor() {
        this.carousel = document.getElementById('sponsorsCarousel');
        this.wrapper = document.querySelector('.sponsors-wrapper');
        this.autoScrollInterval = null;
        this.scrollSpeed = 1.5; // píxeles por frame
        this.isHovering = false;
        this.singleSetWidth = 0; // Ancho total de un conjunto de items
        this.totalSets = 10; // Duplicar más veces para efecto infinito perfecto

        this.init();
    }

    init() {
        if (!this.carousel) return;

        // Generar items dinámicamente desde PARTNERS_DATA
        this.renderPartners();

        // Calcular ancho de un conjunto después de renderizar
        setTimeout(() => {
            this.calculateSingleSetWidth();
            // Posicionar al inicio para loop infinito
            this.carousel.scrollLeft = 0;
            
            if (this.singleSetWidth > 0) {
                this.startAutoScroll();
            } else {
                console.warn('⚠️ SponsorsCarousel: No se pudo calcular el ancho del conjunto');
            }
        }, 100);

        // Escuchar eventos de hover
        this.wrapper.addEventListener('mouseenter', () => {
            this.isHovering = true;
            this.stopAutoScroll();
        });

        this.wrapper.addEventListener('mouseleave', () => {
            this.isHovering = false;
            this.startAutoScroll();
        });

        // Agregar soporte para mobile (touch)
        this.wrapper.addEventListener('touchstart', () => {
            this.isHovering = true;
            this.stopAutoScroll();
        });

        this.wrapper.addEventListener('touchend', () => {
            this.isHovering = false;
            setTimeout(() => this.startAutoScroll(), 500);
        });

        console.log('✅ SponsorsCarousel inicializado con', PARTNERS_DATA.length, 'socios - Infinito');
    }

    renderPartners() {
        // Limpiar carousel
        this.carousel.innerHTML = '';

        // Duplicar items múltiples veces para crear efecto infinito perfecto
        for (let i = 0; i < this.totalSets; i++) {
            PARTNERS_DATA.forEach(partner => {
                this.carousel.appendChild(this.createPartnerItem(partner));
            });
        }
    }

    calculateSingleSetWidth() {
        // Calcular el ancho total de UN conjunto de items
        const firstItem = this.carousel.querySelector('.sponsor-item');
        if (!firstItem) {
            console.warn('⚠️ No se encontraron items en el carrusel');
            return;
        }
        
        const itemWidth = firstItem.offsetWidth + 24; // item width + gap
        this.singleSetWidth = itemWidth * PARTNERS_DATA.length;
        
        console.log('📏 Ancho de conjunto calculado:', this.singleSetWidth, 'px');
    }

    createPartnerItem(partner) {
        const div = document.createElement('div');
        div.className = 'sponsor-item';
        div.title = partner.name;
        
        // Crear elemento de imagen
        const img = document.createElement('img');
        img.src = partner.logo;
        img.alt = partner.name;

        // Agregar interactividad
        div.addEventListener('click', () => {
            window.location.href = 'socios.html';
        });

        div.appendChild(img);
        return div;
    }

    startAutoScroll() {
        // Evitar múltiples intervalos activos
        if (this.autoScrollInterval !== null) {
            return;
        }

        // Validar que el carrusel está listo
        if (!this.carousel || !this.singleSetWidth || this.singleSetWidth <= 0) {
            console.warn('⚠️ SponsorsCarousel no está listo para iniciar auto-scroll');
            return;
        }

        this.autoScrollInterval = setInterval(() => {
            if (!this.isHovering && this.carousel && this.singleSetWidth > 0) {
                this.carousel.scrollLeft += this.scrollSpeed;

                // Reinicio infinito suave
                // Cuando se llega a la mitad del recorrido, reiniciar sin que se note
                const midPoint = this.singleSetWidth * (this.totalSets / 2);
                
                if (this.carousel.scrollLeft >= midPoint) {
                    // Saltar sin transición a un punto similar al inicio
                    this.carousel.scrollLeft = this.singleSetWidth * 2;
                }
            }
        }, 30);

        console.log('▶️ Auto-scroll infinito iniciado');
    }

    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
    }
}

/* ===================================
   MOBILE MENU TOGGLE
   =================================== */

class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('menu-toggle');
        this.mobileMenu = document.getElementById('mobile-menu');

        // Guard: validar que elementos existan
        if (!this.menuToggle || !this.mobileMenu) {
            console.warn('⚠️ MobileMenu: No se encontraron elementos #menu-toggle o #mobile-menu');
            return;
        }

        this.init();
    }

    init() {
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

        console.log('✅ MobileMenu inicializado correctamente');
    }

    toggleMenu() {
        const isHidden = this.mobileMenu.style.display === 'none' || !this.mobileMenu.style.display;
        this.mobileMenu.style.display = isHidden ? 'flex' : 'none';
        this.mobileMenu.classList.toggle('active');
        this.menuToggle.classList.toggle('active');
        console.log('📱 Menú toggle:', isHidden ? 'ABIERTO' : 'CERRADO');
    }

    closeMenu() {
        this.mobileMenu.style.display = 'none';
        this.mobileMenu.classList.remove('active');
        this.menuToggle.classList.remove('active');
        console.log('📱 Menú cerrado');
    }
}

/* ===================================
   SMOOTH SCROLL PARA LINKS
   =================================== */

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href !== '#' && href !== '#0') {
                    // Check if it's an external URL
                    if (href.startsWith('http://') || href.startsWith('https://')) {
                        // Allow default behavior for external links
                        return;
                    }
                    
                    // Handle internal anchor links
                    e.preventDefault();
                    
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80; // Account for sticky header
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        console.log('✅ SmoothScroll inicializado');
    }
}

/* ===================================
   INTERSECTION OBSERVER PARA ANIMACIONES
   =================================== */

class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar elementos con clase 'animate-on-scroll'
        const animatableElements = document.querySelectorAll('.news-card, .data-card');
        animatableElements.forEach(element => {
            observer.observe(element);
        });

        console.log('✅ ScrollAnimations inicializado');
    }
}

/* ===================================
   MODAL DE DETALLES DE EVENTOS
   =================================== */

class EventModal {
    constructor() {
        this.modal = document.getElementById('eventModal');
        this.registerButtons = document.querySelectorAll('.register-btn');
        this.closeButtons = document.querySelectorAll('#closeModal, #closeModalBtn');
        this.init();
    }

    init() {
        if (!this.modal) return;

        // Listeners para abrir modal
        this.registerButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal(btn);
            });
            
            // También permitir enter/space en móvil
            btn.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openModal(btn);
                }
            });
        });

        // Listeners para cerrar modal
        this.closeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        // Cerrar al hacer click fuera del modal
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.closeModal();
            }
        });

        console.log('✅ EventModal inicializado');
    }

    openModal(button) {
        // Obtener datos del botón
        const data = {
            title: button.dataset.title || 'Evento',
            date: button.dataset.date || 'Fecha por confirmar',
            location: button.dataset.location || 'Ubicación',
            mode: button.dataset.mode || 'Presencial',
            icon: button.dataset.icon || 'event',
            category: button.dataset.category || 'General',
            price: button.dataset.price || 'Consultar',
            capacity: button.dataset.capacity || 'Limitada',
            duration: button.dataset.duration || '2 horas',
            availability: button.dataset.availability || 'Disponible'
        };

        // Poblar modal con datos
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalDate').textContent = data.date;
        document.getElementById('modalLocation').textContent = data.location;
        document.getElementById('modalMode').textContent = data.mode;
        document.getElementById('modalIcon').textContent = data.icon;
        document.getElementById('modalCategory').textContent = data.category;
        document.getElementById('modalPrice').textContent = data.price;
        document.getElementById('modalCapacity').textContent = data.capacity;
        document.getElementById('modalDuration').textContent = data.duration;
        document.getElementById('modalAvailability').textContent = data.availability;

        // Actualizar icono del modo
        const modeIcon = document.getElementById('modalModeIcon');
        if (data.mode === 'Virtual' || data.mode === 'En Línea') {
            modeIcon.textContent = 'videocam';
        } else if (data.mode === 'Híbrido') {
            modeIcon.textContent = 'public';
        } else {
            modeIcon.textContent = 'location_on';
        }

        // Agregar descripción personalizada
        const descriptions = {
            'Cumbre Anual de Liderazgo 2024': 'Únete a los principales CEOs de México para explorar a fondo el futuro del comercio transfronterizo y los desafíos regulatorios actuales.',
            'Innovación en Cadena de Suministro': 'Explorando la integración de IA en logística regional y centros de manufactura en el corredor norte. Descubre cómo la tecnología está transformando el sector.',
            'Taller de Política Fiscal 2025': 'Sesión técnica para CFOs sobre cambios regulatorios y estrategias de optimización fiscal. Aprende de los expertos en derecho tributario.',
            'Expo de Negocios: Norte': 'Conectando proveedores locales con corporaciones multinacionales a través de nuestra plataforma de matchmaking propietaria.',
            'Tendencias Económicas 2025': 'Análisis de expertos sobre el panorama económico mexicano, oportunidades de inversión y perspectivas para el próximo año.'
        };

        const description = descriptions[data.title] || 'Evento empresarial de COPARMEX.';
        document.getElementById('modalDescription').textContent = description;

        // Mostrar modal
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Scroll al modal
        this.modal.scrollIntoView({ behavior: 'smooth', block: 'center' });

        console.log('📋 Modal abierto para:', data.title);
    }

    closeModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        console.log('✖️ Modal cerrado');
    }
}

/* ===================================
   EVENTOS - FILTROS Y BÚSQUEDA
   =================================== */

class EventsFilter {
    constructor() {
        this.searchInput = document.querySelector('input[placeholder*="Busca"]');
        this.filterButtons = document.querySelectorAll('.bg-gray-100, .bg-blue-700');
        this.eventCards = document.querySelectorAll('.events-card');
        this.init();
    }

    init() {
        if (!this.searchInput) return;

        // Event listener para búsqueda
        this.searchInput.addEventListener('input', (e) => {
            this.filterEvents(e.target.value.toLowerCase());
        });

        // Event listeners para botones de filtro
        document.querySelectorAll('button').forEach(btn => {
            if (btn.textContent.includes('Categorías') || 
                btn.textContent.includes('Este Mes') || 
                btn.textContent.includes('Virtual')) {
                btn.addEventListener('click', () => this.handleFilterClick(btn));
            }
        });

        console.log('✅ EventsFilter inicializado');
    }

    filterEvents(searchTerm) {
        this.eventCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
            
            card.style.display = isVisible ? '' : 'none';
            card.style.animation = isVisible ? 'fadeIn 0.3s ease' : '';
        });
    }

    handleFilterClick(btn) {
        // Remover estado activo de otros botones
        document.querySelectorAll('.bg-blue-700').forEach(b => {
            if (b !== btn) {
                b.classList.remove('bg-blue-700');
                b.classList.add('bg-gray-100');
                b.classList.remove('text-white');
                b.classList.add('text-gray-700');
            }
        });

        // Toggle en el botón clickeado
        btn.classList.toggle('bg-blue-700');
        btn.classList.toggle('bg-gray-100');
        btn.classList.toggle('text-white');
        btn.classList.toggle('text-gray-700');
    }
}

/* ===================================
   DATOS DE SOCIOS (PARTNERS)
   =================================== */

const PARTNERS_DATA = [
    {
        id: 'espiral',
        name: 'Espiral',
        logo: 'assets/img/espiral.webp',
        description: 'Soluciones empresariales innovadoras para el desarrollo y crecimiento sostenible.',
        website: null
    },
    {
        id: 'farmacia',
        name: 'Farmacias del Apoyo',
        logo: 'assets/img/farmacia.webp',
        description: 'Empresa líder en distribución y servicios farmacéuticos de calidad.',
        website: null
    },
    {
        id: 'joa',
        name: 'JOA',
        logo: 'assets/img/joa.webp',
        description: 'Proveedor especializado en soluciones de negocio y consultoría empresarial.',
        website: null
    },
    {
        id: 'probox',
        name: 'ProBox',
        logo: 'assets/img/probox.webp',
        description: 'Soluciones logísticas y de almacenamiento para empresas.',
        website: null
    },
    {
        id: 'proicat',
        name: 'PROICAT',
        logo: 'assets/img/proicat.webp',
        description: 'Empresa de innovación y transferencia tecnológica para la industria.',
        website: null
    },
    {
        id: 'textuplas',
        name: 'Textuplas',
        logo: 'assets/img/textuplas.webp',
        description: 'Especialista en productos textiles de alta calidad y durabilidad.',
        website: null
    },
    {
        id: 'upaep',
        name: 'UPAEP',
        logo: 'assets/img/upaep.webp',
        description: 'Universidad Popular Autónoma del Estado de Puebla. Más de 50 años formando líderes transformadores de la sociedad mexicana con excelencia acreditada.',
        website: 'https://www.upaep.mx'
    },
    {
        id: 'prosmet',
        name: 'PROSMET',
        logo: 'assets/img/prosmet.webp',
        description: 'Soluciones metrológicas y de calidad para la industria.',
        website: null
    },
    {
        id: 'radth',
        name: 'RADTH',
        logo: 'assets/img/radth.webp',
        description: 'Empresa especializada en servicios radiológicos y diagnóstico.',
        website: null
    },
    {
        id: 'planet',
        name: 'Planet',
        logo: 'assets/img/planet.webp',
        description: 'Soluciones empresariales para el desarrollo sostenible.',
        website: null
    },
    {
        id: 'jym',
        name: 'J&M',
        logo: 'assets/img/jym.webp',
        description: 'Proveedor integral de soluciones comerciales y de distribución.',
        website: null
    },
    {
        id: 'fit',
        name: 'FIT',
        logo: 'assets/img/fit.webp',
        description: 'Centro de formación en innovación y tecnología para empresas.',
        website: null
    },
    {
        id: 'amaro',
        name: 'Amaro',
        logo: 'assets/img/amaro.webp',
        description: 'Empresa con amplia trayectoria en soluciones empresariales.',
        website: null
    }
];

const FEDERAL_PARTNERS_DATA = [
    {
        id: 'cfe',
        name: 'CFE',
        logo: 'assets/img/CFE.webp',
        description: 'Comisión Federal de Electricidad, proveedor de energía eléctrica a nivel nacional.',
        website: 'https://www.cfe.mx'
    },
    {
        id: 'cargill',
        name: 'Cargill',
        logo: 'assets/img/CargillLogo.svg.webp',
        description: 'Empresa líder global en agricultura, alimentos y servicios relacionados con la gestión de riesgos.',
        website: 'https://www.cargill.com.mx'
    },
    {
        id: 'cruzroja',
        name: 'Cruz Roja Mexicana',
        logo: 'assets/img/cruzroja.webp',
        description: 'Organización humanitaria dedicada a la prestación de servicios de salud, asistencia social y protección civil en México.',
        website: 'https://www.cruzrojamaexicana.org.mx'
    },
    {
        id: 'imss',
        name: 'IMSS',
        logo: 'assets/img/imss.webp',
        description: 'Instituto Mexicano del Seguro Social, dedicado a proteger a la población mexicana.',
        website: 'https://www.imss.gob.mx'
    },
    {
        id: 'pemex',
        name: 'PEMEX',
        logo: 'assets/img/PEMEX.webp',
        description: 'Petróleos Mexicanos, empresa productora de petróleo y gas natural.',
        website: 'https://www.pemex.gob.mx'
    }
];

/* ===================================
   MODAL DE DETALLES DE SOCIOS/PARTNERS
   =================================== */

class PartnerModal {
    constructor() {
        this.modal = document.getElementById('partnerModal');
        this.partnerButtons = document.querySelectorAll('.partner-card-btn');
        this.closeButtons = document.querySelectorAll('#closePartnerModal, #closePartnerModalBtn');
        this.init();
    }

    init() {
        if (!this.modal) return;

        // Listeners para abrir modal
        this.partnerButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const partnerId = btn.dataset.partnerId;
                let partner = PARTNERS_DATA.find(p => p.id === partnerId);
                if (!partner && typeof FEDERAL_PARTNERS_DATA !== 'undefined') {
                    partner = FEDERAL_PARTNERS_DATA.find(p => p.id === partnerId);
                }
                if (partner) {
                    this.openModal(partner);
                }
            });
        });

        // Listeners para cerrar modal
        this.closeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        // Cerrar al hacer click fuera del modal
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.closeModal();
            }
        });

        console.log('✅ PartnerModal inicializado');
    }

    openModal(partner) {
        // Poblar modal con datos
        document.getElementById('partnerModalImage').src = partner.logo;
        document.getElementById('partnerModalImage').alt = partner.name;
        document.getElementById('partnerModalTitle').textContent = partner.name;
        document.getElementById('partnerModalDescription').textContent = partner.description;

        // Mostrar/ocultar botón de sitio web
        const websiteBtn = document.getElementById('partnerWebsiteBtn');
        if (partner.website) {
            websiteBtn.href = partner.website;
            websiteBtn.target = '_blank';
            websiteBtn.classList.remove('hidden');
        } else {
            websiteBtn.classList.add('hidden');
        }

        // Mostrar modal
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        console.log('📋 Modal de socio abierto para:', partner.name);
    }

    closeModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        console.log('✖️ Modal de socio cerrado');
    }
}

/* ===================================
   INICIALIZACIÓN GLOBAL
   =================================== */

const inicializar = () => {
    console.log('🚀 Inicializando COPARMEX...');

    // Inicializar hero carousel
    new HeroCarousel();

    // Inicializar sponsors carousel
    new SponsorsCarousel();

    // Inicializar mobile menu
    new MobileMenu();

    // Inicializar smooth scroll
    new SmoothScroll();

    // Inicializar animaciones de scroll
    new ScrollAnimations();

    // Inicializar modal de eventos si existen botones de registro
    if (document.querySelector('.register-btn')) {
        new EventModal();
    }

    // Inicializar filtros de eventos si existen
    if (document.querySelector('.events-card')) {
        new EventsFilter();
    }

    // Inicializar modal de socios si existen tarjetas de socios
    if (document.querySelector('.partner-card-btn')) {
        new PartnerModal();
    }

    console.log('✅ COPARMEX cargada correctamente');
    console.log('📊 Configuración:', window.CONFIG || {});
};

// Esperar a que CONFIG esté listo y el DOM esté cargado
const iniciarCuandoListo = () => {
    // Asegurar que window.CONFIG esté definido
    if (typeof window.CONFIG === 'undefined') {
        window.CONFIG = { carousel: { autoPlayDelay: 5000, transitionDuration: 1000 } };
    }
    
    if (window.CONFIG && window.CONFIG.carousel) {
        inicializar();
    } else {
        // Si CONFIG aún no está completamente listo, reintentar
        setTimeout(iniciarCuandoListo, 100);
    }
};

document.addEventListener('DOMContentLoaded', iniciarCuandoListo);

// Si CONFIG ya se cargó antes de DOMContentLoaded, iniciar igual
window.addEventListener('configLoaded', () => {
    if (document.readyState === 'loading') {
        // DOM aún carga, esperar a DOMContentLoaded
    } else {
        // DOM ya está listo, iniciar ahora
        if (typeof window.CONFIG === 'undefined') {
            window.CONFIG = { carousel: { autoPlayDelay: 5000, transitionDuration: 1000 } };
        }
        inicializar();
    }
});

/* ===================================
   ERROR HANDLING GLOBAL
   =================================== */

// Manejador de promesas no capturadas
window.addEventListener('unhandledrejection', (event) => {
    // Ignorar errores de listeners asincrónicas de extensiones
    if (event.reason && event.reason.message && 
        event.reason.message.includes('listener') && 
        event.reason.message.includes('closed')) {
        event.preventDefault();
        console.warn('⚠️ Error de listener asincrónica capturada y ignorada');
    }
});

// Manejador de errores global
window.addEventListener('error', (event) => {
    // Prevenir que ciertos errores detengan la aplicación
    if (event.message && event.message.includes('message channel')) {
        event.preventDefault();
        return true;
    }
});
