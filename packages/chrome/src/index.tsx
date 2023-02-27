/** @format */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import App from '@common/views/App'
import reportWebVitals from '@common/reportWebVitals'

import '@common/assets/styles/global.css'

const rootElement = document.createElement('div')
rootElement.id = 'root'
document.body.appendChild(rootElement)

chrome.identity.getAuthToken({ interactive: true }, function (token) {
  // Use the token.
})

// chrome.identity.getAuthToken({ interactive: true }, token => {
//   if (chrome.runtime.lastError || !token) {
//     alert(`SSO ended with an error: ${JSON.stringify(chrome.runtime.lastError)}`)
//     return
//   }
//   signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
//     .then(res => {
//       console.log('signed in!')
//     })
//     .catch(err => {
//       alert(`SSO ended with an error: ${err}`)
//     })
// })

const root = ReactDOM.createRoot(rootElement)
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <App mode="extension" />
    </React.StrictMode>
  </RecoilRoot>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
