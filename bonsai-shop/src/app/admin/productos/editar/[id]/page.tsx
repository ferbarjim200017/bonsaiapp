'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { getProductoById, updateProducto, createProducto } from '@/lib/firebase/firestore';
import { productosMock } from '@/lib/mockData';
import type { Producto } from '@/types';

export default function EditarProducto({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [imagenesOriginales, setImagenesOriginales] = useState<string[]>([]); // Track original images
  const [imagenesFiles, setImagenesFiles] = useState<File[]>([]);
  const [productoOriginal, setProductoOriginal] = useState<Producto | null>(null);
  const [esMock, setEsMock] = useState(false);

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

  // Cargar producto existente
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        // Intentar cargar desde Firebase primero
        let producto = await getProductoById(params.id);
        
        // Si no está en Firebase, buscar en los datos mock
        if (!producto) {
          producto = productosMock.find(p => p.id === params.id) || null;
          
          if (producto) {
            setEsMock(true);
            console.log('⚠️ Producto cargado desde datos mock. Se creará en Firebase al guardar.');
          } else {
            alert('❌ Producto no encontrado');
            router.push('/admin/productos');
            return;
          }
        }

        setProductoOriginal(producto);
        
        // Cargar datos en el formulario
        setFormData({
          nombre: producto.nombre || '',
          descripcion: producto.descripcion || '',
          precio: producto.precio?.toString() || '',
          precioAnterior: producto.precioAnterior?.toString() || '',
          sku: producto.sku || '',
          categoria: producto.categoria || 'bonsai',
          stock: producto.stock?.toString() || '',
          publicado: producto.publicado ?? true,
          destacado: producto.destacado ?? false,
          nuevo: producto.nuevo ?? false,
          // Bonsái
          especie: producto.especie || '',
          tamano: producto.tamano?.toString() || '',
          nivelCuidado: producto.nivelCuidado || 'baja',
          ubicacion: producto.ubicacion || 'interior',
          riego: producto.riego || '',
          toxicidadMascotas: producto.toxicidadMascotas ?? false,
          // Accesorio
          tipoAccesorio: producto.tipoAccesorio || '',
        });

        // Cargar imágenes existentes
        if (producto.imagenes && producto.imagenes.length > 0) {
          setImagenes(producto.imagenes);
          setImagenesOriginales(producto.imagenes); // Save original images
        }

        setCargando(false);
      } catch (error) {
        console.error('Error cargando producto:', error);
        alert('❌ Error al cargar el producto');
        router.push('/admin/productos');
      }
    };

    cargarProducto();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);

    try {
      // 1. Subir nuevas imágenes si las hay
      let imagenesUrls: string[] = [...imagenes];
      
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
        // Mantener las imágenes existentes y agregar las nuevas
        imagenesUrls = [...imagenes.filter(img => !img.startsWith('blob:')), ...uploadData.urls];
      }

      // 2. Generar slug si cambió el nombre
      const slug = formData.nombre
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      // 3. Preparar datos actualizados
      // NOTA: Las imágenes eliminadas se borran automáticamente de Firestore
      // porque imagenesUrls solo contiene las imágenes que quedaron en el formulario
      const productoActualizado: Partial<Producto> = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        precioAnterior: formData.precioAnterior ? parseFloat(formData.precioAnterior) : undefined,
        sku: formData.sku,
        categoria: formData.categoria,
        imagenes: imagenesUrls,
        stock: parseInt(formData.stock),
        publicado: formData.publicado,
        destacado: formData.destacado,
        nuevo: formData.nuevo,
        slug,
        metaDescripcion: formData.descripcion.substring(0, 160),
        updatedAt: new Date(),
      };

      // Agregar campos específicos según categoría
      if (formData.categoria === 'bonsai') {
        productoActualizado.especie = formData.especie;
        productoActualizado.tamano = formData.tamano ? parseInt(formData.tamano) : undefined;
        productoActualizado.nivelCuidado = formData.nivelCuidado;
        productoActualizado.ubicacion = formData.ubicacion;
        productoActualizado.riego = formData.riego;
        productoActualizado.toxicidadMascotas = formData.toxicidadMascotas;
        productoActualizado.variabilidadNatural = true;
      } else {
        productoActualizado.tipoAccesorio = formData.tipoAccesorio as any;
      }

      // Eliminar campos undefined antes de enviar a Firebase
      Object.keys(productoActualizado).forEach(key => {
        if (productoActualizado[key as keyof typeof productoActualizado] === undefined) {
          delete productoActualizado[key as keyof typeof productoActualizado];
        }
      });

      // 4. Crear o actualizar producto en Firestore
      if (esMock) {
        // Si es un producto mock, crearlo en Firebase (se genera nuevo ID)
        const nuevoId = await createProducto(productoActualizado as Omit<Producto, 'id'>);
        alert(`✅ Producto creado en Firebase con ID: ${nuevoId}`);
      } else {
        // Si ya existe en Firebase, actualizarlo
        await updateProducto(params.id, productoActualizado);
        alert('✅ Producto actualizado exitosamente!');
      }
      
      router.push('/admin/productos');
    } catch (error) {
      console.error('Error actualizando producto:', error);
      alert('❌ Error al actualizar el producto. Por favor, intenta de nuevo.');
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
    const imagenEliminada = imagenes[index];
    
    // Si es una imagen nueva (blob), también eliminarla de imagenesFiles
    if (imagenEliminada.startsWith('blob:')) {
      const blobIndex = imagenes.slice(0, index).filter(img => img.startsWith('blob:')).length;
      setImagenesFiles(imagenesFiles.filter((_, i) => i !== blobIndex));
    }
    
    setImagenes(imagenes.filter((_, i) => i !== index));
  };

  if (cargando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }  {esMock && (
            <p className="mt-1 text-sm text-amber-600 font-medium">
              ⚠️ Este producto no está en Firebase. Se creará al guardar.
            </p>
          )}
        

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
          <h1 className="text-3xl font-bold text-gray-900">Editar Producto</h1>
          <p className="mt-1 text-sm text-gray-600">
            Modificar datos del producto: {productoOriginal?.nombre}
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
                  SKU *
                </label>
                <input
                  type="text"
                  id="sku"
                  required
                  className="input"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="BON-XXX-001"
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
                  {index === 0 && (
                    <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs text-center py-1 rounded-b">
                      Principal
                    </span>
                  )}
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
              Formatos: JPG, PNG, SVG. Máximo 5 imágenes. La primera imagen será la principal.
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
        </div>esMock ? 'Crear en Firebase' : 

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
            {guardando ? 'Guardando...' : 'Actualizar Producto'}
          </Button>
        </div>
      </form>
    </div>
  );
}
