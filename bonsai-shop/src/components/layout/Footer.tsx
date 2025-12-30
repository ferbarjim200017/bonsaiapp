import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Información */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bonsái Shop</h3>
            <p className="text-sm text-gray-600 mb-4">
              Tu tienda especializada en bonsáis de calidad y accesorios para su cuidado en España.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a 
                  href="mailto:info@bonsaishop.es"
                  className="hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                >
                  info@bonsaishop.es
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <a 
                  href="tel:+34900123456"
                  className="hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                >
                  900 123 456
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" aria-hidden="true" />
                <span>Madrid, España</span>
              </div>
            </div>
          </div>

          {/* Columna 2: Comprar */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Comprar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/catalogo?categoria=bonsai" 
                  className="text-gray-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                >
                  Bonsáis
                </Link>
              </li>
              <li>
                <Link 
                  href="/catalogo?categoria=accesorio" 
                  className="text-gray-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                >
                  Accesorios
                </Link>
              </li>
              <li>
                <Link 
                  href="/catalogo?nuevo=true" 
                  className="text-gray-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                >
                  Novedades
                </Link>
              </li>
              <li>
                <Link 
                  href="/catalogo?oferta=true" 
                  className="text-gray-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                >
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Ayuda */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ayuda</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/faq" 
                  className="text-gray-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                >
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link 
                  href="/envios" 
                  className="text-gray-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                >
                  Envíos
                </Link>
              </li>
              <li>
                <Link 
                  href="/devoluciones" 
                  className="text-gray-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                >
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link 
                  href="/cuidados" 
                  className="text-gray-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                >
                  Guía de cuidados
                </Link>
              </li>
              <li>
                <Link 
                  href="/contacto" 
                  className="text-gray-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/aviso-legal" 
                  className="text-gray-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                >
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacidad" 
                  className="text-gray-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link 
                  href="/cookies" 
                  className="text-gray-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                >
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link 
                  href="/terminos" 
                  className="text-gray-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded"
                >
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © {currentYear} Bonsái Shop. Todos los derechos reservados. | 
            Tienda online de bonsáis en España con envío a toda la península, Baleares, Canarias, Ceuta y Melilla.
          </p>
        </div>
      </div>
    </footer>
  );
}
