'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ConfirmacionPage() {
  const searchParams = useSearchParams();
  const numeroPedido = searchParams.get('pedido') || 'BON-XXXXX';

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Icono de éxito */}
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 text-green-600 mb-6">
            <CheckCircle className="h-12 w-12" aria-hidden="true" />
          </div>

          {/* Mensaje principal */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¡Pedido realizado con éxito!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Gracias por tu compra. Hemos recibido tu pedido correctamente.
          </p>

          {/* Número de pedido */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Número de pedido:</p>
            <p className="text-2xl font-bold text-primary-700">{numeroPedido}</p>
          </div>

          {/* Información adicional */}
          <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-600 flex-shrink-0 mt-1" aria-hidden="true" />
              <p className="text-sm text-gray-700">
                Te hemos enviado un email de confirmación con los detalles de tu pedido y la información de seguimiento.
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-gray-600 flex-shrink-0 mt-1" aria-hidden="true" />
              <p className="text-sm text-gray-700">
                Prepararemos tu pedido en las próximas 24-48 horas. Recibirás un nuevo email cuando se envíe con el número de seguimiento.
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cuenta/pedidos">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Ver mis pedidos
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Volver al inicio
              </Button>
            </Link>
          </div>

          {/* Información de cuidados */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              💡 <strong>Consejo:</strong> Cuando recibas tu bonsái, consulta nuestra guía de cuidados para asegurar su correcto mantenimiento.
            </p>
            <Link
              href="/cuidados"
              className="text-primary-700 hover:text-primary-800 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded px-2 py-1"
            >
              Ver guía de cuidados →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
