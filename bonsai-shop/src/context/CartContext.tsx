'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Carrito, ItemCarrito, Producto } from '@/types';

interface CartContextType {
  carrito: Carrito;
  agregarAlCarrito: (producto: Producto, cantidad?: number) => void;
  eliminarDelCarrito: (productoId: string) => void;
  actualizarCantidad: (productoId: string, cantidad: number) => void;
  aplicarCupon: (codigo: string) => Promise<boolean>;
  limpiarCarrito: () => void;
  itemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<Carrito>({
    items: [],
    subtotal: 0,
    envio: 0,
    descuento: 0,
    total: 0,
  });

  // Persistir carrito en localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('bonsai-cart');
    if (savedCart) {
      try {
        setCarrito(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error al cargar carrito:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bonsai-cart', JSON.stringify(carrito));
  }, [carrito]);

  // Recalcular totales
  const recalcularTotales = (items: ItemCarrito[], cupon?: string) => {
    const subtotal = items.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
    
    // Calcular envío (gratis a partir de 50€ península)
    const envio = subtotal >= 50 ? 0 : 5.95;
    
    // Calcular descuento (mock - se validaría en backend)
    let descuento = 0;
    if (cupon) {
      // Ejemplo: cupón "BIENVENIDA10" = 10% descuento
      if (cupon === 'BIENVENIDA10' && subtotal >= 30) {
        descuento = subtotal * 0.1;
      }
    }
    
    const total = subtotal + envio - descuento;
    
    return { subtotal, envio, descuento, total };
  };

  const agregarAlCarrito = (producto: Producto, cantidad: number = 1) => {
    setCarrito((prev) => {
      const existingItem = prev.items.find((item) => item.productoId === producto.id);
      
      let newItems: ItemCarrito[];
      if (existingItem) {
        newItems = prev.items.map((item) =>
          item.productoId === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        newItems = [
          ...prev.items,
          { productoId: producto.id, producto, cantidad },
        ];
      }
      
      const totales = recalcularTotales(newItems, prev.cuponAplicado);
      
      return {
        ...prev,
        items: newItems,
        ...totales,
      };
    });
  };

  const eliminarDelCarrito = (productoId: string) => {
    setCarrito((prev) => {
      const newItems = prev.items.filter((item) => item.productoId !== productoId);
      const totales = recalcularTotales(newItems, prev.cuponAplicado);
      
      return {
        ...prev,
        items: newItems,
        ...totales,
      };
    });
  };

  const actualizarCantidad = (productoId: string, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(productoId);
      return;
    }
    
    setCarrito((prev) => {
      const newItems = prev.items.map((item) =>
        item.productoId === productoId ? { ...item, cantidad } : item
      );
      const totales = recalcularTotales(newItems, prev.cuponAplicado);
      
      return {
        ...prev,
        items: newItems,
        ...totales,
      };
    });
  };

  const aplicarCupon = async (codigo: string): Promise<boolean> => {
    // En producción, esto sería una llamada a API
    // Mock: aceptar solo "BIENVENIDA10"
    if (codigo === 'BIENVENIDA10' && carrito.subtotal >= 30) {
      setCarrito((prev) => {
        const totales = recalcularTotales(prev.items, codigo);
        return {
          ...prev,
          cuponAplicado: codigo,
          ...totales,
        };
      });
      return true;
    }
    return false;
  };

  const limpiarCarrito = () => {
    setCarrito({
      items: [],
      subtotal: 0,
      envio: 0,
      descuento: 0,
      total: 0,
    });
  };

  const itemsCount = carrito.items.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        aplicarCupon,
        limpiarCarrito,
        itemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
}
