import React, { useState } from 'react'
import { Editor } from '@tiptap/core'

interface IOption {
    label: string,
    value: string,
}
interface Props {
    editor: Editor
}


const fontOptions: IOption[] = [
    { label: 'Inter', value: 'Inter' },
    { label: 'Comic Sans', value: 'Comic Sans MS, Comic Sans' },
    { label: 'Serif', value: 'serif' },
    { label: 'Monospace', value: 'monospace' },
    { label: 'Cursive', value: 'cursive' },
]

export default function EditorWithFontFamily({ editor }: Props) {
    const [selectedFont, setSelectedFont] = useState<IOption>(fontOptions[0])
    const handleFontChange = (option: IOption) => {
        setSelectedFont(option)
        editor.chain().focus().setFontFamily(option.value).run()
    }

    return (
        <div className='FontFamliy'>
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
