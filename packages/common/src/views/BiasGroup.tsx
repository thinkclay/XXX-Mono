/** @format */

import { useMemo } from 'react'
import { BiasCard, BiasType, DetectedBias, getColorForBiasType, getTitleForBiasType } from './BiasCard'

interface Props {
  type: BiasType
  bias: DetectedBias[]
}

export const BiasGroup = ({ type, bias }: Props) => {
  const filtered = useMemo(() => bias.filter(subject => subject.type === type), [bias, type])
  const count = useMemo(() => filtered.length, [filtered])
  const typeLabel = getTitleForBiasType(type)
  const color = getColorForBiasType(type)

  return (
    <div className={`p-2 bg-${color}-100 rounded`}>
      <div className="flex items-center">
        <span className={`inline-block px-1 text-xs bg-${color}-800 text-${color}-100 rounded`}>{count}</span>{' '}
        <h4 className={`text-sm font-bold text-${color}-500 pl-1`}>{typeLabel} bias</h4>
      </div>

      <ul className="pt-1">
        {filtered.map((subject, index) => {
          return (
            <li key={index} className="py-1 rounded">
              <BiasCard bias={subject} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
