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
      <g transform="translate(-513.000000, -61.000000)">
        <g filter="url(#filter-1)" transform="translate(513.000000, 61.000000)">
          <path d="M29.625,9 C30.3850756,9 31,9.61492444 31,10.375 L31,29.625 C31,30.3850756 30.3850756,31 29.625,31 L10.375,31 C9.61492444,31 9,30.3850756 9,29.625 L9,10.375 C9,9.61492444 9.61492444,9 10.375,9 L29.625,9 Z M29.625,28.6249291 L29.625,11.0623753 C29.625,10.6823376 29.3175378,10.3748753 28.9375,10.3748753 L11.0625,10.3748753 C10.6824622,10.3748753 10.375,10.6823376 10.375,11.0623753 L10.375,28.6249291 C10.375,29.1772139 10.8227153,29.6249291 11.375,29.6249291 L28.625,29.6249291 C29.1772847,29.6249291 29.625,29.1772139 29.625,28.6249291 Z"></path>
          <path
            d="M20.9205892,17.1542499 L24.5047565,22.7296212 C24.6540826,22.9619062 24.5868311,23.2712632 24.354546,23.4205892 C24.2738974,23.4724348 24.1800431,23.5 24.0841673,23.5 L16.9158327,23.5 C16.6396904,23.5 16.4158327,23.2761424 16.4158327,23 C16.4158327,22.9041242 16.4433979,22.8102699 16.4952435,22.7296212 L20.0794108,17.1542499 C20.2287368,16.9219649 20.5380938,16.8547134 20.7703788,17.0040395 C20.8306301,17.0427725 20.8818562,17.0939986 20.9205892,17.1542499 Z"
            transform="translate(20.500000, 20.000000) rotate(-270.000000) translate(-20.500000, -20.000000) "
          ></path>
        </g>
      </g>
    </g>
  </svg>
)

export default Icon
