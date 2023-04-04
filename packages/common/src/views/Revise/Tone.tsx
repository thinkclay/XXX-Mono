/** @format */
import { RenderMode } from '@common/types/UI'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { toneMessage } from '@common/helpers/tone'
import { Editor } from '@tiptap/react'
interface Props {
  editor: Editor
}

function Tone({editor}: Props) {
  const message = useRecoilValue(toneMessage)
  const [_active, _setActive] = useState(false)
  const [_activeTone, _setActiveTone] = useState(false)

  const _renderTone = () => {
    if (!message || message.length < 5) return null

    return (
      <div className="tooltip">
        <p>{message}</p>
      </div>
    )
  }
  const _handleCharacterCountChange = () => {
    const contentsLength = editor.getHTML().length
    if (contentsLength > 250) {
      _setActiveTone(true)
    } else {
      _setActiveTone(false)
    }
  }
  useEffect(() => {
    editor.on('update', _handleCharacterCountChange)
    return () => {
      editor.off('update', _handleCharacterCountChange)
    }
  }, [editor])
  return (
    <button className={_active ? 'active' : ''} onClick={() => _setActive(!_active)}>
      <svg viewBox="0 0 100 100">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <path
            d="M50,5 C74.6774194,5 95,24.8371613 95,50 C95,75.1628387 75.1628387,95 50,95 C24.8371613,95 5,75.1628387 5,50 C5,24.8371613 25.3225806,5 50,5 Z M50,12.2580645 C29.192,12.2580645 12.2580645,28.7065806 12.2580645,49.5145806 C12.2580645,70.3225806 29.192,87.2565161 50,87.2565161 C70.808,87.2565161 87.7419355,70.8033548 87.7419355,50 C87.7419355,29.192 70.808,12.2580645 50,12.2580645 Z M31.6144516,64.9969032 C33.0660645,63.5452903 35.483871,63.5452903 36.9354839,64.9969032 C44.1935484,72.2549677 55.8064516,72.2549677 63.0645161,64.9969032 C64.516129,63.5452903 66.9339355,63.5452903 68.3855484,64.9969032 C69.8371613,66.4485161 69.8371613,68.8663226 68.3855484,70.3179355 C63.0645161,75.6436129 56.7726452,78.0614194 50,78.0614194 C43.2273548,78.0614194 36.4547097,75.1581935 31.6144516,70.3179355 C30.1628387,68.8663226 30.1628387,66.4485161 31.6144516,64.9969032 Z M35.483871,32.580529 C38.9586839,32.580529 41.7757419,35.3930581 41.7757419,38.867871 C41.7757419,42.3426839 38.9586839,45.1597419 35.483871,45.1597419 C32.0090581,45.1597419 29.192,42.3426839 29.192,38.867871 C29.192,35.3930581 32.0090581,32.580529 35.483871,32.580529 Z M64.516129,32.580529 C67.9909419,32.580529 70.808,35.3930581 70.808,38.867871 C70.808,42.3426839 67.9909419,45.1597419 64.516129,45.1597419 C61.0413161,45.1597419 58.2242581,42.3426839 58.2242581,38.867871 C58.2242581,35.3930581 61.0413161,32.580529 64.516129,32.580529 Z"
             className={_activeTone ? 'FillLayer' : 'FillLayerTone'}
          ></path>
        </g>
      </svg>

      {_renderTone()}
    </button>
  )
}

export default Tone
