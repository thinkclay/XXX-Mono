/** @format */

import type { PlasmoCSConfig } from 'plasmo';
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import 'gmail-js';
import React, { RecoilRoot } from 'recoil';
import MainScreen from '@common/views/screens/MainScreen';
import reportWebVitals from '@common/reportWebVitals';
import '@common/assets/styles/index.scss';
import ModalPopup from '@common/views/components/demographicSelection';

declare global {
  interface Window {
    gmail: Gmail;
    dataLayer: Array<any>;
    gtag: (a: string, b: any, c?: any) => void;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    PLASMO_PUBLIC_GTAG_ID?: string;
  }
}

export const config: PlasmoCSConfig = {
  matches: ['*://mail.google.com/*'],
  run_at: 'document_start',
};

function openPopup() {
  const modalContainer = document.createElement('div');
  modalContainer.id = 'custom-modal-container';
  document.body.appendChild(modalContainer);
  const root = createRoot(modalContainer);
  root.render(<ModalPopup />);
}

function loadHandler() {
  console.log('Email', window.gmail.get.user_email());
}

function composeHandler(compose: GmailDomCompose, type: GmailComposeType) {
  const $el = compose.$el;
  let signatureHTML = '';

  const bodyId = setInterval(() => {
    if (!compose.body()) return;
    clearInterval(bodyId);
    const updateHandler = (text: string) => window.gmail.dom.compose($el).body(text + signatureHTML);
    runApp(document.body, updateHandler);
  }, 100);
}

function clickHandler(event: any, isPopupOpen: boolean, openPopup: () => void) {
  const target = event.target;
  if (target.closest('[aria-label="Message Body"]')) {
    if (!isPopupOpen) {
      openPopup();
    }
  }
}

function runApp(rootMount: Element, updateHandler: (text: string) => void) {
  const App = () => (
    <RecoilRoot>
      <StrictMode>
        <div id="RevisionApp">
          <MainScreen mode="embedded" onUpdate={updateHandler} />
        </div>
      </StrictMode>
    </RecoilRoot>
  );

  const rootElement = document.createElement('div');
  rootElement.id = 'gmailRoot';
  rootMount.appendChild(rootElement);

  const root = createRoot(rootElement);
  const composeElement = document.querySelector('[g_editable="true"]');

  if (composeElement) {
    const shadowRoot = composeElement.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
    <style>
    .formatting {
      background: #636363;
      height: 27px;
      line-height: 1;
      padding: 0 10px;
      display: flex;
      gap:10px;
      margin-top: 30px;
  }
  .action {
    display: inline-flex;
    justify-content: center;
    transition: background-color 0.2s;
  }
  button {
    background: transparent;
    border: none;
    margin: 0;
    padding: 0;
  }
  svg {
    height: 27px;
    width: 27px;
  }
  #RevisionApp .formatting .action .path {
    fill: #fdfdfd;
  }
  #RevisionApp .formatting .action.active .path {
    fill: #0eaf96;
  }
  .ProseMirror {
    background: #fff;
    border: none;
    color: #262626;
    direction: ltr;
    font-size: 14px;
    line-height: 1.85;
    margin: 0 auto;
    min-height: 500px;
    min-width: 500px;
    padding: 0;
    outline: none;
  }
  .Toolbar {
    align-items: center;
    background: #3d3d3d;
    display: flex;
    font-size: 10px;
    justify-content: space-between;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .actions {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    font-size: 12px;
  }
  #RevisionApp .Toolbar .actions button, #RevisionApp .Toolbar .actions .action {
    align-items: center;
    background: transparent;
    border: none;
    display: flex;
    height: 40px;
    line-height: 0;
    margin: 0 0 0 15px;
    position: relative;
    width: 40px;
  }
  #RevisionApp .Toolbar .actions .counter {
    background-color: #ff5c38;
    color: #000;
    display: block;
    font-weight: 700;
    padding: 6px;
    height: 12px;
    display: flex;
    align-items: center;
    border-radius: 6px;
  }
  #RevisionApp .Toolbar .actions .counter.bias {
    background-color: #fcf051;
  }
  #RevisionApp .Toolbar .actions button svg, #RevisionApp .Toolbar .actions .action svg {
    height: 20px;
    cursor: pointer;
  }
  #RevisionApp .Toolbar .actions button.rewrite .StrokeLayer, #RevisionApp .Toolbar .actions .action.rewrite .StrokeLayer {
    stroke: #fdfdfd;
    stroke-dasharray: 0;
    stroke-dashoffset: 0;
    stroke-width: 6px;
    transition: stroke 0.2s, stroke-width 0.3s;
  }
  #RevisionApp .Toolbar .actions button .FillLayer, #RevisionApp .Toolbar .actions .action .FillLayer {
    fill: #dcdcdc;
    transition: fill 0.25s;
  }
  #RevisionApp .Toolbar .actions :is(button, .action):hover > :first-child .StrokeLayer {
    stroke: #fcf051;
  }
  
  #RevisionApp .Toolbar .actions :is(button, .action):hover > :first-child .FillLayer {
    fill: #fcf051;
  }
  .version {
    color: #fff;
    font-size: 15px;
    margin-right: 15px;
  }
  #tippy-2{
      z-index: 9999;
      visibility: visible;
      position: absolute;
      inset: auto auto 0px 0px;
      margin: 0px;
      transform: translate3d(4.8px, -566.4px, 0px);
  }
  .tippy-box {
    background: #fff;
    border: 1px solid #dcdcdc;
    border-radius: 18px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    color: #fdfdfd;
    font-size: 15px;
    line-height: 1.65;
    overflow: hidden;
  }
  #RevisionApp .tippy-box .header, #RevisionApp .tippy-box .footer {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    font-size: 12px;
    line-height: 1.4;
  }
  
  #RevisionApp .tippy-box .footer {
    background: #f2f2f2;
  }
  
  #RevisionApp .tippy-box .header {
    background: #3d3d3d;
    padding: 2px;
  }
  #RevisionApp .tippy-box .header .message, #RevisionApp .tippy-box .footer .message {
    padding: 10px 15px;
  }
  #RevisionApp .tippy-box .close {
    margin: 0 10px;
  }
  #RevisionApp .tippy-box .action {
    cursor: pointer;
  }
  #RevisionApp .tippy-box .close svg {
    height: 16px;
    width: 16px;
  }
  #RevisionApp .tippy-box .close .path {
    fill: #bfbfbf;
  }
  #RevisionApp .tippy-box .close:hover .path {
    fill: #ff5c38;
  }
  #RevisionApp .tippy-box .close span {
    display: none;
  }
  #RevisionApp .tippy-box .suggestions {
    font-style: italic;
    margin: 0;
    padding: 0;
  }
  #RevisionApp .tippy-box .suggestions li {
    background-color: #fdfdfd;
    color: #262626;
    cursor: pointer;
    font-weight: 500;
    font-size: 12px;
    line-height: 1.4;
    margin: 0;
    padding: 8px 15px;
    transition: background-color 0.2s, color 0.2s;
  }
  #RevisionApp .tippy-box .suggestions li:hover {
    background-color: #8fdacf;
    color: #262626;
  }
  #RevisionApp .tippy-box .dictionary {
    align-items: center;
    display: flex;
    font-style: italic;
    margin: 10px;
  }
  #RevisionApp .tippy-box .dictionary svg {
    height: 22px;
    margin-right: 5px;
    width: 22px;
  }
  #RevisionApp .tippy-box .dictionary .path {
    fill: #ff5c38;
  }
  #RevisionApp .tippy-box .dictionary:hover .path {
    fill: #0eaf96;
  }
  #RevisionApp .language.misspelling, #RevisionApp .language.whitespace {
    border-color: #ff5c38;
  }
  #RevisionApp .language.misspelling:hover, #RevisionApp .language.misspelling::selection, #RevisionApp .language.whitespace:hover, #RevisionApp .language.whitespace::selection {
    background: #ffd9d1;
  }
  #RevisionApp .language.typographical, #RevisionApp .language.non-conformance, #RevisionApp .language.grammar {
    border-color: #ffb61a;
  }
  
  #RevisionApp .language {
    background: transparent;
    border-bottom: 2px solid #fcf051;
    transition: background 0.25s ease-in-out;
  }
  p + p {
    padding-top: 10px;
  }
  #RevisionApp .ButtonRow.shrink {
    width: -moz-fit-content;
    width: fit-content;
  }
  
  #RevisionApp .ButtonRow.centered {
    justify-content: space-around;
    margin: 0 auto;
  }
  #RevisionApp .ButtonRow {
    display: flex;
    justify-content: space-between;
    justify-items: space-between;
    padding: 15px 0;
  }
  #RevisionApp .button.accept {
    background-color: #0eaf96;
    border-color: #0eaf96;
  }
  #RevisionApp .button {
    align-items: center;
    background-color: #262626;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    color: #fdfdfd;
    cursor: pointer;
    display: flex;
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 0.5px;
    justify-content: center;
    padding: 12px 20px;
    text-align: center;
    text-decoration: none;
    text-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
    text-transform: uppercase;
    transition: border-color 0.2s, box-shadow 0.2s, color 0.2s, transform 0.2s;
    white-space: nowrap;
  }
  #RevisionApp .button.cancel {
    background-color: #a4a4a4;
  }
  #RevisionApp .ButtonRow button + button {
    margin-left: 15px;
  }
  #RevisionApp .button:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
  #RevisionApp .tone p.visible {
    visibility: visible;
    opacity: 1;
  }
  
  #RevisionApp .tone p {
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s;
    -webkit-user-select: none;
    user-select: none;
    font-size: 20px;
  }
  #RevisionApp .Toolbar .actions .tooltip::before {
    border-color: transparent transparent #fdfdfd transparent;
    border-style: solid;
    border-width: 6px;
    content: " ";
    left: 9px;
    margin-left: -5px;
    position: absolute;
    top: -12px;
  }
  #RevisionApp .Toolbar .actions .tooltip {
    background: #fdfdfd;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    display: flex;
    left: 0;
    line-height: 1.65;
    opacity: 0;
    padding: 15px;
    position: absolute;
    text-align: left;
    top: -100vh;
    min-width: 250px;
    transition: opacity 0.3s;
    width: 100%;
    z-index: -1;
  }
  #RevisionApp .Toolbar .actions button.active .tooltip, #RevisionApp .Toolbar .actions .action.active .tooltip {
    opacity: 1;
    top: 40px;
    z-index: 50;
  }
  #RevisionApp .Toolbar .actions .reload.fetching svg,
  #RevisionApp .Toolbar .actions .rewrite.fetching .StrokeLayer {
    animation: spin infinite 2s linear;
  }
  #RevisionApp .tone.fetching svg {
    animation: spin infinite 2s linear;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }
  
  #RevisionApp .Toolbar .actions .reload.fetching svg,
  #RevisionApp .Toolbar .actions .rewrite.fetching .StrokeLayer {
    animation: spin infinite 2s linear;
  }
  #RevisionApp .Toolbar .actions .rewrite.fetching .StrokeLayer {
    animation: fetching 10s linear infinite;
    stroke-dasharray: 145;
    stroke: #fcf051;
  }
  #RevisionApp .tone.fetching svg {
    animation: spin infinite 2s linear;
  }
  
  @keyframes fetching {
    0% {
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dashoffset: 300;
    }
  }
    </style>
    `
    shadowRoot.appendChild(rootElement);
    root.render(<App />);
  }

  reportWebVitals();
}

function startExtension() {
  let isPopupOpen = false;
  window.gmail.observe.on('compose', composeHandler);
  window.gmail.observe.on('load', loadHandler);
  document.addEventListener('click', (event) => {
    clickHandler(event, isPopupOpen, openPopup);
  });
}

window.addEventListener('load', () => {
  const loaderId = setInterval(() => {
    if (!window.gmail) return;
    clearInterval(loaderId);
    startExtension();
  }, 100);
});
