# 📚 Documentación del Sistema de Estilos CSS Modularizado - COPARMEX

## 📋 Estructura de Archivos

```
css/
├── main.css                    # Punto de entrada (importa todos los archivos)
├── variables.css              # Tokens de diseño y variables CSS
├── base.css                   # Estilos globales y reset
├── layout.css                 # Header, footer, contenedor principal
├── components.css             # Componentes reutilizables
├── sections.css               # Estilos de secciones específicas
├── animations.css             # Animaciones y transiciones
├── responsive.css             # Media queries optimizadas
└── utilities.css              # Clases auxiliares y utilitarias
```

## 🎨 Sistema de Diseño

### Colores Primarios
- `--color-primary`: #00346f (Azul principal)
- `--color-primary-dark`: #004a99
- `--color-primary-light`: #abc7ff
- `--color-secondary`: #006e1c (Verde)

### Espaciado
- `--spacing-gutter`: 24px (Padding horizontal)
- `--spacing-section-vertical`: 80px (Padding vertical secciones)
- `--spacing-component`: 24px (Gap entre componentes)

### Tipografía
- Display: Manrope (encabezados)
- Base: Inter (cuerpo de texto)
- Sizes: xs (12px) → 3xl (48px) con clamp()

### Bordes Redondeados
- `--radius-default`: 0.25rem (Botones, cards)
- `--radius-lg`: 0.5rem (Containers)
- `--radius-full`: 9999px (Píldoras, círculos)

### Transiciones
- `--transition-fast`: 0.2s ease
- `--transition-default`: 0.3s ease
- `--transition-slow`: 0.5s ease

## 📱 Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1023px
- **Desktop**: ≥ 1024px
- **Large**: ≥ 1280px

## 🧩 Componentes Principales

### Botones
```html
<button class="btn btn-primary">Primario</button>
<button class="btn btn-secondary">Secundario</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-lg">Grande</button>
<button class="btn btn-sm">Pequeño</button>
```

### Tarjetas
```html
<!-- Tarjeta de Noticia -->
<div class="news-card">
    <div class="news-card-image"><img src="..."></div>
    <div class="news-card-content">
        <span class="news-card-badge">Etiqueta</span>
        <h3 class="news-card-title">Título</h3>
        <p class="news-card-description">Descripción</p>
        <span class="news-card-meta">Meta info</span>
    </div>
</div>

<!-- Tarjeta de Datos -->
<div class="data-card">
    <div class="data-card-icon">📊</div>
    <div class="data-card-value">1000+</div>
    <div class="data-card-label">Label</div>
</div>

<!-- Tarjeta de Socio -->
<div class="partner-card">
    <div class="partner-image-container">
        <img src="..." alt="">
    </div>
    <div class="partner-content">
        <h4 class="partner-name">Nombre</h4>
        <p class="partner-description">Descripción</p>
    </div>
</div>
```

## 🎬 Animaciones

- `fadeInUp`: Entra de abajo hacia arriba
- `fadeIn`: Desvanecimiento simple
- `slideInRight/Left`: Desliza desde lado
- `scaleIn`: Aparece con escala
- Delays escalonados en `.partner-card:nth-child(n)`

## ♿ Accesibilidad

- `:focus-visible` en todos los botones y enlaces
- `prefers-reduced-motion` respetado
- Contraste de colores WCAG AA
- Navegación por teclado completa
- Safe area insets para notches (iPhone X+)

## 🚀 Optimizaciones de Rendimiento

- `will-change` aplicado solo durante interacción
- `transform: translateZ(0)` para acelerar GPU
- Media queries evitan overflow horizontal
- `aspect-ratio` previene layout shift
- `object-fit` controla escalado de imágenes
- Animaciones GPU-accelerated

## 📐 Mejoras en Responsive

✅ Tipografía con `clamp()` fluida
✅ Grids con `auto-fit` y `minmax()`
✅ Flexbox con `flex-wrap`
✅ Alturas mínimas vs. fijas
✅ Padding escalable en móviles
✅ Touch targets ≥ 44px de altura
✅ Carrusel horizontal sin desbordamiento
✅ Imágenes escalables con `aspect-ratio`

## 🔧 Mantenimiento

### Cómo Agregar Nuevos Estilos

1. **Variables de diseño** → `variables.css`
2. **Estilos globales** → `base.css`
3. **Estructuras grandes** → `layout.css`
4. **Componentes reutilizables** → `components.css`
5. **Secciones específicas** → `sections.css`
6. **Animaciones** → `animations.css`
7. **Clases auxiliares** → `utilities.css`

### Orden de Especificidad

1. Variables CSS (especificidad: 0)
2. Elementos base (especificidad: 1)
3. Clases (especificidad: 10)
4. Combinaciones (especificidad: 20+)
5. Inline styles (especificidad: 1000)

### Validación

```bash
# Validar CSS
npx stylelint 'css/**/*.css'

# Validar responsive
npm run test:responsive

# Validar accesibilidad
npm run test:a11y
```

## 📝 Cambios Principales de Refactorización

### ❌ Eliminado

- ~~`* { transition: ... }` global~~ (Causaba lag)
- ~~Selectores frágiles de Tailwind~~ `.bg-white.p-8.rounded-lg`
- ~~Dark mode~~
- ~~Alturas fijas~~ (500px → `clamp()`)
- ~~Estilos globales en botones~~
- ~~Hover effects sin will-change~~

### ✅ Agregado

- Clases semánticas: `.btn-primary`, `.news-card`, `.data-card`
- Variables CSS centralizadas
- Responsive con `clamp()` y `aspect-ratio`
- Animaciones optimizadas con GPU
- Focus states accesibles
- Grid system flexible
- Utilidades composables
- Media queries por breakpoint
- Documentación inline

## 🎯 Compatibilidad

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14.5+
- ✅ Android Chrome 90+

## 📞 Soporte

Para preguntas o mejoras del sistema de estilos:
1. Revisar esta documentación
2. Buscar en archivos CSS por comentarios
3. Consultar `variables.css` para tokens disponibles
4. Seguir la estructura de componentes existentes

---

**Última actualización**: Mayo 2026
**Versión**: 2.0 (Modularizado)
**Estado**: ✅ Producción
