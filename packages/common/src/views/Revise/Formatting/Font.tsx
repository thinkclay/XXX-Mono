import React, { useState } from 'react'
import { Editor } from '@tiptap/core'

interface IOption {
  label: string
  value: string
}
interface Props {
  editor: Editor
}

const fontOptions: IOption[] = [
  { label: 'Font', value: '' },
  { label: 'Arial', value: 'Arial' },
  { label: 'Courier New', value: 'Courier New' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Impact', value: 'Impact' },
  { label: 'Lucida Console', value: 'Lucida Console' },
  { label: 'Lucida Sans Unicode', value: 'Lucida Sans Unicode' },
  { label: 'Palatino Linotype', value: 'Palatino Linotype' },
  { label: 'Tahoma', value: 'Tahoma' },
  { label: 'Times New Roman', value: 'Times New Roman' },
  { label: 'Trebuchet MS', value: 'Trebuchet MS' },
  { label: 'Verdana', value: 'Verdana' },
  { label: 'Comic Sans', value: 'Comic Sans MS, Comic Sans' },
  { label: 'Open Sans', value: 'Open Sans' },
]

function Font({ editor }: Props) {
  const [selectedFont, setSelectedFont] = useState<IOption>(fontOptions[0])
  const handleFontChange = (option: IOption) => {
    setSelectedFont(option)
    editor.chain().focus().setFontFamily(option.value).run()
  }

  return (
    <div className="fontOptions">
      <select value={selectedFont.value} onChange={e => handleFontChange(fontOptions.find(f => f.value === e.target.value)!)}>
        {fontOptions.map(fontOption => (
          <option key={fontOption.value} value={fontOption.value}>
            {fontOption.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Font
