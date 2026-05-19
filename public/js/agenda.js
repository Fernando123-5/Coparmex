// ========== DATOS DE EVENTOS ==========
const events = [
    {
        id: 1,
        title: 'Cumbre Anual de Liderazgo 2024',
        description: 'Únete a los principales CEOs de México para explorar a fondo el futuro del comercio transfronterizo y los desafíos regulatorios actuales.',
        date: '2024-10-24',
        time: '09:00',
        category: 'Crecimiento Estratégico',
        location: 'Ciudad de México',
        price: '$1,200 MXN',
        image: 'https://lh3.googleusercontent.com/aida/ADBb0uhIpnSnwYMhH58H-EDBv_8JVgwCXLXptalguCWXI-NxSxSm0gPSf3J6pQcV29zBWDAqt2MoinpoFRdr-itNXk0lokcnuAOixPoOwg6UWJauNatjaOmR9kQ9zzlgurJHNQd8Hb7pDxdrbN6iaShDW_6A66p1vSGasuRQqFjj02jrKij3aTh5F8yUXn2oK2Nl41HDs2Me2ubkoL21y_TIctCXul4p7w7IvAfWLnh_HExWL3dhkp2uzMzNJTtQHgb7IGns9lcTAuWb7g',
        featured: true
    },
    {
        id: 2,
        title: 'Innovación en Cadena de Suministro',
        description: 'Explorando la integración de IA en logística regional y centros de manufactura en el corredor norte.',
        date: '2024-11-02',
        time: '14:00',
        category: 'Networking',
        location: 'Virtual',
        price: 'Gratis para Miembros',
        image: '',
        featured: false
    },
    {
        id: 3,
        title: 'Taller de Política Fiscal 2025',
        description: 'Sesión técnica para CFOs sobre cambios regulatorios y estrategias de optimización fiscal.',
        date: '2024-11-15',
        time: '10:00',
        category: 'Legal y Fiscal',
        location: 'Guadalajara',
        price: '$800 MXN',
        image: '',
        featured: false
    },
    {
        id: 4,
        title: 'Expo de Negocios: Norte',
        description: 'Conectando proveedores locales con corporaciones multinacionales a través de nuestra plataforma de matchmaking.',
        date: '2024-12-05',
        time: '08:00',
        category: 'Expo B2B',
        location: 'Monterrey',
        price: '$450 MXN',
        image: '',
        featured: false
    },
    {
        id: 5,
        title: 'Tendencias Económicas 2025',
        description: 'Análisis de expertos sobre el panorama económico mexicano y oportunidades de inversión.',
        date: '2024-12-18',
        time: '16:00',
        category: 'Conferencia',
        location: 'Híbrido',
        price: 'Gratis',
        image: '',
        featured: false
    }
];

// ========== ESTADO GLOBAL ==========
let currentView = 'calendar';
let currentMonth = new Date();
let selectedFilters = { period: 'all', categories: [] };
let currentEvent = null;

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
    initUI();
    renderCalendar();
    renderCategories();
    setupEventListeners();
    console.log('✅ Agenda iniciada');
});

// ========== SETUP ==========
function initUI() {
    updateEventCount();
}

function setupEventListeners() {
    // View toggle
    document.getElementById('viewCalendar').addEventListener('click', switchToCalendar);
    document.getElementById('viewList').addEventListener('click', switchToList);

    // Period filters
    document.querySelectorAll('[data-filter="all"], [data-filter="today"], [data-filter="week"], [data-filter="month"]')
        .forEach(btn => btn.addEventListener('click', (e) => filterByPeriod(e.target.dataset.filter)));

    // Calendar navigation
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentMonth.setMonth(currentMonth.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentMonth.setMonth(currentMonth.getMonth() + 1);
        renderCalendar();
    });

    // Mobile menu
    document.getElementById('menu-toggle')?.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Modal
    document.getElementById('eventModal').addEventListener('click', (e) => {
        if (e.target.id === 'eventModal') closeModal();
    });
}

// ========== FILTROS ==========
function renderCategories() {
    const categories = [...new Set(events.map(e => e.category))];
    const container = document.getElementById('categoryFilters');
    
    container.innerHTML = categories.map(cat => 
        `<button class="filter-btn" data-category="${cat}" onclick="filterByCategory('${cat}')">${cat}</button>`
    ).join('');
}

function filterByPeriod(period) {
    selectedFilters.period = period;
    document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    applyFilters();
}

function filterByCategory(category) {
    const btn = event.target;
    if (selectedFilters.categories.includes(category)) {
        selectedFilters.categories = selectedFilters.categories.filter(c => c !== category);
        btn.classList.remove('active');
    } else {
        selectedFilters.categories.push(category);
        btn.classList.add('active');
    }
    applyFilters();
}

function applyFilters() {
    let filtered = events;

    // Filtro por período
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        
        if (selectedFilters.period === 'today') return eventDate.toDateString() === today.toDateString();
        if (selectedFilters.period === 'week') return eventDate >= today && eventDate <= weekEnd;
        if (selectedFilters.period === 'month') return eventDate >= today && eventDate <= monthEnd;
        return true;
    });

    // Filtro por categoría
    if (selectedFilters.categories.length > 0) {
        filtered = filtered.filter(event => selectedFilters.categories.includes(event.category));
    }

    updateEventCount(filtered.length);
    if (currentView === 'list') renderList(filtered);
    else renderCalendar();
}

// ========== VISTAS ==========
function switchToCalendar() {
    currentView = 'calendar';
    document.getElementById('calendarView').classList.remove('hidden');
    document.getElementById('listView').classList.add('hidden');
    document.getElementById('viewCalendar').classList.add('active');
    document.getElementById('viewList').classList.remove('active');
    renderCalendar();
}

function switchToList() {
    currentView = 'list';
    document.getElementById('calendarView').classList.add('hidden');
    document.getElementById('listView').classList.remove('hidden');
    document.getElementById('viewCalendar').classList.remove('active');
    document.getElementById('viewList').classList.add('active');
    renderList();
}

// ========== CALENDARIO ==========
function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const monthYear = document.getElementById('monthYear');
    
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    monthYear.textContent = new Intl.DateTimeFormat('es-MX', { month: 'long', year: 'numeric' }).format(firstDay);

    grid.innerHTML = '';

    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const day = new Date(year, month, -i).getDate();
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = day;
        grid.appendChild(dayElement);
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
        const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = events.filter(e => e.date === date);
        const today = new Date();
        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

        const dayElement = document.createElement('div');
        dayElement.className = `calendar-day ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`;
        dayElement.innerHTML = `<div>${day}</div>`;

        if (dayEvents.length > 0) {
            dayElement.addEventListener('click', () => {
                if (dayEvents.length === 1) openModal(dayEvents[0]);
            });
            dayElement.style.cursor = 'pointer';
        }

        grid.appendChild(dayElement);
    }

    // Días del mes siguiente
    const remainingDays = 42 - (startingDayOfWeek + daysInMonth);
    for (let day = 1; day <= remainingDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = day;
        grid.appendChild(dayElement);
    }
}

// ========== LISTA ==========
function renderList(filteredEvents = null) {
    const container = document.getElementById('eventList');
    const sorted = (filteredEvents || events).sort((a, b) => new Date(a.date) - new Date(b.date));

    if (sorted.length === 0) {
        container.innerHTML = '';
        document.getElementById('emptyState').classList.remove('hidden');
        return;
    }

    document.getElementById('emptyState').classList.add('hidden');
    container.innerHTML = sorted.map(event => {
        const date = new Date(event.date);
        const day = date.getDate();
        const month = date.toLocaleString('es-MX', { month: 'short' }).toUpperCase();
        const year = date.getFullYear();

        return `
            <div class="event-item ${event.featured ? 'featured' : ''}" onclick="openModal(${event.id})">
                <div class="event-date-box">
                    <div class="month">${month}</div>
                    <div class="day">${day}</div>
                    <div class="year">${year}</div>
                </div>
                <div>
                    <h3 class="font-semibold mb-1">${event.title}</h3>
                    <p class="text-sm text-gray-600 mb-2">${event.description}</p>
                    <div class="event-meta">
                        <span class="text-xs text-gray-500 flex items-center gap-1">
                            <span class="material-icons" style="font-size: 0.875rem;">schedule</span>
                            ${event.time}
                        </span>
                        <span class="text-xs text-gray-500 flex items-center gap-1">
                            <span class="material-icons" style="font-size: 0.875rem;">location_on</span>
                            ${event.location}
                        </span>
                        <span class="event-badge" style="background: ${getCategoryColor(event.category)}; color: white;">
                            ${event.category}
                        </span>
                        ${event.featured ? '<span class="event-badge featured">Destacado</span>' : ''}
                    </div>
                </div>
                <div class="text-right">
                    <div class="font-semibold" style="color: var(--primary);">${event.price}</div>
                </div>
            </div>
        `;
    }).join('');
}

// ========== MODAL ==========
function openModal(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    currentEvent = event;
    const date = new Date(event.date);
    
    document.getElementById('modalTitle').textContent = event.title;
    document.getElementById('modalDate').textContent = date.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('modalTime').textContent = event.time;
    document.getElementById('modalCategory').textContent = event.category;
    document.getElementById('modalPrice').textContent = event.price;
    document.getElementById('modalLocation').textContent = event.location;
    document.getElementById('modalDescription').textContent = event.description;
    document.getElementById('googleMapsBtn').onclick = () => openGoogleMaps(event.location);

    document.getElementById('eventModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('eventModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openGoogleMaps(location) {
    const query = encodeURIComponent(location || currentEvent.location);
    window.open(`https://www.google.com/maps/search/${query}`, '_blank');
}

function addToCalendar() {
    if (!currentEvent) return;
    const event = currentEvent;
    const date = new Date(event.date);
    const startTime = date.toISOString().split('T')[0].replace(/-/g, '') + 'T' + event.time.replace(':', '') + '00Z';
    
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//COPARMEX//NONSGML v1.0//EN
BEGIN:VEVENT
DTSTART:${startTime}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
UID:${event.id}@coparmex.mx
DTSTAMP:${new Date().toISOString().split('.')[0]}Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evento-${event.id}.ics`;
    a.click();
    window.URL.revokeObjectURL(url);
    console.log('📅 Evento agregado:', event.title);
}

// ========== UTILIDADES ==========
function updateEventCount(count = events.length) {
    document.getElementById('eventCount').textContent = count;
}

function getCategoryColor(category) {
    const colors = {
        'Crecimiento Estratégico': '#0066ff',
        'Networking': '#10b981',
        'Legal y Fiscal': '#f59e0b',
        'Expo B2B': '#8b5cf6',
        'Conferencia': '#ef4444'
    };
    return colors[category] || '#0066ff';
}
