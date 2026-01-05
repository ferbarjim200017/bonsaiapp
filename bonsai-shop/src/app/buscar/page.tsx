'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getProductos } from '@/lib/firebase/firestore';
import { Producto } from '@/types';

export default function BuscarPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(queryParam);
  const [busquedaActiva, setBusquedaActiva] = useState(queryParam);
  const [resultados, setResultados] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (busquedaActiva.trim()) {
      buscarProductos(busquedaActiva);
    } else {
      setResultados([]);
    }
  }, [busquedaActiva]);

  const buscarProductos = async (termino: string) => {
    setCargando(true);
    
    try {
      // Obtener todos los productos de Firebase
      const todosLosProductos = await getProductos({ publicado: true });
      const terminoLower = termino.toLowerCase().trim();
      
      const resultadosFiltrados = todosLosProductos.filter((producto) => {
        // Buscar en nombre
        if (producto.nombre.toLowerCase().includes(terminoLower)) return true;
        
        // Buscar en descripción
        if (producto.descripcion.toLowerCase().includes(terminoLower)) return true;
        
        // Buscar en especie (para bonsáis)
        if (producto.especie && producto.especie.toLowerCase().includes(terminoLower)) return true;
        
        // Buscar en categoría
        if (producto.categoria.toLowerCase().includes(terminoLower)) return true;
        
        // Buscar en ubicación
        if (producto.ubicacion && producto.ubicacion.toLowerCase().includes(terminoLower)) return true;
        
        return false;
      });
      
      setResultados(resultadosFiltrados);
    } catch (error) {
      console.error('Error buscando productos:', error);
      setResultados([]);
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusquedaActiva(query);
  };

  const limpiarBusqueda = () => {
    setQuery('');
    setBusquedaActiva('');
    setResultados([]);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header de búsqueda */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Buscar productos</h1>
          
          <form onSubmit={handleSubmit} className="relative max-w-2xl">
            <label htmlFor="search-input" className="sr-only">
              Buscar bonsáis y accesorios
            </label>
            <div className="relative">
              <input
                id="search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar bonsáis, accesorios..."
                className="input w-full pl-12 pr-12 h-14 text-lg"
                autoFocus
              />
              <Search 
                className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" 
                aria-hidden="true" 
              />
              {query && (
                <button
                  type="button"
                  onClick={limpiarBusqueda}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>
            
            <button
              type="submit"
              className="btn btn-primary btn-lg mt-4 w-full sm:w-auto"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      {/* Resultados */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {cargando ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent" role="status">
              <span className="sr-only">Buscando...</span>
            </div>
            <p className="mt-4 text-gray-600">Buscando productos...</p>
          </div>
        ) : busquedaActiva ? (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {resultados.length === 0 ? (
                  <>No se encontraron resultados</>
                ) : (
                  <>
                    {resultados.length} resultado{resultados.length !== 1 ? 's' : ''} para "{busquedaActiva}"
                  </>
                )}
              </h2>
            </div>

            {resultados.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {resultados.map((producto) => (
                  <ProductCard key={producto.id} producto={producto} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No encontramos lo que buscas
                </h3>
                <p className="text-gray-600 mb-6">
                  Intenta con otros términos o navega por nuestro catálogo.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Sugerencias:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Verifica la ortografía</li>
                    <li>• Usa términos más generales</li>
                    <li>• Busca por tipo: "ficus", "enebro", "herramientas"</li>
                  </ul>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Search className="h-20 w-20 text-gray-300 mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Busca tu bonsái ideal
            </h2>
            <p className="text-gray-600 mb-6">
              Encuentra bonsáis por especie, ubicación, dificultad o busca accesorios.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => {
                  setQuery('ficus');
                  setBusquedaActiva('ficus');
                }}
                className="btn btn-outline btn-sm"
              >
                Ficus
              </button>
              <button
                onClick={() => {
                  setQuery('exterior');
                  setBusquedaActiva('exterior');
                }}
                className="btn btn-outline btn-sm"
              >
                Exterior
              </button>
              <button
                onClick={() => {
                  setQuery('interior');
                  setBusquedaActiva('interior');
                }}
                className="btn btn-outline btn-sm"
              >
                Interior
              </button>
              <button
                onClick={() => {
                  setQuery('herramientas');
                  setBusquedaActiva('herramientas');
                }}
                className="btn btn-outline btn-sm"
              >
                Herramientas
              </button>
              <button
                onClick={() => {
                  setQuery('principiante');
                  setBusquedaActiva('principiante');
                }}
                className="btn btn-outline btn-sm"
              >
                Fácil cuidado
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
