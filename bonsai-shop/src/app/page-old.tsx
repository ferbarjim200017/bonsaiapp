import Link from 'next/link';
import { ArrowRight, Leaf, Package, Shield, Truck } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/products/ProductCard';
import { obtenerProductos } from '@/lib/mockData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bonsái Shop - Venta de Bonsáis y Accesorios en España',
  description: 'Tienda online especializada en bonsáis de calidad para interior y exterior. Envíos a toda España con garantía de calidad. Encuentra tu bonsái perfecto.',
  keywords: ['bonsái', 'bonsáis españa', 'comprar bonsái', 'bonsái interior', 'bonsái exterior', 'accesorios bonsái'],
  openGraph: {
    title: 'Bonsái Shop - Venta de Bonsáis en España',
    description: 'Tienda online especializada en bonsáis de calidad',
    type: 'website',
  },
};

export default function HomePage() {
  const productosDestacados = obtenerProductos({ destacados: true, limite: 4 });
  const productosNuevos = obtenerProductos({ nuevos: true, limite: 4 });

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Tu tienda de bonsáis en España
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Descubre nuestra selección de bonsáis de calidad para interior y exterior. 
              Envíos seguros a toda España con garantía y guías de cuidado incluidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/catalogo"
                className="btn btn-primary inline-flex items-center justify-center"
              >
                Ver catálogo
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/cuidados"
                className="btn btn-outline inline-flex items-center justify-center"
              >
                Guía de cuidados
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Características / Ventajas */}
      <section className="py-12 bg-white" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="features-heading" className="sr-only">
            Características de nuestra tienda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-700 mb-4">
                <Truck className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Envío a toda España
              </h3>
              <p className="text-sm text-gray-600">
                Península, Baleares, Canarias, Ceuta y Melilla. Envío gratuito desde 50€.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-700 mb-4">
                <Shield className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Garantía de calidad
              </h3>
              <p className="text-sm text-gray-600">
                Productos verificados y embalaje especializado para plantas vivas.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-700 mb-4">
                <Leaf className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Guías de cuidado
              </h3>
              <p className="text-sm text-gray-600">
                Instrucciones detalladas para el cuidado de cada especie incluidas.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-700 mb-4">
                <Package className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Devoluciones fáciles
              </h3>
              <p className="text-sm text-gray-600">
                Política de devolución clara y proceso sencillo. Tu satisfacción es nuestra prioridad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      {productosDestacados.length > 0 && (
        <section className="py-16 bg-gray-50" aria-labelledby="featured-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 id="featured-heading" className="text-3xl font-bold text-gray-900">
                Productos destacados
              </h2>
              <Link
                href="/catalogo"
                className="text-primary-700 hover:text-primary-800 font-medium flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded px-2 py-1"
              >
                Ver todos
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productosDestacados.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categorías */}
      <section className="py-16 bg-white" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="categories-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Explora por categoría
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/catalogo?categoria=bonsái"
              className="group relative overflow-hidden rounded-lg bg-green-100 h-64 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-700/20 group-hover:from-green-500/30 group-hover:to-green-700/30 transition-colors" />
              <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
                <div className="text-6xl mb-4">🌳</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Bonsáis</h3>
                <p className="text-gray-700">Descubre nuestra selección de bonsáis para interior y exterior</p>
              </div>
            </Link>
            
            <Link
              href="/catalogo?categoria=accesorio"
              className="group relative overflow-hidden rounded-lg bg-amber-100 h-64 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-700/20 group-hover:from-amber-500/30 group-hover:to-amber-700/30 transition-colors" />
              <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
                <div className="text-6xl mb-4">🛠️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Accesorios</h3>
                <p className="text-gray-700">Herramientas, sustratos, macetas y todo lo necesario</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Productos nuevos */}
      {productosNuevos.length > 0 && (
        <section className="py-16 bg-gray-50" aria-labelledby="new-products-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 id="new-products-heading" className="text-3xl font-bold text-gray-900">
                Novedades
              </h2>
              <Link
                href="/catalogo?nuevo=true"
                className="text-primary-700 hover:text-primary-800 font-medium flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded px-2 py-1"
              >
                Ver todas
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productosNuevos.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="py-16 bg-primary-600" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Necesitas ayuda para elegir tu bonsái?
          </h2>
          <p className="text-xl text-primary-50 mb-8">
            Nuestro equipo está aquí para asesorarte y resolver todas tus dudas.
          </p>
          <Link
            href="/contacto"
            className="btn btn-secondary inline-flex items-center justify-center"
          >
            Contáctanos
          </Link>
        </div>
      </section>
    </>
  );
}
