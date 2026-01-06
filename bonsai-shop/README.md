# 🌳 Bonsai Shop - Tienda Online de Bonsáis

Aplicación web completa de e-commerce especializada en la venta de bonsais y accesorios en España, desarrollada siguiendo estrictamente los requisitos documentados en `docs/REQUISITOS_WEB_BONSAIS_ES.md`.

## 📋 Características implementadas

### ✅ Frontend (Cliente)
- ✅ **Página principal (Home)** con hero, características, productos destacados y novedades
- ✅ **Catálogo (PLP)** con filtros avanzados:
  - Por categoría (bonsai/accesorio)
  - Por ubicación (interior/exterior)
  - Por dificultad de cuidado
  - Por rango de precio
  - Solo productos en stock
  - Ordenación (relevancia, precio, novedades)
- ✅ **Ficha de producto (PDP)** con:
  - Galería de imágenes
  - Atributos específicos de bonsai (especie, tamaño, nivel de cuidado, ubicación, riego, toxicidad mascotas)
  - Información de stock en tiempo real
  - Aviso de variabilidad natural del producto
  - Guías de cuidados
  - Información de envíos y devoluciones
  - Productos relacionados
- ✅ **Carrito de compra** con:
  - Gestión de cantidades
  - Aplicación de cupones (mock: `BIENVENIDA10` = 10% dto. con mínimo 30€)
  - Cálculo de envío (gratis desde 50€ península)
  - Persistencia en localStorage
- ✅ **Navegación accesible** con Header y Footer completos
- ✅ **Responsive** multi-dispositivo (móvil, tablet, escritorio)

### ✅ Accesibilidad (WCAG 2.2 AA)
- ✅ **Navegación por teclado** completa
- ✅ **Foco visible** en todos los elementos interactivos
- ✅ **Skip to content** link
- ✅ **ARIA labels** y roles semánticos correctos
- ✅ **Contraste de color AA** cumplido
- ✅ **Targets táctiles** de mínimo 44×44px (requisito WCAG 2.2)
- ✅ **Formularios accesibles** con labels asociados y mensajes de error claros
- ✅ **Respeto a `prefers-reduced-motion`**
- ✅ **Zoom 200%** compatible

### ✅ Responsive Design
- ✅ **Mobile-first** approach
- ✅ **Breakpoints** definidos (360px, 640px, 768px, 1024px, 1280px, 1536px)
- ✅ **Imágenes optimizadas** con Next.js Image (lazy-load, formatos modernos)
- ✅ **Menú hamburguesa** accesible en móvil
- ✅ **Grid** responsivo en listados y productos relacionados

### ✅ Requisitos no funcionales
- ✅ **SEO técnico**: Metadata, Open Graph, estructura semántica HTML5
- ✅ **Rendimiento**: Optimización de imágenes, lazy-load
- ✅ **Seguridad**: TypeScript strict mode, validación de inputs
- ✅ **Experiencia de usuario**: Loading states, mensajes de confirmación

### ⏳ Pendientes de implementación completa
- ⏳ **Checkout** completo (estructura creada, requiere integración de pago)
- ⏳ **Autenticación** y gestión de cuentas (NextAuth.js pendiente)
- ⏳ **Backoffice/Admin** (panel de administración para gestión de productos, pedidos, etc.)
- ⏳ **Integraciones**:
  - Pasarela de pago (Stripe test mode configurado pero sin implementar)
  - Email transaccional
  - Transportistas
- ⏳ **Base de datos** real (actualmente mock data)
- ⏳ **Páginas legales** completas (aviso legal, privacidad, cookies, términos)
- ⏳ **Reseñas** de productos
- ⏳ **Búsqueda** con sugerencias
- ⏳ **Wishlist/Favoritos**

## 🚀 Instalación y ejecución

### Prerrequisitos
- **Node.js** >= 18.x
- **npm** >= 9.x

### Pasos

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

4. **Compilar para producción:**
   ```bash
   npm run build
   npm start
   ```

## 📁 Estructura del proyecto

```
bonsai-shop/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Layout principal con Header/Footer
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Estilos globales + Tailwind
│   │   ├── catalogo/           # Página de catálogo (PLP)
│   │   │   └── page.tsx
│   │   ├── producto/[slug]/    # Ficha de producto (PDP)
│   │   │   └── page.tsx
│   │   ├── carrito/            # Carrito de compra
│   │   │   └── page.tsx
│   │   ├── checkout/           # Proceso de compra
│   │   ├── cuenta/             # Área de usuario
│   │   └── admin/              # Backoffice (pendiente)
│   ├── components/             # Componentes reutilizables
│   │   ├── layout/             # Header, Footer
│   │   ├── products/           # ProductCard
│   │   └── ui/                 # Button, Input, etc.
│   ├── context/                # Context API
│   │   └── CartContext.tsx    # Estado global del carrito
│   ├── lib/                    # Utilidades y datos
│   │   └── mockData.ts         # Datos mock de productos
│   └── types/                  # TypeScript types
│       └── index.ts            # Tipos principales
├── public/                     # Archivos estáticos
├── docs/                       # Documentación
│   └── REQUISITOS_WEB_BONSAIS_ES.md  # Requisitos completos
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🎨 Stack tecnológico

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Gestión de estado:** React Context API
- **Imágenes:** Next.js Image (optimización automática)
- **Formularios:** HTML5 con validación nativa

## 🛒 Funcionalidades del carrito

- Añadir/eliminar productos
- Actualizar cantidades
- Persistencia en `localStorage`
- Aplicación de cupones (código de prueba: `BIENVENIDA10`)
- Cálculo automático de envío (gratis desde 50€ península)
- Resumen de totales en tiempo real

## 🧪 Datos de prueba

### Productos disponibles:
1. **Ficus Retusa** - Bonsái de interior (49,99€) - En oferta
2. **Acer Palmatum** - Arce Japonés exterior (89,99€) - Nuevo
3. **Carmona Microphylla** - Bonsái del Té (39,99€)
4. **Juniperus Chinensis** - Enebro Chino exterior (69,99€)
5. **Zelkova Parvifolia** - Olmo Chino (44,99€) - En oferta
6. **Kit Herramientas 5 piezas** - Accesorio (34,99€)
7. **Sustrato Akadama Premium 2L** - Accesorio (12,99€)
8. **Maceta Cerámica Azul 20cm** - Accesorio (24,99€) - Nuevo

### Cupón de prueba:
- **Código:** `BIENVENIDA10`
- **Descuento:** 10%
- **Requisito:** Compra mínima de 30€

## ♿ Accesibilidad

La aplicación cumple con **WCAG 2.2 nivel AA**:
- ✅ Navegación completa por teclado (Tab, Shift+Tab, Enter, Escape)
- ✅ Foco visible en todos los elementos interactivos
- ✅ Contraste de color AA mínimo (4.5:1 texto normal, 3:1 texto grande)
- ✅ ARIA labels, roles y live regions donde corresponde
- ✅ Formularios con labels asociados y mensajes de error accesibles
- ✅ Targets táctiles de mínimo 44×44px (criterio 2.5.8 WCAG 2.2)
- ✅ Respeta preferencia `prefers-reduced-motion`
- ✅ Compatible con lectores de pantalla (NVDA, JAWS, VoiceOver)

## 📱 Responsive

- **Móvil** (360px - 767px): menú hamburguesa, layout vertical, imágenes optimizadas
- **Tablet** (768px - 1023px): grid de 2 columnas en listados
- **Desktop** (1024px+): grid de 3-4 columnas, sidebar de filtros visible

## 🔐 Seguridad

- TypeScript strict mode activado
- Validación de inputs en formularios
- Prevención de XSS (React escapa automáticamente)
- CSP headers configurables en `next.config.js`

## 🚧 Próximos pasos

Para completar la implementación según los requisitos:

1. **Integrar pasarela de pago** (Stripe/Redsys)
2. **Implementar autenticación** (NextAuth.js)
3. **Crear backoffice/admin** completo
4. **Conectar base de datos** (Prisma + PostgreSQL/MySQL)
5. **Añadir sistema de reseñas**
6. **Implementar búsqueda** con Algolia o similar
7. **Integrar email transaccional** (SendGrid/Resend)
8. **Conectar transportistas** (API de seguimiento)
9. **Completar páginas legales** (con asesoría legal)
10. **Tests automatizados** (Jest + Testing Library)
11. **Analytics** (Google Analytics 4 con eventos e-commerce)
12. **Sitemap** y **robots.txt** generados dinámicamente

## 📄 Licencia

Este proyecto es privado y de uso exclusivo para Bonsai Shop España.

---

**Desarrollado siguiendo los requisitos documentados en:**  
`docs/REQUISITOS_WEB_BONSAIS_ES.md`

**Contacto:** info@bonsaishop.es
