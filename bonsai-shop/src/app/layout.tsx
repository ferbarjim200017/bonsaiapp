import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PagePreloader from '@/components/layout/PagePreloader';
import ChatBot from '@/components/chat/ChatBot';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bonsái Shop - Venta de Bonsáis y Accesorios en España',
  description: 'Tienda online especializada en bonsáis de calidad y accesorios para su cuidado. Envíos a toda España.',
  keywords: ['bonsái', 'bonsáis', 'plantas', 'jardinería', 'macetas', 'herramientas bonsái'],
  authors: [{ name: 'Bonsái Shop' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#16a34a',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://bonsáishop.es',
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
        <AuthProvider>
          <CartProvider>
            <PagePreloader />
            <div className="flex flex-col min-h-screen">
              <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200" />}>
                <Header />
              </Suspense>
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <ChatBot />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
