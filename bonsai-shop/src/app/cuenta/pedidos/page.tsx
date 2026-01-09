'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getPedidos } from '@/lib/firebase/firestore';
import Link from 'next/link';
import { Package, ChevronRight } from 'lucide-react';
import type { Pedido } from '@/lib/mockPedidos';

const estadoConfig = {
  nuevo: { label: 'Nuevo', color: 'bg-blue-100 text-blue-800' },
  pagado: { label: 'Pagado', color: 'bg-green-100 text-green-800' },
  preparando: { label: 'Preparando', color: 'bg-yellow-100 text-yellow-800' },
  enviado: { label: 'Enviado', color: 'bg-purple-100 text-purple-800' },
  entregado: { label: 'Entregado', color: 'bg-gray-100 text-gray-800' },
  cancelado: { label: 'Cancelado', color: 'bg-red-100 text-red-800' },
};

export default function MisPedidosPage() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarPedidos();
  }, [user]);

  const cargarPedidos = async () => {
    if (!user?.uid) {
      setCargando(false);
      return;
    }

    setCargando(true);
    try {
      const pedidosData = await getPedidos({ userId: user.uid });
      setPedidos(pedidosData);
    } catch (error) {
      console.error('Error cargando pedidos:', error);
    } finally {
      setCargando(false);
    }
  };

  const formatoFecha = (fecha: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(fecha);
  };

  const formatoPrecio = (precio: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(precio);

  if (!user) {
    return (
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Inicia sesión</h2>
            <p className="text-gray-600 mb-6">
              Debes iniciar sesión para ver tus pedidos
            </p>
            <Link
              href="/cuenta/login"
              className="btn btn-primary inline-block"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cargando) {
    return (
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando pedidos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis pedidos</h1>
          <p className="text-gray-600">
            Consulta el estado de tus pedidos y el historial de compras
          </p>
        </div>

        {pedidos.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes pedidos aún
            </h2>
            <p className="text-gray-600 mb-6">
              Cuando realices un pedido, aparecerá aquí
            </p>
            <Link
              href="/catalogo"
              className="btn btn-primary inline-block"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {pedidos.map((pedido) => (
              <div
                key={pedido.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Información principal */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Pedido #{pedido.numero}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          estadoConfig[pedido.estado].color
                        }`}
                      >
                        {estadoConfig[pedido.estado].label}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Fecha: {formatoFecha(pedido.fecha)}</p>
                      <p>
                        {pedido.items} {pedido.items === 1 ? 'artículo' : 'artículos'} • Total: {formatoPrecio(pedido.total)}
                      </p>
                    </div>
                  </div>

                  {/* Botón de detalles */}
                  <Link
                    href={`/cuenta/pedidos/${pedido.id}`}
                    className="btn btn-outline flex items-center gap-2 justify-center"
                  >
                    Ver detalles
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Productos */}
                {pedido.productos && pedido.productos.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {pedido.productos.slice(0, 3).map((producto, idx) => (
                        <div key={idx} className="flex-shrink-0">
                          <div className="text-xs text-gray-600">
                            {producto.nombre} x {producto.cantidad}
                          </div>
                        </div>
                      ))}
                      {pedido.productos.length > 3 && (
                        <div className="flex-shrink-0 text-xs text-gray-500">
                          +{pedido.productos.length - 3} más
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
