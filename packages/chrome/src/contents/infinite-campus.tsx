/** @format */

import type { PlasmoCSConfig } from 'plasmo'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import MainScreen from '@common/views/screens/MainScreen'
import reportWebVitals from '@common/reportWebVitals'
import Close from './Close'

import { Editor } from '@tiptap/react'
import '@common/assets/styles/index.scss'

export const config: PlasmoCSConfig = {
  matches: ['*://nycloud1.infinitecampus.org/*'],
  run_at: 'document_start',
}

let closed = false

const workspace: HTMLIFrameElement = document.getElementById('frameWorkspace') as HTMLIFrameElement
const wrapper = workspace.contentWindow?.document.getElementById('frameWorkspaceWrapper') as HTMLIFrameElement
const detail = workspace.contentWindow?.document.getElementById('frameWorkspaceDetail') as HTMLIFrameElement
const detail2 = detail?.contentWindow?.document.getElementById('frameWorkspaceDetail') as HTMLIFrameElement
const detail3 = detail.contentWindow?.document.getElementById('detailFrame') as HTMLIFrameElement
const instructionWrapper = detail2?.contentWindow?.document.getElementById('instruction-wrapper-iframe') as HTMLIFrameElement
const header = wrapper.contentWindow?.document.getElementById('frameWorkspaceHeader') as HTMLIFrameElement
const sidebar = document.getElementById('frameSidebar') as HTMLIFrameElement

function BehaviorPopUp() {
  const intervalId = setInterval(() => {
    const workspaceDocumentHeader = header?.contentDocument
    const newButton = workspaceDocumentHeader?.getElementById('newDiv')

    if (workspaceDocumentHeader && newButton) {
      clearInterval(intervalId)
      newButton?.addEventListener('click', () => {
        closed = false
        const intervalId2 = setInterval(() => {
          const workspaceDocumentFooter = detail3?.contentDocument
          const descriptionField = workspaceDocumentFooter?.getElementById('description') as HTMLInputElement

          if (workspaceDocumentFooter && descriptionField) {
            clearInterval(intervalId2)
            const intervalId3 = setInterval(() => {
              if (descriptionField) {
                clearInterval(intervalId3)
                descriptionField?.addEventListener('click', () => {
                  if (!closed) {
                    var updateHandler = (text: string) => {
                      var newText = text.replace(/<\/?[^>]+>/gi, ' ')
                      descriptionField.value = newText
                      const event = new Event('input', { bubbles: true })
                      descriptionField.dispatchEvent(event)
                    }
                    runApp(document.body, updateHandler, descriptionField.value)
                  }
                })
              }
            }, 500)
          }
        }, 500)
      })
    }
  }, 500)
}

window.addEventListener('load', () => {
  console.log('infinitecampus')
  const intervalId2 = setInterval(() => {
    const selector = instructionWrapper?.contentDocument

    if (selector) {
      let allComment = selector.querySelectorAll('.cannedComment')
      for (let itm of allComment) {
        itm.addEventListener('click', function () {
          closed = false
          setTimeout(function () {
            let textBox = selector.querySelector('[name="cannedForm"] .cannedComment') as HTMLInputElement

            if (textBox) {
              textBox?.addEventListener('click', function () {
                if (!closed) {
                  var updateHandler = (text: string) => {
                    var newText = text.replace(/<\/?[^>]+>/gi, ' ')
                    textBox.value = newText
                  }
                  runApp(document.body, updateHandler, textBox.value)
                }
              })
            }
          }, 1000)
        })
      }
      if (allComment.length > 1) clearInterval(intervalId2)
    }
  }, 500)

  const iframeDocument = sidebar?.contentDocument
  if (iframeDocument) {
    const interval = setInterval(() => {
      const BehaviorManagement = iframeDocument.querySelector('[title="behavior.BehaviorManagement"]')
      const BehaviorReferral = iframeDocument.querySelector('[title="behavior.BehaviorReferral"]')
      if (BehaviorManagement) {
        BehaviorManagement?.addEventListener('click', () => {
          BehaviorPopUp()
        })
      }
      if (BehaviorReferral) {
        BehaviorReferral?.addEventListener('click', () => {
          BehaviorPopUp()
        })
      }
      if (BehaviorManagement && BehaviorReferral) clearInterval(interval)
    }, 100)
  }
})
const handleKeyDown = (event: any, editor: Editor) => {
  if (event.key === 'Backspace') {
    const { from, to } = editor.state.selection
    if (from === to && from > 0) {
      editor.commands.deleteRange({ from: from - 1, to })
      editor.view.focus()
    }
  }
}

function runApp(rootMount: Element, updateHandler: (text: string) => void, defaultText: string | undefined) {
  const rootElement = document.createElement('div')
  rootElement.id = 'gmailRoot'
  rootMount.appendChild(rootElement)

  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <RecoilRoot>
      <StrictMode>
        <div id="RevisionApp" className="infinite-campus">
          <MainScreen mode="embedded" onUpdate={updateHandler} content={defaultText} handleKeyDown={handleKeyDown} />
          <Close
            handler={() => {
              closed = true
              rootElement.remove()
            }}
          />
          <div className="Overlay visible" onClick={() => rootElement.remove()}></div>
        </div>
      </StrictMode>
    </RecoilRoot>
  )

  reportWebVitals()
}
