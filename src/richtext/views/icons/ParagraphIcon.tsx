/** @jsx createElement **/
import { createElement, ReactNode } from 'react'

const Icon = (): ReactNode => (
  <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1">
    <defs>
      <filter x="-6.2%" y="-6.2%" width="112.5%" height="112.5%" filterUnits="objectBoundingBox" id="filter-1">
        <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
        <feColorMatrix
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.200147509 0"
          type="matrix"
          in="shadowOffsetOuter1"
          result="shadowMatrixOuter1"
        ></feColorMatrix>
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>
    </defs>
    <g stroke="none" strokeWidth="1" fillRule="evenodd">
      <g transform="translate(-705.000000, -40.000000)">
        <g transform="translate(49.000000, 40.000000)">
          <g filter="url(#filter-1)" transform="translate(656.000000, 0.000000)">
            <path d="M26.1818182,11.5384615 L26.1818182,29.2307692 C26.1818182,29.6557785 25.836032,30 25.4090909,30 C24.9821498,30 24.6363636,29.6557785 24.6363636,29.2307692 L24.6363636,11.5384615 L23.0909091,11.5384615 L23.0909091,29.2307692 C23.0909091,29.6557785 22.7451229,30 22.3181818,30 C21.8912407,30 21.5454545,29.6557785 21.5454545,29.2307692 L21.5454545,22.3076923 L17.6818182,22.3076923 C13.6490473,22.3076923 11.5,20.1682708 11.5,16.1538462 C11.5,12.1394215 13.6491462,10 17.6818182,10 L27.7272727,10 C28.1542138,10 28.5,10.3442215 28.5,10.7692308 C28.5,11.19424 28.1542138,11.5384615 27.7272727,11.5384615 L26.1818182,11.5384615 Z M21.5,21 L21.5,12 L17.4090909,12 C14.0423709,12 12.5,13.413744 12.5,16.5 C12.5,19.586256 14.0422662,21 17.4090909,21 L21.5,21 Z"></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export default Icon
