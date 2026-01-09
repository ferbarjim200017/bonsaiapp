'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Carrito, ItemCarrito, Producto } from '@/types';
import { getCuponByCodigo, saveCarrito, getCarrito, deleteCarrito, getProductoById } from '@/lib/firebase/firestore';
import { useAuth } from './AuthContext';

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
  const { user } = useAuth();
  const [carrito, setCarrito] = useState<Carrito>({
    items: [],
    subtotal: 0,
    envio: 0,
    descuento: 0,
    total: 0,
  });

  // Guardar datos del cupón aplicado
  const [cuponData, setCuponData] = useState<{ codigo: string; tipo: 'porcentaje' | 'fijo'; valor: number } | null>(null);
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  // Cargar carrito cuando el usuario inicia sesión
  useEffect(() => {
    const loadCartFromFirestore = async () => {
      if (user?.uid && !isLoadingCart) {
        setIsLoadingCart(true);
        try {
          const carritoFirestore = await getCarrito(user.uid);
          
          if (carritoFirestore && carritoFirestore.items.length > 0) {
            // Reconstruir el carrito con los datos completos de los productos
            const itemsWithProducts: ItemCarrito[] = [];
            
            for (const item of carritoFirestore.items) {
              const producto = await getProductoById(item.productoId);
              if (producto) {
                itemsWithProducts.push({
                  productoId: producto.id,
                  producto,
                  cantidad: item.cantidad,
                });
              }
            }

            // Si hay un cupón aplicado, cargarlo
            let cuponDataLoaded = null;
            if (carritoFirestore.cuponAplicado) {
              const cupon = await getCuponByCodigo(carritoFirestore.cuponAplicado);
              if (cupon && cupon.activo) {
                cuponDataLoaded = {
                  codigo: cupon.codigo,
                  tipo: cupon.tipo,
                  valor: cupon.valor,
                };
                setCuponData(cuponDataLoaded);
              }
            }

            const totales = recalcularTotales(itemsWithProducts, cuponDataLoaded || undefined);
            
            setCarrito({
              items: itemsWithProducts,
              cuponAplicado: carritoFirestore.cuponAplicado,
              ...totales,
            });
          }
        } catch (error) {
          console.error('Error cargando carrito desde Firestore:', error);
          // Si hay error, cargar desde localStorage como fallback
          loadCartFromLocalStorage();
        } finally {
          setIsLoadingCart(false);
        }
      } else if (!user) {
        // Usuario no autenticado - cargar desde localStorage
        loadCartFromLocalStorage();
      }
    };

    loadCartFromFirestore();
  }, [user?.uid]);

  // Función para cargar desde localStorage (fallback o usuarios no autenticados)
  const loadCartFromLocalStorage = () => {
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
  };

  // Sincronizar carrito con Firestore cuando cambia (si el usuario está autenticado)
  useEffect(() => {
    const syncCartToFirestore = async () => {
      if (user?.uid && !isLoadingCart && carrito.items.length >= 0) {
        try {
          const itemsToSave = carrito.items.map(item => ({
            productoId: item.productoId,
            cantidad: item.cantidad,
          }));
          
          await saveCarrito(user.uid, itemsToSave, carrito.cuponAplicado);
        } catch (error) {
          console.error('Error sincronizando carrito con Firestore:', error);
        }
      }
    };

    // Debounce para evitar demasiadas escrituras
    const timeoutId = setTimeout(syncCartToFirestore, 500);
    return () => clearTimeout(timeoutId);
  }, [carrito, user?.uid, isLoadingCart]);

  // Persistir carrito en localStorage (fallback)
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
      
      // Calcular cuánto stock hay disponible
      const cantidadEnCarrito = existingItem ? existingItem.cantidad : 0;
      const stockDisponible = producto.stock - cantidadEnCarrito;
      
      // Si no hay stock disponible, no añadir
      if (stockDisponible <= 0) {
        console.warn(`No hay más stock disponible para ${producto.nombre}`);
        return prev;
      }
      
      // Limitar la cantidad a añadir al stock disponible
      const cantidadAAñadir = Math.min(cantidad, stockDisponible);
      
      let newItems: ItemCarrito[];
      if (existingItem) {
        newItems = prev.items.map((item) =>
          item.productoId === producto.id
            ? { ...item, cantidad: item.cantidad + cantidadAAñadir }
            : item
        );
      } else {
        newItems = [
          ...prev.items,
          { productoId: producto.id, producto, cantidad: cantidadAAñadir },
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
      const newItems = prev.items.map((item) => {
        if (item.productoId === productoId) {
          // Limitar la cantidad al stock disponible del producto
          const cantidadLimitada = Math.min(cantidad, item.producto.stock);
          return { ...item, cantidad: cantidadLimitada };
        }
        return item;
      });
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

  const limpiarCarrito = async () => {
    setCarrito({
      items: [],
      subtotal: 0,
      envio: 0,
      descuento: 0,
      total: 0,
    });
    setCuponData(null);
    
    // Limpiar también de Firestore si el usuario está autenticado
    if (user?.uid) {
      try {
        await deleteCarrito(user.uid);
      } catch (error) {
        console.error('Error al limpiar carrito en Firestore:', error);
      }
    }
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
