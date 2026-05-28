// Cargar footer desde archivo separado
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        const footerHTML = await response.text();
        
        // Insertar footer antes del cierre del body
        document.body.insertAdjacentHTML('beforeend', footerHTML);
        
        // Inicializar el modal del footer después de que se haya insertado
        initFooterModal();
    } catch (error) {
        console.error('Error cargando footer:', error);
    }
}

// Función para inicializar el modal del footer
function initFooterModal() {
    setTimeout(() => {
        const modal = document.getElementById('footerModal');
        const closeBtn = document.getElementById('footerModalClose');
        const modalTitle = document.getElementById('footerModalTitle');
        const modalBody = document.getElementById('footerModalBody');
        const buttons = document.querySelectorAll('.footer-modal-btn');

        if (!modal || !closeBtn || buttons.length === 0) {
            console.warn('Elementos del modal del footer no encontrados');
            return;
        }

        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const title = this.getAttribute('data-modal-title');
                const content = this.getAttribute('data-modal-content');
                
                modalTitle.textContent = title;
                modalBody.textContent = content;
                modal.style.display = 'block';
            });
        });

        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Cerrar modal con tecla Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });

        console.log('✅ Modal del footer inicializado correctamente');
    }, 100);
}

// Cargar footer cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}
