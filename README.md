# 🎬 Movie Tracker

## 👥 Integrantes del Grupo
- Hernandez Martín FAI-4433
- Metzger German FAI-3521
- Bucarey Mateo FAI- 4319

## 📝 Descripción
Movie Tracker es una aplicación web desarrollada con React que permite gestionar y hacer seguimiento de películas y series. Los usuarios pueden:

- Agregar nuevas películas y series a su lista "Por Ver"
- Marcar contenido como visto
- Filtrar por género, tipo de contenido (película/serie) y búsqueda por título/director
- Ordenar por año o rating
- Ver estadísticas de su contenido
- Editar o eliminar entradas
- Persistencia de datos en localStorage

## ❓ Preguntas Teóricas

### 1. ¿Qué función cumple cada archivo inicial del proyecto?
- **index.js:** Punto de entrada principal. Renderiza el componente raíz (`App.js`) en el HTML.
- **App.js:** Componente principal. Define la estructura, rutas y lógica general de la app.
- **index.css:** Estilos globales que afectan a todo el proyecto.
- **package.json:** Configuración del proyecto, dependencias y scripts.

### 2. ¿Qué componentes reutilizables se definieron y por qué?
Se crearon componentes como **Button, InputField, SelectField, SearchBar, Toast, ContentCard, StatsCounter, Layout, Filters, FilterSection, Title**. Todos estos ayudan a evitar repetir código, mantener la app ordenada y facilitar cambios o mejoras en el futuro. Se usan en formularios, filtros, listas, navegación y notificaciones.

### 3. ¿Qué elementos necesitan un useState?
Además de las listas de películas/series, se usa `useState` para manejar:
- Inputs de búsqueda y formularios
- Filtros de género, tipo y orden
- Estado de edición
- Modal de confirmación
- Mensajes de notificación (Toasts)
- Pestañas o secciones activas
Esto permite que la app sea interactiva y responda a las acciones del usuario.

### 4. ¿Cómo se usan .map() y el renderizado condicional?
Se usa `.map()` para recorrer y renderizar listas de elementos. El renderizado condicional permite mostrar u ocultar componentes o mensajes según el estado de los datos, por ejemplo, cuando no hay resultados.

### 5. Ventajas de los componentes reutilizables
Usar componentes reutilizables hace que el código sea más fácil de mantener y entender. Te ahorra tiempo porque no tenés que escribir lo mismo varias veces. Si querés cambiar algo, lo hacés en un solo lugar y se actualiza en toda la app. Todo queda más ordenado y es más fácil agregar nuevas cosas o arreglar bugs.


## 🚀 Tecnologías Utilizadas
- React
- TypeScript
- CSS Modules
- LocalStorage para persistencia de datos
- Lucide React (Iconos)
- React Router DOM (Rutas)
- UUID (Generación de IDs)

## ⚙️ Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd TP-React-PWA
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar la aplicación en modo desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Página Principal
![Página Principal](screenshots/home.png)
*Vista principal con lista de contenido y filtros*

### Agregar Nuevo Contenido
![Agregar Contenido](screenshots/new.png)
*Formulario para agregar nueva película o serie*

### Contenido Visto
![Contenido Visto](screenshots/visto.png)
*Lista de contenido marcado como visto*

### Editar Contenido 
![Editar Contenido](screenshots/editar.png)
*Edición de contenido*

## 🎯 Características Principales

### Sistema de Filtros
- Búsqueda por título o director
- Filtrado por género
- Filtrado por tipo (película/serie)
- Ordenamiento por año o rating

### Gestión de Contenido
- Agregar nuevas películas/series
- Marcar como visto
- Editar entradas existentes
- Eliminar contenido

### Estadísticas
- Total de contenido
- Distribución por género
- Distribución por tipo

## 💾 Persistencia de Datos
La aplicación utiliza localStorage para mantener los datos guardados incluso después de cerrar el navegador. Los datos se sincronizan automáticamente.

## 🔄 Estado de la Aplicación
- ✅ Todas las funcionalidades principales implementadas
- ✅ Interfaz intuitiva y amigable
- ✅ Persistencia de datos
- ✅ Manejo de errores

## 🎨 Diseño
- Interfaz moderna y minimalista
- Tema oscuro para mejor experiencia visual
- Animaciones y transiciones suaves
- Feedback visual para todas las acciones

## 📚 Estructura del Proyecto
```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas principales
├── types/         # Definiciones de TypeScript
├── utils/         # Utilidades y helpers
└── styles/        # Estilos globales
```

### Desarrollo del TP-React de la materia Programación Web Avanzada!
