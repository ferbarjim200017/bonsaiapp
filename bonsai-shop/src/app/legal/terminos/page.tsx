import { Metadata } from 'next';
import { Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Bonsái Shop',
  description: 'Términos y condiciones de compra en Bonsái Shop - Condiciones generales de venta.',
};

export default function TerminosPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Encabezado */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="h-8 w-8 text-primary-600" aria-hidden="true" />
            <h1 className="text-4xl font-bold text-gray-900">Términos y Condiciones</h1>
          </div>
          <p className="text-gray-600">
            Última actualización: 7 de enero de 2026
          </p>
        </div>

        {/* Contenido */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Información general</h2>
            <p className="text-gray-700 mb-3">
              Los presentes Términos y Condiciones Generales regulan el uso del servicio del sitio web de venta online de productos (en adelante, Bonsái Shop), que Bonsái Shop S.L. pone a disposición de los usuarios de Internet.
            </p>
            <p className="text-gray-700">
              El acceso y/o uso de este sitio web atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, los presentes Términos y Condiciones Generales.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Objeto</h2>
            <p className="text-gray-700">
              El presente documento tiene por objeto establecer las Condiciones Generales de Venta de los productos ofertados en la tienda online de Bonsái Shop, accesible en el dominio www.bonsaishop.es, entre Bonsái Shop S.L. y el usuario comprador.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Productos y servicios</h2>
            <p className="text-gray-700 mb-3">
              Bonsái Shop ofrece a través de su tienda online la venta de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Bonsáis de diferentes especies y tamaños</li>
              <li>Accesorios para el cuidado de bonsáis (herramientas, macetas, sustratos, etc.)</li>
              <li>Productos complementarios relacionados con el arte del bonsái</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Todos los productos están sujetos a disponibilidad. Bonsái Shop se reserva el derecho de retirar o añadir productos al catálogo en cualquier momento.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Proceso de compra</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">4.1. Registro de usuario</h3>
            <p className="text-gray-700 mb-3">
              Para realizar una compra es necesario registrarse como usuario proporcionando los datos solicitados en el formulario de registro. El usuario se compromete a proporcionar información veraz y actualizada.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">4.2. Realización del pedido</h3>
            <p className="text-gray-700 mb-3">
              El usuario puede seleccionar los productos deseados y añadirlos al carrito de compra. Una vez finalizada la selección, deberá:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Revisar el contenido del carrito</li>
              <li>Confirmar la dirección de envío</li>
              <li>Seleccionar el método de pago</li>
              <li>Aceptar estos Términos y Condiciones</li>
              <li>Confirmar el pedido</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">4.3. Confirmación del pedido</h3>
            <p className="text-gray-700">
              Una vez realizado el pedido, el usuario recibirá un correo electrónico de confirmación con los detalles del mismo. Este correo no implica la aceptación del pedido, sino únicamente su recepción.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Precios y forma de pago</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">5.1. Precios</h3>
            <p className="text-gray-700 mb-3">
              Todos los precios están expresados en euros (€) e incluyen el IVA aplicable. Los precios no incluyen los gastos de envío, que se añadirán al importe total antes de la confirmación del pedido.
            </p>
            <p className="text-gray-700">
              Bonsái Shop se reserva el derecho de modificar los precios en cualquier momento, aunque los productos se facturarán según el precio vigente en el momento de realizar el pedido.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">5.2. Forma de pago</h3>
            <p className="text-gray-700 mb-3">
              Los métodos de pago aceptados son:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Tarjeta de crédito/débito (Visa, Mastercard, American Express)</li>
              <li>PayPal</li>
              <li>Transferencia bancaria</li>
              <li>Contrareembolso (según disponibilidad)</li>
            </ul>
            <p className="text-gray-700 mt-3">
              El pago se realizará en el momento de confirmar el pedido, salvo en el caso de transferencia bancaria o contrareembolso.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Envíos y entregas</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">6.1. Zona de envío</h3>
            <p className="text-gray-700 mb-3">
              Realizamos envíos a toda España peninsular, Baleares, Canarias, Ceuta y Melilla. Los gastos de envío varían según el destino y el peso del pedido.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">6.2. Plazo de entrega</h3>
            <p className="text-gray-700 mb-3">
              Los plazos de entrega estimados son:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Península: 2-5 días laborables</li>
              <li>Baleares: 3-7 días laborables</li>
              <li>Canarias, Ceuta y Melilla: 5-10 días laborables</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Estos plazos son orientativos y pueden verse afectados por circunstancias excepcionales como condiciones meteorológicas adversas, problemas de tráfico, o incidencias en el servicio de mensajería.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">6.3. Recepción del pedido</h3>
            <p className="text-gray-700">
              El usuario debe verificar el estado del paquete en el momento de la entrega. Si el embalaje está dañado, debe hacerlo constar ante el transportista y notificarlo a Bonsái Shop en un plazo de 24 horas.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Derecho de desistimiento</h2>
            <p className="text-gray-700 mb-3">
              De conformidad con la legislación vigente, el usuario dispone de un plazo de 14 días naturales desde la recepción del producto para ejercer su derecho de desistimiento sin necesidad de justificación.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">7.1. Condiciones</h3>
            <p className="text-gray-700 mb-3">
              Para ejercer el derecho de desistimiento, el usuario debe:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Notificar su intención por email a devoluciones@bonsaishop.es</li>
              <li>Devolver el producto en su embalaje original y en perfecto estado</li>
              <li>Los productos deben estar sin usar y con todas sus etiquetas</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">7.2. Excepciones</h3>
            <p className="text-gray-700 mb-3">
              No se admitirán devoluciones de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Bonsáis vivos (por ser productos perecederos)</li>
              <li>Productos deteriorados por el uso</li>
              <li>Productos personalizados o hechos a medida</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">7.3. Reembolso</h3>
            <p className="text-gray-700">
              Una vez recibido y verificado el producto devuelto, procederemos al reembolso del importe abonado en un plazo máximo de 14 días. Los gastos de devolución correrán a cargo del usuario, salvo que el producto sea defectuoso o erróneo por nuestra parte.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Garantía</h2>
            <p className="text-gray-700 mb-3">
              Todos nuestros productos cuentan con la garantía legal de 2 años establecida por la normativa española y europea. Esta garantía cubre defectos de fabricación y conformidad del producto.
            </p>
            <p className="text-gray-700">
              Para bonsáis vivos, ofrecemos una garantía de 7 días desde la recepción del producto, siempre que se demuestre que el problema no es debido a un cuidado inadecuado.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Responsabilidad</h2>
            <p className="text-gray-700 mb-3">
              Bonsái Shop no se hace responsable de:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Daños derivados de un uso inadecuado de los productos</li>
              <li>La salud de los bonsáis tras su entrega, si no se siguen las instrucciones de cuidado</li>
              <li>Retrasos en la entrega causados por el servicio de mensajería</li>
              <li>Información errónea proporcionada por el usuario</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Propiedad intelectual</h2>
            <p className="text-gray-700">
              Todos los contenidos de este sitio web (textos, imágenes, logotipos, diseños) son propiedad de Bonsái Shop o se utilizan con la debida autorización. Queda prohibida su reproducción, distribución o comunicación pública sin autorización expresa.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Protección de datos</h2>
            <p className="text-gray-700">
              El tratamiento de sus datos personales se realiza conforme a lo establecido en nuestra{' '}
              <a href="/legal/privacidad" className="text-primary-600 hover:text-primary-700 underline">
                Política de Privacidad
              </a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Resolución de conflictos</h2>
            <p className="text-gray-700 mb-3">
              Para cualquier reclamación o conflicto, el usuario puede contactar con nuestro servicio de atención al cliente en info@bonsaishop.es o en el teléfono 900 123 456.
            </p>
            <p className="text-gray-700 mb-3">
              Conforme al Reglamento (UE) 524/2013, la Comisión Europea facilita una plataforma de resolución de litigios en línea, disponible en:{' '}
              <a 
                href="https://ec.europa.eu/consumers/odr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Legislación aplicable y jurisdicción</h2>
            <p className="text-gray-700">
              Estos Términos y Condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales de Madrid, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Modificaciones</h2>
            <p className="text-gray-700">
              Bonsái Shop se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones serán efectivas desde su publicación en el sitio web. Se recomienda revisar periódicamente este documento.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
