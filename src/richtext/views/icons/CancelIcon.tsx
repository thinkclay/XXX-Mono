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
      <g transform="translate(-682.000000, -115.000000)">
        <g transform="translate(26.000000, 115.000000)">
          <g filter="url(#filter-1)" transform="translate(656.000000, 0.000000)">
            <path d="M21.5198568,20.0001739 L29.6343098,11.8474447 C30.0687616,11.4129223 30.0687616,10.7236 29.6343098,10.3258918 C29.199858,9.89136941 28.5106475,9.89136941 28.1130038,10.3258918 L19.9985509,18.478621 L11.8471448,10.3258918 C11.412693,9.89136941 10.7234826,9.89136941 10.3258389,10.3258918 C9.89138704,10.7604141 9.89138704,11.4497364 10.3258389,11.8474447 L18.4402919,20.0001739 L10.3258389,28.1529032 C9.89138704,28.5874255 9.89138704,29.2767478 10.3258389,29.6744561 C10.5437749,29.8924275 10.8324578,30 11.0872164,30 C11.3405331,30 11.6306435,29.8910143 11.848594,29.6744561 L20,21.5217268 L28.151406,29.6744561 C28.369342,29.8924275 28.658025,30 28.9127836,30 C29.1661003,30 29.4562106,29.8910143 29.6741611,29.6744561 C30.108613,29.2399337 30.108613,28.5506114 29.6741611,28.1529032 L21.5198568,20.0001739 Z"></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export default Icon
