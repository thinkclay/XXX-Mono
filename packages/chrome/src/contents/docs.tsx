/** @format */

import type { PlasmoCSConfig } from 'plasmo';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import MainScreen from '@common/views/screens/MainScreen';
import reportWebVitals from '@common/reportWebVitals';
import '@common/assets/styles/index.scss';
import Popup from '../../../common/src/views/components/RevisionPopup'

export const config: PlasmoCSConfig = {
  matches: ['*://docs.google.com/*'],
  run_at: 'document_start',
}

const processedContentSet = new Set()
function sendApiRequest(content) {
  if (!processedContentSet.has(content)) {
    processedContentSet.add(content)
    var payload = {
      input: content,
    }

    fetch('https://revisioned.herokuapp.com/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(response => response.json())
  }
}

function getDataFromDocs(get_fetch_url) {
  var accessToken =
    'ya29.a0AfB_byA_OfqaznweyNL1FpZQdLzgppsi_yMC32cV7n2dfOdz_-kNNY1sx7LPB4p43eKd-o7JXKmJcXo4cviTTCOrz0AsHXTS7EFNfmeQvwi7eWuSoW3em5DtYx1KslmdWmYQADu8kkl1sKCfSgimlgvPBBzxo2Y3cVmY7h0aCgYKAd0SARESFQHsvYlsmeRtdhaV9ps0rRCFBOr_5Q0174'
  fetch(get_fetch_url, {
    method: 'GET',
    headers: new Headers({
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    }),
  })
    .then(res => res.json())
    .then(document => {
      if (document.body && document.body.content) {
        const content = document.body.content
        content.forEach(element => {
          if (element.paragraph && element.paragraph.elements) {
            element.paragraph.elements.forEach(el => {
              if (el.textRun && el.textRun.content) {
                sendApiRequest(el.textRun.content)
              }
            })
          }
        })
      } else {
        console.log('Document content not found.')
      }
    })
    .catch(error => {
      console.error('Error retrieving document content:', error)
    })
}

// sidebar
window.addEventListener('load', () => {
  const docTitle: any = document.getElementById("docs-extensions-menu")
  docTitle.addEventListener('click', () => {
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
  const intervalId = setInterval(() => {
    const iframe = document.getElementById('docs-editor-container');
    if (iframe) {
      clearInterval(intervalId)
      const canvas = document.querySelector('.kix-page-paginated.canvas-first-page')
      if (canvas) {
        runPopup(canvas);
      }
    }
  }, 500)
  const url = window.location.pathname
  const startIndex = url.indexOf('/d/') + 3
  const endIndex = url.indexOf('/edit', startIndex)
  const documentId = url.substring(startIndex, endIndex)
  var get_fetch_url = `https://docs.googleapis.com/v1/documents/${documentId}`
  setInterval(() => getDataFromDocs(get_fetch_url), 3000)
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

function runPopup(rootMount: Element) {
  const rootElement = document.createElement('div')
  rootElement.id = 'docRoot'
  rootMount.appendChild(rootElement)
  const root = createRoot(rootElement)
  root.render(<Popup />)
  reportWebVitals()
}
