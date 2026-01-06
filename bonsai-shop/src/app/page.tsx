'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, Package, Shield, Truck } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/products/ProductCard';
import { getProductos } from '@/lib/firebase/firestore';
import { obtenerTodosLosProductos } from '@/lib/mockData';
import { Producto } from '@/types';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [productosDestacados, setProductosDestacados] = useState<Producto[]>([]);
  const [productosNuevos, setProductosNuevos] = useState<Producto[]>([]);

  useEffect(() => {
    // Cargar productos desde Firebase
    const cargarProductos = async () => {
      try {
        // Intentar cargar desde Firebase
        const todosProductos = await getProductos({ publicado: true });
        
        if (todosProductos.length > 0) {
          // Usar productos de Firebase
          const destacados = todosProductos.filter(p => p.destacado).slice(0, 4);
          const nuevos = todosProductos.filter(p => p.nuevo).slice(0, 4);
          setProductosDestacados(destacados);
          setProductosNuevos(nuevos);
        } else {
          // Si Firebase está vacío, usar mock data
          const destacados = await obtenerTodosLosProductos({ destacados: true, limite: 4 });
          const nuevos = await obtenerTodosLosProductos({ nuevos: true, limite: 4 });
          setProductosDestacados(destacados);
          setProductosNuevos(nuevos);
        }
      } catch (error) {
        console.error('Error cargando productos, usando mock data:', error);
        // Si hay error, usar mock data
        const destacados = await obtenerTodosLosProductos({ destacados: true, limite: 4 });
        const nuevos = await obtenerTodosLosProductos({ nuevos: true, limite: 4 });
        setProductosDestacados(destacados);
        setProductosNuevos(nuevos);
      }
    };
    cargarProductos();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcular transformaciones basadas en scroll
  const parallaxOffset = scrollY * 0.5;
  const opacity = Math.max(0, 1 - scrollY / 400);
  const scale = Math.max(0.9, 1 - scrollY / 2000);

  return (
    <>
      {/* Hero Section con imagen de fondo y efecto parallax */}
      <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
        {/* Imagen de fondo con parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${parallaxOffset}px) scale(${scale})`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <Image
            src="/images/hero-bonsai.jpg"
            alt="Bonsái decorativo"
            fill
            className="object-cover"
            priority
            style={{
              filter: 'blur(3px) brightness(0.7)',
            }}
          />
          {/* Overlay degradado */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-green-800/40 to-green-700/60" />
        </div>

        {/* Contenido del hero */}
        <div 
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32"
          style={{
            opacity,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Tu tienda de bonsais en España
            </h1>
            <p className="text-lg md:text-xl text-white/95 mb-8 drop-shadow-md">
              Descubre nuestra selección de bonsais de calidad para interior y exterior. 
              Envíos seguros a toda España con garantía y guías de cuidado incluidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/catalogo"
                className="btn btn-primary inline-flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow"
              >
                Ver catálogo
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/cuidados"
                className="btn bg-white/90 hover:bg-white text-gray-900 inline-flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
              >
                Guía de cuidados
              </Link>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/60 rounded-full" />
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
              href="/catalogo?categoria=bonsai"
              className="group relative overflow-hidden rounded-lg bg-green-100 h-64 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-700/20 group-hover:from-green-500/30 group-hover:to-green-700/30 transition-colors" />
              <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
                <div className="text-6xl mb-4">🌳</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Bonsáis</h3>
                <p className="text-gray-700">Descubre nuestra selección de bonsais para interior y exterior</p>
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
            ¿Necesitas ayuda para elegir tu bonsai?
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
