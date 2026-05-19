// Cargar footer desde archivo separado
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        const footerHTML = await response.text();
        
        // Insertar footer antes del cierre del body
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    } catch (error) {
        console.error('Error cargando footer:', error);
    }
}

// Cargar footer cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}
