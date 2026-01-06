import { Producto } from '@/types';
import { getProductos } from '@/lib/firebase/firestore';

export const productosMock: Producto[] = [
  // Bonsáis
  {
    id: '1',
    nombre: 'Ficus Retusa - Bonsái de Interior',
    descripcion: 'El Ficus Retusa es uno de los bonsáis más populares para principiantes. Resistente y de fácil cuidado, perfecto para ambientes interiores con buena iluminación. Sus hojas brillantes y su tronco robusto lo convierten en una pieza decorativa excepcional.',
    precio: 49.99,
    precioAnterior: 59.99,
    sku: 'BON-FIC-001',
    categoria: 'bonsai',
    imagenes: ['/images/ficus-retusa.svg'],
    stock: 5,
    publicado: true,
    destacado: true,
    nuevo: false,
    especie: 'Ficus Retusa',
    tamano: 25,
    nivelCuidado: 'baja',
    ubicacion: 'interior',
    riego: '2-3 veces por semana en verano, 1 vez en invierno',
    toxicidadMascotas: false,
    variabilidadNatural: true,
    slug: 'ficus-retusa-bonsái-interior',
    metaDescripcion: 'Bonsái Ficus Retusa de interior, ideal para principiantes. Fácil cuidado y mantenimiento.',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-15'),
  },
  {
    id: '2',
    nombre: 'Acer Palmatum - Arce Japonés',
    descripcion: 'El Acer Palmatum, conocido como Arce Japonés, es apreciado por sus hojas delicadas y sus espectaculares colores otoñales. Ideal para exterior, requiere cuidados moderados y protección contra heladas extremas.',
    precio: 89.99,
    sku: 'BON-ACE-002',
    categoria: 'bonsai',
    imagenes: ['/images/acer-palmatum.svg'],
    stock: 3,
    publicado: true,
    destacado: true,
    nuevo: true,
    especie: 'Acer Palmatum',
    tamano: 35,
    nivelCuidado: 'media',
    ubicacion: 'exterior',
    riego: 'Diario en verano, 2-3 veces por semana en invierno',
    toxicidadMascotas: false,
    variabilidadNatural: true,
    slug: 'acer-palmatum-arce-japones',
    metaDescripcion: 'Bonsái Arce Japonés de exterior. Espectaculares colores otoñales.',
    createdAt: new Date('2025-12-15'),
    updatedAt: new Date('2025-12-15'),
  },
  {
    id: '3',
    nombre: 'Carmona Microphylla - Bonsái del Té',
    descripcion: 'La Carmona, también conocida como bonsái del té, presenta pequeñas hojas verdes oscuras y delicadas flores blancas. Perfecta para interior, requiere iluminación abundante y riego regular.',
    precio: 39.99,
    sku: 'BON-CAR-003',
    categoria: 'bonsai',
    imagenes: ['/images/carmona.svg'],
    stock: 8,
    publicado: true,
    destacado: false,
    nuevo: false,
    especie: 'Carmona Microphylla',
    tamano: 20,
    nivelCuidado: 'media',
    ubicacion: 'interior',
    riego: '2-3 veces por semana, mantener sustrato ligeramente húmedo',
    toxicidadMascotas: false,
    variabilidadNatural: true,
    slug: 'carmona-microphylla-bonsái-te',
    metaDescripcion: 'Bonsái del Té Carmona para interior. Flores blancas decorativas.',
    createdAt: new Date('2025-10-01'),
    updatedAt: new Date('2025-11-20'),
  },
  {
    id: '4',
    nombre: 'Juniperus Chinensis - Enebro Chino',
    descripcion: 'El Juniperus Chinensis es un clásico entre los bonsáis de exterior. Muy resistente, tolera bien las podas y alambrados. Ideal para crear estilos cascada o informal erecto.',
    precio: 69.99,
    sku: 'BON-JUN-004',
    categoria: 'bonsai',
    imagenes: ['/images/juniperus.svg'],
    stock: 6,
    publicado: true,
    destacado: false,
    nuevo: false,
    especie: 'Juniperus Chinensis',
    tamano: 30,
    nivelCuidado: 'baja',
    ubicacion: 'exterior',
    riego: '2-3 veces por semana, resistente a sequía moderada',
    toxicidadMascotas: true,
    variabilidadNatural: true,
    slug: 'juniperus-chinensis-enebro-chino',
    metaDescripcion: 'Bonsái Enebro Chino para exterior. Muy resistente y versátil.',
    createdAt: new Date('2025-09-10'),
    updatedAt: new Date('2025-11-05'),
  },
  {
    id: '5',
    nombre: 'Zelkova Parvifolia - Olmo Chino',
    descripcion: 'El Zelkova, u Olmo Chino, es perfecto para principiantes. Crece rápidamente, responde bien a la poda y puede cultivarse tanto en interior como en exterior protegido.',
    precio: 44.99,
    precioAnterior: 54.99,
    sku: 'BON-ZEL-005',
    categoria: 'bonsai',
    imagenes: ['/images/zelkova.svg'],
    stock: 10,
    publicado: true,
    destacado: false,
    nuevo: false,
    especie: 'Zelkova Parvifolia',
    tamano: 22,
    nivelCuidado: 'baja',
    ubicacion: 'ambos',
    riego: 'Diario en verano, 2-3 veces por semana en invierno',
    toxicidadMascotas: false,
    variabilidadNatural: true,
    slug: 'zelkova-parvifolia-olmo-chino',
    metaDescripcion: 'Bonsái Olmo Chino. Ideal para principiantes, crece rápido.',
    createdAt: new Date('2025-08-15'),
    updatedAt: new Date('2025-12-01'),
  },

  // Accesorios
  {
    id: '6',
    nombre: 'Kit de Herramientas para Bonsái - 5 Piezas',
    descripcion: 'Kit completo de herramientas esenciales para el cuidado de tu bonsái. Incluye: tijeras de poda, tijeras de defoliación, pinzas, rastrillo y podadora cóncava. Acero inoxidable de alta calidad.',
    precio: 34.99,
    sku: 'ACC-HER-001',
    categoria: 'accesorio',
    tipoAccesorio: 'herramienta',
    imagenes: ['/images/kit-herramientas.svg'],
    stock: 15,
    publicado: true,
    destacado: true,
    nuevo: false,
    slug: 'kit-herramientas-bonsái-5-piezas',
    metaDescripcion: 'Kit completo de 5 herramientas profesionales para bonsái.',
    createdAt: new Date('2025-07-01'),
    updatedAt: new Date('2025-11-10'),
  },
  {
    id: '7',
    nombre: 'Sustrato Akadama Premium - 2L',
    descripcion: 'Sustrato Akadama de calidad premium, importado de Japón. Ideal para bonsáis, proporciona excelente drenaje y retención de nutrientes. Granulometría media (4-7mm).',
    precio: 12.99,
    sku: 'ACC-SUS-001',
    categoria: 'accesorio',
    tipoAccesorio: 'sustrato',
    imagenes: ['/images/akadama.svg'],
    stock: 25,
    publicado: true,
    destacado: false,
    nuevo: false,
    slug: 'sustrato-akadama-premium-2l',
    metaDescripcion: 'Sustrato Akadama japonés premium para bonsái. 2 litros.',
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2025-10-20'),
  },
  {
    id: '8',
    nombre: 'Maceta Cerámica Esmaltada Azul - 20cm',
    descripcion: 'Maceta de cerámica esmaltada en azul cobalto, fabricada artesanalmente. Incluye rejilla de drenaje y pies. Perfecta para bonsáis de tamaño medio (20-30cm).',
    precio: 24.99,
    sku: 'ACC-MAC-001',
    categoria: 'accesorio',
    tipoAccesorio: 'maceta',
    imagenes: ['/images/maceta-azul.svg'],
    stock: 12,
    publicado: true,
    destacado: false,
    nuevo: true,
    slug: 'maceta-ceramica-esmaltada-azul-20cm',
    metaDescripcion: 'Maceta cerámica esmaltada artesanal para bonsái. 20cm.',
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date('2025-12-20'),
  },
];

// Función helper para obtener productos
export function obtenerProductos(filtros?: {
  categoria?: string;
  ubicacion?: string;
  enStock?: boolean;
  destacados?: boolean;
  nuevos?: boolean;
  limite?: number;
}): Producto[] {
  let productos = [...productosMock];

  if (filtros) {
    if (filtros.categoria) {
      productos = productos.filter((p) => p.categoria === filtros.categoria);
    }
    if (filtros.ubicacion) {
      productos = productos.filter(
        (p) => p.ubicacion === filtros.ubicacion || p.ubicacion === 'ambos'
      );
    }
    if (filtros.enStock) {
      productos = productos.filter((p) => p.stock > 0);
    }
    if (filtros.destacados) {
      productos = productos.filter((p) => p.destacado);
    }
    if (filtros.nuevos) {
      productos = productos.filter((p) => p.nuevo);
    }
    if (filtros.limite) {
      productos = productos.slice(0, filtros.limite);
    }
  }

  return productos;
}

export function obtenerProductoPorSlug(slug: string): Producto | undefined {
  return productosMock.find((p) => p.slug === slug);
}

export function obtenerProductoPorId(id: string): Producto | undefined {
  return productosMock.find((p) => p.id === id);
}

// Combinar productos de Firebase con productos mock
export async function obtenerTodosLosProductos(filtros?: {
  categoria?: string;
  ubicacion?: string;
  destacados?: boolean;
  nuevos?: boolean;
  enStock?: boolean;
  limite?: number;
}): Promise<Producto[]> {
  try {
    // Obtener productos de Firebase
    const productosFirebase = await getProductos({ publicado: true });
    
    // Combinar con productos mock
    const productosCombinados = [...productosFirebase, ...productosMock];
    
    // Eliminar duplicados por ID
    const productosUnicos = productosCombinados.reduce((acc, producto) => {
      if (!acc.find(p => p.id === producto.id)) {
        acc.push(producto);
      }
      return acc;
    }, [] as Producto[]);
    
    // Aplicar filtros si existen
    let productos = productosUnicos;
    
    if (filtros) {
      if (filtros.categoria) {
        productos = productos.filter((p) => p.categoria === filtros.categoria);
      }
      if (filtros.ubicacion) {
        productos = productos.filter(
          (p) => p.ubicacion === filtros.ubicacion || p.ubicacion === 'ambos'
        );
      }
      if (filtros.enStock) {
        productos = productos.filter((p) => p.stock > 0);
      }
      if (filtros.destacados) {
        productos = productos.filter((p) => p.destacado);
      }
      if (filtros.nuevos) {
        productos = productos.filter((p) => p.nuevo);
      }
      if (filtros.limite) {
        productos = productos.slice(0, filtros.limite);
      }
    }
    
    return productos;
  } catch (error) {
    console.error('Error obteniendo productos combinados:', error);
    // En caso de error, devolver solo los mock
    return obtenerProductos(filtros);
  }
}

// Buscar producto por slug en Firebase y mock
export async function obtenerProductoPorSlugCombinado(slug: string): Promise<Producto | null> {
  try {
    // Primero intentar en Firebase
    const { getProductoBySlug } = await import('@/lib/firebase/firestore');
    const productoFirebase = await getProductoBySlug(slug);
    if (productoFirebase) return productoFirebase;
    
    // Si no está en Firebase, buscar en mock
    return obtenerProductoPorSlug(slug) || null;
  } catch (error) {
    console.error('Error buscando producto por slug:', error);
    return obtenerProductoPorSlug(slug) || null;
  }
}
