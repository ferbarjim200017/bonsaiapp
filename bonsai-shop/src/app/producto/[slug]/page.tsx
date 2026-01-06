'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, AlertCircle, ChevronRight, Package, Truck, Shield, ChevronLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { obtenerProductoPorSlugCombinado, obtenerTodosLosProductos } from '@/lib/mockData';
import { Producto } from '@/types';

export default function ProductoPage({ params }: { params: { slug: string } }) {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [productosRelacionados, setProductosRelacionados] = useState<Producto[]>([]);
  const { agregarAlCarrito } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [imagenActiva, setImagenActiva] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [agregandoCarrito, setAgregandoCarrito] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      setCargando(true);
      const productoEncontrado = await obtenerProductoPorSlugCombinado(params.slug);
      
      if (productoEncontrado) {
        setProducto(productoEncontrado);
        
        // Cargar productos relacionados
        const todosLosProductos = await obtenerTodosLosProductos();
        const relacionados = todosLosProductos
          .filter((p) => p.categoria === productoEncontrado.categoria && p.id !== productoEncontrado.id)
          .slice(0, 4);
        setProductosRelacionados(relacionados);
      }
      setCargando(false);
    };
    
    cargarProducto();
  }, [params.slug]);

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!producto) {
    notFound();
  }

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

  const handleAgregarCarrito = () => {
    setAgregandoCarrito(true);
    agregarAlCarrito(producto, cantidad);
    
    // Mensaje accesible (en producción, usar toast o modal)
    setTimeout(() => {
      setAgregandoCarrito(false);
      alert(`${producto.nombre} añadido al carrito`);
    }, 300);
  };

  const siguienteImagen = () => {
    setImagenActiva((prev) => (prev === producto.imagenes.length - 1 ? 0 : prev + 1));
  };

  const anteriorImagen = () => {
    setImagenActiva((prev) => (prev === 0 ? producto.imagenes.length - 1 : prev - 1));
  };

  // Touch handlers para swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      siguienteImagen();
    } else if (isRightSwipe) {
      anteriorImagen();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded px-1">
                Inicio
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
            <li>
              <Link
                href={`/catalogo?categoria=${producto.categoria}`}
                className="text-gray-500 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded px-1 capitalize"
              >
                {producto.categoria}s
              </Link>
            </li>
              className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 border border-gray-200 touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Carrusel deslizante */}
              <div 
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${imagenActiva * 100}%)` }}
              >
                {producto.imagenes.map((imagen, index) => (
                  <div key={index} className="min-w-full h-full relative">
                    <Image
                      src={imagen || '/images/placeholder-bonsai.jpg'}
                      alt={`${producto.nombre} - imagen ${index + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                      unoptimized={imagen?.startsWith('data:') || imagen?.endsWith('.svg')}
                    />
                  </div>
                ))}
              </div>
              
              {producto.stock === 0 && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center pointer-events-none">
                  <span className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold text-lg">
                    Agotado
                  </span>
                </div>
              )}
              
              {/* Navigation arrows - only show if multiple images */}
              {producto.imagenes.length > 1 && (
                <>
                  <button
                    onClick={anteriorImagen}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-600 z-10"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                  </button>
                  <button
                    onClick={siguienteImagen}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-600 z-10"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-800" />
                  </button>
                  
                  {/* Image counter */}
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-10">
                    {imagenActiva + 1} / {producto.imagenes.length}
                  </div>
                  
                  {/* Dots indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {producto.imagenes.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setImagenActiva(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === imagenActiva 
                            ? 'bg-white w-6' 
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                        aria-label={`Ir a imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Thumbnails - only show if multiple images */}
            {producto.imagenes.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {producto.imagenes.map((imagen, index) => (
                  <button
                    key={index}
                    onClick={() => setImagenActiva(index)}
                    className={`aspect-square relative overflow-hidden rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-600 ${
                      index === imagenActiva
                        ? 'border-primary-600 ring-2 ring-primary-600 scale-95
            
            {/* Thumbnails - only show if multiple images */}
            {producto.imagenes.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {producto.imagenes.map((imagen, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const direccion = index > imagenActiva ? 'right' : 'left';
                      cambiarImagen(index, direccion);
                    }}
                    disabled={isTransitioning}
                    className={`aspect-square relative overflow-hidden rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-600 disabled:opacity-50 ${
                      index === imagenActiva
                        ? 'border-primary-600 ring-2 ring-primary-600'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    aria-label={`Ver imagen ${index + 1}`}
                  >
                    <Image
                      src={imagen}
                      alt={`${producto.nombre} - vista ${index + 1}`}
                      fill
                      sizes="(max-width: 1024px) 25vw, 12.5vw"
                      className="object-cover"
                      unoptimized={imagen?.startsWith('data:') || imagen?.endsWith('.svg')}
                    />
                  </button>
                ))}
              </div>
            )}

            {producto.variabilidadNatural && (
              <div className="flex items-start gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p>
                  <strong>Producto natural:</strong> El bonsái que recibirás puede variar respecto a la foto
                  mostrada, ya que cada ejemplar es único.
                </p>
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            {/* Título y precio */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {producto.nombre}
              </h1>
              
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-primary-700">
                  {precioFormateado}
                </span>
                {precioAnteriorFormateado && (
                  <span className="text-xl text-gray-500 line-through">
                    {precioAnteriorFormateado}
                  </span>
                )}
                <span className="text-sm text-gray-600">(IVA incluido)</span>
              </div>

              {/* Stock */}
              {producto.stock > 0 ? (
                <div className="flex items-center gap-2 text-sm">
                  {producto.stock <= 3 ? (
                    <span className="text-orange-600 font-medium">
                      ⚠ Últimas {producto.stock} unidades en stock
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium">✓ En stock</span>
                  )}
                </div>
              ) : (
                <div className="text-red-600 font-medium">Sin stock</div>
              )}
            </div>

            {/* Atributos específicos para bonsáis */}
            {producto.categoria === 'bonsai' && (
              <div className="border-t border-b border-gray-200 py-4 space-y-3">
                <h2 className="font-semibold text-gray-900 mb-3">Características</h2>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  {producto.especie && (
                    <>
                      <dt className="text-gray-600">Especie:</dt>
                      <dd className="font-medium text-gray-900">{producto.especie}</dd>
                    </>
                  )}
                  {producto.tamano && (
                    <>
                      <dt className="text-gray-600">Tamaño:</dt>
                      <dd className="font-medium text-gray-900">{producto.tamano} cm aprox.</dd>
                    </>
                  )}
                  {producto.ubicacion && (
                    <>
                      <dt className="text-gray-600">Ubicación:</dt>
                      <dd className="font-medium text-gray-900 capitalize">{producto.ubicacion}</dd>
                    </>
                  )}
                  {producto.nivelCuidado && (
                    <>
                      <dt className="text-gray-600">Nivel de cuidado:</dt>
                      <dd className="font-medium text-gray-900 capitalize">{producto.nivelCuidado}</dd>
                    </>
                  )}
                  {producto.toxicidadMascotas !== undefined && (
                    <>
                      <dt className="text-gray-600">Mascotas:</dt>
                      <dd className={`font-medium ${producto.toxicidadMascotas ? 'text-red-600' : 'text-green-600'}`}>
                        {producto.toxicidadMascotas ? '⚠ Tóxico' : '✓ No tóxico'}
                      </dd>
                    </>
                  )}
                </dl>
              </div>
            )}

            {/* Cantidad y botones */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label htmlFor="cantidad" className="text-sm font-medium text-gray-900">
                  Cantidad:
                </label>
                <input
                  type="number"
                  id="cantidad"
                  min="1"
                  max={producto.stock}
                  value={cantidad}
                  onChange={(e) => setCantidad(Math.max(1, Math.min(producto.stock, parseInt(e.target.value) || 1)))}
                  className="input w-20 text-center"
                  disabled={producto.stock === 0}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAgregarCarrito}
                  disabled={producto.stock === 0 || agregandoCarrito}
                  className="btn btn-primary btn-lg w-full"
                  aria-label={`Añadir ${cantidad} ${producto.nombre} al carrito`}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
                  {agregandoCarrito ? 'Añadiendo...' : 'Añadir al carrito'}
                </button>
                <button
                  className="btn btn-outline btn-lg"
                  aria-label="Añadir a favoritos"
                >
                  <Heart className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Información adicional */}
            <div className="space-y-3 text-sm border-t border-gray-200 pt-6">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-gray-600 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium text-gray-900">Envío a toda España</p>
                  <p className="text-gray-600">Península, Baleares, Canarias, Ceuta y Melilla. Envío gratis desde 50€.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-gray-600 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium text-gray-900">Embalaje especializado</p>
                  <p className="text-gray-600">Protección específica para plantas vivas.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-gray-600 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium text-gray-900">Garantía de calidad</p>
                  <p className="text-gray-600">
                    Ver <Link href="/devoluciones" className="text-primary-700 hover:underline">política de devoluciones</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas de contenido */}
        <div className="mt-12 border-t border-gray-200 pt-12">
          <div className="space-y-8">
            {/* Descripción */}
            <section aria-labelledby="descripcion-heading">
              <h2 id="descripcion-heading" className="text-2xl font-bold text-gray-900 mb-4">
                Descripción
              </h2>
              <p className="text-gray-700 leading-relaxed">{producto.descripcion}</p>
            </section>

            {/* Cuidados (solo bonsáis) */}
            {producto.categoria === 'bonsai' && producto.riego && (
              <section aria-labelledby="cuidados-heading">
                <h2 id="cuidados-heading" className="text-2xl font-bold text-gray-900 mb-4">
                  Guía de cuidados
                </h2>
                <dl className="space-y-3">
                  <div>
                    <dt className="font-semibold text-gray-900 mb-1">Riego:</dt>
                    <dd className="text-gray-700">{producto.riego}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900 mb-1">Ubicación:</dt>
                    <dd className="text-gray-700 capitalize">
                      {producto.ubicacion === 'interior' && 'Interior con luz indirecta abundante'}
                      {producto.ubicacion === 'exterior' && 'Exterior en semisombra, protegido de heladas extremas'}
                      {producto.ubicacion === 'ambos' && 'Interior o exterior protegido'}
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 text-sm text-gray-600">
                  Para más información, consulta nuestra <Link href="/cuidados" className="text-primary-700 hover:underline">guía completa de cuidados</Link>.
                </p>
              </section>
            )}

            {/* Envíos */}
            <section aria-labelledby="envios-heading">
              <h2 id="envios-heading" className="text-2xl font-bold text-gray-900 mb-4">
                Envíos y devoluciones
              </h2>
              <p className="text-gray-700 mb-2">
                Realizamos envíos a toda España (Península, Baleares, Canarias, Ceuta y Melilla).
                Envío gratuito para pedidos superiores a 50€ en península.
              </p>
              <p className="text-gray-700">
                Consulta nuestra <Link href="/envios" className="text-primary-700 hover:underline">política de envíos</Link> y{' '}
                <Link href="/devoluciones" className="text-primary-700 hover:underline">política de devoluciones</Link>.
              </p>
            </section>
          </div>
        </div>

        {/* Productos relacionados */}
        {productosRelacionados.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">También te puede interesar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productosRelacionados.map((prod) => {
                const ProductCard = require('@/components/products/ProductCard').default;
                return <ProductCard key={prod.id} producto={prod} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
