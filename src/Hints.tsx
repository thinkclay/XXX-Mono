/** @format */

import { Fragment } from 'react'

export interface Hint {
  original?: string
  correction?: string
}

export interface HintsProps {
  hints?: Hint[]
}

function Hints({ hints }: HintsProps) {
  if (!hints) return null

  const _hints = hints.map(h => (
    <Fragment>
      <li>Original: {h.original}</li>
      <li>Correction: {h.correction}</li>
    </Fragment>
  ))

  return <ul>{_hints}</ul>
}

export default Hints
