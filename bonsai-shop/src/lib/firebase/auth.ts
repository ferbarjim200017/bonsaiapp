import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  Auth,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, Firestore } from 'firebase/firestore';
import { auth, db } from './config';

export interface UserProfile {
  uid: string;
  email: string;
  nombre: string;
  rol: 'admin' | 'cliente';
  createdAt: Date;
}

// Helper para verificar que Firebase Auth está configurado
const ensureAuth = (): Auth => {
  if (!auth) {
    throw new Error('Firebase Auth not initialized. Make sure environment variables are set.');
  }
  return auth;
};

// Helper para verificar que Firestore está configurado
const ensureDb = (): Firestore => {
  if (!db) {
    throw new Error('Firestore not initialized. Make sure environment variables are set.');
  }
  return db;
};

// Registrar nuevo usuario
export const registerUser = async (
  email: string,
  password: string,
  nombre: string,
  rol: 'admin' | 'cliente' = 'cliente'
): Promise<UserProfile> => {
  try {
    const firebaseAuth = ensureAuth();
    const firestore = ensureDb();
    
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;

    // Actualizar perfil de Firebase Auth
    await updateProfile(user, { displayName: nombre });

    // Crear documento en Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      nombre,
      rol,
      createdAt: new Date(),
    };

    await setDoc(doc(firestore, 'users', user.uid), userProfile);

    return userProfile;
  } catch (error: any) {
    throw new Error(error.message || 'Error al registrar usuario');
  }
};

// Iniciar sesión
export const loginUser = async (email: string, password: string): Promise<UserProfile> => {
  try {
    const firebaseAuth = ensureAuth();
    const firestore = ensureDb();
    
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;

    // Obtener perfil de Firestore
    const userDoc = await getDoc(doc(firestore, 'users', user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('Perfil de usuario no encontrado');
    }

    return userDoc.data() as UserProfile;
  } catch (error: any) {
    throw new Error(error.message || 'Error al iniciar sesión');
  }
};

// Cerrar sesión
export const logoutUser = async (): Promise<void> => {
  try {
    const firebaseAuth = ensureAuth();
    await signOut(firebaseAuth);
  } catch (error: any) {
    throw new Error(error.message || 'Error al cerrar sesión');
  }
};

// Obtener perfil de usuario
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const firestore = ensureDb();
    const userDoc = await getDoc(doc(firestore, 'users', uid));
    
    if (!userDoc.exists()) {
      return null;
    }

    return userDoc.data() as UserProfile;
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    return null;
  }
};

// Observer de autenticación
export const onAuthChange = (callback: (user: FirebaseUser | null) => void) => {
  const firebaseAuth = ensureAuth();
  return onAuthStateChanged(firebaseAuth, callback);
};

// Actualizar perfil de usuario
export const updateUserProfile = async (
  uid: string,
  data: { nombre?: string; apellidos?: string; telefono?: string }
): Promise<void> => {
  try {
    const firebaseAuth = ensureAuth();
    const firestore = ensureDb();
    
    // Actualizar displayName en Firebase Auth si se proporciona nombre
    if (data.nombre && firebaseAuth.currentUser) {
      await updateProfile(firebaseAuth.currentUser, { 
        displayName: data.nombre 
      });
    }

    // Actualizar documento en Firestore
    await updateDoc(doc(firestore, 'users', uid), {
      ...data,
      updatedAt: new Date()
    });
  } catch (error: any) {
    throw new Error(error.message || 'Error al actualizar perfil');
  }
};

// Cambiar contraseña
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    const firebaseAuth = ensureAuth();
    const user = firebaseAuth.currentUser;
    
    if (!user || !user.email) {
      throw new Error('No hay usuario autenticado');
    }

    // Reautenticar usuario antes de cambiar contraseña
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // Cambiar contraseña
    await updatePassword(user, newPassword);
  } catch (error: any) {
    if (error.code === 'auth/wrong-password') {
      throw new Error('La contraseña actual es incorrecta');
    }
    throw new Error(error.message || 'Error al cambiar contraseña');
  }
};

// Cambiar email
export const changeEmail = async (
  currentPassword: string,
  newEmail: string
): Promise<void> => {
  try {
    const firebaseAuth = ensureAuth();
    const firestore = ensureDb();
    const user = firebaseAuth.currentUser;
    
    if (!user || !user.email) {
      throw new Error('No hay usuario autenticado');
    }

    // Reautenticar usuario antes de cambiar email
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // Cambiar email en Auth
    await updateEmail(user, newEmail);

    // Actualizar email en Firestore
    await updateDoc(doc(firestore, 'users', user.uid), {
      email: newEmail,
      updatedAt: new Date()
    });
  } catch (error: any) {
    if (error.code === 'auth/wrong-password') {
      throw new Error('La contraseña es incorrecta');
    } else if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este email ya está en uso');
    }
    throw new Error(error.message || 'Error al cambiar email');
  }
};

// Eliminar cuenta de usuario
export const deleteUserAccount = async (password: string): Promise<void> => {
  try {
    const firebaseAuth = ensureAuth();
    const firestore = ensureDb();
    const user = firebaseAuth.currentUser;
    
    if (!user || !user.email) {
      throw new Error('No hay usuario autenticado');
    }

    // Reautenticar usuario antes de eliminar
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    // Eliminar documento de Firestore
    await deleteDoc(doc(firestore, 'users', user.uid));

    // Eliminar cuenta de Auth
    await deleteUser(user);
  } catch (error: any) {
    if (error.code === 'auth/wrong-password') {
      throw new Error('La contraseña es incorrecta');
    }
    throw new Error(error.message || 'Error al eliminar cuenta');
  }
};

