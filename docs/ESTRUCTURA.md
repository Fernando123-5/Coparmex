# 📁 Estructura del Proyecto COPARMEX

## Descripción General

Este documento describe la estructura organizada y escalable del proyecto COPARMEX, diseñada para producción y fácil mantenimiento.

## Árbol de Directorios

```
Coparmex/
├── 📂 src/                              # Código fuente
│   ├── 📂 assets/                       # Archivos estáticos
│   │   ├── 📂 images/                  # Imágenes (.jpg, .png, .webp)
│   │   ├── 📂 fonts/                   # Fuentes personalizadas
│   │   └── 📂 icons/                   # Iconos SVG
│   │
│   ├── 📂 styles/                       # Estilos CSS
│   │   ├── main.css                     # Estilos globales
│   │   ├── components.css               # Estilos de componentes
│   │   └── responsive.css               # Media queries y responsive
│   │
│   ├── 📂 js/                           # JavaScript
│   │   ├── main.js                      # Punto de entrada
│   │   │
│   │   ├── 📂 components/               # Componentes reutilizables
│   │   │   ├── carousel.js              # Carrusel hero y navigation
│   │   │   ├── menu.js                  # Menú móvil
│   │   │   └── gallery.js               # Carrusel de sponsors y galerías
│   │   │
│   │   ├── 📂 services/                 # Servicios/Utilidades
│   │   │   ├── api.js                   # Cliente HTTP (preparado para backend)
│   │   │   └── utils.js                 # Funciones utilitarias
│   │   │
│   │   └── 📂 constants/                # Configuración
│   │       └── config.js                # Constantes de la aplicación
│   │
│   └── index.html                       # Punto de entrada HTML
│
├── 📂 public/                           # Archivos estáticos para producción
│   └── (copiar aquí archivos optimizados después de build)
│
├── 📂 docs/                             # Documentación
│   ├── ESTRUCTURA.md                    # Este archivo
│   └── GUIA_CONTRIBUCION.md             # Guía para colaboradores
│
├── 📄 README.md                         # Documentación principal
├── 📄 package.json                      # Dependencias y scripts
├── 📄 .gitignore                        # Archivos ignorados por Git
├── 📄 .env.example                      # Variables de entorno (plantilla)
├── 📄 config.json                       # Configuración del sitio
└── 📄 index.html                        # Acceso directo (legacy)
```

## Descripción de Carpetas

### `/src` - Código Fuente
Contiene todo el código fuente del proyecto, organizado por tipo.

#### `/src/assets` - Archivos Estáticos
- **images/**: Imágenes del sitio (optimizadas para web)
  - Hero banners
  - Logos de sponsors
  - Imágenes de artículos
  
- **fonts/**: Fuentes personalizadas
  - Public Sans (ya incluida vía CDN)
  - Fuentes adicionales si es necesario
  
- **icons/**: Iconos SVG
  - Favicons
  - Iconos personalizados
  - Logos en formato SVG

#### `/src/styles` - Estilos CSS
- **main.css**: Estilos globales y bases
  - Reset de estilos
  - Estilos de elementos HTML
  - Carrusel hero
  
- **components.css**: Estilos de componentes
  - Carrusel de sponsors
  - Tarjetas de noticias
  - Animaciones
  
- **responsive.css**: Diseño responsivo
  - Media queries
  - Soporte para modo oscuro
  - Estilos de impresión
  - Accesibilidad (prefers-reduced-motion)

#### `/src/js` - JavaScript
Código JavaScript organizado en capas:

**main.js**: Punto de entrada
- Inicialización de componentes
- Setup global
- Error handling

**components/**: Componentes reutilizables
- `carousel.js`: HeroCarousel (control de slides)
- `menu.js`: MobileMenu (menú responsivo)
- `gallery.js`: 
  - SponsorsCarousel (carrusel horizontal)
  - ScrollAnimations (animaciones en scroll)
  - SmoothScroll (navegación suave)
  - LazyLoading (carga diferida de imágenes)

**services/**: Servicios y utilidades
- `api.js`: APIService (cliente HTTP, preparado para backend)
- `utils.js`: Utilidades globales
  - Detectores de capacidades
  - Logging
  - Debounce/Throttle
  - Detección de preferencias

**constants/**: Configuración
- `config.js`: Constantes de la aplicación
  - Delays
  - URLs de API
  - Breakpoints

### `/public` - Producción
Carpeta para archivos optimizados listos para producción:
- HTML minificado
- CSS minificado
- JavaScript minificado
- Imágenes optimizadas (WebP)

### `/docs` - Documentación
- **ESTRUCTURA.md**: Descripción del proyecto (este archivo)
- **GUIA_CONTRIBUCION.md**: Normas de código y contribución

## Flujo de Datos

```
index.html
    ↓
    ├─→ config.js (constantes)
    ├─→ utils.js (utilidades)
    ├─→ api.js (servicios)
    │
    ├─→ carousel.js (HeroCarousel)
    ├─→ menu.js (MobileMenu)
    ├─→ gallery.js (componentes visuales)
    │
    └─→ main.js (inicialización e integración)
```

## Convenciones de Código

### Nombres de Carpetas
- Minúsculas
- Plurales para colecciones
- Ej: `/components`, `/services`, `/constants`

### Nombres de Archivos
- Minúsculas con guiones (kebab-case)
- Ej: `carousel.js`, `api.js`, `config.js`

### Nombres de Clases
- PascalCase
- Ej: `HeroCarousel`, `MobileMenu`, `APIService`

### Variables Globales
- Escasas y prefijadas
- Ej: `CONFIG`, `apiService`, `window.COPARMEX`

## Escalabilidad Futura

### Para Agregar Backend
1. Expandir `/services/api.js` con métodos específicos
2. Crear `/services/auth.js` para autenticación
3. Actualizar `config.js` con URLs de API

### Para Agregar Forms
1. Crear `/components/forms.js`
2. Crear `/js/validators/` para validación
3. Integrar con `api.js` para envío

### Para Agregar Estado Global
1. Crear `/services/store.js` con patrón observable
2. O integrar framework ligero (Alpine.js, htmx, etc.)

### Para Build Process
1. Añadir Webpack/Vite a `package.json`
2. Crear `webpack.config.js` o `vite.config.js`
3. Scripts en `package.json`: `build`, `dev`, `serve`

## Performance

- ✅ CSS modular y específico
- ✅ JS minimalista sin dependencias pesadas
- ✅ Lazy loading de imágenes
- ✅ Animaciones con CSS puro
- ✅ Intersection Observer para scroll events

## Seguridad

- ✅ No datos sensibles en cliente
- ✅ Content Security Policy (añadir en meta tags)
- ✅ Sanitización de inputs (si hay formularios)
- ✅ HTTPS en producción (obligatorio)

## Testing

Para agregar tests:
```bash
# Opción 1: Jest para unit tests
npm install --save-dev jest

# Opción 2: Cypress para E2E tests
npm install --save-dev cypress
```

## Deployment

### Para GitHub Pages
```bash
git push origin main
# Configurar en GitHub: Settings → Pages → main branch
```

### Para Servidor Tradicional
```bash
# Copiar todo a /public y subir al servidor
scp -r public/ user@server:/var/www/coparmex
```

### Con Docker
Crear `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

## SEO

- ✅ Meta tags semánticos
- ✅ Open Graph
- ✅ JSON-LD schema
- ✅ Alt text en imágenes
- ✅ Sitemap.xml
- ✅ Robots.txt

## Accesibilidad

- ✅ ARIA labels
- ✅ Navegación semántica
- ✅ Contraste de colores (WCAG AA)
- ✅ Soporte para prefers-reduced-motion
- ✅ Navegación por teclado

---

**Última actualización:** 23 de Abril de 2026
**Versión:** 1.0.0
