'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Tag, ShoppingBag, TrendingUp } from 'lucide-react';
import { getProductos, getCupones, getPedidos } from '@/lib/firebase/firestore';
import type { Producto } from '@/types';

export default function AdminDashboard() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cuponesActivos, setCuponesActivos] = useState(0);
  const [pedidosPendientes, setPedidosPendientes] = useState(0);
  const [cargando, setCargando] = useState(true);
  
  // Cargar productos, cupones y pedidos de Firebase
  useEffect(() => {
    const cargarDatos = async () => {
      const [productosData, cuponesData, pedidosData] = await Promise.all([
        getProductos(),
        getCupones(true), // Solo cupones activos
        getPedidos() // Todos los pedidos
      ]);
      
      setProductos(productosData);
      setCuponesActivos(cuponesData.length);
      
      // Contar pedidos pendientes (no entregados ni cancelados)
      const pendientes = pedidosData.filter(
        (pedido) => pedido.estado !== 'entregado' && pedido.estado !== 'cancelado'
      ).length;
      setPedidosPendientes(pendientes);
      
      setCargando(false);
    };
    
    cargarDatos();
  }, []);
  
  const stats = [
    {
      name: 'Total Productos',
      value: productos.length,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      name: 'En Stock',
      value: productos.filter(p => p.stock > 0).length,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      name: 'Cupones Activos',
      value: cuponesActivos,
      icon: Tag,
      color: 'bg-purple-500',
    },
    {
      name: 'Pedidos Pendientes',
      value: pedidosPendientes,
      icon: ShoppingBag,
      color: 'bg-orange-500',
    },
  ];

  const quickActions = [
    { name: 'Crear Producto', href: '/admin/productos/nuevo', color: 'btn-primary' },
    { name: 'Crear Cupón', href: '/admin/cupones/nuevo', color: 'btn-primary' },
    { name: 'Ver Pedidos', href: '/admin/pedidos', color: 'btn-outline' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Bienvenido al panel de administración de Bonsai Shop
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-3xl font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Acciones rápidas
        </h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className={`btn ${action.color}`}
            >
              {action.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Productos recientes */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Productos recientes
        </h2>
        {cargando ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Cargando productos...</p>
          </div>
        ) : productos.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay productos aún</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Producto
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Categoría
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Precio
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Stock
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productos.slice(0, 5).map((producto) => (
                    <tr key={producto.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {producto.nombre}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                        {producto.categoria}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {new Intl.NumberFormat('es-ES', {
                          style: 'currency',
                          currency: 'EUR',
                        }).format(producto.precio)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            producto.stock > 5
                              ? 'bg-green-100 text-green-800'
                              : producto.stock > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {producto.stock} unidades
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <Link
                href="/admin/productos"
                className="text-primary-700 hover:text-primary-800 font-medium text-sm"
              >
                Ver todos los productos →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
