'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, X } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getProductos } from '@/lib/firebase/firestore';
import { Producto, ProductCategory, Ubicacion, Dificultad } from '@/types';

function CatalogoContent() {
  const searchParams = useSearchParams();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  
  const [filtros, setFiltros] = useState({
    categoria: searchParams.get('categoria') || '',
    ubicacion: searchParams.get('ubicacion') || '',
    dificultad: searchParams.get('dificultad') || '',
    precioMin: searchParams.get('precioMin') || '',
    precioMax: searchParams.get('precioMax') || '',
    enStock: searchParams.get('enStock') === 'true',
    ordenar: searchParams.get('ordenar') || 'relevancia',
  });

  // Actualizar filtros cuando cambian los searchParams (navegación desde Header)
  useEffect(() => {
    setFiltros({
      categoria: searchParams.get('categoria') || '',
      ubicacion: searchParams.get('ubicacion') || '',
      dificultad: searchParams.get('dificultad') || '',
      precioMin: searchParams.get('precioMin') || '',
      precioMax: searchParams.get('precioMax') || '',
      enStock: searchParams.get('enStock') === 'true',
      ordenar: searchParams.get('ordenar') || 'relevancia',
    });
  }, [searchParams]);

  useEffect(() => {
    aplicarFiltros();
  }, [filtros]);

  const aplicarFiltros = async () => {
    let productosFiltrados = await getProductos({ publicado: true });

    // Aplicar filtros
    if (filtros.categoria) {
      productosFiltrados = productosFiltrados.filter((p) => p.categoria === filtros.categoria);
    }
    if (filtros.ubicacion) {
      productosFiltrados = productosFiltrados.filter(
        (p) => p.ubicacion === filtros.ubicacion || p.ubicacion === 'ambos'
      );
    }
    if (filtros.dificultad) {
      productosFiltrados = productosFiltrados.filter((p) => p.nivelCuidado === filtros.dificultad);
    }
    if (filtros.precioMin) {
      const min = parseFloat(filtros.precioMin);
      productosFiltrados = productosFiltrados.filter((p) => p.precio >= min);
    }
    if (filtros.precioMax) {
      const max = parseFloat(filtros.precioMax);
      productosFiltrados = productosFiltrados.filter((p) => p.precio <= max);
    }
    if (filtros.enStock) {
      productosFiltrados = productosFiltrados.filter((p) => p.stock > 0);
    }

    // Ordenar
    switch (filtros.ordenar) {
      case 'precio-asc':
        productosFiltrados.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        productosFiltrados.sort((a, b) => b.precio - a.precio);
        break;
      case 'nuevo':
        productosFiltrados.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      default:
        // Relevancia: destacados primero
        productosFiltrados.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
    }

    setProductos(productosFiltrados);
  };

  const limpiarFiltros = () => {
    setFiltros({
      categoria: '',
      ubicacion: '',
      dificultad: '',
      precioMin: '',
      precioMax: '',
      enStock: false,
      ordenar: 'relevancia',
    });
  };

  const hayFiltrosActivos = !!(
    filtros.categoria ||
    filtros.ubicacion ||
    filtros.dificultad ||
    filtros.precioMin ||
    filtros.precioMax ||
    filtros.enStock
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Catálogo de productos
          </h1>
          <p className="text-gray-600">
            Explora nuestra selección de bonsáis y accesorios
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros (Desktop) */}
          <aside
            className="hidden lg:block w-64 flex-shrink-0"
            aria-label="Filtros de productos"
          >
            <FiltrosPanel
              filtros={filtros}
              setFiltros={setFiltros}
              limpiarFiltros={limpiarFiltros}
              hayFiltrosActivos={hayFiltrosActivos}
            />
          </aside>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Barra de control (móvil + ordenar) */}
            <div className="flex items-center justify-between mb-6">
              {/* Botón filtros móvil */}
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="btn btn-outline btn-sm lg:hidden"
                aria-expanded={mostrarFiltros}
                aria-label="Abrir filtros"
              >
                <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
                Filtros
                {hayFiltrosActivos && (
                  <span className="ml-2 bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                    •
                  </span>
                )}
              </button>

              {/* Ordenar */}
              <div className="flex items-center gap-2">
                <label htmlFor="ordenar" className="text-sm text-gray-700">
                  Ordenar:
                </label>
                <select
                  id="ordenar"
                  className="input py-2 text-sm"
                  value={filtros.ordenar}
                  onChange={(e) => setFiltros({ ...filtros, ordenar: e.target.value })}
                >
                  <option value="relevancia">Relevancia</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                  <option value="nuevo">Novedades</option>
                </select>
              </div>
            </div>

            {/* Panel filtros móvil */}
            {mostrarFiltros && (
              <div className="lg:hidden mb-6 p-4 border border-gray-200 rounded-lg">
                <FiltrosPanel
                  filtros={filtros}
                  setFiltros={setFiltros}
                  limpiarFiltros={limpiarFiltros}
                  hayFiltrosActivos={hayFiltrosActivos}
                />
              </div>
            )}

            {/* Resultados */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{productos.length}</span> producto
                {productos.length !== 1 ? 's' : ''} encontrado{productos.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Grid de productos */}
            {productos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productos.map((producto) => (
                  <ProductCard key={producto.id} producto={producto} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 mb-4">
                  No se encontraron productos con los filtros seleccionados
                </p>
                {hayFiltrosActivos && (
                  <button 
                    onClick={limpiarFiltros}
                    className="btn btn-outline"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de panel de filtros
function FiltrosPanel({
  filtros,
  setFiltros,
  limpiarFiltros,
  hayFiltrosActivos,
}: {
  filtros: any;
  setFiltros: (filtros: any) => void;
  limpiarFiltros: () => void;
  hayFiltrosActivos: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        {hayFiltrosActivos && (
          <button
            onClick={limpiarFiltros}
            className="text-sm text-primary-700 hover:text-primary-800 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded px-2 py-1"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Limpiar
          </button>
        )}
      </div>

      {/* Categoría */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-900 mb-2">Categoría</legend>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="categoria"
            value=""
            checked={filtros.categoria === ''}
            onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
            className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-600"
          />
          <span className="text-sm text-gray-700">Todas</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="categoria"
            value="bonsai"
            checked={filtros.categoria === 'bonsai'}
            onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
            className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-600"
          />
          <span className="text-sm text-gray-700">Bonsáis</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="categoria"
            value="accesorio"
            checked={filtros.categoria === 'accesorio'}
            onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
            className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-600"
          />
          <span className="text-sm text-gray-700">Accesorios</span>
        </label>
      </fieldset>

      {/* Ubicación (solo para bonsáis) */}
      {(!filtros.categoria || filtros.categoria === 'bonsai') && (
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-gray-900 mb-2">Ubicación</legend>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="ubicacion"
              value=""
              checked={filtros.ubicacion === ''}
              onChange={(e) => setFiltros({ ...filtros, ubicacion: e.target.value })}
              className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-600"
            />
            <span className="text-sm text-gray-700">Todas</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="ubicacion"
              value="interior"
              checked={filtros.ubicacion === 'interior'}
              onChange={(e) => setFiltros({ ...filtros, ubicacion: e.target.value })}
              className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-600"
            />
            <span className="text-sm text-gray-700">Interior</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="ubicacion"
              value="exterior"
              checked={filtros.ubicacion === 'exterior'}
              onChange={(e) => setFiltros({ ...filtros, ubicacion: e.target.value })}
              className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-600"
            />
            <span className="text-sm text-gray-700">Exterior</span>
          </label>
        </fieldset>
      )}

      {/* Dificultad (solo para bonsáis) */}
      {(!filtros.categoria || filtros.categoria === 'bonsai') && (
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-gray-900 mb-2">Dificultad de cuidado</legend>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="dificultad"
              value=""
              checked={filtros.dificultad === ''}
              onChange={(e) => setFiltros({ ...filtros, dificultad: e.target.value })}
              className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-600"
            />
            <span className="text-sm text-gray-700">Todas</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="dificultad"
              value="baja"
              checked={filtros.dificultad === 'baja'}
              onChange={(e) => setFiltros({ ...filtros, dificultad: e.target.value })}
              className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-600"
            />
            <span className="text-sm text-gray-700">Baja</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="dificultad"
              value="media"
              checked={filtros.dificultad === 'media'}
              onChange={(e) => setFiltros({ ...filtros, dificultad: e.target.value })}
              className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-600"
            />
            <span className="text-sm text-gray-700">Media</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="dificultad"
              value="alta"
              checked={filtros.dificultad === 'alta'}
              onChange={(e) => setFiltros({ ...filtros, dificultad: e.target.value })}
              className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-600"
            />
            <span className="text-sm text-gray-700">Alta</span>
          </label>
        </fieldset>
      )}

      {/* Rango de precio */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900 block">Precio (€)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Mín"
            className="input text-sm"
            value={filtros.precioMin}
            onChange={(e) => setFiltros({ ...filtros, precioMin: e.target.value })}
            min="0"
            aria-label="Precio mínimo"
          />
          <input
            type="number"
            placeholder="Máx"
            className="input text-sm"
            value={filtros.precioMax}
            onChange={(e) => setFiltros({ ...filtros, precioMax: e.target.value })}
            min="0"
            aria-label="Precio máximo"
          />
        </div>
      </div>

      {/* En stock */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={filtros.enStock}
          onChange={(e) => setFiltros({ ...filtros, enStock: e.target.checked })}
          className="h-4 w-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-600"
        />
        <span className="text-sm text-gray-700">Solo productos en stock</span>
      </label>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Catálogo de productos
            </h1>
            <p className="text-gray-600">Cargando...</p>
          </div>
        </div>
      </div>
    }>
      <CatalogoContent />
    </Suspense>
  );
}
