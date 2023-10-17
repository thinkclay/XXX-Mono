import React from 'react'

export default function RootHead() {
  return (
    <>
      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" type="image/x-icon" href={process.env.NEXT_PUBLIC_BASE_PATH || '' + '/favicon.ico'} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,200;9..40,400;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&display=swap"
        rel="stylesheet"
      ></link>

      <title>ReVision</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
    </>
  )
}
