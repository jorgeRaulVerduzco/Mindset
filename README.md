# 🧠 Mindset - Plataforma de Innovación Inspiradora

Una plataforma web moderna diseñada para compartir frases y conceptos inspiradores sobre **mindset de innovación**. El sitio integra tecnología de IA con Google Gemini para ofrecer una experiencia interactiva y visualmente atractiva.

---

## 📋 Contenido del Proyecto

El proyecto está basado en un libro de 5 secciones sobre innovación:

1. **Antes de Innovar: La Semilla** - Preparando el terreno mental
2. **Encender la Chispa: Ideación y Exploración** - Generando ideas
3. **En Acción: Desarrollo y Validación** - Implementación práctica
4. **Escala y Evolución: Crecimiento** - Expansión del impacto
5. **Innovación Sostenible: El Ciclo** - Mantener la innovación

---

## 🚀 Características Principales

- ✨ **Carrusel de Citas** - Frases inspiradoras de cada sección del libro
- 📊 **Grid Interactivo** - Exploración visual de los 5 pilares de innovación
- 📬 **Newsletter** - Suscripción por email para recibir contenido exclusivo
- 🤖 **Integración con IA (Google Gemini)** - Funcionalidades inteligentes
- 🎬 **Animaciones Fluidas** - Experiencia visual con Motion
- 📱 **Diseño Responsivo** - Optimizado para todos los dispositivos
- 🔄 **Página de Comparación** - Compare diferentes perspectivas de innovación
- ⭐ **Reseñas** - Testimonios de usuarios
- 👤 **Sección de Autor** - Información sobre el creador del contenido

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | 19.0.0 | Framework UI |
| **TypeScript** | ~5.8.2 | Tipado estático |
| **Vite** | 6.2.0 | Build tool y dev server |
| **Tailwind CSS** | 4.1.14 | Estilos y diseño |
| **Motion** | 12.23.24 | Animaciones |
| **Lucide React** | 0.546.0 | Iconos |
| **Google Genai** | 1.29.0 | Integración IA/Gemini |
| **Express** | 4.21.2 | Backend (API) |

---

## 📦 Instalación

### Requisitos Previos
- Node.js (v16 o superior)
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <repo-url>
   cd mindset
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```env
   GEMINI_API_KEY=tu_clave_api_aqui
   ```
   
   Obtén tu clave API en: https://ai.google.dev

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
   
   La aplicación estará disponible en `http://localhost:3000`

---

## 🎯 Scripts Disponibles

```bash
# Inicia el servidor de desarrollo (puerto 3000)
npm run dev

# Construye la aplicación para producción
npm run build

# Previsualiza la build de producción
npm run preview

# Limpia la carpeta dist
npm run clean

# Verifica tipos TypeScript sin emitir
npm run lint
```

---

## 📁 Estructura del Proyecto

```
mindset/
├── src/
│   ├── components/          # Componentes React reutilizables
│   │   ├── Navigation.tsx    # Barra de navegación
│   │   ├── Hero.tsx         # Sección principal
│   │   ├── QuoteCarousel.tsx # Carrusel de citas
│   │   ├── ExploreGrid.tsx  # Grid de 5 pilares
│   │   ├── Newsletter.tsx   # Formulario de suscripción
│   │   ├── ReviewsSection.tsx # Testimonios
│   │   ├── AuthorSection.tsx # Info del autor
│   │   └── Footer.tsx       # Pie de página
│   │
│   ├── pages/               # Páginas principales
│   │   └── ComparePage.tsx  # Página de comparación
│   │
│   ├── data/                # Datos estáticos
│   │   └── phrases.ts       # Base de frases del libro
│   │
│   ├── App.tsx              # Componente raíz
│   ├── main.tsx             # Punto de entrada
│   └── index.css            # Estilos globales
│
├── public/                  # Archivos estáticos públicos
│   └── images/             # Imágenes del proyecto
│
├── vite.config.ts          # Configuración de Vite
├── tsconfig.json           # Configuración de TypeScript
├── tailwind.config.ts      # Configuración de Tailwind CSS
├── package.json            # Dependencias del proyecto
└── index.html              # HTML principal
```

---

## 🔑 Características Clave

### 🎨 Diseño y UX
- Interfaz moderna con Tailwind CSS
- Animaciones suaves con Motion
- Navegación intuitiva
- Responsive design

### 🤖 IA Integrada
- Utiliza Google Gemini API
- Potencia funcionalidades inteligentes
- Análisis de contenido avanzado

### 📊 Datos Dinámicos
- Sistema de frases por sección
- Contadores de "likes" (interacción)
- Codificación por colores para cada pilar

### 📧 Comunicación
- Validación de emails en tiempo real
- Newsletter subscription
- Manejo de errores elegante

---

## 🚢 Deployment

### Opción 1: En Línea
La aplicación ya está disponible en:
https://mindsetinnovadora.netlify.app/

### Opción 2: Deployment Manual
```bash
# Crear build optimizada
npm run build

# El contenido se genera en la carpeta 'dist/'
# Sirve los archivos desde un servidor estático

# Ejemplo con Live Server o similar:
# - Sube el contenido de 'dist/' a tu hosting
# - Configura las variables de entorno en tu servidor
```

---

## 💡 Cómo Contribuir

1. Crear un branch para tu feature (`git checkout -b feature/AmazingFeature`)
2. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
3. Push al branch (`git push origin feature/AmazingFeature`)
4. Abrir un Pull Request

---

## 📝 Licencia

Este proyecto está bajo licencia Apache 2.0. Ver archivo `LICENSE` para más detalles.

---

## 🤝 Soporte

¿Preguntas o problemas? 
- Abre un issue en el repositorio
- Contacta al autor en la sección de AuthorSection

---

## 📚 Recursos Adicionales

- [Documentación de React](https://react.dev)
- [Guía de Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Gemini API](https://ai.google.dev)
- [Motion Documentation](https://motion.dev)

---

**Hecho con ❤️ para inspirar la innovación**
