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
      <g transform="translate(-308.000000, -61.000000)">
        <g filter="url(#filter-1)" transform="translate(308.000000, 61.000000)">
          <path
            d="M10.0019531,26.3672316 C10.8897504,24.9259187 11.5144873,23.7922201 11.8761825,22.9661017 C12.3858439,21.8411745 12.8132954,20.5976214 13.1585499,19.2354049 C13.5038044,17.8731884 13.7750717,16.3044659 13.97236,14.5291902 C15.7479546,14.0897655 17.3508979,13.5800406 18.781238,13 L19.4964044,13.6591337 C18.3619968,16.6120675 17.297478,18.9805309 16.3028163,20.7645951 C15.3081545,22.5486593 14.2107489,24.1964771 13.0105844,25.7080979 L10.7417805,27 L10.0019531,26.3672316 Z M20.5075018,26.3672316 C21.3952991,24.9259187 22.020036,23.7922201 22.3817312,22.9661017 C22.8913926,21.8411745 23.3188441,20.5976214 23.6640986,19.2354049 C24.0093531,17.8731884 24.2806204,16.3044659 24.4779087,14.5291902 C26.2535033,14.0897655 27.8646668,13.5800406 29.3114476,13 L30.0019531,13.6591337 C28.8675455,16.6120675 27.8030267,18.9805309 26.808365,20.7645951 C25.8137032,22.5486593 24.7162976,24.1964771 23.5161331,25.7080979 L21.2473292,27 L20.5075018,26.3672316 Z"
            fillRule="nonzero"
          ></path>
        </g>
      </g>
    </g>
  </svg>
)

export default Icon
