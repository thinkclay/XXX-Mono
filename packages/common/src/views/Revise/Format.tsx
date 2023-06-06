import { useState } from 'react'
import { Editor } from '@tiptap/react'

import Bold from './Formatting/Bold'
import Italic from './Formatting/Italic'

interface Props {
  editor: Editor
}

function Format({ editor }: Props) {
  const [_active, _setActive] = useState(false)

  return (
    <div className={_active ? 'active action' : 'action'} onClick={() => _setActive(!_active)}>
      <span className="icon">
        <svg viewBox="0 0 49 47.89848">
          <path
            d="M31.00416,47.89848 L18.00416,47.89848 C17.30494,47.89848 16.70336,47.49998 16.30496,46.99998 C15.90652,46.39842 15.90652,45.69918 16.2034,45.10158 L19.0042,39.49998 L19.0042,10.99998 L7.7032,10.99998 L3.2032,14.60158 C2.60164,15.10158 1.8048,15.20314 1.1016,14.8008 C0.40238,14.50002 -3.55271368e-15,13.8008 -3.55271368e-15,13 L-3.55271368e-15,2 C-3.55271368e-15,0.8984 0.89844,0 2,0 L47,0 C48.1016,0 49,0.89844 49,2 L49,13 C49,13.80078 48.60156,14.5 47.8984,14.8008 C47.19918,15.10158 46.3984,15.00002 45.7968,14.60158 L41.2968,10.99998 L29.9958,10.99998 L29.9958,39.49998 L32.695,44.80078 C32.89422,45.10156 32.99578,45.5 32.99578,45.90238 C33.003593,47.00008 32.10516,47.89848 31.00358,47.89848 L31.00416,47.89848 Z M21.20726,43.89842 L27.70726,43.89842 L26.10566,40.79682 C26.0041,40.49604 25.90644,40.19526 25.90644,39.89838 L25.90644,8.89838 C25.90644,7.79678 26.80488,6.89838 27.90644,6.89838 L41.90644,6.89838 C42.40644,6.89838 42.80488,7.0976 43.10564,7.29682 L44.90644,8.69522 L44.90644,3.89832 L3.90644,3.89832 L3.90644,8.69912 L5.70724,7.30072 C6.10568,6.99994 6.50802,6.90228 6.90644,6.90228 L20.90644,6.90228 C21.40644,6.90228 21.90644,7.1015 22.30484,7.50384 C22.70328,7.90228 22.9064,8.40228 22.9064,8.90224 L22.9064,39.90224 C22.9064,40.20302 22.80484,40.5038 22.70718,40.80068 L21.20726,43.89842 Z"
            className="FillLayer"
          ></path>
        </svg>
      </span>

      <div className="tooltip">
        <Bold editor={editor} />
        <Italic editor={editor} />
      </div>
    </div>
  )
}

export default Format