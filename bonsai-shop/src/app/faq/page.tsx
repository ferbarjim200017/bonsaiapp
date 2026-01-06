export default function FAQPage() {
  const faqs = [
    {
      pregunta: '¿Cómo cuido mi bonsai recién recibido?',
      respuesta: 'Al recibir tu bonsai, colócalo en su ubicación definitiva (interior/exterior según su tipo), riégalo ligeramente y déjalo adaptarse durante 2-3 días antes de realizar cualquier poda o trasplante. Consulta la guía específica de tu especie incluida en el envío.',
    },
    {
      pregunta: '¿Hacéis envíos a toda España?',
      respuesta: 'Sí, realizamos envíos a toda España: Península, Baleares, Canarias, Ceuta y Melilla. El envío es gratuito para pedidos superiores a 50€ en península. Los plazos de entrega varían según la zona.',
    },
    {
      pregunta: '¿Cuánto tarda el envío?',
      respuesta: 'En península: 24-48h laborables. Baleares: 3-5 días. Canarias, Ceuta y Melilla: 5-7 días. Los pedidos se preparan en 24-48h desde la confirmación del pago. Recibirás el tracking por email.',
    },
    {
      pregunta: '¿Puedo devolver un bonsai?',
      respuesta: 'Al tratarse de un producto vivo, las devoluciones se aceptan únicamente si el bonsai llega dañado o con problemas evidentes. Debes notificarlo en las primeras 24h tras la recepción, adjuntando fotos. Consulta nuestra política de devoluciones completa.',
    },
    {
      pregunta: '¿Con qué frecuencia debo regar mi bonsai?',
      respuesta: 'Depende de la especie, ubicación y época del año. Como norma general: comprueba la humedad del sustrato introduciendo un dedo. Si los primeros 2cm están secos, es momento de regar. Consulta la ficha de tu especie para información específica.',
    },
    {
      pregunta: '¿Los bonsais son todos de interior?',
      respuesta: 'No. Hay bonsais de interior (Ficus, Carmona) y de exterior (Juniperus, Acer). Los de exterior necesitan estar fuera para recibir las estaciones naturales. En nuestra ficha de producto indicamos claramente la ubicación recomendada.',
    },
    {
      pregunta: '¿Qué métodos de pago aceptáis?',
      respuesta: 'Aceptamos tarjeta de crédito/débito (Visa, Mastercard) con 3D Secure y PayPal. Todos los pagos son seguros y procesados a través de pasarelas certificadas.',
    },
    {
      pregunta: '¿Puedo recoger mi pedido en tienda?',
      respuesta: 'Actualmente solo operamos online sin tienda física. Todos los envíos se realizan a través de transportista especializado con embalaje protector para plantas.',
    },
    {
      pregunta: '¿El bonsai que recibo es exactamente el de la foto?',
      respuesta: 'Los bonsais son productos naturales únicos. La foto es orientativa, pero cada ejemplar puede variar en forma, tamaño de copa y color. Garantizamos que recibirás un bonsai de calidad similar al mostrado en la imagen.',
    },
    {
      pregunta: '¿Tenéis garantía?',
      respuesta: 'Garantizamos que tu bonsai llega en perfecto estado. Si detectas algún problema al recibirlo, contáctanos en las primeras 24h con fotos. Los bonsais requieren cuidados específicos: no podemos garantizar su supervivencia a largo plazo si no se siguen las instrucciones de cuidado.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Preguntas frecuentes (FAQ)</h1>
        <p className="text-lg text-gray-600 mb-12">
          Encuentra respuestas a las preguntas más comunes sobre nuestros bonsais, envíos y cuidados.
        </p>

        <dl className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
              <dt className="text-xl font-semibold text-gray-900 mb-3">
                {faq.pregunta}
              </dt>
              <dd className="text-gray-700 leading-relaxed">
                {faq.respuesta}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-700 mb-4">
            ¿No encuentras la respuesta que buscas?
          </p>
          <a
            href="/contacto"
            className="text-primary-700 hover:text-primary-800 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded px-3 py-2"
          >
            Contáctanos →
          </a>
        </div>
      </div>
    </div>
  );
}
