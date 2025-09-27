import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  bytes: number;
  created_at: string;
}

export async function uploadFileToCloudinary(
  file: File,
  folder: string = 'contact-attachments'
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    // Convert File to Buffer
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const buffer = Buffer.from(event.target?.result as ArrayBuffer);
        
        // Determine resource type based on file type
        const resourceType = file.type.startsWith('image/') ? 'image' : 
                           file.type.startsWith('video/') ? 'video' : 'raw';
        
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: resourceType,
            format: file.type.split('/')[1] || undefined,
            use_filename: true,
            unique_filename: true,
            overwrite: false,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as UploadResult);
            }
          }
        ).end(buffer);
        
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
}

export async function deleteFileFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    throw error;
  }
}

export function getFileUrl(publicId: string, resourceType: string = 'image'): string {
  return cloudinary.url(publicId, {
    resource_type: resourceType,
    secure: true,
  });
}
