'use client';

import Link from 'next/link';
import { User, Package, MapPin, Settings, LogOut } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CuentaPage() {
  const { user, logout, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 text-gray-400 mb-6">
              <User className="h-8 w-8" aria-hidden="true" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Accede a tu cuenta
            </h1>
            
            <p className="text-gray-600 mb-8">
              Inicia sesión para ver tus pedidos, direcciones guardadas y más.
            </p>

            <div className="space-y-4">
              <Link
                href="/cuenta/login"
                className="btn btn-primary w-full inline-flex items-center justify-center"
              >
                Iniciar sesión
              </Link>
              
              <Link
                href="/cuenta/registro"
                className="btn btn-outline w-full inline-flex items-center justify-center"
              >
                Crear cuenta
              </Link>
            </div>

            <p className="text-sm text-gray-600 mt-6">
              ¿Olvidaste tu contraseña?{' '}
              <Link href="/cuenta/recuperar" className="text-primary-700 hover:underline">
                Recupérala aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Usuario autenticado - mostrar dashboard
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mi cuenta</h1>
            <p className="text-gray-600 mt-1">Bienvenido, {user.nombre}</p>
          </div>
          <div className="flex gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="btn btn-secondary"
              >
                Panel Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="btn btn-outline flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mis pedidos */}
          <Link
            href="/cuenta/pedidos"
            className="group border-2 border-gray-200 rounded-lg p-6 hover:border-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <Package className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700">
                  Mis pedidos
                </h2>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Ver el estado de tus pedidos, tracking y descargar facturas
            </p>
          </Link>

          {/* Direcciones */}
          <Link
            href="/cuenta/direcciones"
            className="group border-2 border-gray-200 rounded-lg p-6 hover:border-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700">
                  Direcciones
                </h2>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Gestionar tus direcciones de envío guardadas
            </p>
          </Link>

          {/* Configuración */}
          <Link
            href="/cuenta/configuracion"
            className="group border-2 border-gray-200 rounded-lg p-6 hover:border-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <Settings className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700">
                  Configuración
                </h2>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Actualizar datos personales, contraseña y preferencias
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
