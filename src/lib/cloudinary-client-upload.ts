/**
 * Direct Cloudinary unsigned upload utility.
 * Uploads straight from browser → Cloudinary (no server route, no API secret needed).
 * 
 * Setup required in Cloudinary dashboard:
 * 1. Settings → Upload → Upload presets → Add upload preset
 * 2. Set Signing Mode to "Unsigned"  
 * 3. Copy the preset name → set as NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local
 */

export interface CloudinaryUploadResult {
  secure_url: string
  public_id: string
  format: string
  resource_type: string
  bytes: number
  original_filename: string
  width?: number
  height?: number
}

export async function uploadToCloudinary(
  file: File,
  folder: string = 'uploads'
): Promise<CloudinaryUploadResult> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName) {
    throw new Error(
      'Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local. Add your Cloudinary cloud name.'
    )
  }
  if (!uploadPreset) {
    throw new Error(
      'Missing NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local. ' +
      'Go to Cloudinary Dashboard → Settings → Upload → Upload Presets → create an Unsigned preset.'
    )
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error(`Only image files are supported. Got: ${file.type}`)
  }

  // Validate file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error(`File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max is 10MB.`)
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  formData.append('folder', folder)

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  let res: Response
  try {
    res = await fetch(url, { method: 'POST', body: formData })
  } catch (networkErr) {
    throw new Error('Network error: could not reach Cloudinary. Check your internet connection.')
  }

  if (!res.ok) {
    let message = `Cloudinary upload failed (HTTP ${res.status})`
    try {
      const body = await res.json()
      // Cloudinary error responses have { error: { message: string } }
      if (body?.error?.message) {
        message = `Cloudinary: ${body.error.message}`
        // Give a specific hint for the most common mistake
        if (body.error.message.toLowerCase().includes('upload preset')) {
          message +=
            ' → Go to Cloudinary Dashboard → Settings → Upload → Upload Presets, ' +
            'make sure the preset exists and Signing Mode is set to "Unsigned".'
        }
      }
    } catch {}
    throw new Error(message)
  }

  const result = await res.json()

  if (!result.secure_url) {
    throw new Error('Cloudinary returned a response but no secure_url. Check your upload preset settings.')
  }

  return result as CloudinaryUploadResult
}
