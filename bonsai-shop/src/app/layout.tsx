import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bonsái Shop - Venta de Bonsáis y Accesorios en España',
  description: 'Tienda online especializada en bonsáis de calidad y accesorios para su cuidado. Envíos a toda España.',
  keywords: ['bonsái', 'bonsais', 'plantas', 'jardinería', 'macetas', 'herramientas bonsái'],
  authors: [{ name: 'Bonsái Shop' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#16a34a',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://bonsaishop.es',
    title: 'Bonsái Shop - Venta de Bonsáis en España',
    description: 'Tienda online especializada en bonsáis de calidad',
    siteName: 'Bonsái Shop',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
