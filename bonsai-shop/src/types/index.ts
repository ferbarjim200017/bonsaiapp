// Tipos principales para la tienda de bonsáis

export type ProductCategory = 'bonsai' | 'accesorio';
export type Ubicacion = 'interior' | 'exterior' | 'ambos';
export type Dificultad = 'baja' | 'media' | 'alta';
export type TipoAccesorio = 'herramienta' | 'sustrato' | 'maceta' | 'abono' | 'otro';

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number; // Con IVA incluido
  precioAnterior?: number;
  sku: string;
  categoria: ProductCategory;
  imagenes: string[];
  stock: number;
  publicado: boolean;
  destacado: boolean;
  nuevo: boolean;
  
  // Atributos específicos para bonsáis
  especie?: string;
  tamano?: number; // Altura en cm
  nivelCuidado?: Dificultad;
  ubicacion?: Ubicacion;
  riego?: string; // Frecuencia orientativa
  toxicidadMascotas?: boolean;
  variabilidadNatural?: boolean; // "Puede variar respecto a la foto"
  
  // Atributos para accesorios
  tipoAccesorio?: TipoAccesorio;
  
  // SEO
  slug: string;
  metaDescripcion?: string;
  
  // Fechas
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemCarrito {
  productoId: string;
  producto: Producto;
  cantidad: number;
}

export interface Carrito {
  items: ItemCarrito[];
  subtotal: number;
  envio: number;
  descuento: number;
  total: number;
  cuponAplicado?: string;
}

export type EstadoPedido = 
  | 'nuevo' 
  | 'pagado' 
  | 'preparando' 
  | 'enviado' 
  | 'entregado' 
  | 'cancelado' 
  | 'devuelto';

export type MetodoPago = 'tarjeta' | 'paypal' | 'bizum';

export type ZonaEnvio = 'peninsula' | 'baleares' | 'canarias' | 'ceuta' | 'melilla';

export interface DireccionEnvio {
  nombre: string;
  apellidos: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  telefono: string;
  email: string;
}

export interface Pedido {
  id: string;
  numeroPedido: string;
  userId?: string;
  email: string;
  items: ItemCarrito[];
  subtotal: number;
  envio: number;
  descuento: number;
  total: number;
  estado: EstadoPedido;
  metodoPago: MetodoPago;
  estadoPago: 'pendiente' | 'autorizado' | 'capturado' | 'fallido' | 'reembolsado';
  direccionEnvio: DireccionEnvio;
  zonaEnvio: ZonaEnvio;
  trackingNumber?: string;
  trackingUrl?: string;
  cuponAplicado?: string;
  notas?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Usuario {
  id: string;
  email: string;
  password: string; // Hash
  nombre: string;
  apellidos: string;
  telefono?: string;
  rol: 'cliente' | 'admin' | 'operaciones' | 'atencion';
  direcciones: DireccionEnvio[];
  preferenciasComunicacion: {
    marketing: boolean;
    transaccional: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Resena {
  id: string;
  productoId: string;
  userId: string;
  usuarioNombre: string;
  puntuacion: number; // 1-5
  titulo: string;
  comentario: string;
  compraVerificada: boolean;
  moderado: boolean;
  aprobado: boolean;
  createdAt: Date;
}

export interface Cupon {
  id: string;
  codigo: string;
  tipo: 'porcentaje' | 'fijo';
  valor: number;
  minimoCompra?: number;
  usoMaximo?: number;
  usosActuales: number;
  usosPorCliente?: number;
  fechaInicio: Date;
  fechaFin: Date;
  categorias?: ProductCategory[];
  productosIds?: string[];
  activo: boolean;
  createdAt: Date;
}

export type EstadoRMA = 'solicitada' | 'en-revision' | 'aprobada' | 'rechazada' | 'resuelta';
export type ResolucionRMA = 'reembolso' | 'reemplazo' | 'cupon';

export interface DevolucionRMA {
  id: string;
  pedidoId: string;
  userId?: string;
  motivo: string;
  descripcion: string;
  evidencias: string[]; // URLs de fotos
  estado: EstadoRMA;
  resolucion?: ResolucionRMA;
  notasInternas?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConfiguracionEnvio {
  zona: ZonaEnvio;
  coste: number;
  plazoMinimo: number; // días
  plazoMaximo: number; // días
  envioGratisDesde?: number; // importe
}

// Filtros para catálogo
export interface FiltrosCatalogo {
  categoria?: ProductCategory;
  ubicacion?: Ubicacion;
  dificultad?: Dificultad;
  precioMin?: number;
  precioMax?: number;
  enStock?: boolean;
  ordenar?: 'relevancia' | 'precio-asc' | 'precio-desc' | 'nuevo';
  busqueda?: string;
}

// Mensajes de contacto
export type MotivoContacto = 'consulta-general' | 'cuidados' | 'pedido' | 'incidencia' | 'devolucion' | 'otro';

export interface MensajeContacto {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono?: string;
  numeroPedido?: string;
  motivo: MotivoContacto;
  mensaje: string;
  imagenes: string[]; // Base64 data URLs
  leido: boolean;
  respondido: boolean;
  fechaCreacion: Date;
}

