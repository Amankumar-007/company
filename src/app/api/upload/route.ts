import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!
const API_KEY = process.env.CLOUDINARY_API_KEY!
const API_SECRET = process.env.CLOUDINARY_API_SECRET!

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']

/**
 * Generate a Cloudinary signed upload signature.
 * SHA1( param1=value1&param2=value2&...&api_secret )
 * Params must be sorted alphabetically, excluding file/api_key/resource_type.
 */
function generateSignature(params: Record<string, string>): string {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&')
  return createHash('sha1').update(sorted + API_SECRET).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    // Early check for missing env vars
    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
      const missing = [
        !CLOUD_NAME && 'CLOUDINARY_CLOUD_NAME',
        !API_KEY && 'CLOUDINARY_API_KEY',
        !API_SECRET && 'CLOUDINARY_API_SECRET',
      ].filter(Boolean).join(', ')
      return NextResponse.json(
        { message: `Server config error: missing env vars (${missing})` },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'uploads'

    if (!file) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 })
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max is 10MB.` },
        { status: 400 }
      )
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { message: `File type "${file.type}" not supported. Use JPEG, PNG, GIF, WebP or SVG.` },
        { status: 400 }
      )
    }

    // Build signed params
    const timestamp = String(Math.floor(Date.now() / 1000))
    const params: Record<string, string> = { folder, timestamp }
    const signature = generateSignature(params)

    // Build multipart form for Cloudinary REST API
    const cloudForm = new FormData()
    cloudForm.append('file', file)
    cloudForm.append('api_key', API_KEY)
    cloudForm.append('timestamp', timestamp)
    cloudForm.append('folder', folder)
    cloudForm.append('signature', signature)

    console.log(`[upload] Uploading "${file.name}" (${file.type}, ${(file.size / 1024).toFixed(0)}KB) → Cloudinary/${folder}`)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: 'POST', body: cloudForm }
    )

    const result = await res.json()

    if (!res.ok) {
      const msg = result?.error?.message || `Cloudinary error (HTTP ${res.status})`
      console.error('[upload] Cloudinary rejected:', msg)
      return NextResponse.json({ message: msg }, { status: 500 })
    }

    console.log(`[upload] ✓ Done: ${result.secure_url}`)

    return NextResponse.json({
      message: 'Uploaded successfully',
      file: {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        size: result.bytes,
        width: result.width,
        height: result.height,
        name: file.name,
        type: file.type,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[upload] Unhandled error:', message)
    return NextResponse.json({ message }, { status: 500 })
  }
}
