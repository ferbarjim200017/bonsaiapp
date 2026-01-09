import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  QueryConstraint,
  Firestore,
} from 'firebase/firestore';
import { db } from './config';
import type { Producto, Cupon } from '@/types';
import type { Pedido } from '@/lib/mockPedidos';

// Helper para verificar si Firebase está configurado
const ensureFirebase = () => {
  if (!db) {
    throw new Error('Firebase not initialized. Make sure environment variables are set.');
  }
  return db;
};

// ==================== PRODUCTOS ====================

export const getProductos = async (filters?: {
  categoria?: string;
  destacado?: boolean;
  publicado?: boolean;
}): Promise<Producto[]> => {
  try {
    const firestore = ensureFirebase();
    const productosRef = collection(firestore, 'productos');
    const constraints: QueryConstraint[] = [];

    if (filters?.categoria) {
      constraints.push(where('categoria', '==', filters.categoria));
    }
    if (filters?.destacado !== undefined) {
      constraints.push(where('destacado', '==', filters.destacado));
    }
    if (filters?.publicado !== undefined) {
      constraints.push(where('publicado', '==', filters.publicado));
    }

    const q = query(productosRef, ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Producto[];
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    return [];
  }
};

export const getProductoById = async (id: string): Promise<Producto | null> => {
  try {
    const firestore = ensureFirebase();
    const docRef = doc(firestore, 'productos', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Producto;
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo producto:', error);
    return null;
  }
};

export const getProductoBySlug = async (slug: string): Promise<Producto | null> => {
  try {
    const firestore = ensureFirebase();
    const productosRef = collection(firestore, 'productos');
    const q = query(productosRef, where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Producto;
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo producto por slug:', error);
    return null;
  }
};

export const createProducto = async (producto: Omit<Producto, 'id'>): Promise<string> => {
  try {
    const firestore = ensureFirebase();
    const docRef = await addDoc(collection(firestore, 'productos'), {
      ...producto,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creando producto:', error);
    throw error;
  }
};

export const updateProducto = async (id: string, producto: Partial<Producto>): Promise<void> => {
  try {
    const firestore = ensureFirebase();
    const docRef = doc(firestore, 'productos', id);
    await updateDoc(docRef, {
      ...producto,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error actualizando producto:', error);
    throw error;
  }
};

export const deleteProducto = async (id: string): Promise<void> => {
  try {
    const firestore = ensureFirebase();
    await deleteDoc(doc(firestore, 'productos', id));
  } catch (error) {
    console.error('Error eliminando producto:', error);
    throw error;
  }
};

// ==================== PEDIDOS ====================

export const getPedidos = async (filters?: {
  estado?: string;
  userId?: string;
}): Promise<Pedido[]> => {
  try {
    const firestore = ensureFirebase();
    const pedidosRef = collection(firestore, 'pedidos');
    const constraints: QueryConstraint[] = [orderBy('fecha', 'desc')];

    if (filters?.estado && filters.estado !== 'todos') {
      constraints.push(where('estado', '==', filters.estado));
    }
    if (filters?.userId) {
      constraints.push(where('userId', '==', filters.userId));
    }

    const q = query(pedidosRef, ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        fecha: data.fecha.toDate(),
      };
    }) as Pedido[];
  } catch (error) {
    console.error('Error obteniendo pedidos:', error);
    return [];
  }
};

export const getPedidoById = async (id: string): Promise<Pedido | null> => {
  try {
    const firestore = ensureFirebase();
    const docRef = doc(firestore, 'pedidos', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        fecha: data.fecha.toDate(),
      } as Pedido;
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo pedido:', error);
    return null;
  }
};

export const createPedido = async (pedido: Omit<Pedido, 'id'>): Promise<string> => {
  try {
    const firestore = ensureFirebase();
    const docRef = await addDoc(collection(firestore, 'pedidos'), {
      ...pedido,
      fecha: Timestamp.fromDate(pedido.fecha),
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creando pedido:', error);
    throw error;
  }
};

export const updatePedido = async (id: string, pedido: Partial<Pedido>): Promise<void> => {
  try {
    const firestore = ensureFirebase();
    const docRef = doc(firestore, 'pedidos', id);
    const updateData: any = { ...pedido };
    
    if (pedido.fecha) {
      updateData.fecha = Timestamp.fromDate(pedido.fecha);
    }
    
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error actualizando pedido:', error);
    throw error;
  }
};

// ==================== CUPONES ====================

export const getCupones = async (activo?: boolean): Promise<Cupon[]> => {
  try {
    const firestore = ensureFirebase();
    const cuponesRef = collection(firestore, 'cupones');
    const constraints: QueryConstraint[] = [];

    if (activo !== undefined) {
      constraints.push(where('activo', '==', activo));
    }

    const q = query(cuponesRef, ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        codigo: data.codigo,
        tipo: data.tipo,
        valor: data.valor,
        minimoCompra: data.minimoCompra,
        usoMaximo: data.usoMaximo,
        usosActuales: data.usosActuales,
        usosPorCliente: data.usosPorCliente,
        fechaInicio: data.fechaInicio.toDate(),
        fechaFin: data.fechaFin.toDate(),
        categorias: data.categorias,
        productosIds: data.productosIds,
        activo: data.activo,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Cupon;
    });
  } catch (error) {
    console.error('Error obteniendo cupones:', error);
    return [];
  }
};

export const getCuponByCodigo = async (codigo: string): Promise<Cupon | null> => {
  try {
    const firestore = ensureFirebase();
    const cuponesRef = collection(firestore, 'cupones');
    const q = query(cuponesRef, where('codigo', '==', codigo.toUpperCase()), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        codigo: data.codigo,
        tipo: data.tipo,
        valor: data.valor,
        minimoCompra: data.minimoCompra,
        usoMaximo: data.usoMaximo,
        usosActuales: data.usosActuales,
        usosPorCliente: data.usosPorCliente,
        fechaInicio: data.fechaInicio.toDate(),
        fechaFin: data.fechaFin.toDate(),
        categorias: data.categorias,
        productosIds: data.productosIds,
        activo: data.activo,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Cupon;
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo cupón:', error);
    return null;
  }
};

export const createCupon = async (cupon: Omit<Cupon, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const firestore = ensureFirebase();
    const docRef = await addDoc(collection(firestore, 'cupones'), {
      ...cupon,
      codigo: cupon.codigo.toUpperCase(),
      fechaInicio: Timestamp.fromDate(cupon.fechaInicio),
      fechaFin: Timestamp.fromDate(cupon.fechaFin),
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creando cupón:', error);
    throw error;
  }
};

export const updateCupon = async (id: string, cupon: Partial<Cupon>): Promise<void> => {
  try {
    const firestore = ensureFirebase();
    const docRef = doc(firestore, 'cupones', id);
    const updateData: any = { ...cupon };
    
    if (cupon.fechaInicio) {
      updateData.fechaInicio = Timestamp.fromDate(cupon.fechaInicio);
    }
    if (cupon.fechaFin) {
      updateData.fechaFin = Timestamp.fromDate(cupon.fechaFin);
    }
    
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error actualizando cupón:', error);
    throw error;
  }
};

export const deleteCupon = async (id: string): Promise<void> => {
  try {
    const firestore = ensureFirebase();
    await deleteDoc(doc(firestore, 'cupones', id));
  } catch (error) {
    console.error('Error eliminando cupón:', error);
    throw error;
  }
};

// ==================== CARRITO ====================

export interface CarritoFirestore {
  userId: string;
  items: Array<{
    productoId: string;
    cantidad: number;
  }>;
  cuponAplicado?: string;
  updatedAt: Timestamp;
}

export const saveCarrito = async (userId: string, items: Array<{ productoId: string; cantidad: number }>, cuponAplicado?: string): Promise<void> => {
  try {
    const firestore = ensureFirebase();
    const carritoRef = doc(firestore, 'carritos', userId);
    
    // Usar setDoc con merge para crear o actualizar
    await setDoc(carritoRef, {
      userId,
      items,
      cuponAplicado: cuponAplicado || null,
      updatedAt: Timestamp.now(),
    }, { merge: true });
  } catch (error) {
    console.error('Error guardando carrito:', error);
    throw error;
  }
};

export const getCarrito = async (userId: string): Promise<CarritoFirestore | null> => {
  try {
    const firestore = ensureFirebase();
    const carritoRef = doc(firestore, 'carritos', userId);
    const docSnap = await getDoc(carritoRef);

    if (docSnap.exists()) {
      return docSnap.data() as CarritoFirestore;
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo carrito:', error);
    return null;
  }
};

export const deleteCarrito = async (userId: string): Promise<void> => {
  try {
    const firestore = ensureFirebase();
    const carritoRef = doc(firestore, 'carritos', userId);
    await deleteDoc(carritoRef);
  } catch (error) {
    console.error('Error eliminando carrito:', error);
    throw error;
  }
};
