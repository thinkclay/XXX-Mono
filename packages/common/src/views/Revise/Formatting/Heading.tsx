import { useState } from 'react'
import { Editor } from '@tiptap/core'
import { Level } from '@tiptap/extension-heading'

interface IOption {
  label: string
  value: number
}

interface Props {
  editor: Editor
}

const fontOptions: IOption[] = [
  { label: 'Header 1', value: 1 },
  { label: 'Header 2', value: 2 },
  { label: 'Header 3', value: 3 },
  { label: 'Header 4', value: 4 },
  { label: 'Header 5', value: 5 },
  { label: 'Header 5', value: 6 },
]

function Heading({ editor }: Props) {
  const [selectedFont, setSelectedFont] = useState<IOption>(fontOptions[0])
  const handleFontChange = (option: IOption) => {
    setSelectedFont(option)
    editor
      .chain()
      .focus()
      .toggleHeading({ level: option.value as Level })
      .run()
  }

  return (
    <div className="fontOptions">
      <select value={selectedFont.value} onChange={e => handleFontChange(fontOptions.find(f => f.value === parseInt(e.target.value))!)}>
        {fontOptions.map(fontOption => (
          <option key={fontOption.value} value={fontOption.value}>
            {fontOption.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Heading
