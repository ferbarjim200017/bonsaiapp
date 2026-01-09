'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, Truck, Check } from 'lucide-react';
import { getPedidoById, updatePedido } from '@/lib/firebase/firestore';
import type { Pedido } from '@/lib/mockPedidos';

export default function DetallePedido({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [cargando, setCargando] = useState(true);
  const [nuevoEstado, setNuevoEstado] = useState<Pedido['estado']>('nuevo');
  const [codigoSeguimiento, setCodigoSeguimiento] = useState('');
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    cargarPedido();
  }, [params.id]);

  const cargarPedido = async () => {
    setCargando(true);
    try {
      const pedidoData = await getPedidoById(params.id);
      if (pedidoData) {
        setPedido(pedidoData);
        setNuevoEstado(pedidoData.estado);
        setCodigoSeguimiento(pedidoData.codigoSeguimiento || '');
      } else {
        alert('Pedido no encontrado');
        router.push('/admin/pedidos');
      }
    } catch (error) {
      console.error('Error cargando pedido:', error);
      alert('Error al cargar el pedido');
      router.push('/admin/pedidos');
    } finally {
      setCargando(false);
    }
  };

  const actualizarPedido = async () => {
    setGuardando(true);
    
    try {
      // Actualizar pedido en Firebase
      await updatePedido(params.id, {
        estado: nuevoEstado,
        ...(codigoSeguimiento && { codigoSeguimiento }),
      } as any);
      
      alert('✅ Pedido actualizado exitosamente!');
      // Recargar el pedido para mostrar datos actualizados
      await cargarPedido();
    } catch (error) {
      console.error('Error actualizando pedido:', error);
      alert('❌ Error al actualizar el pedido.');
    } finally {
      setGuardando(false);
    }
  };

  const estadoConfig = {
    nuevo: { label: 'Nuevo', color: 'bg-blue-100 text-blue-800', icon: Package },
    pagado: { label: 'Pagado', color: 'bg-green-100 text-green-800', icon: Check },
    preparando: { label: 'Preparando', color: 'bg-yellow-100 text-yellow-800', icon: Package },
    enviado: { label: 'Enviado', color: 'bg-purple-100 text-purple-800', icon: Truck },
    entregado: { label: 'Entregado', color: 'bg-gray-100 text-gray-800', icon: Check },
    cancelado: { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: Package },
  };

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando pedido...</p>
        </div>
      </div>
    );
  }

  if (!pedido) {
    return null;
  }

  const EstadoIcon = estadoConfig[pedido.estado].icon;

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/pedidos" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Pedido #{pedido.numero}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {new Intl.DateTimeFormat('es-ES', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }).format(pedido.fecha)}
          </p>
        </div>
        <div className="ml-auto">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
              estadoConfig[pedido.estado].color
            }`}
          >
            <EstadoIcon className="h-4 w-4" />
            {estadoConfig[pedido.estado].label}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Productos */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Productos
            </h2>
            <div className="space-y-4">
              {pedido.productos.map((item, index) => (
                <div key={item.productoId || index} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                    {item.imagen && (
                      <img 
                        src={item.imagen} 
                        alt={item.nombre} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.nombre}</div>
                    <div className="text-sm text-gray-600">
                      Cantidad: {item.cantidad}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {(item.precio * item.cantidad).toFixed(2)}€
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.precio.toFixed(2)}€ c/u
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">{pedido.subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Envío</span>
                <span className="text-gray-900">{pedido.envio.toFixed(2)}€</span>
              </div>
              {pedido.descuento > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Descuento</span>
                  <span className="text-green-600">
                    -{pedido.descuento.toFixed(2)}€
                  </span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">{pedido.total.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          {/* Gestión del pedido */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Gestión del Pedido
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado del Pedido
                </label>
                <select
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value as typeof nuevoEstado)}
                  className="input w-full"
                >
                  <option value="nuevo">Nuevo</option>
                  <option value="pagado">Pagado</option>
                  <option value="preparando">Preparando</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregado">Entregado</option>
                </select>
              </div>

              {(nuevoEstado === 'enviado' || nuevoEstado === 'entregado') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código de Seguimiento
                  </label>
                  <input
                    type="text"
                    value={codigoSeguimiento}
                    onChange={(e) => setCodigoSeguimiento(e.target.value)}
                    className="input w-full"
                    placeholder="Ej: ES123456789"
                  />
                </div>
              )}

              <button
                onClick={actualizarPedido}
                disabled={guardando}
                className="btn btn-primary w-full"
              >
                {guardando ? 'Guardando...' : 'Actualizar Pedido'}
              </button>
            </div>
          </div>
        </div>

        {/* Columna lateral */}
        <div className="space-y-6">
          {/* Información del cliente */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Cliente</h2>
            <div className="space-y-2 text-sm">
              <div>
                <div className="font-medium text-gray-900">
                  {pedido.cliente.nombre} {pedido.cliente.apellidos}
                </div>
                <div className="text-gray-600">{pedido.cliente.email}</div>
                <div className="text-gray-600">{pedido.cliente.telefono}</div>
              </div>
            </div>
          </div>

          {/* Dirección de envío */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Dirección de Envío
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              <div>{pedido.direccionEnvio.direccion}</div>
              <div>
                {pedido.direccionEnvio.codigoPostal} {pedido.direccionEnvio.ciudad}
              </div>
              <div>{pedido.direccionEnvio.provincia}</div>
            </div>
          </div>

          {/* Método de pago */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Método de Pago
            </h2>
            <div className="text-sm text-gray-600">{pedido.metodoPago}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
