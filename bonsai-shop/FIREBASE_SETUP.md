# 🔥 Configuración de Firebase

Este documento explica cómo configurar Firebase para el proyecto Bonsái Shop.

## 📋 Prerrequisitos

- Proyecto Firebase creado en [Firebase Console](https://console.firebase.google.com/)
- Node.js instalado
- Credenciales de Firebase (ya configuradas en `.env.local`)

## 🚀 Pasos de Configuración

### 1. Activar Servicios de Firebase

#### **Firebase Authentication**
1. Ve a Firebase Console → Tu Proyecto → Authentication
2. Click en "Get Started" o "Empezar"
3. En la pestaña "Sign-in method"
4. Activa **Email/Password**
5. Click en "Guardar"

#### **Cloud Firestore**
1. Ve a Firebase Console → Tu Proyecto → Firestore Database
2. Click en "Crear base de datos"
3. Selecciona **Modo de producción** (configuraremos reglas después)
4. Elige la ubicación más cercana (ej: `europe-west1`)
5. Click en "Habilitar"

#### **Cloud Storage**
1. Ve a Firebase Console → Tu Proyecto → Storage
2. Click en "Empezar"
3. Selecciona **Modo de producción**
4. Usa la misma ubicación que Firestore
5. Click en "Listo"

### 2. Configurar Reglas de Seguridad

#### **Firestore Rules**
1. Ve a Firestore Database → Reglas
2. Copia el contenido de `firestore.rules` de este proyecto
3. Pégalo en el editor
4. Click en "Publicar"

#### **Storage Rules**
1. Ve a Storage → Reglas
2. Copia el contenido de `storage.rules` de este proyecto
3. Pégalo en el editor
4. Click en "Publicar"

### 3. Crear Usuarios Iniciales

#### **Opción A: Manualmente desde Firebase Console**

1. Ve a Authentication → Users
2. Click en "Add user"
3. Crea el usuario admin:
   - Email: `admin@bonsáishop.es`
   - Password: `admin123`
4. Después de crear el usuario, ve a Firestore Database
5. Crea una colección llamada `users`
6. Crea un documento con el UID del usuario admin:
   ```json
   {
     "uid": "[UID del usuario]",
     "email": "admin@bonsáishop.es",
     "nombre": "Administrador",
     "rol": "admin",
     "createdAt": "[fecha actual]"
   }
   ```
7. Repite para el usuario cliente:
   - Email: `cliente@test.com`
   - Password: `cliente123`
   - Rol: `cliente`

#### **Opción B: Usando el script (Requiere configuración adicional)**

```bash
# Instalar ts-node globalmente
npm install -g ts-node

# Ejecutar script
npx tsx scripts/initFirebase.ts
```

### 4. Verificar Configuración

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Ve a `http://localhost:3000/cuenta/login`

3. Intenta iniciar sesión con:
   - **Admin**: admin@bonsáishop.es / admin123
   - **Cliente**: cliente@test.com / cliente123

4. Si el login funciona, ¡Firebase está configurado correctamente!

## 📝 Estructura de Datos

### Colecciones de Firestore

#### **users**
```typescript
{
  uid: string;
  email: string;
  nombre: string;
  rol: 'admin' | 'cliente';
  createdAt: Timestamp;
}
```

#### **productos**
```typescript
{
  nombre: string;
  descripcion: string;
  precio: number;
  precioAnterior?: number;
  categoria: 'bonsái' | 'accesorio';
  imagenes: string[];
  stock: number;
  publicado: boolean;
  destacado: boolean;
  // ... más campos según el tipo
}
```

#### **pedidos**
```typescript
{
  numero: string;
  userId: string;
  cliente: {
    nombre: string;
    email: string;
  };
  total: number;
  estado: 'nuevo' | 'pagado' | 'preparando' | 'enviado' | 'entregado';
  fecha: Timestamp;
  // ... más campos
}
```

#### **cupones**
```typescript
{
  codigo: string;
  tipo: 'porcentaje' | 'fijo';
  valor: number;
  minimoCompra?: number;
  activo: boolean;
  fechaInicio: Timestamp;
  fechaFin: Timestamp;
  // ... más campos
}
```

## 🔐 Seguridad

### Variables de Entorno

Las credenciales de Firebase están en `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
# etc.
```

**⚠️ IMPORTANTE**: Nunca subas `.env.local` a Git (ya está en `.gitignore`)

### Reglas de Seguridad

Las reglas están configuradas para:
- ✅ Usuarios autenticados pueden leer productos publicados
- ✅ Solo admins pueden crear/editar/eliminar productos
- ✅ Usuarios pueden ver sus propios pedidos
- ✅ Solo admins pueden ver todos los pedidos
- ✅ Imágenes tienen límite de 5MB

## 📦 Migración de Datos Mock

Para migrar los productos mock a Firebase:

1. Ve a `/admin` (debes estar logueado como admin)
2. Crea productos manualmente desde "Nuevo Producto"
3. O crea un script personalizado para migración masiva

## 🆘 Solución de Problemas

### Error: "Firebase App not initialized"
- Verifica que `.env.local` existe y tiene todas las variables
- Reinicia el servidor de desarrollo

### Error: "Missing or insufficient permissions"
- Verifica que las reglas de Firestore/Storage estén publicadas
- Comprueba que el usuario tenga el rol correcto en Firestore

### Error al subir imágenes
- Verifica que Storage esté habilitado
- Comprueba las reglas de Storage
- Verifica el tamaño del archivo (máx 5MB)

## 📚 Recursos

- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Storage](https://firebase.google.com/docs/storage/web/start)

---

✨ ¡Firebase está listo para usar!
