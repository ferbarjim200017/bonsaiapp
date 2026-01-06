import { createProducto } from '../src/lib/firebase/firestore';
import type { Producto } from '../src/types';

const productosEjemplo: Omit<Producto, 'id'>[] = [
  {
    nombre: 'Olmo Chino - Ulmus Parvifolia',
    slug: 'olmo-chino-ulmus-parvifolia',
    descripcion: 'El Olmo Chino es perfecto para principiantes. Muy resistente y de crecimiento rápido, ideal para interior y exterior. Sus pequeñas hojas verdes brillantes crean una copa densa y hermosa.',
    precio: 45.99,
    precioAnterior: 59.99,
    sku: 'BON-OLM-001',
    categoria: 'bonsai',
    imagenes: ['/images/placeholder-bonsái.jpg'],
    stock: 8,
    publicado: true,
    destacado: true,
    nuevo: false,
    especie: 'Ulmus Parvifolia',
    tamano: 25,
    nivelCuidado: 'baja',
    ubicacion: 'ambos',
    riego: 'Regar cuando la superficie del sustrato esté seca. En verano, regar diariamente.',
    toxicidadMascotas: false,
    variabilidadNatural: true,
    metaDescripcion: 'Olmo Chino perfecto para principiantes. Resistente y de fácil cuidado.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nombre: 'Carmona Retusa - Árbol del Té',
    slug: 'carmona-retusa-arbol-del-te',
    descripcion: 'Bonsái tropical de interior con pequeñas flores blancas durante todo el año. Sus hojas verdes oscuras y brillantes contrastan con sus delicadas flores. Muy apreciado por su floración constante.',
    precio: 52.99,
    sku: 'BON-CAR-001',
    categoria: 'bonsai',
    imagenes: ['/images/placeholder-bonsái.jpg'],
    stock: 5,
    publicado: true,
    destacado: false,
    nuevo: true,
    especie: 'Carmona Retusa',
    tamano: 20,
    nivelCuidado: 'media',
    ubicacion: 'interior',
    riego: 'Mantener el sustrato ligeramente húmedo. No dejar secar completamente.',
    toxicidadMascotas: false,
    variabilidadNatural: true,
    metaDescripcion: 'Carmona Retusa con flores blancas todo el año. Bonsái tropical de interior.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nombre: 'Pino Thumbergii Negro Japonés',
    slug: 'pino-thumbergii-negro-japones',
    descripcion: 'Pino negro japonés clásico para exteriores. Agujas largas y verde oscuro. Especie tradicional del arte del bonsái, muy valorada por su elegancia y longevidad. Requiere cuidados avanzados.',
    precio: 89.99,
    sku: 'BON-PIN-001',
    categoria: 'bonsai',
    imagenes: ['/images/placeholder-bonsái.jpg'],
    stock: 3,
    publicado: true,
    destacado: false,
    nuevo: false,
    especie: 'Pinus Thumbergii',
    tamano: 35,
    nivelCuidado: 'alta',
    ubicacion: 'exterior',
    riego: 'Riego moderado. Evitar encharcamiento. Necesita período de dormancia en invierno.',
    toxicidadMascotas: true,
    variabilidadNatural: true,
    metaDescripcion: 'Pino Negro Japonés auténtico. Especie tradicional de bonsái para exterior.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nombre: 'Kit Herramientas Básicas para Bonsái',
    slug: 'kit-herramientas-basicas-bonsái',
    descripcion: 'Set completo de herramientas esenciales para el cuidado de tu bonsái. Incluye tijeras de podar, pinzas, rastrillo y podadera cóncava. Acero inoxidable de alta calidad con mangos ergonómicos.',
    precio: 34.99,
    precioAnterior: 44.99,
    sku: 'ACC-HER-001',
    categoria: 'accesorio',
    imagenes: ['/images/placeholder-bonsái.jpg'],
    stock: 15,
    publicado: true,
    destacado: true,
    nuevo: false,
    tipoAccesorio: 'herramienta',
    metaDescripcion: 'Kit completo de herramientas básicas para bonsái. Acero inoxidable de calidad.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nombre: 'Sustrato Premium Akadama Japonés 2L',
    slug: 'sustrato-premium-akadama-japones-2l',
    descripcion: 'Akadama auténtico japonés de grano medio. Sustrato volcánico de máxima calidad que proporciona excelente drenaje y retención de humedad. Ideal para todo tipo de bonsáis. Bolsa de 2 litros.',
    precio: 18.99,
    sku: 'ACC-SUS-001',
    categoria: 'accesorio',
    imagenes: ['/images/placeholder-bonsái.jpg'],
    stock: 25,
    publicado: true,
    destacado: false,
    nuevo: true,
    tipoAccesorio: 'sustrato',
    metaDescripcion: 'Akadama japonés auténtico. Sustrato premium para bonsái de máxima calidad.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function crearProductosEjemplo() {
  console.log('🌱 Creando productos de ejemplo en Firebase...\n');
  
  for (const producto of productosEjemplo) {
    try {
      const id = await createProducto(producto);
      console.log(`✅ Creado: ${producto.nombre} (ID: ${id})`);
    } catch (error) {
      console.error(`❌ Error creando ${producto.nombre}:`, error);
    }
  }
  
  console.log('\n✨ Proceso completado!');
}

crearProductosEjemplo();
