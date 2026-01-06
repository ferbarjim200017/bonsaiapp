'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthChange, loginUser, logoutUser, getUserProfile } from '@/lib/firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';

interface User {
  id: string;
  uid: string; // Firebase UID
  email: string;
  nombre: string;
  rol: 'admin' | 'cliente';
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Observar cambios en autenticación de Firebase
    try {
      const unsubscribe = onAuthChange(async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          // Usuario autenticado - obtener perfil de Firestore
          const profile = await getUserProfile(firebaseUser.uid);
          
          if (profile) {
            setUser({
              id: profile.uid,
              uid: profile.uid,
              email: profile.email,
              nombre: profile.nombre,
              rol: profile.rol,
            });
          } else {
            setUser(null);
          }
        } else {
          // Usuario no autenticado
          setUser(null);
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Firebase auth not available:', error);
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Intentar login con Firebase
      const profile = await loginUser(email, password);
      
      setUser({
        id: profile.uid,
        uid: profile.uid,
        email: profile.email,
        nombre: profile.nombre,
        rol: profile.rol,
      });
      
      return true;
    } catch (error: any) {
      console.error('Error en login Firebase:', error);
      
      // FALLBACK: Usar usuarios mock si Firebase falla
      // Esto permite probar la app mientras configuras Firebase
      console.log('⚠️ Usando autenticación mock de respaldo');
      
      const mockUsers = [
        { id: 'mock-1', uid: 'mock-1', email: 'admin@bonsáishop.es', nombre: 'Administrador', rol: 'admin' as const, password: 'admin123' },
        { id: 'mock-2', uid: 'mock-2', email: 'cliente@test.com', nombre: 'Cliente Test', rol: 'cliente' as const, password: 'cliente123' },
      ];
      
      const mockUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (mockUser) {
        const { password: _, ...userWithoutPassword } = mockUser;
        setUser(userWithoutPassword);
        return true;
      }
      
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      // Limpiar preferencia de recordarme al cerrar sesión
      localStorage.removeItem('rememberMe');
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

  const isAdmin = user?.rol === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
