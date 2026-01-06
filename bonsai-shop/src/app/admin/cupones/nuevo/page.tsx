'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';
import { createCupon } from '@/lib/firebase/firestore';
import type { ProductCategory } from '@/types';

export default function NuevoCupon() {
  const router = useRouter();
  const [guardando, setGuardando] = useState(false);

  const [formData, setFormData] = useState({
    codigo: '',
    tipo: 'porcentaje' as 'porcentaje' | 'fijo',
    valor: '',
    minimoCompra: '',
    usoMaximo: '',
    fechaInicio: '',
    fechaFin: '',
    activo: true,
    categorias: [] as ProductCategory[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);

    try {
      // Crear cupón en Firebase
      await createCupon({
        codigo: formData.codigo.toUpperCase(),
        tipo: formData.tipo,
        valor: parseFloat(formData.valor),
        minimoCompra: formData.minimoCompra ? parseFloat(formData.minimoCompra) : undefined,
        usoMaximo: formData.usoMaximo ? parseInt(formData.usoMaximo) : undefined,
        usosActuales: 0,
        fechaInicio: new Date(formData.fechaInicio),
        fechaFin: new Date(formData.fechaFin),
        activo: formData.activo,
        categorias: formData.categorias.length > 0 ? formData.categorias : undefined,
      });

      alert('✅ Cupón creado exitosamente en Firebase!');
      router.push('/admin/cupones');
    } catch (error) {
      console.error('Error creando cupón:', error);
      alert('❌ Error al crear el cupón. Por favor, intenta de nuevo.');
      setGuardando(false);
    }
  };

  const agregarCategoria = (categoria: string) => {
    if (!formData.categorias.includes(categoria as ProductCategory)) {
      setFormData({
        ...formData,
        categorias: [...formData.categorias, categoria as ProductCategory],
      });
    }
  };

  const removerCategoria = (categoria: string) => {
    setFormData({
      ...formData,
      categorias: formData.categorias.filter((c) => c !== categoria),
    });
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/cupones"
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nuevo Cupón</h1>
          <p className="mt-1 text-sm text-gray-600">
            Crea un código de descuento o promoción
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información básica */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Información Básica
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Código del Cupón *
              </label>
              <input
                type="text"
                value={formData.codigo}
                onChange={(e) =>
                  setFormData({ ...formData, codigo: e.target.value.toUpperCase() })
                }
                className="input w-full"
                placeholder="BIENVENIDA10"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Solo letras y números, sin espacios
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Descuento *
              </label>
              <select
                value={formData.tipo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tipo: e.target.value as 'porcentaje' | 'fijo',
                  })
                }
                className="input w-full"
                required
              >
                <option value="porcentaje">Porcentaje (%)</option>
                <option value="fijo">Cantidad Fija (€)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor del Descuento *
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.valor}
                  onChange={(e) =>
                    setFormData({ ...formData, valor: e.target.value })
                  }
                  className="input w-full"
                  placeholder={formData.tipo === 'porcentaje' ? '10' : '5'}
                  min="0"
                  step="0.01"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500">
                    {formData.tipo === 'porcentaje' ? '%' : '€'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Restricciones */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Restricciones</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Compra Mínima (€)
              </label>
              <input
                type="number"
                value={formData.minimoCompra}
                onChange={(e) =>
                  setFormData({ ...formData, minimoCompra: e.target.value })
                }
                className="input w-full"
                placeholder="30.00"
                min="0"
                step="0.01"
              />
              <p className="mt-1 text-xs text-gray-500">
                Opcional: monto mínimo de compra
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usos Máximos
              </label>
              <input
                type="number"
                value={formData.usoMaximo}
                onChange={(e) =>
                  setFormData({ ...formData, usoMaximo: e.target.value })
                }
                className="input w-full"
                placeholder="100"
                min="1"
              />
              <p className="mt-1 text-xs text-gray-500">
                Opcional: dejar vacío para ilimitado
              </p>
            </div>
          </div>

          {/* Categorías aplicables */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categorías Aplicables
            </label>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => agregarCategoria('bonsái')}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
              >
                <Plus className="h-4 w-4 inline mr-1" />
                Bonsáis
              </button>
              <button
                type="button"
                onClick={() => agregarCategoria('accesorio')}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
              >
                <Plus className="h-4 w-4 inline mr-1" />
                Accesorios
              </button>
            </div>
            {formData.categorias.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {formData.categorias.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm flex items-center gap-2"
                  >
                    {cat === 'bonsái' ? 'Bonsáis' : 'Accesorios'}
                    <button
                      type="button"
                      onClick={() => removerCategoria(cat)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Sin restricciones (aplica a todas las categorías)
              </p>
            )}
          </div>
        </div>

        {/* Validez */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Período de Validez
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Inicio *
              </label>
              <input
                type="date"
                value={formData.fechaInicio}
                onChange={(e) =>
                  setFormData({ ...formData, fechaInicio: e.target.value })
                }
                className="input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Fin *
              </label>
              <input
                type="date"
                value={formData.fechaFin}
                onChange={(e) =>
                  setFormData({ ...formData, fechaFin: e.target.value })
                }
                className="input w-full"
                required
              />
            </div>
          </div>
        </div>

        {/* Estado */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Estado</h2>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="activo"
              checked={formData.activo}
              onChange={(e) =>
                setFormData({ ...formData, activo: e.target.checked })
              }
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="activo" className="ml-2 block text-sm text-gray-900">
              Cupón activo (disponible para uso inmediato)
            </label>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/cupones" className="btn btn-secondary">
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={guardando}
            className="btn btn-primary"
          >
            {guardando ? 'Guardando...' : 'Crear Cupón'}
          </button>
        </div>
      </form>
    </div>
  );
}
