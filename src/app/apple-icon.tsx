import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
          borderRadius: 40,
        }}
      >
        <div style={{ color: '#DE5D26', fontSize: 84, fontWeight: 700, fontFamily: 'sans-serif' }}>TF</div>
      </div>
    ),
    { ...size }
  )
}
