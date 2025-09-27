import { NextRequest, NextResponse } from 'next/server';
import { uploadFileToCloudinary, UploadResult } from '@/lib/cloudinary-upload';

// Maximum file size (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed file types
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/zip',
  'application/x-zip-compressed'
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { 
          message: 'File type not supported. Supported types: JPEG, PNG, GIF, WebP, PDF, DOC, DOCX, TXT, ZIP',
          allowedTypes: ALLOWED_FILE_TYPES
        },
        { status: 400 }
      );
    }

    // Upload file to Cloudinary
    const result: UploadResult = await uploadFileToCloudinary(file, 'contact-attachments');

    return NextResponse.json({
      message: 'File uploaded successfully',
      file: {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        resourceType: result.resource_type,
        size: result.bytes,
        name: file.name,
        type: file.type
      }
    });

  } catch (error) {
    console.error('File upload error:', error);
    
    let errorMessage = 'Error uploading file. Please try again.';
    
    if (error instanceof Error) {
      if (error.message.includes('Cloudinary')) {
        errorMessage = 'Cloudinary upload failed. Please check your configuration.';
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
