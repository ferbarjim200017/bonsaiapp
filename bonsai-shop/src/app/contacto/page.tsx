'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ContactoPage() {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);

    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setEnviando(false);
    setEnviado(true);

    // Resetear formulario y mensaje tras 3 segundos
    setTimeout(() => {
      setEnviado(false);
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h1>
          <p className="text-lg text-gray-600">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información de contacto */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Información de contacto</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary-600 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <a
                      href="mailto:info@bonsaishop.es"
                      className="text-sm text-primary-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                    >
                      info@bonsaishop.es
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary-600 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Teléfono</p>
                    <a
                      href="tel:+34900123456"
                      className="text-sm text-primary-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                    >
                      900 123 456
                    </a>
                    <p className="text-xs text-gray-600 mt-1">Lun-Vie: 9:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary-600 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Ubicación</p>
                    <p className="text-sm text-gray-600">Madrid, España</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                ¿Tienes una incidencia con tu pedido?
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Si tu pedido llegó dañado o con problemas, adjunta fotos en el formulario.
                Responderemos en 24h.
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 mb-2">
                    Nombre <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="input"
                    autoComplete="given-name"
                  />
                </div>

                <div>
                  <label htmlFor="apellidos" className="block text-sm font-medium text-gray-900 mb-2">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    className="input"
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="input"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-900 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  className="input"
                  autoComplete="tel"
                  placeholder="600123456"
                />
              </div>

              <div>
                <label htmlFor="numeroPedido" className="block text-sm font-medium text-gray-900 mb-2">
                  Número de pedido (si aplica)
                </label>
                <input
                  type="text"
                  id="numeroPedido"
                  name="numeroPedido"
                  className="input"
                  placeholder="BON-XXXXX"
                />
              </div>

              <div>
                <label htmlFor="motivo" className="block text-sm font-medium text-gray-900 mb-2">
                  Motivo del contacto <span className="text-red-600">*</span>
                </label>
                <select
                  id="motivo"
                  name="motivo"
                  required
                  className="input"
                >
                  <option value="">Selecciona un motivo</option>
                  <option value="consulta-general">Consulta general</option>
                  <option value="cuidados">Pregunta sobre cuidados</option>
                  <option value="pedido">Estado de pedido</option>
                  <option value="incidencia">Incidencia con pedido</option>
                  <option value="devolucion">Devolución</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-900 mb-2">
                  Mensaje <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={6}
                  className="input resize-none"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                />
              </div>

              <div>
                <label htmlFor="adjuntos" className="block text-sm font-medium text-gray-900 mb-2">
                  Adjuntar fotos (opcional)
                </label>
                <input
                  type="file"
                  id="adjuntos"
                  name="adjuntos"
                  multiple
                  accept="image/*"
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Importante si reportas una incidencia con tu bonsái
                </p>
              </div>

              {enviado && (
                <div
                  className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md"
                  role="alert"
                >
                  ✓ Mensaje enviado correctamente. Te responderemos pronto.
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={enviando || enviado}
              >
                {enviando ? (
                  'Enviando...'
                ) : enviado ? (
                  '✓ Enviado'
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                    Enviar mensaje
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-600 text-center">
                Al enviar este formulario, aceptas nuestra{' '}
                <a href="/privacidad" className="text-primary-700 hover:underline">
                  política de privacidad
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
