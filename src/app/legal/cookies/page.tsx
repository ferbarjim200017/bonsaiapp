import { Metadata } from 'next';
import { Cookie } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Cookies | Bonsái Shop',
  description: 'Política de cookies de Bonsái Shop - Información sobre el uso de cookies en nuestro sitio web.',
};

export default function CookiesPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Encabezado */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="h-8 w-8 text-primary-600" aria-hidden="true" />
            <h1 className="text-4xl font-bold text-gray-900">Política de Cookies</h1>
          </div>
          <p className="text-gray-600">
            Última actualización: 7 de enero de 2026
          </p>
        </div>

        {/* Contenido */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. ¿Qué son las cookies?</h2>
            <p className="text-gray-700 mb-3">
              Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.
            </p>
            <p className="text-gray-700">
              El navegador del usuario memoriza cookies en el disco duro solamente durante la sesión actual ocupando un espacio de memoria mínimo y no perjudicando al ordenador. Las cookies no contienen ninguna clase de información personal específica, y la mayoría de las mismas se borran del disco duro al finalizar la sesión de navegador (las denominadas cookies de sesión).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Tipos de cookies utilizadas</h2>
            <p className="text-gray-700 mb-4">
              Este sitio web utiliza diferentes tipos de cookies:
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cookies técnicas (necesarias)</h3>
              <p className="text-gray-700 mb-2">
                Son aquellas que permiten al usuario la navegación a través del sitio web y la utilización de las diferentes opciones o servicios que en ella existen.
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Ejemplos:</strong> Control de tráfico y comunicación de datos, identificación de la sesión, recordar elementos del carrito de compra, proceso de compra.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cookies de preferencias</h3>
              <p className="text-gray-700 mb-2">
                Permiten recordar información para que el usuario acceda al servicio con determinadas características que pueden diferenciar su experiencia de la de otros usuarios.
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Ejemplos:</strong> Idioma, número de resultados a mostrar, aspecto del servicio.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cookies de análisis</h3>
              <p className="text-gray-700 mb-2">
                Son aquellas que permiten al responsable de las mismas el seguimiento y análisis del comportamiento de los usuarios de los sitios web a los que están vinculadas.
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Ejemplos:</strong> Google Analytics para medir la audiencia y elaborar estadísticas de navegación.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cookies publicitarias</h3>
              <p className="text-gray-700 mb-2">
                Son aquellas que permiten la gestión de los espacios publicitarios que el editor haya incluido en una página web en base a criterios como el contenido editado o la frecuencia en la que se muestran los anuncios.
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Ejemplos:</strong> Gestión de frecuencia de visualización de anuncios, personalización de publicidad.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookies utilizadas en este sitio web</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                      Cookie
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                      Tipo
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                      Finalidad
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Duración
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">session_id</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">Técnica</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">Identificar sesión de usuario</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Sesión</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">cart_items</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">Técnica</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">Recordar productos del carrito</td>
                    <td className="px-4 py-3 text-sm text-gray-700">7 días</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">user_preferences</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">Preferencias</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">Guardar preferencias del usuario</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1 año</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">_ga</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">Análisis</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">Google Analytics - Distinguir usuarios</td>
                    <td className="px-4 py-3 text-sm text-gray-700">2 años</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">_gid</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">Análisis</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">Google Analytics - Distinguir usuarios</td>
                    <td className="px-4 py-3 text-sm text-gray-700">24 horas</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cookies de terceros</h2>
            <p className="text-gray-700 mb-3">
              Este sitio web utiliza servicios de terceros para recopilar información con fines estadísticos y de uso de la web. Se usan cookies para facilitar el análisis estadístico sobre cómo los usuarios navegan por el sitio web.
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Google Analytics:</strong> Almacena cookies para poder elaborar estadísticas sobre el tráfico y volumen de visitas de este sitio web. Al utilizar este sitio web está consintiendo el tratamiento de información acerca de usted por Google. Por tanto, el ejercicio de cualquier derecho en este sentido deberá hacerlo comunicando directamente con Google.
            </p>
            <p className="text-gray-700">
              Para más información sobre las cookies de Google Analytics, consulte:{' '}
              <a 
                href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cómo gestionar las cookies</h2>
            <p className="text-gray-700 mb-3">
              Puede usted permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                <strong>Chrome:</strong>{' '}
                <a 
                  href="https://support.google.com/chrome/answer/95647?hl=es" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  Configuración de cookies en Chrome
                </a>
              </li>
              <li>
                <strong>Firefox:</strong>{' '}
                <a 
                  href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  Configuración de cookies en Firefox
                </a>
              </li>
              <li>
                <strong>Safari:</strong>{' '}
                <a 
                  href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  Configuración de cookies en Safari
                </a>
              </li>
              <li>
                <strong>Edge:</strong>{' '}
                <a 
                  href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  Configuración de cookies en Edge
                </a>
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              Si desea más información sobre cómo gestionar las cookies, puede visitar{' '}
              <a 
                href="https://www.aboutcookies.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                www.aboutcookies.org
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Consecuencias de deshabilitar las cookies</h2>
            <p className="text-gray-700">
              Si deshabilita las cookies, algunas funcionalidades del sitio web pueden no funcionar correctamente. En particular, es posible que no pueda completar el proceso de compra, que no se guarden sus preferencias de navegación, o que algunas páginas no se muestren correctamente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Actualizaciones de la Política de Cookies</h2>
            <p className="text-gray-700">
              Bonsái Shop puede modificar esta Política de Cookies en función de exigencias legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos. Por ello se aconseja a los usuarios que la visiten periódicamente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contacto</h2>
            <p className="text-gray-700">
              Si tiene alguna duda sobre esta Política de Cookies, puede contactar con nosotros en{' '}
              <a href="mailto:protecciondatos@bonsaishop.es" className="text-primary-600 hover:text-primary-700 underline">
                protecciondatos@bonsaishop.es
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
