'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { getProductos, deleteProducto } from '@/lib/firebase/firestore';
import type { Producto } from '@/types';

export default function AdminProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  // Cargar productos desde Firebase
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setCargando(true);
    try {
      const productosFirebase = await getProductos();
      setProductos(productosFirebase);
    } catch (error) {
      console.error('Error cargando productos:', error);
      setProductos([]);
    } finally {
      setCargando(false);
    }
  };

  const handleDelete = async (id: string, nombre: string) => {
    if (confirm(`¿Eliminar el producto "${nombre}"?`)) {
      try {
        await deleteProducto(id);
        alert('✅ Producto eliminado exitosamente');
        cargarProductos(); // Recargar lista
      } catch (error) {
        console.error('Error eliminando producto:', error);
        alert('❌ Error al eliminar el producto');
      }
    }
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.especie?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const formatoPrecio = (precio: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(precio);

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gestiona todos los productos de la tienda
          </p>
        </div>
        <Link href="/admin/productos/nuevo" className="btn btn-primary">
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Producto
        </Link>
      </div>

      {/* Buscador */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o especie..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input pl-10 w-full"
          />
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Imagen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Stock
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
              {productosFiltrados.map((producto) => (
                <tr key={producto.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
                      {producto.imagenes[0] ? (
                        <img
                          src={producto.imagenes[0]}
                          alt={producto.nombre}
                          className="h-full w-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">Sin imagen</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{producto.nombre}</div>
                    {producto.especie && (
                      <div className="text-sm text-gray-500">{producto.especie}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                      {producto.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatoPrecio(producto.precio)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        producto.publicado
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {producto.publicado ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Link
                      href={`/admin/productos/editar/${producto.id}`}
                      className="text-primary-600 hover:text-primary-900 inline-flex items-center"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-900 inline-flex items-center"
                      onClick={() => handleDelete(producto.id, producto.nombre)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {productosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {busqueda ? 'No se encontraron productos con ese criterio' : 'No hay productos aún'}
          </p>
          {!busqueda && (
            <Link href="/admin/productos/nuevo" className="btn btn-primary mt-4">
              Crear primer producto
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
