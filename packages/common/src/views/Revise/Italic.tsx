/** @format */
import { useEffect, useState } from 'react'
import { Editor } from '@tiptap/react'

interface Props {
    editor: Editor
}

function Italic({ editor }: Props) {
    const [_active, _setActive] = useState(false)

    const handler = () => {
        _setActive(!_active)
        editor.chain().focus().toggleItalic().run()
    }


    return (
        <button className={_active ? 'active' : ''} onClick={handler}>

            <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path className="FillLayer" fill="var(--ci-primary-color, #000000)" d="M16,496H496V16H16ZM48,48H464V464H48Z" />
                <polygon className="FillLayer" fill="var(--ci-primary-color, #000000)" points="200 143.998 244.442 143.998 202.442 367.998 152 367.998 152 399.998 312 399.998 312 367.998 267.558 367.998 309.558 143.998 360 143.998 360 111.998 200 111.998 200 143.998"  />
            </svg>
        </button>
    )

}
export default Italic
