export interface Pedido {
  id: string;
  numero: string;
  fecha: Date;
  userId?: string; // ID del usuario autenticado
  cliente: {
    nombre: string;
    apellidos?: string;
    email: string;
    telefono?: string;
  };
  direccionEnvio: {
    direccion: string;
    ciudad: string;
    provincia: string;
    codigoPostal: string;
  };
  productos: Array<{
    productoId: string;
    nombre: string;
    precio: number;
    cantidad: number;
    imagen?: string;
  }>;
  subtotal: number;
  envio: number;
  descuento: number;
  total: number;
  metodoPago: string;
  estado: 'nuevo' | 'pagado' | 'preparando' | 'enviado' | 'entregado' | 'cancelado';
  items: number; // número total de items
  cuponAplicado?: string;
  codigoSeguimiento?: string; // código de seguimiento del envío
}

export const pedidosMock: Pedido[] = [
  {
    id: '1',
    numero: '2025-001',
    fecha: new Date('2025-01-15'),
    cliente: {
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
    },
    direccionEnvio: {
      direccion: 'Calle Principal 123',
      ciudad: 'Madrid',
      provincia: 'Madrid',
      codigoPostal: '28001',
    },
    productos: [],
    subtotal: 89.97,
    envio: 0,
    descuento: 0,
    total: 89.97,
    metodoPago: 'tarjeta',
    estado: 'preparando',
    items: 3,
  },
  {
    id: '2',
    numero: '2025-002',
    fecha: new Date('2025-01-16'),
    cliente: {
      nombre: 'María García',
      email: 'maria@example.com',
    },
    direccionEnvio: {
      direccion: 'Avenida España 45',
      ciudad: 'Barcelona',
      provincia: 'Barcelona',
      codigoPostal: '08001',
    },
    productos: [],
    subtotal: 45.99,
    envio: 5.95,
    descuento: 0,
    total: 45.99,
    metodoPago: 'paypal',
    estado: 'pagado',
    items: 2,
  },
  {
    id: '3',
    numero: '2025-003',
    fecha: new Date('2025-01-17'),
    cliente: {
      nombre: 'Carlos López',
      email: 'carlos@example.com',
    },
    direccionEnvio: {
      direccion: 'Plaza Mayor 7',
      ciudad: 'Valencia',
      provincia: 'Valencia',
      codigoPostal: '46001',
    },
    productos: [],
    subtotal: 129.99,
    envio: 0,
    descuento: 0,
    total: 129.99,
    metodoPago: 'transferencia',
    estado: 'enviado',
    items: 1,
  },
];

// Pedidos pendientes son aquellos que no están entregados ni cancelados
export const getPedidosPendientes = () => {
  return pedidosMock.filter(
    (pedido) => pedido.estado !== 'entregado' && pedido.estado !== 'cancelado'
  );
};
