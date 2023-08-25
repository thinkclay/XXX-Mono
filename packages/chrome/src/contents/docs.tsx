/** @format */

import type { PlasmoCSConfig } from 'plasmo'
import '@common/assets/styles/index.scss'

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

window.addEventListener('load', () => {
  const url = window.location.pathname
  const startIndex = url.indexOf('/d/') + 3
  const endIndex = url.indexOf('/edit', startIndex)
  const documentId = url.substring(startIndex, endIndex)
  var get_fetch_url = `https://docs.googleapis.com/v1/documents/${documentId}`
  setInterval(() => getDataFromDocs(get_fetch_url), 3000)
})
