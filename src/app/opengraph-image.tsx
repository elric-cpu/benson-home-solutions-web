import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #4C0C14 0%, #6d1520 100%)',
          color: '#F5F5F0',
          padding: '64px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: 'uppercase',
            opacity: 0.8,
          }}
        >
          Benson Home Solutions
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', fontSize: 78, fontWeight: 900, lineHeight: 1.04 }}>
            Repairs that clear the list.
          </div>
          <div style={{ display: 'flex', fontSize: 34, maxWidth: 920, lineHeight: 1.3, opacity: 0.9 }}>
            Post-inspection repairs, water damage work, maintenance, weatherization, and urgent response across Oregon.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 26,
            fontWeight: 700,
            opacity: 0.85,
          }}
        >
          <span>CCB #258533</span>
          <span>Mid-Willamette Valley + Harney County</span>
        </div>
      </div>
    ),
    size
  )
}
