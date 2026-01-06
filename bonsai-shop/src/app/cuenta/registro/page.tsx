'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { registerUser } from '@/lib/firebase/auth';

export default function RegistroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    aceptaTerminos: false,
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!formData.aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    setCargando(true);

    try {
      // Registrar usuario en Firebase
      await registerUser(formData.email, formData.password, formData.nombre, 'cliente');
      
      alert('¡Cuenta creada exitosamente!\nAhora puedes iniciar sesión con tus credenciales.');
      router.push('/cuenta/login');
    } catch (error: any) {
      console.error('Error en registro:', error);
      
      // Mensajes de error amigables
      if (error.message.includes('email-already-in-use')) {
        setError('Este correo electrónico ya está registrado');
      } else if (error.message.includes('invalid-email')) {
        setError('El correo electrónico no es válido');
      } else if (error.message.includes('weak-password')) {
        setError('La contraseña es demasiado débil');
      } else {
        setError('Error al crear la cuenta. Por favor, intenta de nuevo.');
      }
      setCargando(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-700 mb-6">
            <User className="h-8 w-8" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crear cuenta
          </h1>
          
          <p className="text-gray-600">
            Únete a Bonsái Shop y empieza a comprar
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="nombre"
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="input pl-10 w-full"
                placeholder="Juan Pérez"
                required
                autoComplete="name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input pl-10 w-full"
                placeholder="tu@email.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input pl-10 w-full"
                placeholder="••••••••"
                required
                autoComplete="new-password"
                minLength={6}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Mínimo 6 caracteres
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="input pl-10 w-full"
                placeholder="••••••••"
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terminos"
                type="checkbox"
                checked={formData.aceptaTerminos}
                onChange={(e) => setFormData({ ...formData, aceptaTerminos: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terminos" className="text-gray-700">
                Acepto los{' '}
                <Link href="/terminos" className="font-medium text-primary-700 hover:text-primary-800">
                  términos y condiciones
                </Link>
                {' '}y la{' '}
                <Link href="/privacidad" className="font-medium text-primary-700 hover:text-primary-800">
                  política de privacidad
                </Link>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="btn btn-primary w-full"
          >
            {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link href="/cuenta/login" className="font-medium text-primary-700 hover:text-primary-800">
              Inicia sesión
            </Link>
          </p>
        </div>

        {/* Beneficios de crear cuenta */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-900 mb-3">
            ✨ Beneficios de tener una cuenta:
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary-600 flex-shrink-0 mt-0.5" />
              <span>Seguimiento de pedidos en tiempo real</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary-600 flex-shrink-0 mt-0.5" />
              <span>Direcciones guardadas para checkout rápido</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary-600 flex-shrink-0 mt-0.5" />
              <span>Acceso a ofertas exclusivas</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
