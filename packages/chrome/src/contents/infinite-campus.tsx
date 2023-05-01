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

const BehaviorPopUp = (() => {
  const intervalId = setInterval(() => {
    const workspaceDocumentHeader = document.getElementById('frameWorkspace')?.contentWindow.document.getElementById('frameWorkspaceWrapper')?.contentWindow.document.getElementById('frameWorkspaceHeader')?.contentDocument
    const newButton = workspaceDocumentHeader?.getElementById('newDiv')
    if (workspaceDocumentHeader && newButton) {
      clearInterval(intervalId);
      console.log(workspaceDocumentHeader, newButton, intervalId);
      newButton?.addEventListener('click', () => {
        const intervalId2 = setInterval(() => {
          const workspaceDocumentFooter = document.getElementById('frameWorkspace')?.contentWindow.document.getElementById('frameWorkspaceWrapper')?.contentWindow.document.getElementById('frameWorkspaceDetail')?.contentWindow.document.getElementById('detailFrame')?.contentDocument
          if (workspaceDocumentFooter) {
            clearInterval(intervalId2);
            console.log(workspaceDocumentFooter, intervalId2)
            const intervalId3 = setInterval(() => {
              const descriptionField = workspaceDocumentFooter?.getElementById('description');
              if (descriptionField) {
                clearInterval(intervalId3)
                console.log(descriptionField, intervalId3)
                descriptionField?.addEventListener('click', () => {
                  const updateHandler = (text: string) => {
                    var newText = text.replace(/<\/?[^>]+>/gi, ' ');
                    descriptionField.value = newText;
                    const event = new Event('input', { bubbles: true });
                    descriptionField.dispatchEvent(event);
                  };
                  runApp(document.body, updateHandler, descriptionField.value);
                });
              }
            }, 500)
          }
        }, 500);
      });
    }
  }, 500);
});

const CoursePopUp = (() => {
  const intervalId = setInterval(() => {
    const workspaceDocumentHeader = document.getElementById('frameWorkspace')?.contentWindow.document.getElementById('frameWorkspaceWrapper')?.contentWindow.document.getElementById('frameWorkspaceHeader')?.contentDocument
    const guestGradeBookLink = workspaceDocumentHeader?.querySelector('a[aria-label="Guest Grade Book"]');
    if (workspaceDocumentHeader && guestGradeBookLink)
      clearInterval(intervalId);
    console.log(intervalId, guestGradeBookLink, workspaceDocumentHeader);
    guestGradeBookLink?.addEventListener('click', () => {
      const intervalId2 = setInterval(() => {
        const workspaceDocumentFooter = document.getElementById('frameWorkspace')?.contentWindow.document.getElementById('frameWorkspaceWrapper')?.contentWindow.document.getElementById('frameWorkspaceDetail')?.contentWindow.document.getElementById('frameWorkspaceDetail')?.contentWindow.document.getElementById('instruction-wrapper-iframe')?.contentDocument
        if (workspaceDocumentFooter) {
          clearInterval(intervalId2);
          console.log(intervalId2, workspaceDocumentFooter)
          const intervalId3 = setInterval(() => {
            const ccLink = workspaceDocumentFooter?.querySelector('.cannedComment');
            if (ccLink) { clearInterval(intervalId3); }
            console.log(ccLink)
            ccLink?.addEventListener('click', function () {
              // perform your event here  
              console.log('CC link clicked');
            });
          }, 500)

        }
      }, 500)
    });
  }, 500)
})
window.addEventListener('load', () => {
  console.log("infinitecampus")
  const iframeDocument = document.getElementById('frameSidebar')?.contentDocument
  if (iframeDocument) {

    setTimeout(() => {
      const BehaviorManagement = iframeDocument.querySelector('[title="behavior.BehaviorManagement"]');
      const BehaviorReferral = iframeDocument.querySelector('[title="behavior.BehaviorReferral"]');
      const Curriculum = iframeDocument.querySelector('[title="curriculum.Course.ToolSet"]');
      const Scheduling = iframeDocument.querySelector('[title="scheduling.Section.ToolSet"]');
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
      if (Curriculum) {
        Curriculum?.addEventListener('click', () => {
          CoursePopUp()
        })
      }
      if (Scheduling) {
        Scheduling?.addEventListener('click', () => {
          CoursePopUp()
        })
      }
    }, 2000)
  }


})



function runApp(rootMount: Element, updateHandler: (text: string) => void, defaultText: string | undefined) {
  const rootElement = document.createElement('div');
  rootElement.id = 'gmailRoot';
  rootMount.appendChild(rootElement);

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <RecoilRoot>
      <StrictMode>
        <div id="RevisionApp" className='infinite-campus'>
          <MainScreen mode="embedded" onUpdate={updateHandler} defaultValue={defaultText} />
          <Close handler={() => rootElement.remove()} />
          <div className="Overlay visible" onClick={() => rootElement.remove()}></div>
        </div>
      </StrictMode>
    </RecoilRoot>
  );

  reportWebVitals();
}