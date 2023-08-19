import { ReactNode } from 'react'

import AppWrappers from './AppWrappers'

import 'assets/styles/admin.scss'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id="root">
        <AppWrappers>{children}</AppWrappers>
      </body>
    </html>
  )
}
