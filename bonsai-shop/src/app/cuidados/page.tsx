'use client';

import { Droplets, Sun, Scissors, Thermometer, Wind, AlertCircle } from 'lucide-react';

export default function CuidadosPage() {
  const cuidadosGenerales = [
    {
      icono: <Droplets className="h-8 w-8" />,
      titulo: 'Riego',
      descripcion: 'El riego es fundamental para la salud de tu bonsai.',
      detalles: [
        'Riega cuando la superficie del sustrato esté seca al tacto',
        'Usa agua a temperatura ambiente, preferiblemente reposada 24h',
        'Riega abundantemente hasta que el agua salga por los agujeros de drenaje',
        'En verano puede necesitar riego diario, en invierno cada 2-3 días',
        'No dejes agua estancada en el plato'
      ]
    },
    {
      icono: <Sun className="h-8 w-8" />,
      titulo: 'Luz',
      descripcion: 'La ubicación correcta es clave según el tipo de bonsai.',
      detalles: [
        'Bonsáis de exterior: necesitan luz solar directa al menos 4-6 horas diarias',
        'Bonsáis de interior: luz brillante indirecta, cerca de ventana',
        'Evita cambios bruscos de ubicación',
        'Rota el bonsai cada semana para crecimiento uniforme',
        'Protege de luz solar directa en horas más intensas del verano'
      ]
    },
    {
      icono: <Scissors className="h-8 w-8" />,
      titulo: 'Poda',
      descripcion: 'Mantén la forma y salud de tu bonsai mediante podas regulares.',
      detalles: [
        'Poda de mantenimiento: elimina brotes nuevos durante toda la temporada',
        'Poda estructural: en otoño/invierno cuando el árbol está en reposo',
        'Usa herramientas limpias y afiladas',
        'Poda hojas amarillas o dañadas inmediatamente',
        'Aplica pasta cicatrizante en cortes grandes'
      ]
    },
    {
      icono: <Thermometer className="h-8 w-8" />,
      titulo: 'Temperatura',
      descripcion: 'Cada especie tiene sus propias necesidades térmicas.',
      detalles: [
        'Bonsáis de exterior: necesitan experimentar las estaciones',
        'Especies tropicales: mantener entre 15-25°C todo el año',
        'Protege de heladas intensas (por debajo de -5°C)',
        'Evita colocar cerca de calefacción o aire acondicionado',
        'La mayoría necesitan periodo de latencia invernal'
      ]
    },
    {
      icono: <Wind className="h-8 w-8" />,
      titulo: 'Abonado',
      descripcion: 'Nutrición adecuada para un crecimiento saludable.',
      detalles: [
        'Abona desde primavera hasta otoño (época de crecimiento)',
        'Usa abono específico para bonsais',
        'Frecuencia: cada 2-4 semanas según la especie',
        'No abones tras trasplante hasta 4-6 semanas',
        'Reduce el abonado en otoño e invierno'
      ]
    }
  ];

  const cuidadosPorEspecie = [
    {
      nombre: 'Ficus',
      ubicacion: 'Interior',
      riego: 'Moderado - cuando seque superficie',
      luz: 'Luminoso sin sol directo',
      temperatura: '15-25°C',
      dificultad: 'Baja'
    },
    {
      nombre: 'Acer Palmatum (Arce japonés)',
      ubicacion: 'Exterior',
      riego: 'Abundante en verano',
      luz: 'Semisombra - evitar sol directo mediodía',
      temperatura: 'Resistente al frío (-10°C)',
      dificultad: 'Media'
    },
    {
      nombre: 'Carmona',
      ubicacion: 'Interior',
      riego: 'Regular - mantener húmedo',
      luz: 'Mucha luz, tolera algo de sol directo',
      temperatura: '15-25°C',
      dificultad: 'Media'
    },
    {
      nombre: 'Juniperus (Enebro)',
      ubicacion: 'Exterior',
      riego: 'Moderado - tolera cierta sequía',
      luz: 'Pleno sol',
      temperatura: 'Muy resistente al frío',
      dificultad: 'Baja'
    },
    {
      nombre: 'Zelkova',
      ubicacion: 'Exterior',
      riego: 'Regular - mantener húmedo',
      luz: 'Sol directo o semisombra',
      temperatura: 'Resistente al frío',
      dificultad: 'Baja'
    }
  ];

  const problemasComunes = [
    {
      problema: 'Hojas amarillas',
      causas: ['Exceso de riego', 'Falta de nutrientes', 'Drenaje deficiente'],
      soluciones: ['Reducir frecuencia de riego', 'Abonar regularmente', 'Revisar sustrato y drenaje']
    },
    {
      problema: 'Hojas secas o marrones',
      causas: ['Falta de riego', 'Baja humedad', 'Sol directo excesivo'],
      soluciones: ['Aumentar frecuencia de riego', 'Pulverizar hojas', 'Cambiar ubicación']
    },
    {
      problema: 'Pérdida de hojas',
      causas: ['Cambio brusco de ubicación', 'Corrientes de aire', 'Estrés por trasplante'],
      soluciones: ['Mantener ubicación estable', 'Evitar corrientes', 'Ser paciente, se recuperará']
    },
    {
      problema: 'Plagas (pulgones, cochinillas)',
      causas: ['Ambiente seco', 'Falta de ventilación', 'Plantas cercanas infectadas'],
      soluciones: ['Insecticida específico', 'Aumentar humedad', 'Aislar de otras plantas']
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-primary-50 border-b border-primary-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Guía de Cuidados de Bonsáis
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Todo lo que necesitas saber para mantener tu bonsai saludable y hermoso.
            Desde técnicas básicas hasta consejos avanzados.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Cuidados Generales */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Cuidados Generales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cuidadosGenerales.map((cuidado, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-primary-600 mb-4" aria-hidden="true">
                  {cuidado.icono}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {cuidado.titulo}
                </h3>
                <p className="text-gray-600 mb-4">{cuidado.descripcion}</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {cuidado.detalles.map((detalle, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1 flex-shrink-0">•</span>
                      <span>{detalle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Cuidados por Especie */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Cuidados por Especie</h2>
          <div className="space-y-4">
            {cuidadosPorEspecie.map((especie, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {especie.nombre}
                    </h3>
                    <span
                      className={`inline-block text-xs px-2 py-1 rounded-full ${
                        especie.dificultad === 'Baja'
                          ? 'bg-green-100 text-green-800'
                          : especie.dificultad === 'Media'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      Dificultad: {especie.dificultad}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Ubicación</dt>
                    <dd className="text-sm text-gray-900 mt-1">{especie.ubicacion}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Riego</dt>
                    <dd className="text-sm text-gray-900 mt-1">{especie.riego}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Luz</dt>
                    <dd className="text-sm text-gray-900 mt-1">{especie.luz}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Temperatura</dt>
                    <dd className="text-sm text-gray-900 mt-1">{especie.temperatura}</dd>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Problemas Comunes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Problemas Comunes y Soluciones</h2>
          <div className="space-y-6">
            {problemasComunes.map((item, index) => (
              <div
                key={index}
                className="bg-orange-50 border border-orange-200 rounded-lg p-6"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {item.problema}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Causas posibles:</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {item.causas.map((causa, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-orange-600 mt-1">•</span>
                              <span>{causa}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Soluciones:</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {item.soluciones.map((solucion, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-green-600 mt-1">✓</span>
                              <span>{solucion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consejos Adicionales */}
        <section className="bg-primary-50 border border-primary-100 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Consejos Generales</h2>
          <div className="space-y-3 text-gray-700">
            <p className="flex items-start gap-2">
              <span className="text-primary-600 mt-1 font-bold">→</span>
              <span><strong>Paciencia:</strong> El bonsai es un arte que requiere tiempo y observación constante.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary-600 mt-1 font-bold">→</span>
              <span><strong>Observación:</strong> Inspecciona tu bonsai diariamente para detectar cambios o problemas.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary-600 mt-1 font-bold">→</span>
              <span><strong>Aprendizaje continuo:</strong> Cada bonsai es único, aprenderás con la experiencia.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary-600 mt-1 font-bold">→</span>
              <span><strong>Herramientas:</strong> Invierte en herramientas de calidad para mejores resultados.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-primary-600 mt-1 font-bold">→</span>
              <span><strong>Comunidad:</strong> Únete a grupos y foros para compartir experiencias y aprender.</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
