/**
 * Script para inicializar Firebase con datos de prueba
 * 
 * IMPORTANTE: Este script debe ejecutarse una sola vez para crear los usuarios iniciales.
 * 
 * Para ejecutar:
 * 1. Asegúrate de tener Firebase configurado en tu proyecto
 * 2. Ve a Firebase Console > Authentication > Sign-in method
 * 3. Activa "Email/Password"
 * 4. Ve a Firestore Database > Crear base de datos
 * 5. Ve a Storage > Empezar
 * 6. Ejecuta: node --loader ts-node/esm scripts/initFirebase.ts
 */

import { registerUser } from '../src/lib/firebase/auth';

async function initializeFirebase() {
  console.log('🔥 Inicializando Firebase...\n');

  try {
    // Crear usuario admin
    console.log('👤 Creando usuario administrador...');
    await registerUser(
      'admin@bonsáishop.es',
      'admin123',
      'Administrador',
      'admin'
    );
    console.log('✅ Admin creado: admin@bonsáishop.es / admin123\n');

    // Crear usuario cliente de prueba
    console.log('👤 Creando usuario cliente de prueba...');
    await registerUser(
      'cliente@test.com',
      'cliente123',
      'Cliente Test',
      'cliente'
    );
    console.log('✅ Cliente creado: cliente@test.com / cliente123\n');

    console.log('🎉 ¡Firebase inicializado correctamente!\n');
    console.log('📝 Próximos pasos:');
    console.log('   1. Ve a Firebase Console > Firestore Database');
    console.log('   2. Configura las reglas de seguridad (ver firestore.rules)');
    console.log('   3. Ve a Firebase Console > Storage');
    console.log('   4. Configura las reglas de seguridad (ver storage.rules)\n');

  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('⚠️  Los usuarios ya existen. Si quieres recrearlos, elimínalos primero desde Firebase Console.\n');
    } else {
      console.error('❌ Error:', error.message);
    }
  }

  process.exit(0);
}

initializeFirebase();
