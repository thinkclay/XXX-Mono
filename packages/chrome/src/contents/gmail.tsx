/** @format */

import type { PlasmoCSConfig } from 'plasmo'
import { StrictMode } from 'react'
import { RecoilRoot } from 'recoil'
import { createRoot } from 'react-dom/client'

import { FirebaseApp, FirebaseAddons, FirebaseUserContext } from '@common/views/Contexts/FirebaseContext'
import App from '@common/views/App'
import EditorScreen from '@common/views/Screens/EditorScreen'
import reportWebVitals from '@common/reportWebVitals'

import 'gmail-js'

import styles from '@common/assets/styles/index.scss'

console.log('REVISION INIT')

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
  console.log('REVISION LISTENING')

  const GmailFactory = require('gmail-js')
  const gmail = new GmailFactory.Gmail() as Gmail

  function runApp(rootMount: Element, updateHandler: (text: string) => void) {
    console.log('REVISION RUN')
    // const Root = () => <App mode="embedded" onUpdate={updateHandler} />

    const rootElement = document.createElement('div')
    rootElement.id = 'gmailRoot'
    rootMount.appendChild(rootElement)

    const root = createRoot(rootElement)
    const composeElement = document.querySelector('[g_editable="true"]')

    if (composeElement) {
      const shadowRoot = composeElement.attachShadow({ mode: 'open' })
      shadowRoot.innerHTML = `<style>${styles}</style>`
      shadowRoot.appendChild(rootElement)
      /* <App mode="embedded" onUpdate={updateHandler} /> */
      const c = (
        <RecoilRoot>
          <StrictMode>
            <FirebaseApp>
              <FirebaseAddons>
                <FirebaseUserContext>
                  <div id="RevisionApp" className="gmail">
                    <EditorScreen mode="embedded" onUpdate={updateHandler} />
                  </div>
                </FirebaseUserContext>
              </FirebaseAddons>
            </FirebaseApp>
          </StrictMode>
        </RecoilRoot>
      )
      root.render(c)
    }

    reportWebVitals()
  }

  function composeHandler(compose: GmailDomCompose, type: GmailComposeType) {
    console.log('REVISION COMPOSE')
    const $el = compose.$el
    let signatureHTML = ''

    const bodyId = setInterval(() => {
      if (!compose.body()) return
      clearInterval(bodyId)
      const updateHandler = (text: string) => gmail.dom.compose($el).body(text + signatureHTML)
      console.log('REVISION COMPOSEHANDLER')
      runApp(document.body, updateHandler)
    }, 500)
  }

  gmail.observe.on('compose', composeHandler)
})
