/** @format */

import OpenAI from 'openai'
import { renderToStaticMarkup } from 'react-dom/server'
import { v4 } from 'uuid'

interface RevisionProps {
  revision?: void | OpenAI.CompletionChoice[]
  accept: (content: string) => void
  decline: () => void
}

function Revision({ revision, accept, decline }: RevisionProps) {
  if (!revision) return null

  const content = (
    <>
      {/* {revision.map(r => (
        <p key={v4()}>{r.text}</p>
      ))} */}

      {revision[0].text?.split('\n').map(text => text.trim() && <p key={v4()}>{text}</p>)}
    </>
  )

  return (
    <div className="Revision">
      <div className="content">{content}</div>

      <div className="ButtonRow centered shrink">
        <button className="button accept" onClick={() => accept(renderToStaticMarkup(content as any))}>
          Accept Revision
        </button>

        <button className="button cancel" onClick={decline}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Revision
