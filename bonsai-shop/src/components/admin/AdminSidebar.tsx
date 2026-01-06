'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  ShoppingBag, 
  LogOut,
  Home,
  Mail
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Productos', href: '/admin/productos', icon: Package },
    { name: 'Cupones', href: '/admin/cupones', icon: Tag },
    { name: 'Pedidos', href: '/admin/pedidos', icon: ShoppingBag },
    { name: 'Mensajes', href: '/admin/mensajes', icon: Mail },
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-900 h-screen">
      <div className="flex items-center justify-center h-16 bg-gray-800 border-b border-gray-700">
        <h1 className="text-white text-xl font-bold">🌳 Admin Panel</h1>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" aria-hidden="true" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-700 p-4 space-y-2">
          <Link
            href="/"
            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
          >
            <Home className="mr-3 h-5 w-5" aria-hidden="true" />
            Ver tienda
          </Link>
          
          <button
            onClick={logout}
            className="w-full group flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
          >
            <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
            Cerrar sesión
          </button>
          
          {user && (
            <div className="px-3 py-2 text-xs text-gray-400 truncate">
              {user.email}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
