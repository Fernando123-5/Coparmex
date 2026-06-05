# Guía de Configuración - Enlaces Académicos

## Descripción
El archivo `public/js/academic-links-config.js` contiene los URLs de todos los convenios académicos (locales y federales).

## Cómo actualizar los URLs

Abre el archivo `public/js/academic-links-config.js` y reemplaza los `'#'` con los URLs reales de cada institución.

### Formato:
```javascript
const academicLinksConfig = {
    local: {
        'Nombre Institución': 'https://www.ejemplo.com',
    },
    federal: {
        'Nombre Institución': 'https://www.ejemplo.com',
    }
};
```

## Convenios Locales (actualizar)
- **Lolek**: `'#'` → reemplaza con URL real
- **UVP**: `'#'` → reemplaza con URL real
- **UPAEP**: `'#'` → reemplaza con URL real
- **UNID**: `'#'` → reemplaza con URL real
- **Planet English**: `'#'` → reemplaza con URL real

## Convenios Federales (actualizar)
- **ALPES**: `'#'`
- **Anglo**: `'#'`
- **Human**: `'#'`
- **KUEPA**: `'#'`
- **Milenio**: `'#'`
- **PANAM**: `'#'`
- **TECMO**: `'#'`
- **UDLAP**: `'#'`
- **UIC**: `'#'`
- **UIN**: `'#'`
- **ULA**: `'#'`
- **UNITEC**: `'#'`
- **UVM**: `'#'`

## Cambios Realizados en Beneficios

### 1. **Convenios Locales**
   - ✅ Actualización de imágenes en tarjetas (lolek.png, planet.png, unid.png, upaep.png, uvp.png)
   - ✅ Cambio de botón: "Más información" → "Ir al sitio"
   - ✅ Las tarjetas ahora muestran solo: logo y nombre
   - ✅ Enlaces abren en nueva ventana (target="_blank")

### 2. **Convenios Federales (Nueva Sección)**
   - ✅ Agregada sección con 13 instituciones
   - ✅ Imágenes: alpes.png, anglo.png, human.png, kuepa.png, milenio.png, panam.png, tecmo.png, udlap.png, uic.png, uin.png, ula.png, unitec.png, uvm.png
   - ✅ Mismo diseño limpio y moderno como locales
   - ✅ Botón "Ir al sitio" en todas las tarjetas

### 3. **Apartado de Eventos (Nueva Sección)**
   - ✅ Catálogo de eventos pasados (no interactivo)
   - ✅ 6 eventos de ejemplo con iconos
   - ✅ Cada evento muestra: título, descripción y fecha
   - ✅ Diseño tipo revista para referencia

## Nota Importante
Los URLs están vacíos (con valor `'#'`) por defecto. Actualiza el archivo `academic-links-config.js` con las URLs correctas de cada institución para que funcionen los enlaces "Ir al sitio".
