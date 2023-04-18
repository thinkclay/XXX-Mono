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
  const frameSidebar = document.getElementById('frameSidebar');
  const iframeDocument = frameSidebar?.contentDocument;
  if (iframeDocument) {
    const title = iframeDocument.querySelector('[title="behavior.BehaviorManagement"]');
    if (title) {
      title.addEventListener('click', () => {
        setTimeout(() => {
          const frameWorkspaceHeader = document.getElementById('frameWorkspace');
          const workspaceDocumentHeader = frameWorkspaceHeader?.contentDocument;
          if (workspaceDocumentHeader) {
            const frameWorkspaceWrapper = workspaceDocumentHeader.getElementById('frameWorkspaceWrapper');
            const workspaceDocumentWrapper = frameWorkspaceWrapper?.contentDocument;
            if (workspaceDocumentWrapper) {
              const frameWorkspaceHeaderWarper = workspaceDocumentWrapper.getElementById('frameWorkspaceHeader');
              const workspaceDocumentWrap = frameWorkspaceHeaderWarper?.contentDocument;
              const newButton = workspaceDocumentWrap?.getElementById('newDiv');
              newButton.addEventListener('click', () => {
                setTimeout(() => {
                  const frameWorkspaceFooterDetails = workspaceDocumentWrapper.getElementById('frameWorkspaceDetail');
                  const workspaceDocumentFooter = frameWorkspaceFooterDetails?.contentDocument;
                  if (workspaceDocumentFooter) {
                    const detailFrame = workspaceDocumentFooter?.getElementById('detailFrame');
                    const detailsFrame = detailFrame?.contentDocument;
                    if (detailsFrame) {
                      const descriptionField = detailsFrame?.getElementById('description');
                      if (descriptionField) {
                        descriptionField.addEventListener('click', () => {
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
                  }
                }, 2000)
              })
            }
          }

        }, 2000)

      })
    }
  }


})



function runApp(rootMount: Element, updateHandler: (text: string) => void) {
  const rootElement = document.createElement('div');
  rootElement.id = 'description';
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
