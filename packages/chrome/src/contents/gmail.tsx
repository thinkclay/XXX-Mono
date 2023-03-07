/** @format */

import type { PlasmoCSConfig } from 'plasmo'
import jQuery from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import MainScreen from '@common/views/MainScreen'
import Close from '@common/views/Revise/Close'
import reportWebVitals from '@common/reportWebVitals'

import '@common/assets/styles/index.scss'

export const config: PlasmoCSConfig = {
  matches: ['*://mail.google.com/*'],
  run_at: 'document_start',
}

window.addEventListener('load', () => {
  console.log('Gmail React Injection Content Script', window.gmail, jQuery)

  const loaderId = setInterval(() => {
    if (!window.gmail) {
      console.log('!window._gmailjs not defined')
      return
    }

    clearInterval(loaderId)
    startExtension()
  }, 100)

  function startExtension() {
    window.gmail.observe.on('compose', composeHandler)
  }

  function composeHandler(compose: GmailDomCompose, type: GmailComposeType) {
    const $el = compose.$el

    const bodyId = setInterval(() => {
      if (!compose.body()) return

      clearInterval(bodyId)

      const $editor = jQuery('.editable').first()
      const $parent = $editor.parent()
      const updateHandler = (text: string) => window.gmail.dom.compose($el).body(text)

      runApp(document.body, $parent[0], updateHandler)
    }, 100)
  }
})

function runApp(rootMount: Element, iconMount: Element, updateHandler: (text: string) => void) {
  const rootElement = document.createElement('div')
  rootElement.id = 'gmailRoot'
  rootMount.appendChild(rootElement)

  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <RecoilRoot>
      <React.StrictMode>
        <div id="RevisionApp">
          <MainScreen mode="embedded" onUpdate={updateHandler} />
          <Close handler={() => rootElement.remove()} />
          <div className="Overlay visible" onClick={() => rootElement.remove()}></div>
        </div>
      </React.StrictMode>
    </RecoilRoot>
  )

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals()
}
