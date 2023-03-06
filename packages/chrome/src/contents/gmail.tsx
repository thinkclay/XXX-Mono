/** @format */

import type { PlasmoCSConfig } from 'plasmo'
import jQuery from 'jquery'
import React from 'react'
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
        console.log('api.dom.compose object:', compose, el.clientHeight)
        // console.log('api.dom.compose children', el.children)
        // console.log('api.dom.compose editor', jQuery(el))

        const bodyId = setInterval(() => {
          if (!compose.body()) return

          clearInterval(bodyId)

          const $editor = jQuery('.editable').first()

          compose.body('')

          runApp($editor[0])
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

function runApp(mount: Element) {
  const rootElement = document.createElement('div')
  rootElement.id = 'root'
  // const mount = document.querySelector('.editable')
  // document.body.appendChild(rootElement)

  console.log('Mount point', mount)
  mount?.appendChild(rootElement)

  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <RecoilRoot>
      <React.StrictMode>
        <div id="RevisionApp">
          <MainScreen mode="embedded" />
        </div>
      </React.StrictMode>
    </RecoilRoot>
  )

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals()
}
