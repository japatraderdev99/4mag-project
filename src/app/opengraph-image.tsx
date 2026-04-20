import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '4MAG — Art Printed Magazine'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: '#0D0D0D',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F0EBE0',
          fontFamily: 'serif',
          fontWeight: 900,
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: 200,
            letterSpacing: '-0.05em',
            lineHeight: 0.8,
          }}
        >
          4MAG
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#C8001E',
            marginTop: 24,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontWeight: 400,
          }}
        >
          ART PRINTED MAGAZINE
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}