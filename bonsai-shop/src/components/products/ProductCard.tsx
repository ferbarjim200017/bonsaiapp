'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Producto } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  producto: Producto;
}

export default function ProductCard({ producto }: ProductCardProps) {
  const { agregarAlCarrito } = useCart();
  const imagenPrincipal = producto.imagenes[0] || '/images/placeholder-bonsai.jpg';
  const precioFormateado = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(producto.precio);

  const precioAnteriorFormateado = producto.precioAnterior
    ? new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
      }).format(producto.precioAnterior)
    : null;

  const tieneOferta = producto.precioAnterior && producto.precioAnterior > producto.precio;
  const descuentoPorcentaje = tieneOferta && producto.precioAnterior
    ? Math.round(((producto.precioAnterior - producto.precio) / producto.precioAnterior) * 100)
    : 0;

  return (
    <article className="product-card">
      {/* Imagen */}
      <Link
        href={`/producto/${producto.slug}`}
        className="block aspect-square relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
      >
        <Image
          src={imagenPrincipal}
          alt={producto.nombre}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized={imagenPrincipal.endsWith('.svg')}
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2" aria-label="Etiquetas del producto">
          {producto.nuevo && (
            <span className="badge badge-new">Nuevo</span>
          )}
          {tieneOferta && (
            <span className="badge badge-sale">-{descuentoPorcentaje}%</span>
          )}
          {producto.destacado && (
            <span className="badge badge-featured">Destacado</span>
          )}
        </div>

        {/* Stock bajo */}
        {producto.stock > 0 && producto.stock <= 3 && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
              Últimas {producto.stock} unidades
            </span>
          </div>
        )}

        {/* Sin stock */}
        {producto.stock === 0 && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold">
              Agotado
            </span>
          </div>
        )}
      </Link>

      {/* Información */}
      <div className="p-4 flex flex-col">
        {/* Categoría / Ubicación */}
        <div className="text-xs text-gray-500 mb-1 h-4">
          {producto.categoria === 'bonsai' && producto.ubicacion && (
            <span className="capitalize">{producto.ubicacion}</span>
          )}
          {producto.categoria === 'accesorio' && producto.tipoAccesorio && (
            <span className="capitalize">{producto.tipoAccesorio}</span>
          )}
        </div>

        {/* Nombre */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
          <Link
            href={`/producto/${producto.slug}`}
            className="hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
          >
            {producto.nombre}
          </Link>
        </h3>

        {/* Atributos específicos */}
        <div className="text-sm text-gray-600 mb-2 min-h-[2.5rem]">
          {producto.categoria === 'bonsai' && (
            <>
              {producto.especie && <p className="line-clamp-1">{producto.especie}</p>}
              {producto.nivelCuidado && (
                <p className="text-xs">
                  Dificultad: <span className="capitalize">{producto.nivelCuidado}</span>
                </p>
              )}
            </>
          )}
        </div>

        {/* Espaciador para empujar precio y botones al final */}
        <div className="flex-grow"></div>

        {/* Precio */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-primary-700">
            {precioFormateado}
          </span>
          {precioAnteriorFormateado && (
            <span className="text-sm text-gray-500 line-through">
              {precioAnteriorFormateado}
            </span>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-2">
          <button
            disabled={producto.stock === 0}
            onClick={(e) => {
              e.preventDefault();
              agregarAlCarrito(producto);
            }}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            aria-label={`Añadir ${producto.nombre} al carrito`}
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            <span>Añadir</span>
          </button>
          <Link
            href={`/producto/${producto.slug}`}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
            aria-label={`Ver detalles de ${producto.nombre}`}
          >
            Ver
          </Link>
        </div>
      </div>
    </article>
  );
}
