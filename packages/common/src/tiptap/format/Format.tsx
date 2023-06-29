import { Editor, FloatingMenu } from '@tiptap/react'

import Heading from './icons/Heading'
import List from './icons/List'
import Image from './icons/Image'
import Link from './icons/Link'
import Bold from './icons/Bold'
import Italic from './icons/Italic'

interface Props {
  editor: Editor
}

function Format({ editor }: Props) {
  return (
    <nav className="formatting">
      <Heading level={1} editor={editor} />
      <Heading level={2} editor={editor} />
      <Heading level={3} editor={editor} />
      <List editor={editor} />
      <Image editor={editor} />
      <Link editor={editor} />
      <Bold editor={editor} />
      <Italic editor={editor} />
    </nav>
  )
}

export default Format
