import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'TwoFloww – Web Development Company & Web Agency in Delhi NCR'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: '#DE5D26',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            TF
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em' }}>TwoFloww</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Web Development Company &amp; Web Agency in Delhi NCR
          </div>
          <div style={{ fontSize: 28, color: '#c9c9c9' }}>
            Websites &middot; Mobile Apps &middot; SEO &middot; Digital Marketing
          </div>
          <div style={{ fontSize: 24, color: '#DE5D26', fontWeight: 600 }}>
            Noida &middot; Delhi &middot; Gurugram &middot; 50+ Projects Delivered
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
