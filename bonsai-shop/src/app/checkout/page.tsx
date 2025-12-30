'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { carrito, limpiarCarrito } = useCart();
  const [procesando, setProcesando] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    provincia: '',
    codigoPostal: '',
    metodoPago: 'tarjeta',
    aceptaTerminos: false,
  });

  const formatoPrecio = (precio: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(precio);

  if (carrito.items.length === 0) {
    router.push('/carrito');
    return null;
  }

  const validarFormulario = () => {
    const nuevosErrores: Record<string, string> = {};

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = 'Email no válido';
    }
    if (!formData.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!formData.apellidos.trim()) nuevosErrores.apellidos = 'Los apellidos son obligatorios';
    if (!formData.telefono.trim() || !/^\d{9}$/.test(formData.telefono.replace(/\s/g, ''))) {
      nuevosErrores.telefono = 'Teléfono no válido (9 dígitos)';
    }
    if (!formData.direccion.trim()) nuevosErrores.direccion = 'La dirección es obligatoria';
    if (!formData.ciudad.trim()) nuevosErrores.ciudad = 'La ciudad es obligatoria';
    if (!formData.provincia.trim()) nuevosErrores.provincia = 'La provincia es obligatoria';
    if (!formData.codigoPostal.trim() || !/^\d{5}$/.test(formData.codigoPostal)) {
      nuevosErrores.codigoPostal = 'Código postal no válido (5 dígitos)';
    }
    if (!formData.aceptaTerminos) {
      nuevosErrores.aceptaTerminos = 'Debes aceptar los términos y condiciones';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      // Mover foco al primer error
      const primerError = Object.keys(errores)[0];
      document.getElementById(primerError)?.focus();
      return;
    }

    setProcesando(true);

    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock: crear pedido
    const numeroPedido = `BON-${Date.now()}`;
    
    // Limpiar carrito
    limpiarCarrito();

    // Redirigir a confirmación
    router.push(`/checkout/confirmacion?pedido=${numeroPedido}`);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar compra</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-2 space-y-8">
              {/* Datos de contacto */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Datos de contacto</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      autoComplete="email"
                      aria-describedby={errores.email ? 'error-email' : undefined}
                      aria-invalid={!!errores.email}
                    />
                    {errores.email && (
                      <p id="error-email" className="text-sm text-red-600 mt-1" role="alert">
                        {errores.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 mb-1">
                        Nombre <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        className="input"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        required
                        autoComplete="given-name"
                        aria-describedby={errores.nombre ? 'error-nombre' : undefined}
                        aria-invalid={!!errores.nombre}
                      />
                      {errores.nombre && (
                        <p id="error-nombre" className="text-sm text-red-600 mt-1" role="alert">
                          {errores.nombre}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="apellidos" className="block text-sm font-medium text-gray-900 mb-1">
                        Apellidos <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="apellidos"
                        className="input"
                        value={formData.apellidos}
                        onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                        required
                        autoComplete="family-name"
                        aria-describedby={errores.apellidos ? 'error-apellidos' : undefined}
                        aria-invalid={!!errores.apellidos}
                      />
                      {errores.apellidos && (
                        <p id="error-apellidos" className="text-sm text-red-600 mt-1" role="alert">
                          {errores.apellidos}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-900 mb-1">
                      Teléfono <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      className="input"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      required
                      autoComplete="tel"
                      placeholder="600123456"
                      aria-describedby={errores.telefono ? 'error-telefono' : undefined}
                      aria-invalid={!!errores.telefono}
                    />
                    {errores.telefono && (
                      <p id="error-telefono" className="text-sm text-red-600 mt-1" role="alert">
                        {errores.telefono}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Dirección de envío */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Dirección de envío</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="direccion" className="block text-sm font-medium text-gray-900 mb-1">
                      Dirección <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="direccion"
                      className="input"
                      value={formData.direccion}
                      onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                      required
                      autoComplete="street-address"
                      placeholder="Calle, número, piso"
                      aria-describedby={errores.direccion ? 'error-direccion' : undefined}
                      aria-invalid={!!errores.direccion}
                    />
                    {errores.direccion && (
                      <p id="error-direccion" className="text-sm text-red-600 mt-1" role="alert">
                        {errores.direccion}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="ciudad" className="block text-sm font-medium text-gray-900 mb-1">
                        Ciudad <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="ciudad"
                        className="input"
                        value={formData.ciudad}
                        onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                        required
                        autoComplete="address-level2"
                        aria-describedby={errores.ciudad ? 'error-ciudad' : undefined}
                        aria-invalid={!!errores.ciudad}
                      />
                      {errores.ciudad && (
                        <p id="error-ciudad" className="text-sm text-red-600 mt-1" role="alert">
                          {errores.ciudad}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-900 mb-1">
                        CP <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="codigoPostal"
                        className="input"
                        value={formData.codigoPostal}
                        onChange={(e) => setFormData({ ...formData, codigoPostal: e.target.value })}
                        required
                        autoComplete="postal-code"
                        placeholder="28001"
                        maxLength={5}
                        inputMode="numeric"
                        aria-describedby={errores.codigoPostal ? 'error-codigoPostal' : undefined}
                        aria-invalid={!!errores.codigoPostal}
                      />
                      {errores.codigoPostal && (
                        <p id="error-codigoPostal" className="text-sm text-red-600 mt-1" role="alert">
                          {errores.codigoPostal}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="provincia" className="block text-sm font-medium text-gray-900 mb-1">
                      Provincia <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="provincia"
                      className="input"
                      value={formData.provincia}
                      onChange={(e) => setFormData({ ...formData, provincia: e.target.value })}
                      required
                      autoComplete="address-level1"
                      aria-describedby={errores.provincia ? 'error-provincia' : undefined}
                      aria-invalid={!!errores.provincia}
                    />
                    {errores.provincia && (
                      <p id="error-provincia" className="text-sm text-red-600 mt-1" role="alert">
                        {errores.provincia}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Método de pago */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Método de pago</h2>
                
                <fieldset className="space-y-3">
                  <legend className="sr-only">Selecciona método de pago</legend>
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-600 focus-within:border-primary-600">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="tarjeta"
                      checked={formData.metodoPago === 'tarjeta'}
                      onChange={(e) => setFormData({ ...formData, metodoPago: e.target.value })}
                      className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-600"
                    />
                    <span className="text-sm font-medium text-gray-900">💳 Tarjeta de crédito/débito</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-600 focus-within:border-primary-600">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="paypal"
                      checked={formData.metodoPago === 'paypal'}
                      onChange={(e) => setFormData({ ...formData, metodoPago: e.target.value })}
                      className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-600"
                    />
                    <span className="text-sm font-medium text-gray-900">PayPal</span>
                  </label>
                </fieldset>
              </section>

              {/* Términos */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="aceptaTerminos"
                  checked={formData.aceptaTerminos}
                  onChange={(e) => setFormData({ ...formData, aceptaTerminos: e.target.checked })}
                  className="h-5 w-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-600 mt-0.5"
                  aria-describedby={errores.aceptaTerminos ? 'error-terminos' : undefined}
                  aria-invalid={!!errores.aceptaTerminos}
                />
                <label htmlFor="aceptaTerminos" className="text-sm text-gray-700">
                  He leído y acepto los{' '}
                  <Link href="/terminos" className="text-primary-700 hover:underline" target="_blank">
                    términos y condiciones
                  </Link>{' '}
                  y la{' '}
                  <Link href="/privacidad" className="text-primary-700 hover:underline" target="_blank">
                    política de privacidad
                  </Link>
                  . <span className="text-red-600">*</span>
                </label>
              </div>
              {errores.aceptaTerminos && (
                <p id="error-terminos" className="text-sm text-red-600 mt-1" role="alert">
                  {errores.aceptaTerminos}
                </p>
              )}
            </div>

            {/* Resumen sticky */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen</h2>

                <dl className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Productos ({carrito.items.length}):</dt>
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
                      <dt>Descuento:</dt>
                      <dd className="font-medium">-{formatoPrecio(carrito.descuento)}</dd>
                    </div>
                  )}
                </dl>

                <div className="flex justify-between pt-4 border-t border-gray-300 mb-6">
                  <dt className="font-semibold text-gray-900">Total:</dt>
                  <dd className="font-bold text-2xl text-primary-700">
                    {formatoPrecio(carrito.total)}
                  </dd>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={procesando}
                >
                  {procesando ? 'Procesando...' : 'Finalizar compra'}
                </Button>

                <Link
                  href="/carrito"
                  className="block text-center text-sm text-primary-700 hover:text-primary-800 mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded py-2"
                >
                  ← Volver al carrito
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
