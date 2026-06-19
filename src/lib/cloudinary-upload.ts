import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary — ensure all three keys are present
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
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

// Maps MIME type to a Cloudinary-safe format string
function getCloudinaryFormat(mimeType: string): string | undefined {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'application/pdf': 'pdf',
  };
  return map[mimeType] ?? undefined;
}

export async function uploadFileToCloudinary(
  file: File,
  folder: string = 'company-uploads'
): Promise<UploadResult> {
  // Verify config is set before attempting upload
  const cfg = cloudinary.config();
  if (!cfg.cloud_name || !cfg.api_key || !cfg.api_secret) {
    throw new Error(
      `Cloudinary configuration is incomplete. cloud_name=${cfg.cloud_name}, api_key set=${!!cfg.api_key}, api_secret set=${!!cfg.api_secret}`
    );
  }

  return new Promise(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const resourceType = file.type.startsWith('image/')
        ? 'image'
        : file.type.startsWith('video/')
        ? 'video'
        : 'raw';

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
          format: getCloudinaryFormat(file.type),
          use_filename: true,
          unique_filename: true,
          overwrite: false,
        },
        (error, result) => {
          if (error) {
            reject(new Error(`Cloudinary upload error: ${error.message} (http_code: ${error.http_code})`));
          } else {
            resolve(result as UploadResult);
          }
        }
      );

      uploadStream.end(buffer);
    } catch (error) {
      reject(error);
    }
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
