/** @format */

import { v4 } from 'uuid'
import { Hint } from '../types/Revision'

export interface HintsProps {
  hints?: Hint[]
}

function Hints({ hints }: HintsProps) {
  if (!hints) return null

  const _hints = hints.map(h => (
    <ul key={v4()}>
      <li>
        <strong>Original:</strong> {h.original}
      </li>
      <li>
        <strong>Correction:</strong> {h.correction}
      </li>
      <li>
        <strong>Reason:</strong> {h.reason}
      </li>
    </ul>
  ))

  return <div>{_hints}</div>
}

export default Hints
