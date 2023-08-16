/** @format */

import type { PlasmoCSConfig } from 'plasmo';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import MainScreen from '@common/views/screens/MainScreen';
import reportWebVitals from '@common/reportWebVitals';
import '@common/assets/styles/index.scss';

export const config: PlasmoCSConfig = {
  matches: ['*://docs.google.com/*'],
  run_at: 'document_start',
}

window.addEventListener('load', () => {
  const titl1: any = document.getElementById("docs-extensions-menu")
  titl1.addEventListener('click', () => {
    const intervalId = setInterval(() => {
      const title: any = document.querySelector(".script-application-sidebar-title")
      const docRoot: any = document.querySelector("#docRoot")
      if (title && title?.textContent.trim() === 'Revision') {
        if (!docRoot) {
          let selector: any = document.querySelector('.script-application-sidebar-content')
          if (selector) {
            const iframe = selector.querySelector('iframe');
            if (iframe) {
              runApp(iframe);
              clearInterval(intervalId);
            }
          }
        }
      } else {
        if (docRoot) {
          docRoot.remove()
        }
      }
    }, 500)
  })
})

function runApp(rootMount: Element) {
  const App = () => (
    <RecoilRoot>
      <StrictMode>
        <div id="RevisionApp" className="google-docs">
          <MainScreen mode="embedded" />
        </div>
      </StrictMode>
    </RecoilRoot>
  )

  const rootElement = document.createElement("div")
  rootElement.id = 'docRoot'
  rootMount.replaceWith(rootElement)
  const root = createRoot(rootElement)
  root.render(<App />)
  reportWebVitals()
}