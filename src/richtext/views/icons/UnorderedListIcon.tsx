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
      <g transform="translate(-431.000000, -61.000000)">
        <g filter="url(#filter-1)" transform="translate(431.000000, 61.000000)">
          <path d="M29.9997257,28 C31,28 31,28 31,28.666043 L31,29.3327096 C31,29.9993752 31,29.9993752 29.9997257,30 L18.0002743,30 C17,30 17,30 17,29.3333333 L17,28.6666666 C17,28 17,28 18.0002743,28 L29.9997257,28 Z M29.9997257,19 C31,19 31,19 31,19.6666667 L31,20.3333333 C31,21 31,21 29.9997257,21 L18.0002743,21 C17,21 17,21 17,20.3333333 L17,19.6666667 C17,19 17,19 18.0002743,19 L29.9997257,19 Z M29.9997257,10 C31,10 31,10 31,10.6666667 L31,11.3333333 C31,12 31,12 29.9997257,12 L18.0002743,12 C17,12 17,12 17,11.3333333 L17,10.6666667 C17,10 17,10 18.0002743,10 L29.9997257,10 Z M11,31 C9.8954305,31 9,30.1045695 9,29 C9,27.8954305 9.8954305,27 11,27 C12.1045695,27 13,27.8954305 13,29 C13,30.1045695 12.1045695,31 11,31 Z M11,22 C9.8954305,22 9,21.1045695 9,20 C9,18.8954305 9.8954305,18 11,18 C12.1045695,18 13,18.8954305 13,20 C13,21.1045695 12.1045695,22 11,22 Z M11,13 C9.8954305,13 9,12.1045695 9,11 C9,9.8954305 9.8954305,9 11,9 C12.1045695,9 13,9.8954305 13,11 C13,12.1045695 12.1045695,13 11,13 Z"></path>
        </g>
      </g>
    </g>
  </svg>
)

export default Icon
