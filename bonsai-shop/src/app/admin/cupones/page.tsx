'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Copy } from 'lucide-react';
import { getCupones, deleteCupon } from '@/lib/firebase/firestore';

interface Cupon {
  id: string;
  codigo: string;
  tipo: 'porcentaje' | 'fijo';
  valor: number;
  minimoCompra?: number;
  usoMaximo?: number;
  usosActuales: number;
  fechaInicio: Date;
  fechaFin: Date;
  activo: boolean;
}

const cuponesMock: Cupon[] = [
  {
    id: '1',
    codigo: 'BIENVENIDA10',
    tipo: 'porcentaje',
    valor: 10,
    minimoCompra: 30,
    usoMaximo: 100,
    usosActuales: 23,
    fechaInicio: new Date('2025-01-01'),
    fechaFin: new Date('2025-12-31'),
    activo: true,
  },
  {
    id: '2',
    codigo: 'VERANO2025',
    tipo: 'fijo',
    valor: 5,
    minimoCompra: 50,
    usoMaximo: 50,
    usosActuales: 12,
    fechaInicio: new Date('2025-06-01'),
    fechaFin: new Date('2025-08-31'),
    activo: true,
  },
];

export default function AdminCupones() {
  const [cupones, setCupones] = useState<Cupon[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarCupones();
  }, []);

  const cargarCupones = async () => {
    setCargando(true);
    try {
      const cuponesData = await getCupones();
      setCupones(cuponesData.length > 0 ? cuponesData : cuponesMock);
    } catch (error) {
      console.error('Error cargando cupones:', error);
      setCupones(cuponesMock);
    } finally {
      setCargando(false);
    }
  };

  const handleDelete = async (id: string, codigo: string) => {
    if (confirm(`¿Eliminar el cupón "${codigo}"?`)) {
      try {
        await deleteCupon(id);
        alert('✅ Cupón eliminado exitosamente');
        cargarCupones();
      } catch (error) {
        console.error('Error eliminando cupón:', error);
        alert('❌ Error al eliminar el cupón');
      }
    }
  };

  const copiarCodigo = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    alert(`Código ${codigo} copiado al portapapeles`);
  };

  const formatoFecha = (fecha: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(fecha);
  };

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando cupones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cupones</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gestiona códigos de descuento y promociones
          </p>
        </div>
        <Link href="/admin/cupones/nuevo" className="btn btn-primary">
          <Plus className="h-5 w-5 mr-2" />
          Nuevo Cupón
        </Link>
      </div>

      {/* Lista de cupones */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Descuento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Mínimo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Usos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Válido
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
              {cupones.map((cupon) => (
                <tr key={cupon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono font-medium text-gray-900">
                        {cupon.codigo}
                      </code>
                      <button
                        onClick={() => copiarCodigo(cupon.codigo)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Copiar código"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {cupon.tipo === 'porcentaje' ? `${cupon.valor}%` : `${cupon.valor}€`}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {cupon.minimoCompra ? `${cupon.minimoCompra}€` : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {cupon.usosActuales} / {cupon.usoMaximo || '∞'}
                      </div>
                      {cupon.usoMaximo && (
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-primary-600 h-1.5 rounded-full"
                            style={{
                              width: `${(cupon.usosActuales / cupon.usoMaximo) * 100}%`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {formatoFecha(cupon.fechaInicio)}
                      <br />
                      {formatoFecha(cupon.fechaFin)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cupon.activo
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {cupon.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      className="text-primary-600 hover:text-primary-900 inline-flex items-center"
                      onClick={() => alert('Editar cupón (mock)')}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 inline-flex items-center"
                      onClick={() => handleDelete(cupon.id, cupon.codigo)}
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
    </div>
  );
}
