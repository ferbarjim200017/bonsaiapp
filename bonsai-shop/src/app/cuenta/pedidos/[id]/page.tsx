'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, Truck, Check, Clock } from 'lucide-react';
import { getPedidoById } from '@/lib/firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import type { Pedido } from '@/lib/mockPedidos';

export default function DetallePedidoCliente({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (user) {
      cargarPedido();
    }
  }, [params.id, user]);

  const cargarPedido = async () => {
    setCargando(true);
    try {
      const pedidoData = await getPedidoById(params.id);
      if (pedidoData) {
        // Verificar que el pedido pertenece al usuario
        if (pedidoData.userId !== user?.uid) {
          alert('No tienes permiso para ver este pedido');
          router.push('/cuenta/pedidos');
          return;
        }
        setPedido(pedidoData);
      } else {
        alert('Pedido no encontrado');
        router.push('/cuenta/pedidos');
      }
    } catch (error) {
      console.error('Error cargando pedido:', error);
      alert('Error al cargar el pedido');
      router.push('/cuenta/pedidos');
    } finally {
      setCargando(false);
    }
  };

  const estadoConfig = {
    nuevo: { 
      label: 'Nuevo', 
      color: 'bg-blue-100 text-blue-800',
      icon: Clock,
      descripcion: 'Tu pedido ha sido recibido y está siendo procesado'
    },
    pagado: { 
      label: 'Pagado', 
      color: 'bg-green-100 text-green-800',
      icon: Check,
      descripcion: 'El pago ha sido confirmado'
    },
    preparando: { 
      label: 'Preparando', 
      color: 'bg-yellow-100 text-yellow-800',
      icon: Package,
      descripcion: 'Estamos preparando tu pedido para el envío'
    },
    enviado: { 
      label: 'Enviado', 
      color: 'bg-purple-100 text-purple-800',
      icon: Truck,
      descripcion: 'Tu pedido está en camino'
    },
    entregado: { 
      label: 'Entregado', 
      color: 'bg-gray-100 text-gray-800',
      icon: Check,
      descripcion: 'Tu pedido ha sido entregado'
    },
    cancelado: { 
      label: 'Cancelado', 
      color: 'bg-red-100 text-red-800',
      icon: Package,
      descripcion: 'Este pedido ha sido cancelado'
    },
  };

  const formatoFecha = (fecha: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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
            <p className="text-gray-600">Cargando pedido...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!pedido) {
    return null;
  }

  const EstadoIcon = estadoConfig[pedido.estado].icon;

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link 
            href="/cuenta/pedidos" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a mis pedidos
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Pedido #{pedido.numero}
              </h1>
              <p className="text-gray-600 mt-1">
                Realizado el {formatoFecha(pedido.fecha)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                  estadoConfig[pedido.estado].color
                }`}
              >
                <EstadoIcon className="h-4 w-4" />
                {estadoConfig[pedido.estado].label}
              </span>
            </div>
          </div>
        </div>

        {/* Estado del pedido */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <EstadoIcon className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                Estado del pedido: {estadoConfig[pedido.estado].label}
              </h3>
              <p className="text-sm text-blue-800">
                {estadoConfig[pedido.estado].descripcion}
              </p>
              {pedido.codigoSeguimiento && (
                <div className="mt-2 pt-2 border-t border-blue-200">
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Código de seguimiento:</span>{' '}
                    <span className="font-mono">{pedido.codigoSeguimiento}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Productos */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Productos ({pedido.items})
              </h2>
              <div className="space-y-4">
                {pedido.productos.map((item, index) => (
                  <div key={item.productoId || index} className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                    <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                      {item.imagen && (
                        <img 
                          src={item.imagen} 
                          alt={item.nombre} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.nombre}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Cantidad: {item.cantidad}
                      </p>
                      <p className="text-sm text-gray-600">
                        Precio unitario: {formatoPrecio(item.precio)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatoPrecio(item.precio * item.cantidad)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatoPrecio(pedido.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envío</span>
                  <span className="text-gray-900">
                    {pedido.envio === 0 ? 'Gratis' : formatoPrecio(pedido.envio)}
                  </span>
                </div>
                {pedido.descuento > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Descuento</span>
                    <span className="text-green-600">
                      -{formatoPrecio(pedido.descuento)}
                    </span>
                  </div>
                )}
                {pedido.cuponAplicado && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cupón aplicado</span>
                    <span className="font-mono text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {pedido.cuponAplicado}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{formatoPrecio(pedido.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna lateral */}
          <div className="space-y-6">
            {/* Dirección de envío */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Dirección de Envío
              </h2>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="font-medium text-gray-900">
                  {pedido.cliente.nombre} {pedido.cliente.apellidos}
                </div>
                <div>{pedido.direccionEnvio.direccion}</div>
                <div>
                  {pedido.direccionEnvio.codigoPostal} {pedido.direccionEnvio.ciudad}
                </div>
                <div>{pedido.direccionEnvio.provincia}</div>
              </div>
            </div>

            {/* Información de contacto */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Información de Contacto
              </h2>
              <div className="text-sm text-gray-600 space-y-2">
                <div>
                  <span className="text-gray-500">Email:</span>
                  <div className="text-gray-900">{pedido.cliente.email}</div>
                </div>
                {pedido.cliente.telefono && (
                  <div>
                    <span className="text-gray-500">Teléfono:</span>
                    <div className="text-gray-900">{pedido.cliente.telefono}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Método de pago */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Método de Pago
              </h2>
              <div className="text-sm text-gray-900 capitalize">{pedido.metodoPago}</div>
            </div>

            {/* Ayuda */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">¿Necesitas ayuda?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.
              </p>
              <Link
                href="/contacto"
                className="btn btn-outline w-full"
              >
                Contactar soporte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
