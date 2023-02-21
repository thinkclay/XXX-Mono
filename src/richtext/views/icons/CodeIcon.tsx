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
      <g transform="translate(-185.000000, -61.000000)">
        <g filter="url(#filter-1)" transform="translate(185.000000, 61.000000)">
          <path d="M12.4404112,24.9926458 L12.4405198,24.992599 C12.7614798,25.3145176 12.8106362,25.8693632 12.5638919,26.2780522 C12.4164375,26.483554 12.1937853,26.6 11.9721004,26.6 C11.7745076,26.6 11.6270433,26.541777 11.4786118,26.3956497 L6.27181355,21.2513821 C6.09831282,21.0767307 6,20.8426931 6,20.5504384 C6,20.2581837 6.099285,20.0253034 6.27181355,19.8494947 L11.4534439,14.7043503 C11.6018852,14.558223 11.7744039,14.5 11.9469325,14.5 C12.1686076,14.5 12.3902925,14.6175975 12.538724,14.8219478 C12.8105277,15.2021127 12.7613762,15.7569291 12.4404112,16.0788769 L7.9247435,20.5208564 L12.4404112,24.9926458 Z M33.9997549,20.5500643 L34,20.5499357 C34,20.8125192 33.9013656,21.0751143 33.7299675,21.2509377 L28.5582676,26.3956327 C28.4107989,26.5120883 28.2394106,26.6 28.0680126,26.6 C27.8228851,26.6 27.6275577,26.4823928 27.4800988,26.2780255 C27.2100761,25.8978289 27.2589055,25.3429665 27.5777674,25.0209919 L32.0388427,20.5511691 L27.5527644,16.0790081 C27.2348634,15.7570335 27.1850633,15.2021711 27.4550958,14.8219745 C27.601584,14.6164556 27.8227772,14.5 28.0430096,14.5 C28.2144027,14.5 28.3858057,14.5582278 28.5332646,14.7043673 L33.7297224,19.8490623 C33.9020863,20.0237283 33.9997549,20.2874692 33.9997549,20.5500643 Z M23.2607697,9.02882861 L23.2606115,9.02874345 C23.7672365,9.17067242 24.0514473,9.65300381 23.859914,10.0798977 L16.8375242,30.3757396 C16.7114951,30.7449707 16.363017,31 15.9206498,31 C15.8267353,31 15.7315872,31 15.636439,30.9711714 C15.1298045,30.8292424 14.8455937,30.346911 15.0037627,29.8922842 L22.0596844,9.62426036 C22.1857135,9.22730775 22.5650662,9 22.9765588,9 C23.0704733,9 23.1656215,9 23.2607697,9.02882861 Z"></path>
        </g>
      </g>
    </g>
  </svg>
)

export default Icon
