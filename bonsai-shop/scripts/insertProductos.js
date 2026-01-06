const productos = [
  {
    nombre: "Olmo Chino - Ulmus Parvifolia",
    descripcion: "El Olmo Chino es perfecto para principiantes. Muy resistente y de crecimiento rápido, ideal para interior y exterior. Sus pequeñas hojas verdes brillantes crean una copa densa y hermosa.",
    precio: 45.99,
    precioAnterior: 59.99,
    sku: "BON-OLM-001",
    categoria: "bonsai",
    imagenes: ["/images/placeholder-bonsai.jpg"],
    stock: 8,
    publicado: true,
    destacado: true,
    nuevo: false,
    especie: "Ulmus Parvifolia",
    tamano: 25,
    nivelCuidado: "baja",
    ubicacion: "ambos",
    riego: "Regar cuando la superficie del sustrato esté seca. En verano, regar diariamente.",
    toxicidadMascotas: false,
    variabilidadNatural: true
  },
  {
    nombre: "Carmona Retusa - Árbol del Té",
    descripcion: "Bonsái tropical de interior con pequeñas flores blancas durante todo el año. Sus hojas verdes oscuras y brillantes contrastan con sus delicadas flores. Muy apreciado por su floración constante.",
    precio: 52.99,
    sku: "BON-CAR-001",
    categoria: "bonsai",
    imagenes: ["/images/placeholder-bonsai.jpg"],
    stock: 5,
    publicado: true,
    destacado: false,
    nuevo: true,
    especie: "Carmona Retusa",
    tamano: 20,
    nivelCuidado: "media",
    ubicacion: "interior",
    riego: "Mantener el sustrato ligeramente húmedo. No dejar secar completamente.",
    toxicidadMascotas: false,
    variabilidadNatural: true
  },
  {
    nombre: "Pino Thumbergii Negro Japonés",
    descripcion: "Pino negro japonés clásico para exteriores. Agujas largas y verde oscuro. Especie tradicional del arte del bonsai, muy valorada por su elegancia y longevidad. Requiere cuidados avanzados.",
    precio: 89.99,
    sku: "BON-PIN-001",
    categoria: "bonsai",
    imagenes: ["/images/placeholder-bonsai.jpg"],
    stock: 3,
    publicado: true,
    destacado: false,
    nuevo: false,
    especie: "Pinus Thumbergii",
    tamano: 35,
    nivelCuidado: "alta",
    ubicacion: "exterior",
    riego: "Riego moderado. Evitar encharcamiento. Necesita período de dormancia en invierno.",
    toxicidadMascotas: true,
    variabilidadNatural: true
  },
  {
    nombre: "Kit Herramientas Básicas para Bonsái",
    descripcion: "Set completo de herramientas esenciales para el cuidado de tu bonsai. Incluye tijeras de podar, pinzas, rastrillo y podadera cóncava. Acero inoxidable de alta calidad con mangos ergonómicos.",
    precio: 34.99,
    precioAnterior: 44.99,
    sku: "ACC-HER-001",
    categoria: "accesorio",
    imagenes: ["/images/placeholder-bonsai.jpg"],
    stock: 15,
    publicado: true,
    destacado: true,
    nuevo: false,
    tipoAccesorio: "herramienta"
  },
  {
    nombre: "Sustrato Premium Akadama Japonés 2L",
    descripcion: "Akadama auténtico japonés de grano medio. Sustrato volcánico de máxima calidad que proporciona excelente drenaje y retención de humedad. Ideal para todo tipo de bonsais. Bolsa de 2 litros.",
    precio: 18.99,
    sku: "ACC-SUS-001",
    categoria: "accesorio",
    imagenes: ["/images/placeholder-bonsai.jpg"],
    stock: 25,
    publicado: true,
    destacado: false,
    nuevo: true,
    tipoAccesorio: "sustrato"
  }
];

async function insertarProductos() {
  try {
    console.log('🌱 Insertando productos en Firebase...\n');
    
    const response = await fetch('http://localhost:3000/api/productos/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productos)
    });

    const resultado = await response.json();
    
    if (response.ok) {
      console.log('✅ ' + resultado.message + '\n');
      resultado.resultados.forEach((r: any) => {
        if (r.success) {
          console.log(`✅ ${r.nombre} (ID: ${r.id})`);
        } else {
          console.log(`❌ ${r.nombre}: ${r.error}`);
        }
      });
    } else {
      console.error('❌ Error:', resultado.error);
    }
  } catch (error) {
    console.error('❌ Error al insertar productos:', error);
  }
}

insertarProductos();
