# 🔩 Muebles Industriales — Catálogo Digital

Catálogo digital profesional de muebles industriales en madera y hierro.  
**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS · Prisma · PostgreSQL (Neon) · NextAuth v5

---

## 📁 Estructura de Carpetas

```
muebles-industriales/
├── prisma/
│   ├── schema.prisma        ← Esquema de la base de datos
│   └── seed.ts              ← ⭐ PRODUCTOS Y PRECIOS — editar aquí
├── public/
│   └── images/
│       └── placeholder.svg  ← Imagen de referencia
├── src/
│   ├── app/
│   │   ├── layout.tsx       ← Layout raíz (fuentes, metadata)
│   │   ├── page.tsx         ← Página principal del catálogo
│   │   ├── globals.css      ← Estilos globales y variables
│   │   ├── api/
│   │   │   ├── auth/        ← NextAuth endpoints
│   │   │   ├── products/    ← API de productos
│   │   │   └── categories/  ← API de categorías
│   │   └── admin/
│   │       ├── page.tsx     ← Dashboard admin
│   │       └── login/       ← Página de login admin
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx   ← Navegación principal
│   │   │   └── Footer.tsx   ← Pie de página + contacto
│   │   └── catalog/
│   │       ├── HeroSection.tsx      ← Sección hero principal
│   │       ├── CatalogClient.tsx    ← Catálogo interactivo (client)
│   │       ├── CategorySection.tsx  ← Sección por categoría
│   │       ├── CategoryFilter.tsx   ← Filtros de categorías
│   │       └── ProductCard.tsx      ← Tarjeta de producto
│   ├── lib/
│   │   ├── prisma.ts        ← Cliente Prisma singleton
│   │   ├── auth.ts          ← Configuración NextAuth
│   │   ├── whatsapp.ts      ← Generador de URLs WhatsApp
│   │   └── utils.ts         ← Utilidades (cn, etc.)
│   └── types/
│       └── index.ts         ← Tipos TypeScript globales
├── .env.example             ← Plantilla de variables de entorno
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 🚀 Instalación y Ejecución

### 1. Clonar y preparar

```bash
git clone <tu-repo>
cd muebles-industriales
npm install
```

### 2. Variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus datos reales:

```env
DATABASE_URL="postgresql://..."      # Neon → Connection String
NEXTAUTH_SECRET="genera-uno-con-openssl-rand-base64-32"
NEXT_PUBLIC_WHATSAPP_NUMBER="573001234567"   # ← TU NÚMERO AQUÍ
```

### 3. Base de datos

```bash
npm run db:push       # Crea las tablas en Neon
npm run db:seed       # Inserta las categorías y productos
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
# Abre: http://localhost:3000
```

---

## ⚙️ Dónde Editar Cada Cosa

### 📱 Número de WhatsApp

**Archivo:** `.env.local`

```env
NEXT_PUBLIC_WHATSAPP_NUMBER="573001234567"
```

Formato: `código_país` + `número` (sin `+`, sin espacios).

---

### 💰 Precios de Productos

**Archivo:** `prisma/seed.ts`

Busca el arreglo `products` y modifica el campo `price`:

```ts
{
  name: "Mesa de Cocina Industrial",
  price: 1200000,   // ← Cambia este valor
  ...
}
```

Después de modificar, ejecuta:

```bash
npm run db:seed
```

---

### 🪑 Agregar Nuevos Productos

**Archivo:** `prisma/seed.ts`

Agrega un nuevo objeto al arreglo `products`:

```ts
{
  name: "Nuevo Producto",          // Nombre visible
  slug: "nuevo-producto",          // URL única (sin espacios)
  description: "Descripción...",
  price: 500000,                   // Precio
  imageUrl: "/images/products/mi-foto.jpg",  // Ruta de imagen
  images: [],                      // Fotos adicionales (opcional)
  materials: ["Madera de pino", "Hierro forjado"],
  dimensions: "100cm x 50cm x 75cm",
  weight: "15 kg",
  featured: false,                 // true = mostrar como destacado
  active: true,
  stock: 10,
  categorySlug: "sala",            // "cocina" | "sala" | "cuarto"
},
```

Luego:
```bash
npm run db:seed
```

---

### 🖼️ Agregar Imágenes de Productos

**Opción A — Archivos locales:**

1. Copia las imágenes en `public/images/products/`
2. En `seed.ts` usa: `imageUrl: "/images/products/nombre.jpg"`

**Opción B — URL externa (Cloudinary, etc.):**

```ts
imageUrl: "https://res.cloudinary.com/tu-cloud/image/upload/v123/producto.jpg"
```

> 💡 Agrega el dominio en `next.config.ts` → `remotePatterns`

---

## 🌐 Despliegue en Vercel

```bash
# 1. Sube a GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Importa en Vercel: https://vercel.com/new
# 3. Agrega las variables de entorno de .env.local
# 4. Vercel desplegará automáticamente
```

---

## 🔐 Panel de Administración

**URL:** `/admin`  
**Login:** `/admin/login`

Credenciales por defecto (cámbilas después de primer uso):
- Email: `admin@mueblesind.com`
- Password: `admin123`

---

## 🗃️ Comandos Útiles

```bash
npm run dev          # Desarrollo local
npm run build        # Build de producción
npm run db:generate  # Regenerar cliente Prisma
npm run db:push      # Sincronizar schema con DB
npm run db:seed      # Insertar/actualizar datos
npm run db:studio    # Interfaz visual de la BD
```

---

## 🔧 Escalabilidad Futura

El proyecto está preparado para:

- **Panel admin completo** — Rutas ya creadas en `/admin`
- **CRUD de productos** — API Routes listas en `/api/products`
- **Autenticación** — NextAuth v5 configurado
- **Pasarela de pagos** — Integrar Stripe/MercadoPago en API Routes
- **Gestión de imágenes** — Agregar Cloudinary con uploader
- **Multi-idioma** — Next.js `i18n` routing
- **Base de datos** — Prisma facilita migraciones y nuevos modelos

---

*Desarrollado con artesanía digital 🔩*
