/** @format */

import { CreateCompletionResponseChoicesInner } from 'openai'
import { renderToStaticMarkup } from 'react-dom/server'
import { v4 } from 'uuid'

interface RevisionProps {
  result?: void | CreateCompletionResponseChoicesInner[]
  acceptHandler: (content: string) => void
}

function Revision({ result, acceptHandler }: RevisionProps) {
  if (!result) return null

  const content = (
    <>
      {result.map(r => (
        <p key={v4()}>{r.text}</p>
      ))}
    </>
  )

  return (
    <div className="Revision">
      {content}
      <button className="button bordered" onClick={() => acceptHandler(renderToStaticMarkup(content))}>
        Accept Revision
      </button>
    </div>
  )
}

export default Revision
