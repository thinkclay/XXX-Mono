import React from 'react'

export default function RootHead() {
  return (
    <>
      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" type="image/x-icon" href={process.env.NEXT_PUBLIC_BASE_PATH || '' + '/favicon.ico'} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100;0,9..144,200;0,9..144,300;0,9..144,400;1,9..144,100&family=Roboto+Condensed:wght@300;400;700&family=Roboto:wght@300;400;700&display=swap"
        rel="stylesheet"
      />

      <title>ReVision</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
    </>
  )
}
