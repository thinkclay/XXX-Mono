/** @format */

import type { PlasmoCSConfig } from 'plasmo'

export const config: PlasmoCSConfig = {
  matches: ['*://mail.google.com/*'],
  run_at: 'document_end',
}

window.addEventListener('load', () => {
  console.log('Gmail React Injection Content Script')

  const loaderId = setInterval(() => {
    if (!window._gmailjs) {
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
        console.log('api.dom.compose object:', compose, 'type is:', type)
        // console.log('To: ', compose.to('test@test.com'))
        console.log('Body: ', compose.body('Test'))
        // runApp()
      })
    })
  }
})

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import MainScreen from '@common/views/MainScreen'
import reportWebVitals from '@common/reportWebVitals'

import '@common/assets/styles/index.scss'

function runApp() {
  const rootElement = document.createElement('div')
  rootElement.id = 'root'
  const mount = document.querySelector('.editable')
  // document.body.appendChild(rootElement)

  console.log('Mount point', mount)
  mount?.appendChild(rootElement)

  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <RecoilRoot>
      <React.StrictMode>
        <div id="RevisionApp">
          <MainScreen screen={{ mode: 'embedded' }} />
        </div>
      </React.StrictMode>
    </RecoilRoot>
  )

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals()
}
