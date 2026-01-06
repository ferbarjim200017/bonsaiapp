import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const dynamic = 'force-dynamic';

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
      // Generar nombre único para el archivo
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const extension = file.name.split('.').pop();
      const fileName = `productos/${timestamp}-${randomStr}.${extension}`;

      // Subir a Vercel Blob Storage
      const blob = await put(fileName, file, {
        access: 'public',
        addRandomSuffix: false,
      });

      uploadedUrls.push(blob.url);
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
