/** @format */

import type { PlasmoCSConfig } from 'plasmo'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import MainScreen from '@common/views/screens/MainScreen'
import reportWebVitals from '@common/reportWebVitals'

import '@common/assets/styles/index.scss'

export const config: PlasmoCSConfig = {
  matches: ['*://mail.google.com/*'],
  run_at: 'document_start',
}

window.addEventListener('load', () => {
  const loaderId = setInterval(() => {
    if (!window.gmail) return

    clearInterval(loaderId)
    startExtension()
  }, 100)

  function startExtension() {
    window.gmail.observe.on('compose', composeHandler)
    window.gmail.observe.on('load', loadHandler)
  }

  function loadHandler() {
    console.log('Email', window.gmail.get.user_email())
  }

  function composeHandler(compose: GmailDomCompose, type: GmailComposeType) {
    const $el = compose.$el
    let signatureHTML = ''
    const bodyId = setInterval(() => {
      if (!compose.body()) return
      clearInterval(bodyId)
      const updateHandler = (text: string) => window.gmail.dom.compose($el).body(text + signatureHTML)
      runApp(document.body, updateHandler)
    }, 100)
  }
})

function runApp(rootMount: Element, updateHandler: (text: string) => void) {
  const App = () => (
    <RecoilRoot>
      <StrictMode>
        <div id="RevisionApp">
          <MainScreen mode="embedded" onUpdate={updateHandler} />
        </div>
      </StrictMode>
    </RecoilRoot>
  )

  const rootElement = document.createElement('div')
  rootElement.id = 'gmailRoot'
  rootMount.appendChild(rootElement)

  const root = createRoot(rootElement)
  const composeElement = document.querySelector('[g_editable="true"]')

  if (!composeElement) return // Return if the compose element is not found

  const shadowRoot = composeElement.attachShadow({ mode: 'open' })
  shadowRoot.appendChild(rootElement)

  root.render(<App />)

  reportWebVitals()
}
