import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Límite de tamaño: 500KB por imagen (para evitar problemas con Firestore)
const MAX_FILE_SIZE = 500 * 1024; // 500KB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No se encontraron archivos' },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      // Verificar tamaño
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `La imagen ${file.name} es demasiado grande. Máximo 500KB. Comprímela antes de subir.` },
          { status: 400 }
        );
      }

      // Convertir a base64
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const mimeType = file.type || 'image/jpeg';
      
      // Crear data URL
      const dataUrl = `data:${mimeType};base64,${base64}`;
      
      uploadedUrls.push(dataUrl);
    }

    return NextResponse.json({ urls: uploadedUrls });
  } catch (error) {
    console.error('Error procesando archivos:', error);
    return NextResponse.json(
      { error: 'Error al procesar archivos', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
