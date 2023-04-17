import React, { useState } from 'react'
import { Editor } from '@tiptap/core'
import { Level } from '@tiptap/extension-heading'

interface IOption {
  label: string,
  value: string,
}
interface Props {
  editor: Editor
}

const fontOptions: IOption[] = [
  { label: 'Heading', value: '' },
  { label: 'H1', value: '1' },
  { label: 'H2', value: '2' },
  { label: 'H3', value: '3' },
  { label: 'H4', value: '4' },
  { label: 'H5', value: '5' },

]

export default function EditorWithHeading({ editor }: Props) {
  const [selectedFont, setSelectedFont] = useState<IOption>(fontOptions[0])
  const handleFontChange = (option: IOption) => {
      setSelectedFont(option)
      const headingLevel: Level = parseInt(option.value) as unknown as Level;
      editor.chain().focus().toggleHeading({ level: headingLevel }).run();
  }

  return (
      <div className='fontOptions'>
          <select value={selectedFont.value} onChange={(e) => handleFontChange(fontOptions.find((f) => f.value === e.target.value)!)} >
              {fontOptions.map((fontOption) => (
                  <option key={fontOption.value} value={fontOption.value}>
                      {fontOption.label}
                  </option>
              ))}
          </select>
      </div>
  )
}
