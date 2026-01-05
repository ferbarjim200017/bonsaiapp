'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, ChevronDown } from 'lucide-react';
import { getPedidos } from '@/lib/firebase/firestore';
import { pedidosMock, type Pedido } from '@/lib/mockPedidos';

const estadoConfig = {
  nuevo: { label: 'Nuevo', color: 'bg-blue-100 text-blue-800' },
  pagado: { label: 'Pagado', color: 'bg-green-100 text-green-800' },
  preparando: { label: 'Preparando', color: 'bg-yellow-100 text-yellow-800' },
  enviado: { label: 'Enviado', color: 'bg-purple-100 text-purple-800' },
  entregado: { label: 'Entregado', color: 'bg-gray-100 text-gray-800' },
  cancelado: { label: 'Cancelado', color: 'bg-red-100 text-red-800' },
};

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    setCargando(true);
    try {
      const pedidosData = await getPedidos();
      setPedidos(pedidosData.length > 0 ? pedidosData : pedidosMock);
    } catch (error) {
      console.error('Error cargando pedidos:', error);
      setPedidos(pedidosMock);
    } finally {
      setCargando(false);
    }
  };

  const pedidosFiltrados = pedidos.filter(
    (pedido) => filtroEstado === 'todos' || pedido.estado === filtroEstado
  );

  const formatoFecha = (fecha: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(fecha);
  };

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gestiona los pedidos de tu tienda
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Estado:</label>
          <div className="relative">
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="input pr-10"
            >
              <option value="todos">Todos</option>
              <option value="nuevo">Nuevos</option>
              <option value="pagado">Pagados</option>
              <option value="preparando">Preparando</option>
              <option value="enviado">Enviados</option>
              <option value="entregado">Entregados</option>
              <option value="cancelado">Cancelados</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Lista de pedidos */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Pedido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pedidosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No hay pedidos con este estado
                  </td>
                </tr>
              ) : (
                pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{pedido.numero}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {formatoFecha(pedido.fecha)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {pedido.cliente.nombre}
                        </div>
                        <div className="text-gray-500">{pedido.cliente.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {pedido.items} {pedido.items === 1 ? 'producto' : 'productos'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {pedido.total.toFixed(2)}€
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          estadoConfig[pedido.estado].color
                        }`}
                      >
                        {estadoConfig[pedido.estado].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/pedidos/${pedido.id}`}
                        className="text-primary-600 hover:text-primary-900 inline-flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(estadoConfig)
          .filter(([estado]) => estado !== 'cancelado')
          .map(([estado, config]) => {
            const cantidad = pedidos.filter((p) => p.estado === estado).length;
            return (
              <div key={estado} className="bg-white shadow rounded-lg p-4">
                <div className="text-sm text-gray-600">{config.label}</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  {cantidad}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
