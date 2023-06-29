/** @format */
import { Editor } from '@tiptap/react'

interface Props {
  editor: Editor
}

function Bold({ editor }: Props) {
  const handler = () => {
    editor.chain().focus().toggleBold().run()
  }

  return (
    <button className={editor.isActive('bold') ? 'action active' : 'action'} onClick={handler}>
      <svg viewBox="0 0 100 100">
        <g transform="translate(37.45, 28.52)">
          <path
            d="M25.32,10.08 C25.32,11.08 25.16,12.1 24.84,13.14 C24.52,14.18 24.04,15.15 23.4,16.05 C22.76,16.95 21.94,17.74 20.94,18.42 C19.94,19.1 18.76,19.62 17.4,19.98 L17.4,20.22 C18.6,20.42 19.75,20.76 20.85,21.24 C21.95,21.72 22.92,22.38 23.76,23.22 C24.6,24.06 25.28,25.08 25.8,26.28 C26.32,27.48 26.58,28.9 26.58,30.54 C26.58,32.7 26.13,34.57 25.23,36.15 C24.33,37.73 23.15,39.02 21.69,40.02 C20.23,41.02 18.56,41.76 16.68,42.24 C14.8,42.72 12.88,42.96 10.92,42.96 C10.24,42.96 9.44,42.96 8.52,42.96 C7.6,42.96 6.64,42.93 5.64,42.87 C4.64,42.81 3.64,42.73 2.64,42.63 C1.64,42.53 0.76,42.38 0,42.18 L0,0.84 C1.48,0.6 3.2,0.4 5.16,0.24 C7.12,0.08 9.26,0 11.58,0 C13.14,0 14.73,0.13 16.35,0.39 C17.97,0.65 19.44,1.15 20.76,1.89 C22.08,2.63 23.17,3.66 24.03,4.98 C24.89,6.3 25.32,8 25.32,10.08 Z M11.4,38.64 C12.68,38.64 13.92,38.48 15.12,38.16 C16.32,37.84 17.38,37.36 18.3,36.72 C19.22,36.08 19.95,35.28 20.49,34.32 C21.03,33.36 21.3,32.22 21.3,30.9 C21.3,29.26 20.97,27.94 20.31,26.94 C19.65,25.94 18.79,25.16 17.73,24.6 C16.67,24.04 15.48,23.66 14.16,23.46 C12.84,23.26 11.52,23.16 10.2,23.16 L4.98,23.16 L4.98,38.22 C5.26,38.3 5.66,38.36 6.18,38.4 C6.7,38.44 7.26,38.48 7.86,38.52 C8.46,38.56 9.08,38.59 9.72,38.61 C10.36,38.63 10.92,38.64 11.4,38.64 Z M8.1,18.96 C8.78,18.96 9.6,18.94 10.56,18.9 C11.52,18.86 12.32,18.8 12.96,18.72 C13.92,18.4 14.82,18.01 15.66,17.55 C16.5,17.09 17.25,16.54 17.91,15.9 C18.57,15.26 19.09,14.54 19.47,13.74 C19.85,12.94 20.04,12.06 20.04,11.1 C20.04,9.78 19.79,8.68 19.29,7.8 C18.79,6.92 18.12,6.22 17.28,5.7 C16.44,5.18 15.48,4.82 14.4,4.62 C13.32,4.42 12.22,4.32 11.1,4.32 C9.78,4.32 8.57,4.35 7.47,4.41 C6.37,4.47 5.54,4.56 4.98,4.68 L4.98,18.96 L8.1,18.96 Z"
            className="path"
          ></path>
        </g>
        <path d="M82,18 L82,82 L18,82 L18,18 L82,18 Z M78,22 L22,22 L22,78 L78,78 L78,22 Z" className="path"></path>
      </svg>
    </button>
  )
}

export default Bold