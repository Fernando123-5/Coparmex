# 📝 Guía de Contribución - COPARMEX

Gracias por tu interés en contribuir a COPARMEX. Esta guía te ayudará a mantener la calidad y consistencia del código.

## 🎯 Principios del Proyecto

- **Simplicidad**: Sin dependencias pesadas
- **Rendimiento**: Animaciones CSS, lazy loading
- **Accesibilidad**: WCAG AA como mínimo
- **Escalabilidad**: Preparado para backend futuro
- **Mantenibilidad**: Código limpio y bien documentado

## 🚀 Primeros Pasos

### 1. Clonar el Repositorio
```bash
git clone https://github.com/coparmex/website.git
cd Coparmex
```

### 2. Instalar Dependencias (opcional)
```bash
npm install
```

### 3. Ejecutar el Servidor Local
```bash
npm start
# O manualmente:
python -m http.server 8000
```

Accede a: `http://localhost:8000/src/index.html`

## 📋 Estándares de Código

### HTML
```html
<!-- ✅ Bueno -->
<button id="submitBtn" class="btn btn-primary" aria-label="Enviar formulario">
    Enviar
</button>

<!-- ❌ Malo -->
<button onclick="submit()">
    Enviar
</button>
```

### CSS
```css
/* ✅ Bueno */
.btn-primary {
    background-color: var(--color-primary);
    padding: 1rem;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background-color: var(--color-primary-dark);
}

/* ❌ Malo */
.btn { color: blue; }
.btn:hover { color: darkblue; }
```

### JavaScript
```javascript
// ✅ Bueno
class MyComponent {
    constructor() {
        this.element = document.getElementById('my-element');
        this.init();
    }

    init() {
        if (!this.element) return;
        this.element.addEventListener('click', () => this.handleClick());
    }

    handleClick() {
        Utils.log('Click detectado', 'debug');
    }
}

// ❌ Malo
function MyComponent() {
    document.getElementById('my-element').onclick = function() {
        console.log('clicked');
    };
}
```

## 🎨 Estructura de Commits

```bash
# Formato: tipo: descripción

git commit -m "feat: agregar componente de formulario"
git commit -m "fix: corregir bug en carrusel móvil"
git commit -m "docs: actualizar README"
git commit -m "style: formatear código en main.js"
```

Tipos válidos:
- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Formato de código
- `refactor`: Reorganización sin cambios funcionales
- `perf`: Mejora de rendimiento
- `test`: Agregación de tests

## ✅ Checklist Antes de Hacer Push

- [ ] El código sigue los estándares establecidos
- [ ] Sin console.log() en producción
- [ ] Comentarios documentando lógica compleja
- [ ] Sin console errors
- [ ] Testeo en móvil (F12 → Device Toggle)
- [ ] Testeo en navegadores principales
- [ ] Documentación actualizada si es necesario

## 🔍 Revisión de Código

Al crear un Pull Request:

1. **Descripción Clara**: Explica qué cambia y por qué
2. **Tests**: Incluye evidencia de que funciona
3. **Screenshots**: Para cambios visuales
4. **Documentación**: Actualiza docs/ si es necesario

Ejemplo de PR:
```
## Descripción
Mejora del rendimiento del carrusel hero agregando debounce a eventos de resize.

## Cambios
- Agregado debounce a resize event
- Reducido de 100ms a 300ms el delay de recalculación

## Testing
- Probado en Chrome, Firefox, Safari
- Comportamiento consistente en todos los navegadores

## Screenshots
[Antes] [Después]
```

## 🐛 Reporte de Bugs

Incluye:
1. Navegador y versión
2. Pasos para reproducir
3. Comportamiento actual vs. esperado
4. Screenshot o video si es relevante

Ejemplo:
```
**Navegador**: Chrome 120
**Pasos**:
1. Abrir en dispositivo móvil
2. Hacer click en menú hamburguesa
3. Resultado: Menú se abre pero no se cierra

**Esperado**: Menú debe cerrarse al hacer click fuera
```

## 📚 Documentación

### Comentarios en el Código
```javascript
/**
 * Descripción de qué hace la función
 * @param {type} paramName - Descripción del parámetro
 * @returns {type} Descripción del retorno
 */
function myFunction(paramName) {
    // Comentario para lógica compleja
}
```

### Archivo README.md
Mantén actualizado:
- Instrucciones de instalación
- Cómo ejecutar el proyecto
- Estructura básica
- Créditos

## 🎓 Mejores Prácticas

### 1. Performance
```javascript
// ✅ Bueno: Usa debounce para eventos frecuentes
window.addEventListener('resize', Utils.debounce(() => {
    // Recalcular layout
}, 300));

// ❌ Malo: Ejecuta en cada evento
window.addEventListener('resize', () => {
    // Recalcular layout
});
```

### 2. Accesibilidad
```html
<!-- ✅ Bueno -->
<button aria-label="Cerrar menú" id="closeMenu">×</button>

<!-- ❌ Malo -->
<button onclick="close()">×</button>
```

### 3. Mobile First
```css
/* ✅ Bueno: Mobile primero */
.container {
    padding: 1rem;
}

@media (min-width: 768px) {
    .container {
        padding: 2rem;
    }
}

/* ❌ Malo: Desktop primero */
.container {
    padding: 2rem;
}

@media (max-width: 768px) {
    .container {
        padding: 1rem;
    }
}
```

### 4. Evitar Variables Globales
```javascript
// ✅ Bueno: Encapsulado
class MyComponent {
    constructor() {
        this.state = {};
    }
}

// ❌ Malo: Variable global
let globalState = {};
function myFunction() {
    globalState.value = 'test';
}
```

## 🔧 Herramientas Recomendadas

### Editor
- VS Code
- Prettier (formato automático)
- ESLint (análisis estático)

### Extensiones
- EditorConfig
- Lighthouse
- Web Accessibility Checker

## 📞 Soporte

¿Preguntas? Opciones:
1. Abre un Issue en GitHub
2. Revisa la documentación en `/docs`
3. Contacta a: contacto@coparmex.com

## 📜 Licencia

Al contribuir, aceptas que tu código será licenciado bajo MIT.

---

**¡Gracias por contribuir a COPARMEX!** 🙏

Tus mejoras hacen que este proyecto sea mejor para todos.
