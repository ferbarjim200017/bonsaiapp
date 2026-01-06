'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Rutas a precargar
const routesToPreload = [
  '/catalogo?categoria=bonsái',
  '/catalogo?categoria=accesorio',
  '/cuidados',
  '/contacto',
  '/buscar',
  '/carrito',
  '/cuenta',
  '/faq',
];

export default function PagePreloader() {
  const router = useRouter();

  useEffect(() => {
    // Precargar rutas después de que la página principal cargue
    const timer = setTimeout(() => {
      routesToPreload.forEach((route) => {
        router.prefetch(route);
      });
    }, 100); // Pequeño delay para no bloquear la carga inicial

    return () => clearTimeout(timer);
  }, [router]);

  return null; // No renderiza nada
}
