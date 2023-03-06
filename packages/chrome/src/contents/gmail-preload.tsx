/** @format */

import type { PlasmoCSConfig } from 'plasmo'

export const config: PlasmoCSConfig = {
  matches: ['*://mail.google.com/*'],
  run_at: 'document_start',
}

const GmailFactory = require('gmail-js')
const jQuery = require('jquery')

window._gmailjs = window._gmailjs || new GmailFactory.Gmail(jQuery)

window.addEventListener('DOMContentLoaded', () => {
  console.log('Gmail Preloader Content Script')
})
