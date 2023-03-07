/** @format */

import type { PlasmoCSConfig } from 'plasmo'
import jQuery from 'jquery'
import React, { CSSProperties } from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import MainScreen from '@common/views/MainScreen'
import reportWebVitals from '@common/reportWebVitals'

import '@common/assets/styles/index.scss'

export const config: PlasmoCSConfig = {
  matches: ['*://mail.google.com/*'],
  run_at: 'document_start',
}

window.addEventListener('load', () => {
  console.log('Gmail React Injection Content Script', window._gmailjs, jQuery)

  const loaderId = setInterval(() => {
    if (!window._gmailjs) {
      console.log('!window._gmailjs not defined')
      return
    }

    clearInterval(loaderId)
    startExtension(window._gmailjs)
  }, 100)

  function startExtension(gmail) {
    console.log('Extension loading...')
    window.gmail = gmail

    gmail.observe.on('load', () => {
      const userEmail = gmail.get.user_email()
      console.log('Hello, ' + userEmail + '. This is your extension talking!')

      gmail.observe.on('view_email', domEmail => {
        console.log('Looking at email:', domEmail)
        const emailData = gmail.new.get.email_data(domEmail)
        console.log('Email data:', emailData)
      })

      gmail.observe.on('compose', (compose, type) => {
        const el = compose.$el[0]

        console.log('api.dom.compose object:', compose)

        const bodyId = setInterval(() => {
          if (!compose.body()) return

          clearInterval(bodyId)

          const $editor = jQuery('.editable').first()
          const $parent = $editor.parentsUntil('.GP').parent()
          // const $parent = $editor.parentsUntil('table').parentsUntil('table')

          const styles: CSSProperties = {
            background: '#fff',
            height: $parent.height() || 400,
            overflow: 'scroll',
            position: 'absolute',
            zIndex: '999',
            marginTop: '-10px',
            ...$editor.offset(),
            width: $parent.width() || 500,
          }

          const onUpdate = (text: string) => gmail.dom.compose(el).body(text)

          runApp($parent[0], styles, onUpdate)
        }, 500)

        // runApp(jQuery('.editable')[0])

        // console.log('Setting body: ', gmail.dom.compose(el).to('test@test.com'))

        // console.log('To: ', compose.to('test@test.com'))
        // console.log('Body: ', compose.body('Test'))
        // runApp()
      })
    })
  }
})

function runApp(mount: Element, styles: CSSProperties, onUpdate: (text: string) => void) {
  const rootElement = document.createElement('div')
  rootElement.id = 'root'
  // const mount = document.querySelector('.editable')
  document.body.appendChild(rootElement)

  // console.log('Mount point', mount)
  // mount?.appendChild(rootElement)

  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <RecoilRoot>
      <React.StrictMode>
        <div id="RevisionApp" style={styles}>
          <MainScreen mode="embedded" onUpdate={onUpdate} />
        </div>
      </React.StrictMode>
    </RecoilRoot>
  )

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals()
}
