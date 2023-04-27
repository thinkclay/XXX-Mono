/** @format */

import type { PlasmoCSConfig } from 'plasmo';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import MainScreen from '@common/views/MainScreen';
import Close from '@common/views/Revise/Close';
import reportWebVitals from '@common/reportWebVitals';

import '@common/assets/styles/index.scss';

export const config: PlasmoCSConfig = {
  matches: ['*://nycloud1.infinitecampus.org/*'],
  run_at: 'document_start',
}

window.addEventListener('load', () => {
  console.log("infinitecampus")
  const iframeDocument = document.getElementById('frameSidebar')?.contentDocument
  if (iframeDocument) {
    setTimeout(() => {
      const title = iframeDocument.querySelector('[title="behavior.BehaviorManagement"]');
      if (title) {
        title?.addEventListener('click', () => {
          console.log("iframeDocument,title", iframeDocument, title)
          setTimeout(() => {
            const workspaceDocumentHeader = document.getElementById('frameWorkspace')?.contentWindow.document.getElementById('frameWorkspaceWrapper')?.contentWindow.document.getElementById('frameWorkspaceHeader').contentDocument
            const newButton = workspaceDocumentHeader?.getElementById('newDiv')
            console.log(workspaceDocumentHeader, newButton)
            if (workspaceDocumentHeader) {
              workspaceDocumentHeader?.addEventListener('click', () => {
                setTimeout(() => {
                  const workspaceDocumentFooter = document.getElementById('frameWorkspace')?.contentWindow.document.getElementById('frameWorkspaceWrapper')?.contentWindow.document.getElementById('frameWorkspaceDetail')?.contentWindow.document.getElementById('detailFrame').contentDocument
                  if (workspaceDocumentFooter) {
                    const descriptionField = workspaceDocumentFooter?.getElementById('description');
                    if (descriptionField) {
                      console.log(descriptionField, workspaceDocumentFooter)
                      descriptionField?.addEventListener('click', () => {
                        const updateHandler = (text: string) => {
                          var newText = text.replace(/<\/?[^>]+>/gi, ' ');
                          descriptionField.value = newText;
                          const event = new Event('input', { bubbles: true });
                          descriptionField.dispatchEvent(event);
                        };
                        runApp(document.body, updateHandler);
                      });
                    }
                  }
                }, 1000)
              })

            }
          }, 2000)
        })
      }
    }, 2000)

  }


})



function runApp(rootMount: Element, updateHandler: (text: string) => void) {
  const rootElement = document.createElement('div');
  rootElement.id = 'gmailRoot';
  rootMount.appendChild(rootElement);

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <RecoilRoot>
      <StrictMode>
        <div id="RevisionApp" className='infinite-campus'>
          <MainScreen mode="embedded" onUpdate={updateHandler} />
          <Close handler={() => rootElement.remove()} />
          <div className="Overlay visible" onClick={() => rootElement.remove()}></div>
        </div>
      </StrictMode>
    </RecoilRoot>
  );

  reportWebVitals();
}