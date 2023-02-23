/** @format */

import React from 'react'
import ReactDOM from 'react-dom/client'

import '@common/assets/styles/global.css'
import App from '@common/views/App'
import reportWebVitals from '@common/reportWebVitals'

const rootElement = document.createElement('div')
rootElement.id = 'root'
document.body.appendChild(rootElement)

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
