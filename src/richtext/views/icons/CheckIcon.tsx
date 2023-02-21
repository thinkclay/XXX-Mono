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
      <g transform="translate(-641.000000, -115.000000)">
        <g transform="translate(26.000000, 115.000000)">
          <g filter="url(#filter-1)" transform="translate(615.000000, 0.000000)">
            <path d="M31.6685895,11.767121 C32.1104702,11.3514909 32.1104702,10.6921391 31.6685895,10.3117226 C31.2267087,9.89609248 30.5257132,9.89609248 30.12127,10.3117226 L16.320249,27.6752027 L9.87873002,21.6160704 C9.4368493,21.2004403 8.73585373,21.2004403 8.33141054,21.6160704 C7.88952982,22.0317005 7.88952982,22.6910522 8.33141054,23.0714688 C12.9682147,27.2292853 15.4339104,29.4349991 15.7284975,29.6886102 C15.9501601,29.8971045 16.2437794,30 16.5028942,30 C16.7605425,30 17.0556136,29.8957528 17.2772909,29.6886102 L31.6685895,11.767121 Z"></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export default Icon
