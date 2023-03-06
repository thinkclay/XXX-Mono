/** @format */

import 'gmail-js'

declare global {
  interface Window {
    _gmailjs: Gmail
    gmail: Gmail
  }
}
