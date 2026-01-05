import { NextRequest, NextResponse } from 'next/server';
import { createProducto } from '@/lib/firebase/firestore';
import type { Producto } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const productos: Omit<Producto, 'id'>[] = await request.json();

    if (!Array.isArray(productos) || productos.length === 0) {
      return NextResponse.json(
        { error: 'Se requiere un array de productos' },
        { status: 400 }
      );
    }

    const resultados = [];
    
    for (const producto of productos) {
      try {
        // Generar slug si no existe
        const slug = producto.slug || producto.nombre
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

        // Preparar el producto completo
        const productoCompleto = {
          ...producto,
          slug,
          metaDescripcion: producto.metaDescripcion || producto.descripcion.substring(0, 160),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const id = await createProducto(productoCompleto as Omit<Producto, 'id'>);
        resultados.push({ 
          success: true, 
          id, 
          nombre: producto.nombre 
        });
      } catch (error: any) {
        resultados.push({ 
          success: false, 
          nombre: producto.nombre, 
          error: error.message 
        });
      }
    }

    const exitosos = resultados.filter(r => r.success).length;
    const fallidos = resultados.filter(r => !r.success).length;

    return NextResponse.json({
      message: `Proceso completado: ${exitosos} exitosos, ${fallidos} fallidos`,
      resultados
    });

  } catch (error: any) {
    console.error('Error en batch de productos:', error);
    return NextResponse.json(
      { error: 'Error al procesar productos', detalles: error.message },
      { status: 500 }
    );
  }
}
