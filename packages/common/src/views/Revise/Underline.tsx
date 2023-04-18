/** @format */
import { useEffect, useState } from 'react'
import { Editor } from '@tiptap/react'

interface Props {
    editor: Editor
}

function Underline({ editor }: Props) {
    const [_active, _setActive] = useState(false)

    const handler = () => {
        _setActive(!_active)
        editor.chain().focus().toggleUnderline().run()
    }


    return (
        <button className={_active ? 'active' : ''} onClick={handler}>
            <svg width="24" height="24"  viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path className="FillLayer" fill="var(--ci-primary-color, #000000)" d="M16,496H496V16H16ZM48,48H464V464H48Z" />
                <path className="FillLayer" fill="var(--ci-primary-color, #000000)" d="M296,152h32v88a63.966,63.966,0,0,1-88,59.313V152h24V120H136v32h32v88a96,96,0,0,0,192,0V152h32V120H296Z"  />
                <rect className="FillLayer" width="256" height="32" x="136" y="368" fill="var(--ci-primary-color, #000000)" />
            </svg>
        </button>
    )

}
export default Underline
