import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

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
    
    // Crear directorio si no existe
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'productos');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generar nombre único para el archivo
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const extension = file.name.split('.').pop();
      const fileName = `${timestamp}-${randomStr}.${extension}`;

      // Guardar archivo
      const filePath = join(uploadsDir, fileName);
      await writeFile(filePath, buffer);

      // Retornar URL pública
      uploadedUrls.push(`/uploads/productos/${fileName}`);
    }

    return NextResponse.json({ urls: uploadedUrls });
  } catch (error) {
    console.error('Error subiendo archivos:', error);
    return NextResponse.json(
      { error: 'Error al subir archivos' },
      { status: 500 }
    );
  }
}
