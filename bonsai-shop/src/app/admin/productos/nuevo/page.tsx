'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { createProducto } from '@/lib/firebase/firestore';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Producto } from '@/types';

export default function NuevoProducto() {
  const router = useRouter();
  const [guardando, setGuardando] = useState(false);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [imagenesFiles, setImagenesFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    precioAnterior: '',
    sku: '',
    categoria: 'bonsai' as 'bonsai' | 'accesorio',
    stock: '',
    publicado: true,
    destacado: false,
    nuevo: false,
    // Bonsái específico
    especie: '',
    tamano: '',
    nivelCuidado: 'baja' as 'baja' | 'media' | 'alta',
    ubicacion: 'interior' as 'interior' | 'exterior' | 'ambos',
    riego: '',
    toxicidadMascotas: false,
    // Accesorio específico
    tipoAccesorio: '' as '' | 'herramienta' | 'sustrato' | 'maceta' | 'abono' | 'otro',
  });

  // Generar SKU automáticamente al cargar
  useEffect(() => {
    const generarSKU = async () => {
      try {
        if (!db) {
          // Si no hay DB, usar un SKU por defecto
          setFormData(prev => ({ ...prev, sku: 'BON-001' }));
          return;
        }

        // Obtener el último producto creado
        const q = query(
          collection(db, 'productos'),
          orderBy('createdAt', 'desc'),
          limit(1)
        );
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
          // Si no hay productos, empezar desde BON-001
          setFormData(prev => ({ ...prev, sku: 'BON-001' }));
        } else {
          // Obtener el SKU del último producto
          const ultimoProducto = snapshot.docs[0].data();
          const ultimoSKU = ultimoProducto.sku || 'BON-000';
          
          // Extraer el número del SKU (formato: BON-XXX o similar)
          const match = ultimoSKU.match(/(\d+)$/);
          if (match) {
            const numero = parseInt(match[1]) + 1;
            const nuevoSKU = ultimoSKU.replace(/\d+$/, numero.toString().padStart(3, '0'));
            setFormData(prev => ({ ...prev, sku: nuevoSKU }));
          } else {
            // Si no se puede parsear, usar BON-001
            setFormData(prev => ({ ...prev, sku: 'BON-001' }));
          }
        }
      } catch (error) {
        console.error('Error generando SKU:', error);
        // En caso de error, usar un SKU por defecto
        setFormData(prev => ({ ...prev, sku: 'BON-001' }));
      }
    };

    generarSKU();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);

    try {
      // 1. Subir imágenes al servidor local
      let imagenesUrls: string[] = [];
      if (imagenesFiles.length > 0) {
        const formDataImages = new FormData();
        imagenesFiles.forEach(file => formDataImages.append('files', file));
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formDataImages,
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Error al subir las imágenes');
        }
        
        const uploadData = await uploadResponse.json();
        imagenesUrls = uploadData.urls;
      }

      // 2. Crear slug del producto
      const slug = formData.nombre
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      // 3. Preparar datos del producto
      const nuevoProducto: Omit<Producto, 'id'> = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        sku: formData.sku,
        categoria: formData.categoria,
        imagenes: imagenesUrls,
        stock: parseInt(formData.stock),
        publicado: formData.publicado,
        destacado: formData.destacado,
        nuevo: formData.nuevo,
        slug,
        metaDescripcion: formData.descripcion.substring(0, 160),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Agregar precioAnterior solo si tiene valor (Firestore no acepta undefined)
      if (formData.precioAnterior && formData.precioAnterior.trim() !== '') {
        nuevoProducto.precioAnterior = parseFloat(formData.precioAnterior);
      }

      // Agregar campos específicos según categoría
      if (formData.categoria === 'bonsai') {
        nuevoProducto.especie = formData.especie;
        if (formData.tamano) {
          nuevoProducto.tamano = parseInt(formData.tamano);
        }
        nuevoProducto.nivelCuidado = formData.nivelCuidado;
        nuevoProducto.ubicacion = formData.ubicacion;
        nuevoProducto.riego = formData.riego;
        nuevoProducto.toxicidadMascotas = formData.toxicidadMascotas;
        nuevoProducto.variabilidadNatural = true;
      } else {
        nuevoProducto.tipoAccesorio = formData.tipoAccesorio as any;
      }

      // 4. Crear producto en Firestore
      const productoId = await createProducto(nuevoProducto);
      
      alert('✅ Producto creado exitosamente en Firebase!');
      router.push('/admin/productos');
    } catch (error) {
      console.error('Error creando producto:', error);
      alert('❌ Error al crear el producto. Por favor, intenta de nuevo.');
      setGuardando(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);
      const newImagesPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setImagenes([...imagenes, ...newImagesPreviews]);
      setImagenesFiles([...imagenesFiles, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setImagenes(imagenes.filter((_, i) => i !== index));
    setImagenesFiles(imagenesFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/productos"
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nuevo Producto</h1>
          <p className="mt-1 text-sm text-gray-600">
            Completa los datos del producto
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información básica */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Información básica
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 mb-1">
                Nombre del producto *
              </label>
              <input
                type="text"
                id="nombre"
                required
                className="input"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-900 mb-1">
                Descripción *
              </label>
              <textarea
                id="descripcion"
                required
                rows={4}
                className="input resize-none"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-900 mb-1">
                  SKU (generado automáticamente)
                </label>
                <input
                  type="text"
                  id="sku"
                  required
                  readOnly
                  className="input bg-gray-50"
                  value={formData.sku}
                  placeholder="Generando..."
                />
              </div>

              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-900 mb-1">
                  Categoría *
                </label>
                <select
                  id="categoria"
                  required
                  className="input"
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value as any })}
                >
                  <option value="bonsai">Bonsái</option>
                  <option value="accesorio">Accesorio</option>
                </select>
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-900 mb-1">
                  Stock *
                </label>
                <input
                  type="number"
                  id="stock"
                  required
                  min="0"
                  className="input"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="precio" className="block text-sm font-medium text-gray-900 mb-1">
                  Precio (€) *
                </label>
                <input
                  type="number"
                  id="precio"
                  required
                  min="0"
                  step="0.01"
                  className="input"
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="precioAnterior" className="block text-sm font-medium text-gray-900 mb-1">
                  Precio anterior (€)
                </label>
                <input
                  type="number"
                  id="precioAnterior"
                  min="0"
                  step="0.01"
                  className="input"
                  value={formData.precioAnterior}
                  onChange={(e) => setFormData({ ...formData, precioAnterior: e.target.value })}
                  placeholder="Para mostrar descuento"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Imágenes */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Imágenes
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4 flex-wrap">
              {imagenes.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Imagen ${index + 1}`}
                    className="h-24 w-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <label className="h-24 w-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-primary-500 transition-colors">
                <Upload className="h-6 w-6 text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">Subir</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              Formatos: JPG, PNG, SVG. Máximo 5 imágenes.
            </p>
          </div>
        </div>

        {/* Atributos específicos de bonsai */}
        {formData.categoria === 'bonsai' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Atributos de Bonsái
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="especie" className="block text-sm font-medium text-gray-900 mb-1">
                  Especie
                </label>
                <input
                  type="text"
                  id="especie"
                  className="input"
                  value={formData.especie}
                  onChange={(e) => setFormData({ ...formData, especie: e.target.value })}
                  placeholder="Ficus Retusa"
                />
              </div>

              <div>
                <label htmlFor="tamano" className="block text-sm font-medium text-gray-900 mb-1">
                  Tamaño (cm)
                </label>
                <input
                  type="number"
                  id="tamano"
                  className="input"
                  value={formData.tamano}
                  onChange={(e) => setFormData({ ...formData, tamano: e.target.value })}
                  placeholder="25"
                />
              </div>

              <div>
                <label htmlFor="nivelCuidado" className="block text-sm font-medium text-gray-900 mb-1">
                  Nivel de cuidado
                </label>
                <select
                  id="nivelCuidado"
                  className="input"
                  value={formData.nivelCuidado}
                  onChange={(e) => setFormData({ ...formData, nivelCuidado: e.target.value as any })}
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              <div>
                <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-900 mb-1">
                  Ubicación
                </label>
                <select
                  id="ubicacion"
                  className="input"
                  value={formData.ubicacion}
                  onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value as any })}
                >
                  <option value="interior">Interior</option>
                  <option value="exterior">Exterior</option>
                  <option value="ambos">Ambos</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="riego" className="block text-sm font-medium text-gray-900 mb-1">
                  Frecuencia de riego
                </label>
                <input
                  type="text"
                  id="riego"
                  className="input"
                  value={formData.riego}
                  onChange={(e) => setFormData({ ...formData, riego: e.target.value })}
                  placeholder="2-3 veces por semana"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="toxicidadMascotas"
                  className="h-4 w-4 text-primary-600 rounded"
                  checked={formData.toxicidadMascotas}
                  onChange={(e) => setFormData({ ...formData, toxicidadMascotas: e.target.checked })}
                />
                <label htmlFor="toxicidadMascotas" className="ml-2 text-sm text-gray-900">
                  Tóxico para mascotas
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Atributos de accesorio */}
        {formData.categoria === 'accesorio' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Atributos de Accesorio
            </h2>
            
            <div>
              <label htmlFor="tipoAccesorio" className="block text-sm font-medium text-gray-900 mb-1">
                Tipo de accesorio
              </label>
              <select
                id="tipoAccesorio"
                className="input"
                value={formData.tipoAccesorio}
                onChange={(e) => setFormData({ ...formData, tipoAccesorio: e.target.value as any })}
              >
                <option value="">Selecciona tipo</option>
                <option value="herramienta">Herramienta</option>
                <option value="sustrato">Sustrato</option>
                <option value="maceta">Maceta</option>
                <option value="abono">Abono</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>
        )}

        {/* Opciones de publicación */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Opciones de publicación
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="publicado"
                className="h-4 w-4 text-primary-600 rounded"
                checked={formData.publicado}
                onChange={(e) => setFormData({ ...formData, publicado: e.target.checked })}
              />
              <label htmlFor="publicado" className="ml-2 text-sm text-gray-900">
                Publicar producto
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="destacado"
                className="h-4 w-4 text-primary-600 rounded"
                checked={formData.destacado}
                onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })}
              />
              <label htmlFor="destacado" className="ml-2 text-sm text-gray-900">
                Producto destacado
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="nuevo"
                className="h-4 w-4 text-primary-600 rounded"
                checked={formData.nuevo}
                onChange={(e) => setFormData({ ...formData, nuevo: e.target.checked })}
              />
              <label htmlFor="nuevo" className="ml-2 text-sm text-gray-900">
                Marcar como nuevo
              </label>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/productos" className="btn btn-outline">
            Cancelar
          </Link>
          <Button
            type="submit"
            variant="primary"
            disabled={guardando}
          >
            {guardando ? 'Guardando...' : 'Crear Producto'}
          </Button>
        </div>
      </form>
    </div>
  );
}
