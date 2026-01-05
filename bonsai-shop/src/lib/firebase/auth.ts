import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

export interface UserProfile {
  uid: string;
  email: string;
  nombre: string;
  rol: 'admin' | 'cliente';
  createdAt: Date;
}

// Registrar nuevo usuario
export const registerUser = async (
  email: string,
  password: string,
  nombre: string,
  rol: 'admin' | 'cliente' = 'cliente'
): Promise<UserProfile> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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

    await setDoc(doc(db, 'users', user.uid), userProfile);

    return userProfile;
  } catch (error: any) {
    throw new Error(error.message || 'Error al registrar usuario');
  }
};

// Iniciar sesión
export const loginUser = async (email: string, password: string): Promise<UserProfile> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Obtener perfil de Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
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
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || 'Error al cerrar sesión');
  }
};

// Obtener perfil de usuario
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    
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
  return onAuthStateChanged(auth, callback);
};
