/** @format */

import 'gmail-js'

declare global {
  interface Window {
    gmail: Gmail
    dataLayer: Array<any>
    gtag: (a: string, b: any, c?: any) => void
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    PLASMO_PUBLIC_GTAG_ID?: string
  }
}
