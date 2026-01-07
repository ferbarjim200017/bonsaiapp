import { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Bonsái Shop',
  description: 'Política de privacidad de Bonsái Shop - Información sobre el tratamiento de datos personales.',
};

export default function PrivacidadPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Encabezado */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary-600" aria-hidden="true" />
            <h1 className="text-4xl font-bold text-gray-900">Política de Privacidad</h1>
          </div>
          <p className="text-gray-600">
            Última actualización: 7 de enero de 2026
          </p>
        </div>

        {/* Contenido */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Responsable del tratamiento</h2>
            <p className="text-gray-700 mb-3">
              De conformidad con lo establecido en el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), le informamos:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Responsable:</strong> Bonsái Shop S.L.</li>
              <li><strong>CIF:</strong> B-12345678</li>
              <li><strong>Dirección:</strong> Calle Ejemplo, 123, 28001 Madrid, España</li>
              <li><strong>Email:</strong> protecciondatos@bonsaishop.es</li>
              <li><strong>Teléfono:</strong> 900 123 456</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Finalidad del tratamiento</h2>
            <p className="text-gray-700 mb-3">
              Los datos personales que nos proporcione serán utilizados para las siguientes finalidades:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Gestionar su registro como usuario de la tienda online.</li>
              <li>Procesar y gestionar sus pedidos de productos.</li>
              <li>Gestionar el envío de productos adquiridos.</li>
              <li>Gestionar el pago de los productos adquiridos.</li>
              <li>Atender sus consultas, solicitudes o reclamaciones.</li>
              <li>Enviarle comunicaciones comerciales, si ha dado su consentimiento.</li>
              <li>Mejorar nuestros servicios y la experiencia del usuario.</li>
              <li>Cumplir con las obligaciones legales aplicables.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Legitimación</h2>
            <p className="text-gray-700 mb-3">
              La base legal para el tratamiento de sus datos es:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Ejecución de un contrato:</strong> Para la gestión de pedidos y envíos.</li>
              <li><strong>Consentimiento del interesado:</strong> Para el envío de comunicaciones comerciales.</li>
              <li><strong>Interés legítimo:</strong> Para la mejora de nuestros servicios.</li>
              <li><strong>Obligación legal:</strong> Para cumplir con las obligaciones fiscales y contables.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Datos recogidos</h2>
            <p className="text-gray-700 mb-3">
              Los datos personales que podemos recoger incluyen:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Datos de identificación: nombre, apellidos, DNI/NIE.</li>
              <li>Datos de contacto: dirección postal, email, teléfono.</li>
              <li>Datos de facturación y envío.</li>
              <li>Datos de transacción: historial de pedidos, métodos de pago.</li>
              <li>Datos de navegación: dirección IP, cookies, páginas visitadas.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Destinatarios de los datos</h2>
            <p className="text-gray-700 mb-3">
              Sus datos podrán ser comunicados a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Empresas de transporte y mensajería para la entrega de pedidos.</li>
              <li>Entidades bancarias y plataformas de pago para procesar transacciones.</li>
              <li>Administraciones públicas cuando exista una obligación legal.</li>
              <li>Proveedores de servicios tecnológicos (hosting, email, etc.).</li>
            </ul>
            <p className="text-gray-700 mt-3">
              No se realizarán transferencias internacionales de datos fuera del Espacio Económico Europeo.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Conservación de los datos</h2>
            <p className="text-gray-700">
              Los datos personales se conservarán mientras mantenga su cuenta activa o durante el tiempo necesario para cumplir con las finalidades para las que se recogieron. Posteriormente, se conservarán bloqueados durante los plazos legales aplicables (generalmente 6 años para obligaciones fiscales y contables).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Derechos del usuario</h2>
            <p className="text-gray-700 mb-3">
              Como usuario, tiene derecho a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Acceso:</strong> Conocer qué datos tratamos sobre usted.</li>
              <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos.</li>
              <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos.</li>
              <li><strong>Limitación:</strong> Restringir el tratamiento en determinados casos.</li>
              <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado.</li>
              <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos.</li>
              <li><strong>Retirada del consentimiento:</strong> En cualquier momento, sin que afecte a la licitud del tratamiento previo.</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Para ejercer sus derechos, puede enviar un email a{' '}
              <a href="mailto:protecciondatos@bonsaishop.es" className="text-primary-600 hover:text-primary-700 underline">
                protecciondatos@bonsaishop.es
              </a>{' '}
              o una carta a nuestra dirección postal, adjuntando copia de su DNI o documento identificativo equivalente.
            </p>
            <p className="text-gray-700 mt-3">
              También tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Medidas de seguridad</h2>
            <p className="text-gray-700">
              Bonsái Shop ha adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, habida cuenta del estado de la tecnología, la naturaleza de los datos almacenados y los riesgos a que están expuestos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Cookies</h2>
            <p className="text-gray-700">
              Este sitio web utiliza cookies. Para más información sobre el uso de cookies, consulte nuestra{' '}
              <a href="/legal/cookies" className="text-primary-600 hover:text-primary-700 underline">
                Política de Cookies
              </a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Actualizaciones</h2>
            <p className="text-gray-700">
              Bonsái Shop se reserva el derecho a modificar la presente Política de Privacidad para adaptarla a novedades legislativas o jurisprudenciales, así como a prácticas de la industria. Cualquier modificación será publicada en esta página con suficiente antelación a su puesta en práctica.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
