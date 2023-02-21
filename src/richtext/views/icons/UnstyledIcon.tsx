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
      <g transform="translate(-267.000000, -61.000000)">
        <g filter="url(#filter-1)" transform="translate(267.000000, 61.000000)">
          <path
            d="M14.9065421,31 L14.9065421,29.7105075 C16.1526542,29.6685726 16.8925222,29.584704 17.1261682,29.4588992 C17.3598143,29.3330944 17.518172,29.123423 17.6012461,28.8298785 C17.7154731,28.379078 17.7725857,27.0214552 17.7725857,24.7569693 L17.7725857,15.3373838 C17.7725857,12.7688697 17.7570095,11.3326201 17.7258567,11.0285919 L15.4984424,11.0285919 C14.3769414,11.0285919 13.3904508,11.0652844 12.5389408,11.1386705 C12.19626,11.1701217 11.9989618,11.212056 11.9470405,11.2644746 C11.8743506,11.327377 11.812046,11.5108396 11.7601246,11.8148678 C11.6251291,12.5487289 11.5472483,13.3716895 11.5264798,14.2837741 L10.2336449,14.2837741 C10.1921078,12.1346092 10.1661475,10.9237564 10.1557632,10.6511794 C10.1246104,10.1898952 10.0726899,9.69192548 10,9.15725518 L10.1401869,9 C10.6282475,9.05241866 11.1474531,9.08911117 11.6978193,9.11007863 C12.5908664,9.14152982 14.3094369,9.15725518 16.8535826,9.15725518 L23.1464174,9.15725518 C25.763253,9.15725518 27.5129759,9.14152982 28.3956386,9.11007863 C28.873315,9.08911117 29.3561762,9.05241866 29.8442368,9 L30,9.15725518 C29.9065416,9.79676279 29.849429,10.357634 29.8286604,10.8398856 C29.8182762,10.9237555 29.7975079,12.0717068 29.7663551,14.2837741 L28.4735202,14.2837741 C28.4527517,13.4660431 28.385255,12.6850168 28.271028,11.9406719 C28.2087224,11.5632576 28.1412257,11.3378607 28.0685358,11.2644746 C28.0062302,11.212056 27.8400844,11.1753635 27.5700935,11.154396 C26.7185835,11.0705261 25.6957484,11.0285919 24.5015576,11.0285919 L22.2741433,11.0285919 C22.2429905,11.3955224 22.2274143,12.8317721 22.2274143,15.3373838 L22.2274143,24.7569693 C22.2274143,27.0214552 22.2845269,28.3843198 22.3987539,28.845604 C22.4714438,29.118181 22.6272055,29.3199898 22.8660436,29.4510365 C23.1048818,29.5820831 23.8473458,29.6685726 25.0934579,29.7105075 L25.0934579,31 C23.07891,30.9056464 21.3811076,30.8584703 20,30.8584703 C18.525434,30.8584703 16.8276316,30.9056464 14.9065421,31 Z"
            fillRule="nonzero"
          ></path>
          <rect
            transform="translate(20.000000, 20.001728) rotate(-18.000000) translate(-20.000000, -20.001728) "
            x="7"
            y="19.501728"
            width="26"
            height="1"
            rx="0.5"
          ></rect>
        </g>
      </g>
    </g>
  </svg>
)

export default Icon
