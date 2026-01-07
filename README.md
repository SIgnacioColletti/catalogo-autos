# 🚗 Catálogo de Vehículos - AutoMax Rosario

Sistema de catálogo virtual para agencias de autos y motos usadas desarrollado con Next.js 14 y Supabase.

## 🚀 Características

### Catálogo Público

- ✅ Listado de vehículos con filtros avanzados
- ✅ Búsqueda en tiempo real
- ✅ Detalle completo de cada vehículo
- ✅ Galería de imágenes
- ✅ Integración con WhatsApp
- ✅ Sistema de vistas únicas
- ✅ Responsive design

### Panel Admin

- ✅ Dashboard con estadísticas
- ✅ CRUD completo de vehículos
- ✅ Editor visual de características
- ✅ Editor visual de imágenes
- ✅ Cambio rápido de estado (Disponible/Reservado/Vendido)
- ✅ Búsqueda y filtros

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Base de Datos:** Supabase (PostgreSQL)
- **Autenticación:** Supabase Auth
- **Estilos:** Tailwind CSS
- **Componentes UI:** shadcn/ui
- **Íconos:** Lucide React
- **Animaciones:** Framer Motion
- **Formularios:** React Hook Form + Zod
- **Notificaciones:** Sonner

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/catalogo-vehiculos.git

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase

# Ejecutar en desarrollo
npm run dev
```

## 🔐 Variables de Entorno

```env
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

## 🗄️ Base de Datos

El proyecto incluye migraciones SQL en `/supabase/migrations/` para crear:

- Tabla `agencies`
- Tabla `vehicles`
- Políticas RLS
- Índices

## 👤 Usuario Admin por Defecto

- Email: `admin@automaxrosario.com.ar`
- Password: `admin123`

**⚠️ IMPORTANTE:** Cambiar estas credenciales en producción.

## 📱 Deploy

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático

## 📄 Licencia

MIT

## 👨‍💻 Autor

Tu Nombre - [GitHub](https://github.com/tu-usuario)
