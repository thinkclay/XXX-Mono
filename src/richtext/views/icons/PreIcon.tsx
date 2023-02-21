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
    <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
      <g id="Artboard" transform="translate(-554.000000, -61.000000)">
        <g id="code" filter="url(#filter-1)" transform="translate(554.000000, 61.000000)">
          <rect id="Rectangle-Copy" fillOpacity="0.00611888112" fill="#FFFFFF" x="0" y="0" width="40" height="40"></rect>
          <path
            d="M6,19.9989596 C6.90376039,19.6826807 7.43368467,19.4746056 7.58978873,19.3747281 C7.84448484,19.2082655 8.02934215,18.9918674 8.1443662,18.7255273 C8.30868627,18.3509865 8.39084507,17.8099912 8.39084507,17.1025253 L8.39084507,12.4707273 C8.39084507,11.2721968 8.69277867,10.3941199 9.29665493,9.83647025 C9.90053119,9.27882063 10.9583258,9 12.4700704,9 C12.6754705,9 12.8521119,9.0041615 13,9.01248463 L13,9.43696207 C12.6302798,9.4452852 12.2975367,9.50978848 12.0017606,9.63047385 C11.7059844,9.75115921 11.4779938,9.9342653 11.3177817,10.1797976 C11.1575696,10.4253299 11.0363854,10.7312003 10.9542254,11.0974179 C10.9377933,11.1972955 10.9295775,11.5343771 10.9295775,12.108673 L10.9295775,16.7030171 C10.9295775,17.2024048 10.8720663,17.6851391 10.7570423,18.1512343 C10.6830982,18.4841594 10.5434283,18.771303 10.3380282,19.0126738 C10.1326281,19.2540445 9.88204373,19.4517159 9.58626761,19.6056937 C9.29049148,19.7596716 8.89202129,19.8907589 8.39084507,19.9989596 C8.99882933,20.1238065 9.49178215,20.3110741 9.86971831,20.560768 C10.2476545,20.8104618 10.5064547,21.118413 10.6461268,21.4846306 C10.8350948,21.9673721 10.9295775,22.5707899 10.9295775,23.2949021 L10.9295775,27.8892462 C10.9295775,28.4136033 10.9377933,28.7382004 10.9542254,28.8630474 C11.0035214,29.1210643 11.0795183,29.3624315 11.1822183,29.5871559 C11.2849184,29.8118804 11.4307502,30.0053902 11.6197183,30.1676913 C11.8086864,30.3299923 12.0161374,30.4444336 12.2420775,30.5110186 C12.4680176,30.5776036 12.7206559,30.5984111 13,30.5734418 L13,30.9979192 L12.4700704,30.9979192 C11.6649021,31.0145655 10.9706602,30.9313354 10.3873239,30.7482266 C9.86971572,30.5734409 9.49589317,30.3757695 9.26584507,30.1552066 C9.03579697,29.9346437 8.85093967,29.6454193 8.71126761,29.2875248 C8.49765151,28.7631677 8.39084507,28.1722344 8.39084507,27.5147072 L8.39084507,22.8953939 C8.39084507,22.321098 8.35387361,21.8945441 8.27992958,21.6157193 C8.20598555,21.3368945 8.08685528,21.1038503 7.92253521,20.9165799 C7.75821514,20.7293096 7.54460225,20.5774147 7.28169014,20.4608909 C7.15845009,20.402629 6.73122431,20.2486535 6,19.9989596 Z"
            id="{"
            fillRule="nonzero"
          ></path>
          <path
            d="M16.4,16.072 C15.542,16.072 15.002,15.352 15.002,14.074 C15.002,12.79 15.542,12.106 16.4,12.106 C17.258,12.106 17.798,12.79 17.798,14.074 C17.798,15.352 17.258,16.072 16.4,16.072 Z M16.4,15.598 C16.892,15.598 17.252,15.148 17.252,14.074 C17.252,13 16.892,12.574 16.4,12.574 C15.908,12.574 15.548,13 15.548,14.074 C15.548,15.148 15.908,15.598 16.4,15.598 Z M16.4,14.458 C16.184,14.458 16.004,14.302 16.004,14.044 C16.004,13.786 16.184,13.63 16.4,13.63 C16.616,13.63 16.796,13.786 16.796,14.044 C16.796,14.302 16.616,14.458 16.4,14.458 Z M18.758,16 L18.758,15.514 L19.838,15.514 L19.838,12.85 L18.986,12.85 L18.986,12.478 C19.454,12.412 19.736,12.322 19.994,12.178 L20.432,12.178 L20.432,15.514 L21.398,15.514 L21.398,16 L18.758,16 Z M23.6,16.072 C22.742,16.072 22.202,15.352 22.202,14.074 C22.202,12.79 22.742,12.106 23.6,12.106 C24.458,12.106 24.998,12.79 24.998,14.074 C24.998,15.352 24.458,16.072 23.6,16.072 Z M23.6,15.598 C24.092,15.598 24.452,15.148 24.452,14.074 C24.452,13 24.092,12.574 23.6,12.574 C23.108,12.574 22.748,13 22.748,14.074 C22.748,15.148 23.108,15.598 23.6,15.598 Z M23.6,14.458 C23.384,14.458 23.204,14.302 23.204,14.044 C23.204,13.786 23.384,13.63 23.6,13.63 C23.816,13.63 23.996,13.786 23.996,14.044 C23.996,14.302 23.816,14.458 23.6,14.458 Z M15.158,22 L15.158,21.514 L16.238,21.514 L16.238,18.85 L15.386,18.85 L15.386,18.478 C15.854,18.412 16.136,18.322 16.394,18.178 L16.832,18.178 L16.832,21.514 L17.798,21.514 L17.798,22 L15.158,22 Z M20,22.072 C19.142,22.072 18.602,21.352 18.602,20.074 C18.602,18.79 19.142,18.106 20,18.106 C20.858,18.106 21.398,18.79 21.398,20.074 C21.398,21.352 20.858,22.072 20,22.072 Z M20,21.598 C20.492,21.598 20.852,21.148 20.852,20.074 C20.852,19 20.492,18.574 20,18.574 C19.508,18.574 19.148,19 19.148,20.074 C19.148,21.148 19.508,21.598 20,21.598 Z M20,20.458 C19.784,20.458 19.604,20.302 19.604,20.044 C19.604,19.786 19.784,19.63 20,19.63 C20.216,19.63 20.396,19.786 20.396,20.044 C20.396,20.302 20.216,20.458 20,20.458 Z M22.358,22 L22.358,21.514 L23.438,21.514 L23.438,18.85 L22.586,18.85 L22.586,18.478 C23.054,18.412 23.336,18.322 23.594,18.178 L24.032,18.178 L24.032,21.514 L24.998,21.514 L24.998,22 L22.358,22 Z M16.4,28.072 C15.542,28.072 15.002,27.352 15.002,26.074 C15.002,24.79 15.542,24.106 16.4,24.106 C17.258,24.106 17.798,24.79 17.798,26.074 C17.798,27.352 17.258,28.072 16.4,28.072 Z M16.4,27.598 C16.892,27.598 17.252,27.148 17.252,26.074 C17.252,25 16.892,24.574 16.4,24.574 C15.908,24.574 15.548,25 15.548,26.074 C15.548,27.148 15.908,27.598 16.4,27.598 Z M16.4,26.458 C16.184,26.458 16.004,26.302 16.004,26.044 C16.004,25.786 16.184,25.63 16.4,25.63 C16.616,25.63 16.796,25.786 16.796,26.044 C16.796,26.302 16.616,26.458 16.4,26.458 Z M18.758,28 L18.758,27.514 L19.838,27.514 L19.838,24.85 L18.986,24.85 L18.986,24.478 C19.454,24.412 19.736,24.322 19.994,24.178 L20.432,24.178 L20.432,27.514 L21.398,27.514 L21.398,28 L18.758,28 Z M22.358,28 L22.358,27.514 L23.438,27.514 L23.438,24.85 L22.586,24.85 L22.586,24.478 C23.054,24.412 23.336,24.322 23.594,24.178 L24.032,24.178 L24.032,27.514 L24.998,27.514 L24.998,28 L22.358,28 Z"
            id="010101011"
            fillRule="nonzero"
          ></path>
          <path
            d="M27,19.9989596 C27.9037604,19.6826807 28.4336847,19.4746056 28.5897887,19.3747281 C28.8444848,19.2082655 29.0293421,18.9918674 29.1443662,18.7255273 C29.3086863,18.3509865 29.3908451,17.8099912 29.3908451,17.1025253 L29.3908451,12.4707273 C29.3908451,11.2721968 29.6927787,10.3941199 30.2966549,9.83647025 C30.9005312,9.27882063 31.9583258,9 33.4700704,9 C33.6754705,9 33.8521119,9.0041615 34,9.01248463 L34,9.43696207 C33.6302798,9.4452852 33.2975367,9.50978848 33.0017606,9.63047385 C32.7059844,9.75115921 32.4779938,9.9342653 32.3177817,10.1797976 C32.1575696,10.4253299 32.0363854,10.7312003 31.9542254,11.0974179 C31.9377933,11.1972955 31.9295775,11.5343771 31.9295775,12.108673 L31.9295775,16.7030171 C31.9295775,17.2024048 31.8720663,17.6851391 31.7570423,18.1512343 C31.6830982,18.4841594 31.5434283,18.771303 31.3380282,19.0126738 C31.1326281,19.2540445 30.8820437,19.4517159 30.5862676,19.6056937 C30.2904915,19.7596716 29.8920213,19.8907589 29.3908451,19.9989596 C29.9988293,20.1238065 30.4917821,20.3110741 30.8697183,20.560768 C31.2476545,20.8104618 31.5064547,21.118413 31.6461268,21.4846306 C31.8350948,21.9673721 31.9295775,22.5707899 31.9295775,23.2949021 L31.9295775,27.8892462 C31.9295775,28.4136033 31.9377933,28.7382004 31.9542254,28.8630474 C32.0035214,29.1210643 32.0795183,29.3624315 32.1822183,29.5871559 C32.2849184,29.8118804 32.4307502,30.0053902 32.6197183,30.1676913 C32.8086864,30.3299923 33.0161374,30.4444336 33.2420775,30.5110186 C33.4680176,30.5776036 33.7206559,30.5984111 34,30.5734418 L34,30.9979192 L33.4700704,30.9979192 C32.6649021,31.0145655 31.9706602,30.9313354 31.3873239,30.7482266 C30.8697157,30.5734409 30.4958932,30.3757695 30.2658451,30.1552066 C30.035797,29.9346437 29.8509397,29.6454193 29.7112676,29.2875248 C29.4976515,28.7631677 29.3908451,28.1722344 29.3908451,27.5147072 L29.3908451,22.8953939 C29.3908451,22.321098 29.3538736,21.8945441 29.2799296,21.6157193 C29.2059855,21.3368945 29.0868553,21.1038503 28.9225352,20.9165799 C28.7582151,20.7293096 28.5446023,20.5774147 28.2816901,20.4608909 C28.1584501,20.402629 27.7312243,20.2486535 27,19.9989596 Z"
            id="{-copy"
            fillRule="nonzero"
            transform="translate(30.500000, 20.000000) scale(-1, 1) translate(-30.500000, -20.000000) "
          ></path>
        </g>
      </g>
    </g>
  </svg>
)

export default Icon
