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
  console.log('Load site');
  console.log('platform is working', document);
  const frameSidebar = document.getElementById('frameSidebar');
  const iframeDocument = frameSidebar?.contentDocument;
  if (iframeDocument) {
    console.log('mli gy id', iframeDocument.getElementById('aside'));
    const title = iframeDocument.querySelector('[title="behavior.BehaviorManagement"]');
    if (title) {
      console.log('mli gy id title', title);
      title.addEventListener('click', () => {
        console.log('on CLicking');
        setTimeout(() => {
          const frameWorkspaceHeader = document.getElementById('frameWorkspace');
          const workspaceDocumentHeader = frameWorkspaceHeader?.contentDocument;
          console.log("hayehaye mli gyu", workspaceDocumentHeader);
          if (workspaceDocumentHeader) {
            const frameWorkspaceWrapper = workspaceDocumentHeader.getElementById('frameWorkspaceWrapper');
            const workspaceDocumentWrapper = frameWorkspaceWrapper?.contentDocument;
            if (workspaceDocumentWrapper) {
              const frameWorkspaceHeaderWarper = workspaceDocumentWrapper.getElementById('frameWorkspaceHeader');
              const workspaceDocumentWrap = frameWorkspaceHeaderWarper?.contentDocument;
              const newButton = workspaceDocumentWrap?.getElementById('newDiv');
              console.log("newButton mli gyu", newButton, workspaceDocumentWrap);
              newButton.addEventListener('click', () => {
                console.log('on CLicking new');
                setTimeout(() => {
                  const frameWorkspaceFooterDetails = workspaceDocumentWrapper.getElementById('frameWorkspaceDetail');
                  const workspaceDocumentFooter = frameWorkspaceFooterDetails?.contentDocument;
                  console.log("newButton mli gyu details", frameWorkspaceFooterDetails, workspaceDocumentFooter);
                  if (workspaceDocumentFooter) {
                    const detailFrame = workspaceDocumentFooter?.getElementById('detailFrame');
                    const detailsFrame = detailFrame?.contentDocument;
                    console.log("DetailsFields mli gyu details", detailFrame, detailsFrame);
                    if (detailsFrame) {
                      const descriptionField = detailsFrame?.getElementById('description');
                      console.log(descriptionField)
                      if (descriptionField) {
                        console.log('mli gy id finaliy 😊😊😊', descriptionField);
                        descriptionField.addEventListener('click', () => {
                          console.log("clicking by me 😒")
                          const updateHandler = (text: string) => {
                            console.log("clicking by me 😍")
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
                }, 3000)
              })
            }
          }

        }, 3000)

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
