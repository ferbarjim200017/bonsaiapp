'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Carrito, ItemCarrito, Producto } from '@/types';
import { getCuponByCodigo } from '@/lib/firebase/firestore';

interface CartContextType {
  carrito: Carrito;
  agregarAlCarrito: (producto: Producto, cantidad?: number) => void;
  eliminarDelCarrito: (productoId: string) => void;
  actualizarCantidad: (productoId: string, cantidad: number) => void;
  aplicarCupon: (codigo: string) => Promise<{ exito: boolean; mensaje: string }>;
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

  // Guardar datos del cupón aplicado
  const [cuponData, setCuponData] = useState<{ codigo: string; tipo: 'porcentaje' | 'fijo'; valor: number } | null>(null);

  // Persistir carrito en localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('bonsái-cart');
    const savedCupon = localStorage.getItem('bonsái-cupon');
    if (savedCart) {
      try {
        setCarrito(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error al cargar carrito:', error);
      }
    }
    if (savedCupon) {
      try {
        setCuponData(JSON.parse(savedCupon));
      } catch (error) {
        console.error('Error al cargar cupón:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bonsái-cart', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    if (cuponData) {
      localStorage.setItem('bonsái-cupon', JSON.stringify(cuponData));
    } else {
      localStorage.removeItem('bonsái-cupon');
    }
  }, [cuponData]);

  // Recalcular totales
  const recalcularTotales = (items: ItemCarrito[], cuponData?: { codigo: string; tipo: 'porcentaje' | 'fijo'; valor: number }) => {
    const subtotal = items.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
    
    // Calcular envío (gratis a partir de 50€ península)
    const envio = subtotal >= 50 ? 0 : 5.95;
    
    // Calcular descuento
    let descuento = 0;
    if (cuponData) {
      if (cuponData.tipo === 'porcentaje') {
        descuento = subtotal * (cuponData.valor / 100);
      } else if (cuponData.tipo === 'fijo') {
        descuento = cuponData.valor;
      }
    }
    
    const total = Math.max(0, subtotal + envio - descuento);
    
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
      
      const totales = recalcularTotales(newItems, cuponData || undefined);
      
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
      const totales = recalcularTotales(newItems, cuponData || undefined);
      
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
      const totales = recalcularTotales(newItems, cuponData || undefined);
      
      return {
        ...prev,
        items: newItems,
        ...totales,
      };
    });
  };

  const aplicarCupon = async (codigo: string): Promise<{ exito: boolean; mensaje: string }> => {
    try {
      // Buscar cupón en Firebase
      const cupon = await getCuponByCodigo(codigo);
      
      if (!cupon) {
        return { exito: false, mensaje: 'Cupón no válido' };
      }

      // Validar si el cupón está activo
      if (!cupon.activo) {
        return { exito: false, mensaje: 'Este cupón ya no está disponible' };
      }

      // Validar fechas
      const ahora = new Date();
      if (ahora < cupon.fechaInicio) {
        return { exito: false, mensaje: 'Este cupón aún no es válido' };
      }
      if (ahora > cupon.fechaFin) {
        return { exito: false, mensaje: 'Este cupón ha expirado' };
      }

      // Validar uso máximo
      if (cupon.usoMaximo && cupon.usosActuales >= cupon.usoMaximo) {
        return { exito: false, mensaje: 'Este cupón ha alcanzado el máximo de usos' };
      }

      // Validar mínimo de compra
      if (cupon.minimoCompra && carrito.subtotal < cupon.minimoCompra) {
        return { 
          exito: false, 
          mensaje: `Este cupón requiere un mínimo de compra de ${cupon.minimoCompra.toFixed(2)}€` 
        };
      }

      // Cupón válido - aplicarlo
      const nuevoCuponData = {
        codigo: cupon.codigo,
        tipo: cupon.tipo,
        valor: cupon.valor,
      };

      setCuponData(nuevoCuponData);

      setCarrito((prev) => {
        const totales = recalcularTotales(prev.items, nuevoCuponData);
        return {
          ...prev,
          cuponAplicado: cupon.codigo,
          ...totales,
        };
      });

      let descuentoTexto = '';
      if (cupon.tipo === 'porcentaje') {
        descuentoTexto = `${cupon.valor}% de descuento`;
      } else {
        descuentoTexto = `${cupon.valor.toFixed(2)}€ de descuento`;
      }

      return { 
        exito: true, 
        mensaje: `Cupón aplicado: ${descuentoTexto}` 
      };

    } catch (error) {
      console.error('Error al aplicar cupón:', error);
      return { 
        exito: false, 
        mensaje: 'Error al validar el cupón. Inténtalo de nuevo.' 
      };
    }
  };

  const limpiarCarrito = () => {
    setCarrito({
      items: [],
      subtotal: 0,
      envio: 0,
      descuento: 0,
      total: 0,
    });
    setCuponData(null);
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
