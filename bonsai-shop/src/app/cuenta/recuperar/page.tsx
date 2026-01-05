'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function RecuperarPage() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    // Mock de envío de email
    setTimeout(() => {
      setEnviado(true);
      setCargando(false);
    }, 1500);
  };

  if (enviado) {
    return (
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
              <CheckCircle className="h-8 w-8" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Email enviado!
            </h1>
            
            <p className="text-gray-600 mb-8">
              Hemos enviado un enlace de recuperación a <strong>{email}</strong>.
              Revisa tu bandeja de entrada y sigue las instrucciones.
            </p>

            <div className="space-y-3">
              <Link
                href="/cuenta/login"
                className="btn btn-primary w-full inline-flex items-center justify-center"
              >
                Volver a iniciar sesión
              </Link>
              
              <button
                onClick={() => setEnviado(false)}
                className="btn btn-outline w-full"
              >
                Enviar otro correo
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Si no recibes el email en unos minutos, revisa tu carpeta de spam.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/cuenta/login"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a iniciar sesión
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-700 mb-6">
            <Mail className="h-8 w-8" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recuperar contraseña
          </h1>
          
          <p className="text-gray-600">
            Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10 w-full"
                placeholder="tu@email.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="btn btn-primary w-full"
          >
            {cargando ? 'Enviando...' : 'Enviar enlace de recuperación'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link href="/cuenta/registro" className="font-medium text-primary-700 hover:text-primary-800">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
