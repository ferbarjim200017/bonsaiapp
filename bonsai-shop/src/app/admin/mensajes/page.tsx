'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Mail, Phone, Package, Calendar, Eye, Trash2, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import AdminGuard from '@/components/admin/AdminGuard';

interface Mensaje {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  numeroPedido: string;
  motivo: string;
  mensaje: string;
  imagenes: string[];
  fechaCreacion: any;
  leido: boolean;
  respondido: boolean;
}

export default function MensajesPage() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState<Mensaje | null>(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null);

  useEffect(() => {
    cargarMensajes();
  }, []);

  const cargarMensajes = async () => {
    try {
      if (!db) {
        console.error('Firebase no está inicializado');
        setCargando(false);
        return;
      }
      const q = query(
        collection(db, 'mensajes-contacto'),
        orderBy('fechaCreacion', 'desc')
      );
      const snapshot = await getDocs(q);
      const mensajesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Mensaje[];
      setMensajes(mensajesData);
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
    } finally {
      setCargando(false);
    }
  };

  const marcarComoLeido = async (id: string) => {
    try {
      if (!db) return;
      await updateDoc(doc(db, 'mensajes-contacto', id), {
        leido: true
      });
      setMensajes(mensajes.map(m => m.id === id ? { ...m, leido: true } : m));
    } catch (error) {
      console.error('Error al marcar como leído:', error);
    }
  };

  const marcarComoRespondido = async (id: string) => {
    try {
      if (!db) return;
      await updateDoc(doc(db, 'mensajes-contacto', id), {
        respondido: true
      });
      setMensajes(mensajes.map(m => m.id === id ? { ...m, respondido: true } : m));
    } catch (error) {
      console.error('Error al marcar como respondido:', error);
    }
  };

  const eliminarMensaje = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este mensaje?')) return;
    
    try {
      if (!db) return;
      await deleteDoc(doc(db, 'mensajes-contacto', id));
      setMensajes(mensajes.filter(m => m.id !== id));
      if (mensajeSeleccionado?.id === id) {
        setMensajeSeleccionado(null);
      }
    } catch (error) {
      console.error('Error al eliminar mensaje:', error);
    }
  };

  const formatearFecha = (fecha: any) => {
    if (!fecha) return 'Fecha no disponible';
    const date = fecha.toDate ? fecha.toDate() : new Date(fecha);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const motivosMap: Record<string, string> = {
    'consulta-general': 'Consulta general',
    'cuidados': 'Pregunta sobre cuidados',
    'pedido': 'Estado de pedido',
    'incidencia': 'Incidencia con pedido',
    'devolucion': 'Devolución',
    'otro': 'Otro'
  };

  if (cargando) {
    return (
      <AdminGuard>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando mensajes...</p>
          </div>
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Mensajes de Contacto</h1>
            <p className="mt-2 text-sm text-gray-600">
              {mensajes.length} mensaje{mensajes.length !== 1 ? 's' : ''} total
              {mensajes.filter(m => !m.leido).length > 0 && (
                <span className="ml-2 text-primary-600 font-medium">
                  ({mensajes.filter(m => !m.leido).length} sin leer)
                </span>
              )}
            </p>
          </div>

          {mensajes.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay mensajes</h3>
              <p className="text-gray-600">Los mensajes de contacto aparecerán aquí.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lista de mensajes */}
              <div className="space-y-4">
                {mensajes.map((mensaje) => (
                  <div
                    key={mensaje.id}
                    className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-all hover:shadow-md ${
                      mensajeSeleccionado?.id === mensaje.id ? 'ring-2 ring-primary-500' : ''
                    } ${!mensaje.leido ? 'border-l-4 border-l-primary-500' : ''}`}
                    onClick={() => {
                      setMensajeSeleccionado(mensaje);
                      if (!mensaje.leido) {
                        marcarComoLeido(mensaje.id);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {mensaje.nombre} {mensaje.apellidos}
                          {!mensaje.leido && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                              Nuevo
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600">{mensaje.email}</p>
                      </div>
                      {mensaje.respondido && (
                        <Check className="h-5 w-5 text-green-600" />
                      )}
                    </div>

                    <div className="space-y-1 text-sm">
                      <p className="text-gray-700">
                        <span className="font-medium">Motivo:</span> {motivosMap[mensaje.motivo] || mensaje.motivo}
                      </p>
                      {mensaje.numeroPedido && (
                        <p className="text-gray-700">
                          <span className="font-medium">Pedido:</span> {mensaje.numeroPedido}
                        </p>
                      )}
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatearFecha(mensaje.fechaCreacion)}
                      </p>
                    </div>

                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {mensaje.mensaje}
                    </p>

                    {mensaje.imagenes && mensaje.imagenes.length > 0 && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                        <Package className="h-3 w-3" />
                        {mensaje.imagenes.length} imagen{mensaje.imagenes.length !== 1 ? 'es' : ''} adjunta{mensaje.imagenes.length !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Detalle del mensaje */}
              <div className="lg:sticky lg:top-8 h-fit">
                {mensajeSeleccionado ? (
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {mensajeSeleccionado.nombre} {mensajeSeleccionado.apellidos}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatearFecha(mensajeSeleccionado.fechaCreacion)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {!mensajeSeleccionado.respondido && (
                          <button
                            onClick={() => marcarComoRespondido(mensajeSeleccionado.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Marcar como respondido"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={() => eliminarMensaje(mensajeSeleccionado.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar mensaje"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${mensajeSeleccionado.email}`} className="hover:text-primary-600">
                          {mensajeSeleccionado.email}
                        </a>
                      </div>
                      
                      {mensajeSeleccionado.telefono && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="h-4 w-4" />
                          <a href={`tel:${mensajeSeleccionado.telefono}`} className="hover:text-primary-600">
                            {mensajeSeleccionado.telefono}
                          </a>
                        </div>
                      )}

                      {mensajeSeleccionado.numeroPedido && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <Package className="h-4 w-4" />
                          <span>Pedido: {mensajeSeleccionado.numeroPedido}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t">
                        <p className="text-sm font-medium text-gray-900 mb-1">Motivo:</p>
                        <p className="text-gray-700">{motivosMap[mensajeSeleccionado.motivo] || mensajeSeleccionado.motivo}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-900 mb-2">Mensaje:</p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 whitespace-pre-wrap">{mensajeSeleccionado.mensaje}</p>
                      </div>
                    </div>

                    {mensajeSeleccionado.imagenes && mensajeSeleccionado.imagenes.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Imágenes adjuntas:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {mensajeSeleccionado.imagenes.map((imagen, index) => (
                            <div
                              key={index}
                              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => setImagenSeleccionada(imagen)}
                            >
                              <img
                                src={imagen}
                                alt={`Adjunto ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 pt-6 border-t flex gap-3">
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={() => window.location.href = `mailto:${mensajeSeleccionado.email}`}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Responder por email
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow p-12 text-center">
                    <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Selecciona un mensaje para ver los detalles</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal para ver imagen completa */}
        {imagenSeleccionada && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setImagenSeleccionada(null)}
          >
            <div className="max-w-4xl max-h-full">
              <img
                src={imagenSeleccionada}
                alt="Imagen ampliada"
                className="max-w-full max-h-[90vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
