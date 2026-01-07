import { Metadata } from 'next';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aviso Legal | Bonsái Shop',
  description: 'Aviso legal de Bonsái Shop - Información legal sobre nuestra tienda online de bonsáis.',
};

export default function AvisoLegalPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Encabezado */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-primary-600" aria-hidden="true" />
            <h1 className="text-4xl font-bold text-gray-900">Aviso Legal</h1>
          </div>
          <p className="text-gray-600">
            Última actualización: 7 de enero de 2026
          </p>
        </div>

        {/* Contenido */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Datos identificativos</h2>
            <p className="text-gray-700 mb-3">
              En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Titular:</strong> Bonsái Shop S.L.</li>
              <li><strong>CIF:</strong> B-12345678</li>
              <li><strong>Domicilio social:</strong> Calle Ejemplo, 123, 28001 Madrid, España</li>
              <li><strong>Email:</strong> info@bonsaishop.es</li>
              <li><strong>Teléfono:</strong> 900 123 456</li>
              <li><strong>Registro Mercantil:</strong> Madrid, Tomo 1234, Folio 56, Hoja M-12345</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Objeto</h2>
            <p className="text-gray-700 mb-3">
              El presente aviso legal regula el uso y utilización del sitio web <strong>www.bonsaishop.es</strong>, del que es titular Bonsái Shop S.L.
            </p>
            <p className="text-gray-700">
              La navegación por el sitio web atribuye la condición de usuario del mismo e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal, que pueden sufrir modificaciones.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Condiciones de uso</h2>
            <p className="text-gray-700 mb-3">
              El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que Bonsái Shop ofrece a través de su sitio web y con carácter enunciativo pero no limitativo, a no emplearlos para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.</li>
              <li>Difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico-ilegal, de apología del terrorismo o atentatorio contra los derechos humanos.</li>
              <li>Provocar daños en los sistemas físicos y lógicos de Bonsái Shop, de sus proveedores o de terceras personas.</li>
              <li>Introducir o difundir en la red virus informáticos o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar los daños anteriormente mencionados.</li>
              <li>Intentar acceder y, en su caso, utilizar las cuentas de correo electrónico de otros usuarios y modificar o manipular sus mensajes.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Propiedad intelectual e industrial</h2>
            <p className="text-gray-700 mb-3">
              El sitio web, incluyendo a título enunciativo pero no limitativo su programación, edición, compilación y demás elementos necesarios para su funcionamiento, los diseños, logotipos, texto y/o gráficos, son propiedad de Bonsái Shop o, en su caso, dispone de licencia o autorización expresa por parte de los autores.
            </p>
            <p className="text-gray-700">
              Todos los contenidos del sitio web se encuentran debidamente protegidos por la normativa de propiedad intelectual e industrial, así como inscritos en los registros públicos correspondientes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Exclusión de garantías y responsabilidad</h2>
            <p className="text-gray-700 mb-3">
              Bonsái Shop no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Errores u omisiones en los contenidos.</li>
              <li>La falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos.</li>
              <li>La falta de licitud, calidad, fiabilidad, utilidad y disponibilidad de los servicios prestados por terceros y puestos a disposición de los usuarios en el sitio web.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Modificaciones</h2>
            <p className="text-gray-700">
              Bonsái Shop se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Enlaces</h2>
            <p className="text-gray-700 mb-3">
              En el caso de que en el sitio web se dispusiesen enlaces o hipervínculos hacia otros sitios de Internet, Bonsái Shop no ejercerá ningún tipo de control sobre dichos sitios y contenidos.
            </p>
            <p className="text-gray-700">
              En ningún caso Bonsái Shop asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno, ni garantizará la disponibilidad técnica, calidad, fiabilidad, exactitud, amplitud, veracidad, validez y constitucionalidad de cualquier material o información contenida en ninguno de dichos hipervínculos u otros sitios de Internet.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Protección de datos</h2>
            <p className="text-gray-700">
              Para más información sobre el tratamiento de sus datos personales, consulte nuestra{' '}
              <a href="/legal/privacidad" className="text-primary-600 hover:text-primary-700 underline">
                Política de Privacidad
              </a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Legislación aplicable y jurisdicción</h2>
            <p className="text-gray-700">
              La relación entre Bonsái Shop y el usuario se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y Tribunales de Madrid, España.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
