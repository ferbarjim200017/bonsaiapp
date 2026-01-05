'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, Truck, Check } from 'lucide-react';
import { updatePedido } from '@/lib/firebase/firestore';

interface ItemPedido {
  id: string;
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
}

export default function DetallePedido({ params }: { params: { id: string } }) {
  const router = useRouter();

  // Mock de pedido
  const [pedido] = useState({
    id: params.id,
    numero: '2025-001',
    fecha: new Date('2025-01-15'),
    estado: 'preparando' as 'nuevo' | 'pagado' | 'preparando' | 'enviado' | 'entregado',
    cliente: {
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      telefono: '+34 600 123 456',
    },
    direccionEnvio: {
      calle: 'Calle Mayor, 123',
      ciudad: 'Madrid',
      codigoPostal: '28001',
      provincia: 'Madrid',
    },
    items: [
      {
        id: '1',
        nombre: 'Bonsái Ficus Retusa',
        imagen: '/productos/bonsai-ficus.jpg',
        precio: 34.99,
        cantidad: 2,
      },
      {
        id: '2',
        nombre: 'Kit Herramientas Básicas',
        imagen: '/productos/kit-herramientas.jpg',
        precio: 19.99,
        cantidad: 1,
      },
    ] as ItemPedido[],
    subtotal: 89.97,
    envio: 5.99,
    descuento: 0,
    total: 95.96,
    metodoPago: 'Tarjeta de crédito',
    codigoSeguimiento: '',
  });

  const [nuevoEstado, setNuevoEstado] = useState(pedido.estado);
  const [codigoSeguimiento, setCodigoSeguimiento] = useState(pedido.codigoSeguimiento);
  const [guardando, setGuardando] = useState(false);

  const actualizarPedido = async () => {
    setGuardando(true);
    
    try {
      // Actualizar pedido en Firebase
      await updatePedido(params.id, {
        estado: nuevoEstado,
        ...(codigoSeguimiento && { codigoSeguimiento }),
      } as any);
      
      alert('✅ Pedido actualizado exitosamente!');
      setGuardando(false);
    } catch (error) {
      console.error('Error actualizando pedido:', error);
      alert('❌ Error al actualizar el pedido.');
      setGuardando(false);
    }
  };

  const estadoConfig = {
    nuevo: { label: 'Nuevo', color: 'bg-blue-100 text-blue-800', icon: Package },
    pagado: { label: 'Pagado', color: 'bg-green-100 text-green-800', icon: Check },
    preparando: { label: 'Preparando', color: 'bg-yellow-100 text-yellow-800', icon: Package },
    enviado: { label: 'Enviado', color: 'bg-purple-100 text-purple-800', icon: Truck },
    entregado: { label: 'Entregado', color: 'bg-gray-100 text-gray-800', icon: Check },
  };

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
              {pedido.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0" />
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
                  {pedido.cliente.nombre}
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
              <div>{pedido.direccionEnvio.calle}</div>
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
