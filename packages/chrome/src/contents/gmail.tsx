/** @format */

import type { PlasmoCSConfig } from 'plasmo'
import { createRoot } from 'react-dom/client'
import 'gmail-js'

import App from '@common/views/App'
import reportWebVitals from '@common/reportWebVitals'

import styles from 'data-text:@common/assets/styles/index.scss'

declare global {
  interface Window {
    gmail: Gmail
    dataLayer: Array<any>
    gtag: (a: string, b: any, c?: any) => void
  }
}

export const config: PlasmoCSConfig = {
  matches: ['*://mail.google.com/*'],
}

window.addEventListener('load', () => {
  console.log('REVISION LOAD OBSERVER')
  const GmailFactory = require('gmail-js')
  const gmail = new GmailFactory.Gmail() as Gmail

  console.log('styles', styles)

  function runApp(rootMount: Element, updateHandler: (text: string) => void) {
    const Root = () => <App mode="embedded" onUpdate={updateHandler} />

    const rootElement = document.createElement('div')
    rootElement.id = 'gmailRoot'
    rootMount.appendChild(rootElement)

    const root = createRoot(rootElement)
    const composeElement = document.querySelector('[g_editable="true"]')

    if (composeElement) {
      const shadowRoot = composeElement.attachShadow({ mode: 'open' })
      shadowRoot.innerHTML = `<style>${styles}</style>`
      shadowRoot.appendChild(rootElement)
      root.render(<Root />)
    }

    reportWebVitals()
  }

  function composeHandler(compose: GmailDomCompose, type: GmailComposeType) {
    const $el = compose.$el
    let signatureHTML = ''

    const bodyId = setInterval(() => {
      if (!compose.body()) return
      clearInterval(bodyId)
      const updateHandler = (text: string) => window.gmail.dom.compose($el).body(text + signatureHTML)
      runApp(document.body, updateHandler)
    }, 500)
  }

  gmail.observe.on('compose', composeHandler)
})
