/** @format */

import { CreateCompletionResponseChoicesInner } from 'openai'
import { renderToStaticMarkup } from 'react-dom/server'

interface RevisionProps {
  result?: void | CreateCompletionResponseChoicesInner[]
  acceptHandler: (content: string) => void
}

function Revision({ result, acceptHandler }: RevisionProps) {
  if (!result) return null

  const content = (
    <>
      {result.map(r => (
        <p>{r.text}</p>
      ))}
    </>
  )

  return (
    <div className="Revision">
      {content}
      <button className="button" onClick={() => acceptHandler(renderToStaticMarkup(content))}>
        Accept Revision
      </button>
    </div>
  )
}

export default Revision
