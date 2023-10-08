/** @format */

import type { PlasmoCSConfig } from 'plasmo'
import { createRoot } from 'react-dom/client'

import MainScreen from '@common/views/screens/MainScreen'
import reportWebVitals from '@common/reportWebVitals'
import Popup from '../../../common/src/views/components/RevisionPopup'
import '@common/assets/styles/index.scss'

export const config: PlasmoCSConfig = {
  matches: ['*://docs.google.com/*'],
  run_at: 'document_start',
}

const processedContentSet = new Set()

async function sendApiRequest(content: any) {
  if (!processedContentSet.has(content)) {
    processedContentSet.add(content)

    const payload = {
      input: content,
    }

    try {
      const response = await fetch('https://revisioned.herokuapp.com/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      // Handle data as needed
    } catch (error) {
      console.error('Error sending API request:', error)
    }
  }
}

async function getDataFromDocs(get_fetch_url: any) {
  const accessToken =
    'ya29.a0AfB_byA_OfqaznweyNL1FpZQdLzgppsi_yMC32cV7n2dfOdz_-kNNY1sx7LPB4p43eKd-o7JXKmJcXo4cviTTCOrz0AsHXTS7EFNfmeQvwi7eWuSoW3em5DtYx1KslmdWmYQADu8kkl1sKCfSgimlgvPBBzxo2Y3cVmY7h0aCgYKAd0SARESFQHsvYlsmeRtdhaV9ps0rRCFBOr_5Q0174'

  try {
    const response = await fetch(get_fetch_url, {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      }),
    })

    const document = await response.json()

    if (document.body && document.body.content) {
      const content = document.body.content
      content.forEach((element: any) => {
        if (element.paragraph && element.paragraph.elements) {
          element.paragraph.elements.forEach((el: any) => {
            if (el.textRun && el.textRun.content) {
              sendApiRequest(el.textRun.content)
            }
          })
        }
      })
    } else {
      console.log('Document content not found.')
    }
  } catch (error) {
    console.error('Error retrieving document content:', error)
  }
}

function runApp(rootMount: Element) {
  const App = () => <MainScreen mode="embedded" className="google-docs" />

  const rootElement = document.createElement('div')
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

function init() {
  const docTitle = document.getElementById('docs-extensions-menu')
  docTitle?.addEventListener('click', () => {
    const intervalId = setInterval(() => {
      const title = document.querySelector('.script-application-sidebar-title')
      const docRoot = document.querySelector('#docRoot')
      if (title && title.textContent) {
        title.textContent.trim() === 'Revision'
        if (!docRoot) {
          const selector = document.querySelector('.script-application-sidebar-content')
          if (selector) {
            const iframe = selector.querySelector('iframe')
            if (iframe) {
              runApp(iframe)
              clearInterval(intervalId)
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
    const iframe = document.getElementById('docs-editor-container')
    if (iframe) {
      clearInterval(intervalId)
      const canvas = document.querySelector('.kix-page-paginated.canvas-first-page')
      if (canvas) {
        runPopup(canvas)
      }
    }
  }, 500)

  const url = window.location.pathname
  const startIndex = url.indexOf('/d/') + 3
  const endIndex = url.indexOf('/edit', startIndex)
  const documentId = url.substring(startIndex, endIndex)
  const get_fetch_url = `https://docs.googleapis.com/v1/documents/${documentId}`
  setInterval(() => getDataFromDocs(get_fetch_url), 3000)
}

window.addEventListener('load', init)
