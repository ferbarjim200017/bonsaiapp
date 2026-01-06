# Requisitos completos — Web de venta de bonsáis (España)

**Documento:** PRD / Requisitos funcionales y no funcionales

- **Producto:** Tienda online de bonsáis y accesorios
- **Cobertura geográfica:** **España** (ver detalle de zonas)
- **Canal:** Web responsive (móvil, tablet, escritorio)
- **Accesibilidad objetivo:** **WCAG 2.2 nivel AA**
- **Fecha:** 2025-12-30
- **Versión:** 1.0

---

## 0. Objetivo del documento
Definir los requisitos necesarios para construir “en condiciones” una web de venta de bonsáis en España, incluyendo:
- Experiencia de compra (catálogo → producto → carrito → checkout → postcompra).
- Operación (stock, pedidos, envíos, incidencias y devoluciones, especialmente por ser **producto vivo**).
- Accesibilidad (WCAG 2.2 AA) y diseño responsive multi-dispositivo.
- Requisitos no funcionales (rendimiento, seguridad, privacidad, SEO, analítica y observabilidad).

---

## 1. Contexto, objetivos y KPI
### 1.1 Contexto
Se vende un producto vivo (bonsáis) con necesidades de logística y comunicación específicas (variabilidad natural, embalaje, cuidados, limitaciones por clima/temperatura y plazos).

### 1.2 Objetivos de negocio
- Permitir vender bonsáis y accesorios de forma fiable y escalable.
- Reducir fricción de compra en móvil.
- Asegurar operación eficiente (gestión de pedidos y stock) y atención al cliente trazable.

### 1.3 KPI (medibles)
- Conversión global y por dispositivo (móvil/tablet/desktop).
- Abandono de carrito y abandono de checkout.
- % de pedidos con incidencia logística.
- Tiempo medio de preparación (picking/packing) y entrega.
- % de devoluciones / reemplazos.
- Core Web Vitals (ver NFR).
- Cumplimiento de accesibilidad (auditorías + pruebas manuales).

---

## 2. Alcance
### 2.1 Dentro de alcance (in-scope)
- E-commerce completo (catálogo, PDP, carrito, checkout, pagos, envíos, postcompra).
- Cuenta de usuario (opcional) y compra como invitado.
- Backoffice/admin para productos, stock, pedidos, devoluciones, cupones y contenidos.
- Notificaciones transaccionales (email; SMS opcional).
- Accesibilidad WCAG 2.2 AA y responsive.
- SEO técnico base y analítica de e-commerce.

### 2.2 Fuera de alcance (out-of-scope) — por defecto
- Marketplace multi-vendedor.
- Suscripciones recurrentes.
- App nativa (iOS/Android).
- Venta internacional fuera de España.
- Personalización avanzada tipo “configurador 3D”.

> Nota: Si en el futuro se añade internacionalización, se deberá revisar impuestos, transportistas, devoluciones, idiomas y cumplimiento legal adicional.

---

## 3. Supuestos y decisiones
- **País de venta/envío:** España.
- **Moneda:** EUR.
- **Idioma:** Español (otros idiomas fuera de alcance por defecto).
- **IVA:** los precios se mostrarán con IVA incluido (B2C).
- **Catálogo:** debe soportar al menos:
  - Bonsáis (producto vivo).
  - Accesorios (herramientas, sustratos, macetas, abonos, etc.).
- **Naturaleza del producto:** la plataforma debe permitir indicar “producto natural: puede variar”.

---

## 4. Stakeholders y roles
### 4.1 Roles de usuario (front)
- **Visitante**: navega, busca, añade al carrito, compra como invitado.
- **Cliente registrado**: historial, direcciones guardadas, devoluciones, reseñas.

### 4.2 Roles internos (backoffice)
- **Admin**: control total.
- **Operaciones/Logística**: pedidos, etiquetas, tracking, incidencias.
- **Atención al cliente**: tickets, devoluciones, reembolsos (con permisos limitados).
- **Marketing/Contenido**: cupones, banners, guías y contenidos (sin tocar pagos/stock).

---

## 5. Arquitectura de información (páginas)
### 5.1 Páginas mínimas
- Home
- Categoría / listado (PLP)
- Búsqueda
- Ficha de producto (PDP)
- Carrito
- Checkout
- Confirmación de pedido
- Mi cuenta (login/registro, pedidos, direcciones)
- Atención al cliente / contacto
- FAQ (incluye cuidados, envíos, devoluciones)
- Páginas legales (aviso legal, privacidad, cookies, términos/condiciones, devoluciones)

### 5.2 Estados transversales
- Vacíos (sin resultados, carrito vacío, wishlist vacía si aplica)
- Errores (pago fallido, error transportista, error servidor)
- Modo mantenimiento (si aplica)

---

## 6. Requisitos funcionales (Front)

### 6.1 Catálogo (PLP)
**RF-CAT-01 (Must):** Mostrar listados por categoría con: imagen, nombre, precio, disponibilidad (en stock / bajo pedido si se permite), y CTA para ver detalle.

**RF-CAT-02 (Must):** Filtros y ordenación:
- Filtros mínimos:
  - Tipo: bonsái / accesorio.
  - Ubicación recomendada: interior/exterior.
  - Dificultad de cuidado (baja/media/alta).
  - Rango de precio.
  - Disponibilidad (en stock).
- Ordenación mínima: relevancia, precio asc/desc, novedades.

**RF-CAT-03 (Must):** Paginación o carga incremental con estado accesible (anunciando cambios a lector de pantalla cuando proceda).

**RF-CAT-04 (Should):** Badges: “Nuevo”, “Oferta”, “Top ventas”, “Últimas unidades”.

**Criterios de aceptación (ejemplo):**
- Dado un usuario en PLP, cuando aplica filtro “Exterior”, entonces el listado se actualiza y el foco permanece en el control o se mueve a un encabezado de resultados anunciable.

---

### 6.2 Búsqueda
**RF-BUS-01 (Must):** Búsqueda por texto con tolerancia a errores tipográficos básicos.

**RF-BUS-02 (Must):** Página de resultados con mismos filtros/ordenación que PLP.

**RF-BUS-03 (Should):** Sugerencias/autocompletado y “búsquedas populares”.

---

### 6.3 Ficha de producto (PDP)
**RF-PDP-01 (Must):** Mostrar: título, galería de imágenes (con zoom), precio (IVA incl.), disponibilidad, CTA “Añadir al carrito”.

**RF-PDP-02 (Must):** Mostrar atributos mínimos para bonsái:
- Especie.
- Tamaño (altura aproximada en cm) y/o categoría de tamaño.
- Nivel de cuidado.
- Ubicación recomendada (interior/exterior).
- Frecuencia orientativa de riego (rango + condicionantes).
- Información de seguridad: toxicidad para mascotas/niños (si aplica).

**RF-PDP-03 (Must):** Contenido obligatorio:
- Descripción.
- Guía de cuidados básica.
- Qué incluye el envío.
- Envíos (zonas, plazos estimados, coste estimado).
- Devoluciones (resumen, enlace a política completa).

**RF-PDP-04 (Must):** Gestión de stock:
- Si no hay stock, deshabilitar CTA y mostrar alternativa (“sin stock” + recomendaciones).

**RF-PDP-05 (Should):** Recomendaciones de accesorios compatibles.

**RF-PDP-06 (Should):** Aviso de producto natural (“puede variar respecto a la foto”) si aplica.

---

### 6.4 Carrito
**RF-CAR-01 (Must):** Ver carrito con items, cantidades editables, eliminar item, subtotal, envío estimado, total.

**RF-CAR-02 (Must):** Aplicar cupón en carrito (si está habilitado) con mensajes de error claros (caducado, mínimo no alcanzado, etc.).

**RF-CAR-03 (Must):** Persistencia del carrito:
- Persistencia por sesión.
- Para usuario logueado, persistencia multi-dispositivo (mismo carrito al iniciar sesión).

**RF-CAR-04 (Should):** Sugerencias “también comprado” / “recomendado para tu bonsái”.

---

### 6.5 Checkout
**RF-CHK-01 (Must):** Checkout optimizado (1–2 pasos) con:
- Compra como invitado.
- Registro/login opcional.

**RF-CHK-02 (Must):** Datos mínimos:
- Email.
- Nombre y apellidos.
- Dirección completa (España) + CP.
- Teléfono (para transportista).

**RF-CHK-03 (Must):** Métodos de envío:
- Mostrar coste y ETA aproximada por zona (ver 6.7).

**RF-CHK-04 (Must):** Validaciones y errores accesibles:
- Mensajes junto al campo + resumen de errores.
- En error, mover foco al primer campo inválido.

**RF-CHK-05 (Must):** Confirmación final:
- Resumen completo del pedido antes de pagar.
- Aceptación de términos/condiciones.

---

### 6.6 Pagos
**RF-PAY-01 (Must):** Pago con tarjeta con 3DS2 mediante pasarela certificada PCI (la app no almacena PAN/CVV).

**RF-PAY-02 (Should):** Métodos alternativos (opcional según negocio): wallet (Apple Pay/Google Pay), PayPal.

**RF-PAY-03 (Must):** Estados de pago trazables: pendiente, autorizado/capturado, fallido, reembolsado parcial/total.

**RF-PAY-04 (Must):** Manejo de fallos:
- En pago fallido, el usuario puede reintentar sin perder carrito.
- No dejar stock bloqueado indefinidamente.

---

### 6.7 Envíos (España)
**RF-ENV-01 (Must):** Soportar zonas de envío configurables:
- Península
- Baleares
- Canarias
- Ceuta
- Melilla

**RF-ENV-02 (Must):** Reglas de envío:
- Coste por zona y/o por rango de peso/importe.
- Plazos estimados por zona.
- Días no laborables / días sin expedición.

**RF-ENV-03 (Must):** Tracking:
- Enviar email de “pedido enviado” con enlace de seguimiento.
- Mostrar tracking en “Mis pedidos”.

**RF-ENV-04 (Should):** Restricciones por clima/temperatura/temporada para producto vivo (si operaciones lo define), con bloqueo de compra o aviso previo.

---

### 6.8 Postcompra
**RF-POST-01 (Must):** Página de confirmación con número de pedido y resumen.

**RF-POST-02 (Must):** Emails transaccionales:
- Confirmación de pedido.
- Pedido enviado.
- Pedido entregado (si hay evento).
- Incidencia (si aplica).

**RF-POST-03 (Should):** Email “cuidados al recibir tu bonsái” (contenido) tras entrega o tras envío.

---

### 6.9 Cuenta de usuario
**RF-ACC-01 (Must):** Registro, login, recuperación de contraseña.

**RF-ACC-02 (Must):** Área “Mis pedidos” con estados y detalle (items, totales, tracking).

**RF-ACC-03 (Must):** Gestión de direcciones (añadir/editar/eliminar).

**RF-ACC-04 (Should):** Preferencias de comunicación (marketing) con consentimiento.

---

### 6.10 Reseñas
**RF-REV-01 (Should):** Reseñas por producto con puntuación y texto, moderación básica.

**RF-REV-02 (Should):** Marcar “compra verificada” si el sistema lo soporta.

---

### 6.11 Atención al cliente / contacto
**RF-SUP-01 (Must):** Formulario de contacto con:
- Motivo.
- Email.
- Nº de pedido (opcional).
- Adjuntar fotos (importante para incidencias de planta viva).

**RF-SUP-02 (Must):** Página de FAQs: envíos, devoluciones, cuidados básicos.

---

## 7. Requisitos funcionales (Backoffice / Operaciones)

### 7.1 Gestión de productos
**RB-PROD-01 (Must):** CRUD de productos con:
- Nombre, descripción, precio (IVA incl), SKU.
- Categorías y etiquetas.
- Imágenes.
- Atributos bonsái (especie, dificultad, interior/exterior, tamaño, cuidados).

**RB-PROD-02 (Must):** Gestión de stock por SKU (cantidad) y estado de publicación (borrador/publicado).

**RB-PROD-03 (Should):** Soporte para “producto único” (stock=1) y accesorios (stock>1).

### 7.2 Pedidos
**RB-ORD-01 (Must):** Listado de pedidos con filtros por estado, fecha, zona.

**RB-ORD-02 (Must):** Flujo de estados: nuevo → pagado → preparando → enviado → entregado → cerrado (y variantes: cancelado, devuelto).

**RB-ORD-03 (Must):** Notas internas por pedido y trazabilidad de cambios.

**RB-ORD-04 (Must):** Reembolsos parciales o totales vinculados a la pasarela.

### 7.3 Devoluciones / incidencias (RMA)
**RB-RMA-01 (Must):** Registrar incidencias y devoluciones con:
- Motivo.
- Evidencia (fotos).
- Resolución: reembolso / reemplazo / cupón.

**RB-RMA-02 (Must):** Estados de RMA: solicitada → en revisión → aprobada/rechazada → resuelta.

### 7.4 Cupones y promociones
**RB-PROMO-01 (Must):** Gestión de cupones con reglas:
- % o importe fijo.
- Fecha inicio/fin.
- Importe mínimo.
- Usos máximos globales y por cliente.
- Restricciones por categoría/producto.

### 7.5 Roles y auditoría
**RB-SEC-01 (Must):** Roles internos con permisos (RBAC).

**RB-SEC-02 (Must):** Registro de auditoría (quién cambió precio/stock/pedido).

---

## 8. Requisitos no funcionales (NFR)

### 8.1 Rendimiento
**NFR-PERF-01 (Must):** Objetivos Core Web Vitals en producción (medición real):
- LCP, INP, CLS dentro de objetivos acordados para percentil (p. ej. p75).

**NFR-PERF-02 (Must):** Optimización de imágenes:
- Formatos modernos cuando sea posible.
- Lazy-load en listados y galerías.
- Tamaños responsivos.

**NFR-PERF-03 (Must):** Checkout especialmente ligero y estable.

### 8.2 Disponibilidad y resiliencia
**NFR-REL-01 (Must):** Disponibilidad objetivo definida (p. ej., 99.9% mensual) y plan de mantenimiento.

**NFR-REL-02 (Must):** Manejo de fallos en integraciones (pagos/transportista): reintentos controlados, colas, degradación graciosa.

### 8.3 Seguridad
**NFR-SEC-01 (Must):** Controles OWASP Top 10 (inyección, XSS, CSRF, control de acceso, etc.).

**NFR-SEC-02 (Must):** Gestión segura de sesiones y autenticación:
- Rate limiting.
- Protección anti-bot básica.
- Política de contraseñas y recuperación segura.

**NFR-SEC-03 (Must):** No almacenar datos de tarjeta sensibles; cumplimiento PCI mediante proveedor.

**NFR-SEC-04 (Must):** Cabeceras de seguridad (CSP, HSTS, etc.) y TLS.

### 8.4 Privacidad y cookies (España/UE) — orientación general
**NFR-PRIV-01 (Must):** Banner de cookies con rechazo tan fácil como aceptar; categorías (necesarias / analítica / marketing, etc.).

**NFR-PRIV-02 (Must):** Registro de consentimientos y revocación fácil.

**NFR-PRIV-03 (Must):** Minimización y retención de datos definida (política interna).

### 8.5 SEO técnico
**NFR-SEO-01 (Must):**
- URLs limpias.
- Metadata (title/description).
- Canonical.
- Sitemap y robots.
- Breadcrumbs.

**NFR-SEO-02 (Must):** Schema.org (Producto, BreadcrumbList, Organization).

### 8.6 Analítica
**NFR-ANA-01 (Must):** Eventos de e-commerce (vista producto, add_to_cart, begin_checkout, purchase) y embudo.

**NFR-ANA-02 (Must):** Analítica condicionada a consentimiento cuando aplique.

### 8.7 Observabilidad
**NFR-OBS-01 (Must):** Logs estructurados, métricas y trazas para:
- Checkout/pagos.
- Integración transportista.
- Creación de pedidos/reembolsos.

**NFR-OBS-02 (Must):** Alertas por:
- Errores de pago.
- Caídas de integración.
- Incremento de tiempos de respuesta.

---

## 9. Accesibilidad (WCAG 2.2 AA)
**A11Y-01 (Must):** Navegación completa por teclado con foco visible y orden lógico.

**A11Y-02 (Must):** Etiquetado correcto de formularios (label asociado, ayudas y errores accesibles).

**A11Y-03 (Must):** Contraste de color AA y no depender únicamente del color para transmitir estado.

**A11Y-04 (Must):** Mensajes dinámicos (por ejemplo “añadido al carrito”) anunciables a lector de pantalla cuando corresponda.

**A11Y-05 (Must):** Compatible con zoom 200% y reflow; no bloquear pinch-to-zoom.

**A11Y-06 (Should):** Auditoría automática (Lighthouse/axe) + pruebas manuales (NVDA/VoiceOver) con checklist.

---

## 10. Responsive (multi-dispositivo)
**RESP-01 (Must):** Diseño mobile-first con breakpoints definidos (adaptables al sistema de diseño).

**RESP-02 (Must):** Objetivos táctiles accesibles (mínimo 24×24 CSS px; recomendable 44×44 para CTAs).

**RESP-03 (Must):** Formularios optimizados móvil:
- Tipos de teclado correctos.
- Autocomplete.

**RESP-04 (Must):** PDP y carrito con CTA claro en móvil sin tapar contenido/foco.

---

## 11. Contenido
**CONT-01 (Must):** Plantilla de ficha de producto:
- Resumen.
- Ficha técnica.
- Cuidados.
- Envíos y devoluciones.

**CONT-02 (Must):** Texto alternativo (alt) obligatorio en imágenes de producto.

**CONT-03 (Should):** Guías de cuidados (landing) enlazadas desde PDP.

---

## 12. Consideraciones legales (España/UE) — no asesoría legal
- **RGPD**: política de privacidad clara, base legal por finalidad, derechos de usuario, encargados de tratamiento.
- **Cookies**: consentimiento informado y granular (según guías aplicables en España).
- **LSSI-CE**: aviso legal y condiciones de contratación, identificación del prestador, comunicaciones comerciales.
- **Consumo**: información precontractual, gastos y plazos, procedimiento de devolución, y condiciones específicas para bienes perecederos/producto vivo (definirlo con asesoría).

---

## 13. Integraciones
**INT-01 (Must):** Pasarela de pago (tarjeta + 3DS2) con webhooks para estados.

**INT-02 (Must):** Transportista(s) o sistema de tracking (API o carga manual) para etiquetas y seguimiento.

**INT-03 (Must):** Proveedor email transaccional.

**INT-04 (Should):** SMS transaccional.

---

## 14. Criterios de aceptación (UAT) — ejemplos clave
- **Checkout accesible**: completar compra solo con teclado; errores anunciados; foco al primer error.
- **Pago fallido**: reintento posible; pedido no queda en estado inconsistente.
- **Envío**: al marcar “enviado”, se envía email con tracking y se refleja en cuenta.
- **Zonas España**: cálculo de envío correcto para Península/Baleares/Canarias/Ceuta/Melilla.

---

## 15. Entregables
- Documento de requisitos (este documento) + matriz MoSCoW.
- Wireframes (home/PLP/PDP/carrito/checkout/cuenta/soporte) con estados.
- Especificación de eventos de analítica.
- Checklist de accesibilidad + informe de auditoría.
- Plan de pruebas UAT (casos y resultados).

---

## 16. Glosario
- **PLP**: Product Listing Page (listado).
- **PDP**: Product Detail Page (ficha).
- **RMA**: Return Merchandise Authorization (devoluciones/incidencias).
- **WCAG**: Web Content Accessibility Guidelines.
