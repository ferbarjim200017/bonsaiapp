'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function CarritoPage() {
  const { carrito, eliminarDelCarrito, actualizarCantidad, aplicarCupon } = useCart();
  const [codigoCupon, setCodigoCupon] = useState('');
  const [errorCupon, setErrorCupon] = useState('');
  const [aplicandoCupon, setAplicandoCupon] = useState(false);

  const formatoPrecio = (precio: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(precio);

  const handleAplicarCupon = async () => {
    if (!codigoCupon.trim()) {
      setErrorCupon('Introduce un código de cupón');
      return;
    }

    setAplicandoCupon(true);
    setErrorCupon('');

    const resultado = await aplicarCupon(codigoCupon.trim().toUpperCase());

    setAplicandoCupon(false);

    if (resultado.exito) {
      setCodigoCupon('');
      alert(`✓ ${resultado.mensaje}`);
    } else {
      setErrorCupon(resultado.mensaje);
    }
  };

  if (carrito.items.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 text-gray-400 mb-6">
              <ShoppingBag className="h-10 w-10" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8">
              Explora nuestro catálogo y añade tus bonsáis favoritos
            </p>
            <Link
              href="/catalogo"
              className="btn btn-primary inline-flex items-center justify-center"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {carrito.items.map((item) => (
              <article
                key={item.productoId}
                className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4"
              >
                {/* Imagen */}
                <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                  <Image
                    src={item.producto.imagenes[0] || '/images/placeholder-bonsái.jpg'}
                    alt={item.producto.nombre}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                {/* Información */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    <Link
                      href={`/producto/${item.producto.slug}`}
                      className="hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                    >
                      {item.producto.nombre}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {formatoPrecio(item.producto.precio)} × {item.cantidad}
                  </p>

                  <div className="flex items-center gap-3">
                    {/* Selector de cantidad */}
                    <div className="flex items-center gap-2">
                      <label htmlFor={`cantidad-${item.productoId}`} className="sr-only">
                        Cantidad de {item.producto.nombre}
                      </label>
                      <input
                        type="number"
                        id={`cantidad-${item.productoId}`}
                        min="1"
                        max={item.producto.stock}
                        value={item.cantidad}
                        onChange={(e) =>
                          actualizarCantidad(item.productoId, parseInt(e.target.value) || 1)
                        }
                        className="input w-16 text-center py-1"
                      />
                    </div>

                    {/* Botón eliminar */}
                    <button
                      onClick={() => eliminarDelCarrito(item.productoId)}
                      className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded px-2 py-1"
                      aria-label={`Eliminar ${item.producto.nombre} del carrito`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Eliminar
                    </button>
                  </div>
                </div>

                {/* Precio total del item */}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {formatoPrecio(item.producto.precio * item.cantidad)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen del pedido</h2>

              <dl className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Subtotal:</dt>
                  <dd className="font-medium text-gray-900">{formatoPrecio(carrito.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Envío:</dt>
                  <dd className="font-medium text-gray-900">
                    {carrito.envio === 0 ? (
                      <span className="text-green-600">Gratis</span>
                    ) : (
                      formatoPrecio(carrito.envio)
                    )}
                  </dd>
                </div>
                {carrito.descuento > 0 && (
                  <div className="flex justify-between text-green-600">
                    <dt>Descuento{carrito.cuponAplicado && ` (${carrito.cuponAplicado})`}:</dt>
                    <dd className="font-medium">-{formatoPrecio(carrito.descuento)}</dd>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-gray-300 text-base">
                  <dt className="font-semibold text-gray-900">Total:</dt>
                  <dd className="font-bold text-2xl text-primary-700">
                    {formatoPrecio(carrito.total)}
                  </dd>
                </div>
              </dl>

              {/* Cupón */}
              {!carrito.cuponAplicado && (
                <div className="mb-6">
                  <label htmlFor="cupon" className="block text-sm font-medium text-gray-900 mb-2">
                    Código de cupón
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="cupon"
                      placeholder="CODIGO"
                      value={codigoCupon}
                      onChange={(e) => setCodigoCupon(e.target.value.toUpperCase())}
                      className="input flex-1"
                      aria-describedby={errorCupon ? 'error-cupon' : undefined}
                    />
                    <button
                      onClick={handleAplicarCupon}
                      disabled={aplicandoCupon}
                      className="btn btn-outline btn-sm"
                    >
                      {aplicandoCupon ? 'Aplicando...' : 'Aplicar'}
                    </button>
                  </div>
                  {errorCupon && (
                    <p id="error-cupon" className="text-sm text-red-600 mt-1" role="alert">
                      {errorCupon}
                    </p>
                  )}
                </div>
              )}

              {/* Mensaje envío gratis */}
              {carrito.subtotal < 50 && carrito.subtotal > 0 && (
                <p className="text-sm text-gray-600 mb-4">
                  💡 Añade {formatoPrecio(50 - carrito.subtotal)} más para envío gratis en península
                </p>
              )}

              <Link 
                href="/checkout"
                className="btn btn-primary w-full inline-flex items-center justify-center"
              >
                Tramitar pedido
              </Link>

              <Link
                href="/catalogo"
                className="block text-center text-sm text-primary-700 hover:text-primary-800 mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded py-2"
              >
                ← Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
