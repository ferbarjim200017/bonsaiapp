export interface Pedido {
  id: string;
  numero: string;
  fecha: Date;
  cliente: {
    nombre: string;
    email: string;
  };
  total: number;
  estado: 'nuevo' | 'pagado' | 'preparando' | 'enviado' | 'entregado' | 'cancelado';
  items: number;
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
    total: 89.97,
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
    total: 45.99,
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
    total: 129.99,
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
