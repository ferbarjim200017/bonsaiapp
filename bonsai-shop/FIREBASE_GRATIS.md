# 🆓 Firebase GRATIS - Bonsái Shop

## ✅ **100% GRATUITO - SIN COSTOS**

Esta integración usa **SOLO servicios gratuitos**:
- ✅ **Authentication** (Email/Password) - GRATIS
- ✅ **Firestore Database** - GRATIS (hasta 50K lecturas/día)
- ❌ **Storage NO se usa** (imágenes guardadas localmente)

---

## 🚀 Configuración (5 minutos)

### 1. Habilitar Authentication

1. Ve a https://console.firebase.google.com
2. Selecciona proyecto **bonsái-shop-de046**
3. Menú lateral → **Authentication**
4. Click **"Get started"**
5. Habilita **Email/Password** ✅

### 2. Habilitar Firestore Database

1. Menú lateral → **Firestore Database**
2. Click **"Create database"**
3. Modo: **Producción**
4. Ubicación: **europe-west1** (Bélgica)
5. Click **"Enable"**

### 3. Configurar Reglas de Firestore

En la pestaña **Rules**, pega esto:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.rol == 'admin';
    }
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    match /users/{userId} {
      allow read: if true;
      allow create: if request.auth.uid == userId;
      allow update, delete: if request.auth.uid == userId || isAdmin();
    }
    
    match /productos/{productId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }
    
    match /pedidos/{pedidoId} {
      allow read: if isAuthenticated() && 
                     (request.auth.uid == resource.data.clienteId || isAdmin());
      allow create: if isAuthenticated();
      allow update: if isAdmin();
    }
    
    match /cupones/{cuponId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }
  }
}
```

Click **"Publish"**

### 4. Crear usuario administrador

**Opción A - Desde la web:**
1. Ve a `http://localhost:3000/cuenta/registro`
2. Regístrate:
   - Email: `admin@bonsáishop.es`
   - Password: `admin123`
   - Nombre: `Admin`
3. Después:
   - Firebase Console → Authentication → Users
   - Copia el UID de tu usuario
   - Firebase Console → Firestore → users
   - Busca el documento con ese UID
   - Edita campo `rol` → `"admin"`

---

## 📁 ¿Cómo funcionan las imágenes SIN Storage?

Las imágenes se guardan **localmente en tu servidor**:

```
public/
  uploads/
    productos/
      1234567890-abc123.jpg  ← Aquí se guardan
      1234567891-def456.jpg
```

**Ventajas:**
- ✅ **Gratis** - No usas Firebase Storage
- ✅ **Rápido** - Sin latencia de red externa
- ✅ **Simple** - Solo un directorio

**Cómo funciona:**
1. Usuario sube imagen en `/admin/productos/nuevo`
2. Se envía a `/api/upload` (API route de Next.js)
3. Se guarda en `public/uploads/productos/`
4. Se retorna URL: `/uploads/productos/imagen.jpg`
5. Esta URL se guarda en Firestore

---

## 🎯 Lo que ya funciona automáticamente

### ✅ Crear
- **Usuarios** → `/cuenta/registro` guarda en Auth + Firestore
- **Productos** → `/admin/productos/nuevo` guarda imágenes locales + Firestore
- **Cupones** → `/admin/cupones/nuevo` guarda en Firestore
- **Pedidos** → Se actualizan en Firestore

### ✅ Listar
- **Productos** → `/admin/productos` carga desde Firestore
- **Cupones** → `/admin/cupones` carga desde Firestore
- **Pedidos** → `/admin/pedidos` carga desde Firestore

### ✅ Eliminar
- **Productos** → Elimina de Firestore (imágenes quedan en disco)
- **Cupones** → Elimina de Firestore

---

## 💰 Límites gratuitos

### Firestore (lo que usas)
- **50,000 lecturas/día** gratis
- **20,000 escrituras/día** gratis
- **1 GB almacenamiento** gratis

**Tu uso estimado:**
- 100 productos × 10 visitas = 1,000 lecturas/día
- 5 pedidos/día = 5 escrituras
- Total: **~1,000 operaciones/día** ✅ MUY por debajo del límite

### Authentication (lo que usas)
- **Usuarios ilimitados** gratis

### Storage (NO lo usas)
- **0€ porque no lo usas** ✅

---

## 🔍 Probar que funciona

### Test 1: Crear producto
```
1. Login con admin@bonsáishop.es / admin123
2. /admin/productos/nuevo
3. Sube 2-3 imágenes
4. Rellena formulario
5. Guardar
6. Verifica:
   - Firestore > productos (debe aparecer)
   - public/uploads/productos (deben estar las imágenes)
   - /admin/productos (debe aparecer en la lista)
```

### Test 2: Ver producto
```
1. /admin/productos
2. ¿Aparece tu producto?
3. ¿Las imágenes se ven?
4. ✅ Todo funciona
```

---

## 🛠️ Solucionar problemas

### ❌ "Missing permissions"
→ Ve a Firestore > Rules > Pega las reglas del paso 3 > Publish

### ❌ "User does not have permission"
→ Ve a Firestore > users > tu-uid > Edita `rol` a `"admin"`

### ❌ Imágenes no se suben
→ Verifica que existe `public/uploads/productos/`

### ❌ "Cannot read property 'rol'"
→ Regístrate de nuevo desde `/cuenta/registro`

---

## 📊 Estructura de datos

### Colección: `users`
```javascript
{
  uid: "abc123",
  email: "user@ejemplo.com",
  nombre: "Usuario",
  rol: "cliente" | "admin",
  createdAt: Timestamp
}
```

### Colección: `productos`
```javascript
{
  nombre: "Bonsái Ficus",
  precio: 45.99,
  imagenes: ["/uploads/productos/123.jpg"], // ← URLs locales
  stock: 10,
  categoria: "bonsái",
  publicado: true,
  // ... más campos
}
```

---

## ✅ Resumen

**Lo que tienes:**
- ✅ Registro de usuarios (gratis)
- ✅ Login con Firebase Auth (gratis)
- ✅ CRUD de productos (gratis)
- ✅ Imágenes locales (gratis)
- ✅ CRUD de cupones (gratis)
- ✅ Gestión de pedidos (gratis)

**Lo que NO tienes:**
- ❌ Firebase Storage (no lo necesitas, guardas local)
- ❌ Costos mensuales (todo gratis dentro de los límites)

**Total: 0€/mes** 🎉

---

¿Dudas? Revisa la consola del navegador (F12) y la terminal de Next.js para ver errores específicos.
