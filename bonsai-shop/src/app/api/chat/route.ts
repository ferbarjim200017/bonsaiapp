import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Sistema de conocimiento sobre bonsáis
const KNOWLEDGE_BASE = {
  especies: {
    'ficus': 'El Ficus es uno de los bonsáis más populares para principiantes. Es resistente, de crecimiento rápido y muy versátil. Necesita luz indirecta abundante, riego regular (cuando la tierra superficial esté seca) y temperatura entre 15-25°C. Es apto para interior.',
    'olmo': 'El Olmo Chino es excelente para principiantes. Muy resistente y perdona errores de cuidado. Necesita luz abundante, riego frecuente en verano y puede estar en interior o exterior. Pierde hojas en invierno si está fuera.',
    'carmona': 'La Carmona o Té de Fukien es un bonsái de interior con flores blancas pequeñas. Necesita mucha luz, humedad constante y temperatura estable. Nivel de cuidado medio.',
    'junipero': 'El Junípero es un bonsái de exterior clásico. Muy resistente al frío, necesita pleno sol y buen drenaje. No debe estar en interior. Riego moderado. Ideal para principiantes que tengan espacio exterior.',
    'pino': 'Los pinos son bonsáis de exterior tradicionales. Necesitan mucho sol, sustrato bien drenado y protección del viento fuerte. Nivel de cuidado medio-alto. Muy apreciados por su aspecto.',
    'arce': 'El Arce Japonés es famoso por sus colores otoñales. Necesita protección del sol directo en verano, riego abundante y buen drenaje. Es de exterior. Nivel de cuidado medio-alto.',
  },
  cuidados: {
    'riego': 'El riego es fundamental: riega cuando la capa superficial de la tierra esté seca (1-2cm). En verano puede ser diario, en invierno menos frecuente. Mejor agua sin cal. Riega a fondo hasta que salga por los agujeros de drenaje.',
    'luz': 'La mayoría de bonsáis necesitan mucha luz. Los de interior necesitan luz indirecta brillante cerca de una ventana. Los de exterior necesitan sol directo (al menos 4-6 horas). Sin luz suficiente, las hojas amarillean.',
    'abono': 'Abona en primavera y verano cada 2-3 semanas con abono específico para bonsáis. En otoño reduce la frecuencia. No abones en invierno ni árboles recién trasplantados.',
    'poda': 'La poda de mantenimiento se hace durante la época de crecimiento, cortando brotes nuevos. La poda estructural se hace en reposo vegetativo (invierno/principios primavera). Usa tijeras afiladas y limpias.',
    'trasplante': 'Los bonsáis jóvenes se trasplantan cada 2 años, los adultos cada 3-5 años. Se hace al inicio de primavera. Usa sustrato específico para bonsáis con buen drenaje.',
    'ubicacion': 'Respeta si tu bonsái es de interior o exterior. Los bonsáis de exterior necesitan experimentar las estaciones. Protege del viento fuerte y heladas extremas (menos de -5°C).',
  },
  accesorios: {
    'sustrato': 'El sustrato para bonsáis debe drenar bien y retener algo de humedad. Mezclas típicas: akadama (arcilla japonesa), pumita, fibra de coco o kiryuu. Evita tierra de jardín común.',
    'macetas': 'Las macetas de bonsái deben tener agujeros de drenaje. El tamaño debe ser proporcional al árbol. Las de cerámica esmaltada son decorativas, las sin esmaltar más funcionales.',
    'herramientas': 'Herramientas básicas: tijeras de poda, tijeras para ramitas finas, alambre para modelar, rastrillo de raíces, palillos. La calidad es importante para cortes limpios.',
    'abono': 'Abonos específicos NPK equilibrado (ej. 10-10-10) para crecimiento general. Mayor N en primavera, mayor P y K en otoño. Presentación líquida o sólida (pellets).',
  },
  problemas: {
    'hojas amarillas': 'Causas comunes: exceso de riego (raíces encharcadas), falta de luz, falta de nutrientes, o edad natural. Comprueba humedad del sustrato y ubicación.',
    'hojas caidas': 'Puede ser estrés por cambio de ubicación, falta de riego, corrientes de aire frío, o respuesta natural en especies caducas en otoño.',
    'plagas': 'Plagas comunes: pulgones, cochinilla, araña roja. Trata con jabón potásico o insecticida específico. La prevención incluye buena ventilación y no exceso de nitrógeno.',
    'ramas secas': 'Puede indicar falta de riego severa, heladas, enfermedad fúngica o muerte de esa rama. Retira ramas muertas para evitar propagación de hongos.',
  },
};

// Función para generar respuestas basadas en el conocimiento
function generateResponse(message: string, history?: any[]): string {
  const lowerMessage = message.toLowerCase();
  
  // Saludos
  if (lowerMessage.match(/^(hola|buenos dias|buenas tardes|buenas noches|hey|hi|saludos)/i)) {
    return '¡Hola! 👋 Soy el asistente de Bonsái Shop. Estoy aquí para ayudarte con cualquier duda sobre bonsáis, sus cuidados, accesorios y productos. ¿En qué puedo ayudarte hoy?';
  }

  // Despedidas
  if (lowerMessage.match(/(adios|chao|hasta luego|gracias|bye)/i)) {
    return '¡Hasta pronto! 🌳 Si tienes más preguntas sobre bonsáis, no dudes en volver. ¡Que tengas un buen día!';
  }

  // Preguntas sobre especies específicas
  for (const [especie, info] of Object.entries(KNOWLEDGE_BASE.especies)) {
    if (lowerMessage.includes(especie)) {
      return `**🌳 ${especie.charAt(0).toUpperCase() + especie.slice(1)}**\n\n${info}\n\n¿Te gustaría saber algo más específico sobre el ${especie}?`;
    }
  }

  // Preguntas sobre cuidados
  if (lowerMessage.includes('riego') || lowerMessage.includes('regar') || lowerMessage.includes('agua') || lowerMessage.match(/cu[aá]ndo.*agua|cu[aá]nto.*agua/)) {
    return `**💧 Sobre el riego:**\n\n${KNOWLEDGE_BASE.cuidados.riego}\n\n¿Tienes alguna duda sobre el riego de una especie en particular?`;
  }

  if (lowerMessage.includes('luz') || lowerMessage.includes('sol') || lowerMessage.includes('sombra') || lowerMessage.includes('iluminacion')) {
    return `**☀️ Sobre la luz:**\n\n${KNOWLEDGE_BASE.cuidados.luz}\n\n¿Te gustaría saber sobre los requisitos de luz de alguna especie específica?`;
  }

  if (lowerMessage.includes('abono') || lowerMessage.includes('fertilizante') || lowerMessage.includes('nutriente') || lowerMessage.includes('abonar')) {
    return `**🌿 Sobre el abono:**\n\n${KNOWLEDGE_BASE.cuidados.abono}\n\n**Productos disponibles:**\n${KNOWLEDGE_BASE.accesorios.abono}\n\n¿Necesitas recomendaciones sobre qué abono usar?`;
  }

  if (lowerMessage.includes('poda') || lowerMessage.includes('podar') || lowerMessage.includes('cortar') || lowerMessage.includes('recortar')) {
    return `**✂️ Sobre la poda:**\n\n${KNOWLEDGE_BASE.cuidados.poda}\n\n¿Te gustaría información sobre herramientas de poda?`;
  }

  if (lowerMessage.includes('trasplante') || lowerMessage.includes('trasplantar') || lowerMessage.includes('cambiar maceta') || lowerMessage.includes('cambiar de maceta')) {
    return `**🪴 Sobre el trasplante:**\n\n${KNOWLEDGE_BASE.cuidados.trasplante}\n\n¿Necesitas información sobre sustratos o macetas adecuadas?`;
  }

  if (lowerMessage.match(/donde (poner|colocar|ubicar)|ubicacion|interior|exterior/)) {
    return `**📍 Sobre la ubicación:**\n\n${KNOWLEDGE_BASE.cuidados.ubicacion}\n\n¿Tienes un bonsái específico y quieres saber dónde colocarlo?`;
  }

  // Preguntas sobre accesorios
  if (lowerMessage.includes('sustrato') || lowerMessage.includes('tierra') || lowerMessage.includes('akadama')) {
    return `**Sobre sustratos:**\n\n${KNOWLEDGE_BASE.accesorios.sustrato}\n\n¿Necesitas saber qué sustrato es mejor para tu bonsái?`;
  }

  if (lowerMessage.includes('maceta') || lowerMessage.includes('tiesto')) {
    return `**Sobre macetas:**\n\n${KNOWLEDGE_BASE.accesorios.macetas}\n\nEn nuestra tienda encontrarás diferentes estilos y tamaños.`;
  }

  if (lowerMessage.includes('herramienta') || lowerMessage.includes('tijera') || lowerMessage.includes('alambre')) {
    return `**Sobre herramientas:**\n\n${KNOWLEDGE_BASE.accesorios.herramientas}\n\n¿Te gustaría saber más sobre alguna herramienta específica?`;
  }

  // Problemas comunes
  if (lowerMessage.match(/hojas? amarillas?|amarillean|amarillento/)) {
    return `**🍂 Hojas amarillas:**\n\n${KNOWLEDGE_BASE.problemas['hojas amarillas']}\n\nPara ayudarte mejor, ¿podrías decirme qué especie de bonsái tienes y hace cuánto notaste este problema?`;
  }

  if (lowerMessage.match(/hojas? (se )?caen|caída|pierden? hojas/)) {
    return `**🍃 Caída de hojas:**\n\n${KNOWLEDGE_BASE.problemas['hojas caidas']}\n\n¿Qué tipo de bonsái tienes? Esto me ayudará a darte una respuesta más precisa.`;
  }

  if (lowerMessage.match(/plaga|bicho|insecto|pulgon|cochinilla|ara[ñn]a roja/)) {
    return `**🐛 Plagas:**\n\n${KNOWLEDGE_BASE.problemas.plagas}\n\n¿Has podido identificar qué tipo de plaga tiene tu bonsái? ¿Ves pequeños insectos o manchas en las hojas?`;
  }

  if (lowerMessage.match(/seca|muere|muerta|marchita/)) {
    return `**⚠️ Ramas secas:**\n\n${KNOWLEDGE_BASE.problemas['ramas secas']}\n\n¿El problema afecta a todo el árbol o solo a algunas ramas específicas?`;
  }

  // Preguntas sobre principiantes
  if (lowerMessage.match(/principiante|empezar|primer|f[aá]cil|recomien|cual.*comprar|cu[aá]l.*mejor/)) {
    return `**🌱 Recomendaciones para principiantes:**\n\n` +
      `**Ficus** 🏆 - El más resistente para interior. Perfecto si buscas algo que perdone errores.\n\n` +
      `**Olmo Chino** 🌿 - Muy versátil, se adapta a interior y exterior. Ideal para aprender.\n\n` +
      `**Junípero** 🌲 - Si tienes terraza o jardín, es resistente y fácil de cuidar.\n\n` +
      `¿Cuál te llama más la atención? Puedo darte más detalles sobre cualquiera de ellos.`;
  }

  // Preguntas sobre envío o compra
  if (lowerMessage.includes('envio') || lowerMessage.includes('enviar') || lowerMessage.includes('entrega')) {
    return `Realizamos envíos a toda España. Los plazos varían según la zona:\n` +
      `- Península: 2-3 días laborables\n` +
      `- Baleares: 3-5 días laborables\n` +
      `- Canarias: 5-7 días laborables\n\n` +
      `Los bonsáis se envían con protección especial para garantizar que lleguen en perfecto estado.`;
  }

  if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuanto cuesta')) {
    return `Nuestros precios varían según la especie, tamaño y edad del bonsái:\n` +
      `- Bonsáis pequeños (15-25cm): desde 25-40€\n` +
      `- Bonsáis medianos (25-40cm): desde 45-80€\n` +
      `- Bonsáis grandes (40cm+): desde 90€\n\n` +
      `Te recomiendo visitar nuestro catálogo para ver los precios exactos y disponibilidad actual.`;
  }

  // Respuesta genérica
  return `Puedo ayudarte con:\n\n` +
    `🌱 **Cuidados:** Riego, luz, abono, poda, trasplante\n` +
    `🌳 **Especies:** Ficus, Olmo, Carmona, Junípero, Pino, Arce\n` +
    `🛠️ **Accesorios:** Herramientas, sustratos, macetas\n` +
    `🐛 **Problemas:** Hojas amarillas, plagas, ramas secas\n` +
    `📦 **Compras:** Envíos, precios, productos\n\n` +
    `¿Sobre qué te gustaría saber más?`;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje inválido' },
        { status: 400 }
      );
    }

    // Generar respuesta basada en el conocimiento y el historial
    const response = generateResponse(message, history);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error en el chat:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
