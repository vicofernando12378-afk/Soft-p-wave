# Plan de Implementación: Rediseño Editorial Premium - SofT(P)Wave

Este documento describe la estrategia de rediseño del portal institucional de la agencia tecnológica **SofT(P)Wave**, inspirándose en la estética limpia, masiva e hiper-profesional de **nogood.io**, integrando las imágenes y logos suministrados por el usuario y configurando la paleta de colores corporativa.

---

## 1. Análisis de la App / Requerimiento Actual

El proyecto consiste en una landing page de presentación comercial y técnica de la agencia de tecnología premium **SofT(P)Wave** (Junio 2026 Stack). Se busca proyectar máxima autoridad técnica, evitar interfaces genéricas ("AI slop") y centrarse exclusivamente en la conversión y la estética editorial.

### Stack Técnico del Proyecto

| Componente | Tecnología | Notas |
| :--- | :--- | :--- |
| **Core** | HTML5 Semántico, Vanilla JavaScript | Sin frameworks SPA (Next.js/React), optimizado para rendimiento directo. |
| **Estilos** | CSS3 Vainilla (Custom Variables) | Estructura modular, diseño adaptativo fluido y animaciones nativas. |
| **Librería de Iconos** | Phosphor Icons (Light) | Iconografía minimalista en modo lineal delgado. |
| **Fuentes** | Google Fonts: Outfit & Plus Jakarta Sans | Contraste de tipografía display e itálica. |

### Componentes y Secciones Principales
- **Navbar:** Cabecera fija y transparente con desenfoque de fondo. Menú minimalista con tracking abierto.
- **Hero Section:** Contenedor de impacto a pantalla completa (100vh). Usará la imagen del circuito Nazca/Inca (`media__1780365723786.jpg`) como fondo de alta fidelidad atenuado por un overlay oscuro, con un bloque de conversión CTA Stitch vertical.
- **Sección Pilares de Infraestructura:** Retícula Bento asimétrica con los módulos de Growth Marketing & GEO, E-commerce Inteligente, WebApps/ERPs de Nicho y AI Labs.
- **Footer Corporativo:** Sección limpia con links legales, copyright y el sello metálico certificado de la marca (`media__1780365723780.jpg`) con un destello cromático animado por CSS.

---

## 2. ¿Por qué hacer este cambio? / Beneficios

Se busca pasar de una landing page convencional con elementos interactivos genéricos (como el simulador de calculadora y playground de chat que no representan a una agencia premium de servicios) a una experiencia editorial inmersiva.

| Problema Actual | Solución Propuesta | Beneficios |
| :--- | :--- | :--- |
| Colores de fondo genéricos y orbes de gradiente estándar. | Paleta Tech Flow con carbono profundo `#0B0B0F` y cian digital `#00D2FF`. | Mayor consistencia con la identidad de marca de los logos adjuntos. |
| Secciones interactivas distractoras (calculadora y formularios complejos). | Presentación comercial directa de alto impacto basada en autoridad y espacio. | Enfoque 100% comercial sin inputs innecesarios que diluyan el mensaje. |
| Estructura Bento simétrica tradicional. | Bento asimétrico con bordes sutiles que reaccionan dinámicamente al hover. | Look premium que emula la disposición asimétrica de NoGood.io. |
| Fondos de sección planos o con ruido básico. | Imagen de fondo Nazca/Inca Cyberpunk integrada en la base con atenuación de legibilidad. | Contexto cultural e identidad tecnológica única. |

---

## 3. Arquitectura Propuesta (File Tree)

Se estructurará el proyecto de manera que las imágenes proporcionadas se organicen en una carpeta `assets` para su uso limpio mediante CSS y HTML:

```
c:\MIS PROYECTOS\SOFTPWAVE\
├── .agents/                    # Directorio de configuración de agentes y herramientas
├── assets/                     # [NUEVO] Carpeta para recursos visuales del proyecto
│   ├── logo-main.jpg           # Logo transparente (media__1780365723581.jpg)
│   ├── logo-neon.jpg           # Isotipo neon cian (media__1780365723584.jpg)
│   ├── logo-badge.jpg          # Sello de certificación circular (media__1780365723780.jpg)
│   ├── hero-bg.jpg             # Imagen de fondo Nazca/Inca (media__1780365723786.jpg)
│   └── logo-card.jpg           # Logo sobre fondo metálico oscuro (media__1780365738662.jpg)
├── index.html                  # [MODIFICAR] Estructura semántica, navbar, bento, footer
├── styles.css                  # [MODIFICAR] Reset, variables de color de NoGood, layout y animaciones
├── app.js                      # [MODIFICAR] Interactividad mínima y animaciones CSS
└── package.json                # Gestión de scripts locales
```

---

## 4. User Review Required (Alertas Críticas)

> [!IMPORTANT]
> **REPARACIÓN DE COMPONENTES INTERACTIVOS**: Se eliminará el componente del simulador de calculadora de aceleración digital y la lógica asociada en `app.js` e `index.html`. Esta acción simplificará el bundle y se alineará estrictamente a la directiva de presentación comercial.

> [!WARNING]
> **COMPATIBILIDAD CON IMÁGENES LOCALES**: La ruta de origen de las imágenes se definirá a nivel relativo (e.g. `./assets/hero-bg.jpg`). Moveremos los archivos temporales proporcionados en el brain al directorio `assets/` local para asegurar que la web cargue correctamente y de forma portátil en tu servidor de desarrollo.

---

## 5. Open Questions

1. **Rutas de Imágenes:** ¿Deseas que creemos la carpeta `assets/` y copiemos allí las imágenes renombradas con nombres limpios (como `hero-bg.jpg`, `logo-badge.jpg`) para que el código quede completamente portátil?
2. **Video de Fondo de Respaldo:** El requerimiento menciona un "Video de Fondo" en el Hero y también que la "imagen hero section sea el fondo por ahora en todas las secciones". ¿Prefieres que usemos la imagen Nazca (`hero-bg.jpg`) con un sutil efecto de escala lenta en bucle por CSS para emular el dinamismo de un video, o tienes un archivo `.mp4` específico que deberíamos configurar?
3. **Efecto de Fondo en el Scroll (Parallax):** ¿Prefieres que la imagen de fondo de las Nazca permanezca fija (`background-attachment: fixed`) mientras el usuario hace scroll, creando una ventana transparente sobre el contenido, o que se desplace naturalmente con el flujo editorial?

---

## 6. Fases de Implementación (Proposed Changes)

### Fase 1: Organización de Recursos (Assets)
- [NEW] Crear directorio [assets](file:///c:/MIS%20PROYECTOS/SOFTPWAVE/assets) si no existe.
- [NEW] Copiar los 5 archivos del brain hacia `c:/MIS PROYECTOS/SOFTPWAVE/assets/` con nombres normalizados.

### Fase 2: Actualización de la Estructura HTML
- [MODIFY] [index.html](file:///c:/MIS%20PROYECTOS/SOFTPWAVE/index.html):
  - Limpiar el logo e incorporar el isotipo/logo transparente del header.
  - Rediseñar el Hero: incorporar slogan "TOP OF THE WAVE", titular, y la estructura de conversión (Stitch vertical CTA con microcopy superior e inferior).
  - Rediseñar la sección de servicios en Bento asimétrico adaptando los contenidos exactos solicitados para los módulos A, B, C y D.
  - Remover la sección de la calculadora de impacto.
  - Rediseñar el Footer: añadir el sello circular animado con destellos cromáticos metálicos.

### Fase 3: Estilización y Ajustes de CSS
- [MODIFY] [styles.css](file:///c:/MIS%20PROYECTOS/SOFTPWAVE/styles.css):
  - Configurar las variables exactas solicitadas de la paleta Tech Flow.
  - Implementar la estética tipográfica editorial de NoGood.io (titulares enormes vs textos mínimos con espaciado amplio).
  - Diseñar el fondo general atenuado con la imagen Nazca y noise sutil.
  - Desarrollar las transiciones de hover del Bento Grid para que solo cambie el borde suavemente a `--accent-cian`.
  - Crear la animación cromática del sello metálico en el footer.

### Fase 4: Limpieza e Interactividad
- [MODIFY] [app.js](file:///c:/MIS%20PROYECTOS/SOFTPWAVE/app.js):
  - Eliminar código obsoleto (calculadora, etc.).
  - Agregar efectos interactivos de paralaje o respuestas de cursor suaves para los Bento Cards.
