// Configuración de URLs para los convenios académicos
// Reemplaza los '#' con las URLs reales de cada institución

const academicLinksConfig = {
    // Convenios Locales
    local: {
        'Lolek': '#',
        'UVP': '#',
        'UPAEP': '#',
        'UNID': '#',
        'Planet English': '#'
    },
    
    // Convenios Federales
    federal: {
        'ALPES': '#',
        'Anglo': '#',
        'Human': '#',
        'KUEPA': '#',
        'Milenio': '#',
        'PANAM': '#',
        'TECMO': '#',
        'UDLAP': '#',
        'UIC': '#',
        'UIN': '#',
        'ULA': '#',
        'UNITEC': '#',
        'UVM': '#'
    }
};

// Función para actualizar los enlaces de las escuelas
function updateAcademicLinks() {
    // Buscar todos los enlaces de escuelas académicas
    const schoolLinks = document.querySelectorAll('.school-link');
    
    schoolLinks.forEach(link => {
        // Obtener el nombre de la escuela del elemento padre
        const card = link.closest('.academic-school-card');
        const schoolName = card.querySelector('.school-name').textContent.trim();
        
        // Buscar la URL en la configuración
        let schoolUrl = null;
        
        // Buscar en convenios locales
        if (academicLinksConfig.local[schoolName]) {
            schoolUrl = academicLinksConfig.local[schoolName];
        }
        // Buscar en convenios federales
        else if (academicLinksConfig.federal[schoolName]) {
            schoolUrl = academicLinksConfig.federal[schoolName];
        }
        
        // Actualizar el href si encontramos la URL
        if (schoolUrl && schoolUrl !== '#') {
            link.href = schoolUrl;
        }
    });
}

// Ejecutar cuando el documento esté cargado
document.addEventListener('DOMContentLoaded', updateAcademicLinks);
