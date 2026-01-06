# Actualizar Reglas de Firestore

Para que funcione el sistema de mensajes de contacto, necesitas actualizar las reglas de Firestore en la consola de Firebase.

## Pasos:

1. Ve a la [Consola de Firebase](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. En el menú lateral, ve a **Firestore Database**
4. Haz clic en la pestaña **Reglas** (Rules)
5. Copia y pega el contenido del archivo `firestore.rules` de este proyecto
6. Haz clic en **Publicar** (Publish)

## Alternativa: Usar Firebase CLI

Si tienes Firebase CLI instalado, puedes actualizar las reglas automáticamente:

```bash
# Iniciar sesión en Firebase (si no lo has hecho)
firebase login

# Desplegar solo las reglas de Firestore
firebase deploy --only firestore:rules
```

## Verificación

Una vez actualizadas las reglas, el formulario de contacto debería poder guardar mensajes en Firestore sin problemas. Puedes probarlo:

1. Accede a la página de contacto: `/contacto`
2. Rellena el formulario y envíalo
3. Ve al panel de admin: `/admin/mensajes`
4. Deberías ver el mensaje que acabas de enviar
