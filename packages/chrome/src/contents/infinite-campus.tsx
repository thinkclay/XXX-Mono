/** @format */

import type { PlasmoCSConfig } from 'plasmo';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import MainScreen from '@common/views/MainScreen';
import Close from '@common/views/Revise/Close';
import reportWebVitals from '@common/reportWebVitals';
import { Editor } from '@tiptap/react'
import '@common/assets/styles/index.scss';

export const config: PlasmoCSConfig = {
  matches: ['*://nycloud1.infinitecampus.org/*'],
  run_at: 'document_start',
}
let closed = false;
const BehaviorPopUp = (() => {
  const intervalId = setInterval(() => {
    const workspaceDocumentHeader = document.getElementById('frameWorkspace')?.contentWindow.document.getElementById('frameWorkspaceWrapper')?.contentWindow.document.getElementById('frameWorkspaceHeader')?.contentDocument
    const newButton = workspaceDocumentHeader?.getElementById('newDiv')
    if (workspaceDocumentHeader && newButton) {
      clearInterval(intervalId);
      newButton?.addEventListener('click', () => {
        closed = false;
        const intervalId2 = setInterval(() => {
          const workspaceDocumentFooter = document.getElementById('frameWorkspace')?.contentWindow.document.getElementById('frameWorkspaceWrapper')?.contentWindow.document.getElementById('frameWorkspaceDetail')?.contentWindow.document.getElementById('detailFrame')?.contentDocument
          const descriptionField = workspaceDocumentFooter?.getElementById('description');
          if (workspaceDocumentFooter && descriptionField) {
            clearInterval(intervalId2);
            const intervalId3 = setInterval(() => {
              if (descriptionField) {
                clearInterval(intervalId3)
                descriptionField?.addEventListener('click', () => {
                  if (!closed) {
                    var updateHandler = (text: string) => {
                      var newText = text.replace(/<\/?[^>]+>/gi, ' ');
                      descriptionField.value = newText;
                      const event = new Event('input', { bubbles: true });
                      descriptionField.dispatchEvent(event);
                    };
                    runApp(document.body, updateHandler, descriptionField.value);
                  }
                });
              }
            }, 500)
          }
        }, 500);
      });
    }
  }, 500);
});

window.addEventListener('load', () => {
  console.log("infinitecampus")
  const intervalId2 = setInterval(() => {
    const selector = document.getElementById('frameWorkspace')?.contentWindow.document.getElementById('frameWorkspaceWrapper')?.contentWindow.document.getElementById('frameWorkspaceDetail')?.contentWindow.document.getElementById('frameWorkspaceDetail')?.contentWindow.document.getElementById('instruction-wrapper-iframe')?.contentDocument
    if (selector) {
      let allComment = selector.querySelectorAll('.cannedComment')
      for (let itm of allComment) {
        itm.addEventListener("click", function () {
          closed = false;
          setTimeout(function () {
            let textBox = selector.querySelector('[name="cannedForm"] .cannedComment');
            if (textBox) {
              textBox?.addEventListener('click', function () {
                if (!closed) {
                  var updateHandler = (text: string) => {
                    var newText = text.replace(/<\/?[^>]+>/gi, ' ');
                    textBox.value = newText;
                  };
                  runApp(document.body, updateHandler, textBox.value);
                }

              });
            }
          }, 1000)
        })
      }
      if (allComment.length > 1) clearInterval(intervalId2)
    }
  }, 500);


  const iframeDocument = document.getElementById('frameSidebar')?.contentDocument
  if (iframeDocument) {
    const interval = setInterval(() => {
      const BehaviorManagement = iframeDocument.querySelector('[title="behavior.BehaviorManagement"]');
      const BehaviorReferral = iframeDocument.querySelector('[title="behavior.BehaviorReferral"]');
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
      if (BehaviorManagement && BehaviorReferral)
        clearInterval(interval);

    }, 100)
  }
})
const handleKeyDown = (event: any, editor: Editor) => {
  if (event.key === "Backspace") {
    const { from, to } = editor.state.selection;
    if (from === to && from > 0) {
      editor.commands.deleteRange({ from: from - 1, to });
      editor.view.focus();
    }
  }
};

function runApp(rootMount: Element, updateHandler: (text: string) => void, defaultText: string | undefined) {
  const rootElement = document.createElement('div');
  rootElement.id = 'gmailRoot';
  rootMount.appendChild(rootElement);

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <RecoilRoot>
      <StrictMode>
        <div id="RevisionApp" className='infinite-campus'>
          <MainScreen mode="embedded" onUpdate={updateHandler} defaultValue={defaultText} handleKeyDown={handleKeyDown} />
          <Close handler={() => {
            closed = true;
            rootElement.remove()
          }} />
          <div className="Overlay visible" onClick={() => rootElement.remove()}></div>
        </div>
      </StrictMode>
    </RecoilRoot>
  );

  reportWebVitals();
}