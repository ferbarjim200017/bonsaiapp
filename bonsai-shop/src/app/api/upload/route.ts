import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Verificar que Firebase Storage esté configurado
    if (!storage) {
      console.error('Firebase Storage no está configurado');
      return NextResponse.json(
        { error: 'Servicio de almacenamiento no disponible' },
        { status: 503 }
      );
    }

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
      // Convertir archivo a bytes
      const bytes = await file.arrayBuffer();
      const buffer = new Uint8Array(bytes);

      // Generar nombre único para el archivo
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const extension = file.name.split('.').pop();
      const fileName = `productos/${timestamp}-${randomStr}.${extension}`;

      // Crear referencia en Firebase Storage
      const storageRef = ref(storage, fileName);

      // Subir archivo con metadata
      await uploadBytes(storageRef, buffer, {
        contentType: file.type,
      });

      // Obtener URL pública
      const downloadURL = await getDownloadURL(storageRef);
      uploadedUrls.push(downloadURL);
    }

    return NextResponse.json({ urls: uploadedUrls });
  } catch (error) {
    console.error('Error subiendo archivos:', error);
    return NextResponse.json(
      { error: 'Error al subir archivos', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
