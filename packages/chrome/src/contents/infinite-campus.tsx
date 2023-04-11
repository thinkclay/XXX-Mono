/** @format */

import type { PlasmoCSConfig } from 'plasmo'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import MainScreen from '@common/views/MainScreen'
import Close from '@common/views/Revise/Close'
import reportWebVitals from '@common/reportWebVitals'

import '@common/assets/styles/index.scss'

export const config: PlasmoCSConfig = {
  matches: ['*://nycloud1.infinitecampus.org/*'],
  run_at: 'document_start',
}

function addRevisionEditor() {
    const descriptionField = document.getElementById('description')
  
    if (descriptionField instanceof HTMLInputElement) {
      descriptionField.addEventListener('click', () => {
        const updateHandler = (text: string) => {
          descriptionField.value = text
          const event = new Event('input', { bubbles: true })
          descriptionField.dispatchEvent(event)
        }
        runApp(document.body,updateHandler)
      })
    }
  }

function runApp(rootMount: Element, updateHandler: (text: string) => void) {
  const rootElement = document.createElement('div')
  rootElement.id = 'description'
  rootMount.appendChild(rootElement)

  const root = ReactDOM.createRoot(rootElement)
    
  root.render(
    <RecoilRoot>
      <StrictMode>
        <div id="RevisionApp">
          <MainScreen mode="embedded" onUpdate={updateHandler} />
          <Close handler={() => rootElement.remove()} />
          <div className="Overlay visible" onClick={() => rootElement.remove()}></div>
        </div>
      </StrictMode>
    </RecoilRoot>
  )

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals()
}
addRevisionEditor()
