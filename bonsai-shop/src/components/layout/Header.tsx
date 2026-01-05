'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ShoppingCart, User, Search, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemsCount } = useCart();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Bonsáis', href: '/catalogo?categoria=bonsai' },
    { name: 'Accesorios', href: '/catalogo?categoria=accesorio' },
    { name: 'Guía de cuidados', href: '/cuidados' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl font-bold text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded"
              aria-label="Bonsái Shop - Ir a inicio"
            >
              🌳 Bonsái Shop
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side: Search, User, Cart */}
          <div className="flex items-center space-x-2">
            <Link
              href="/buscar"
              className="p-2 text-gray-700 hover:text-primary-700 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
              aria-label="Buscar productos"
            >
              <Search className="h-6 w-6" aria-hidden="true" />
            </Link>

            {/* Usuario - Dropdown en desktop */}
            <div className="hidden sm:block relative group">
              <Link
                href="/cuenta"
                className="p-2 text-gray-700 hover:text-primary-700 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 flex items-center gap-2"
                aria-label="Mi cuenta"
              >
                <User className="h-6 w-6" aria-hidden="true" />
                {user && (
                  <span className="hidden lg:block text-sm font-medium">
                    {user.nombre}
                  </span>
                )}
              </Link>

              {/* Dropdown menu */}
              {user && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1" role="menu">
                    <Link
                      href="/cuenta"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Mi cuenta
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/carrito"
              className="relative p-2 text-gray-700 hover:text-primary-700 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
              aria-label={`Carrito de compra, ${itemsCount} artículo${itemsCount !== 1 ? 's' : ''}`}
            >
              <ShoppingCart className="h-6 w-6" aria-hidden="true" />
              {itemsCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold text-white bg-primary-600 rounded-full"
                  aria-hidden="true"
                >
                  {itemsCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 text-gray-700 hover:text-primary-700 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1" role="menu">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-md"
                role="menuitem"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {user ? (
              <>
                <div className="border-t border-gray-200 my-2 pt-2">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    {user.nombre}
                  </div>
                  <Link
                    href="/cuenta"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-md sm:hidden"
                    role="menuitem"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mi cuenta
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-md flex items-center gap-2"
                    role="menuitem"
                  >
                    <LogOut className="h-5 w-5" />
                    Cerrar sesión
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/cuenta/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-50 rounded-md sm:hidden"
                role="menuitem"
                onClick={() => setMobileMenuOpen(false)}
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
