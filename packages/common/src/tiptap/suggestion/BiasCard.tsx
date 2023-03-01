/** @format */

import { getExplanationForBias, getColorForBiasType } from './suggestion-helpers'
import { DetectedBias } from './suggestion-types'

//     "None",           #0
//     "Potential",      #1
//     "Emotional",      #2
//     "Ethnic",         #3
//     "Family",         #4
//     "Gender",         #5
//     "Language",       #6
//     "Mental",         #7
//     "Physical",       #8
//     "Racial",         #9
//     "Religious",      #10
//     "Socioeconomic"   #11

interface BiasCardProps {
  bias: DetectedBias
}

export const BiasCard = ({ bias }: BiasCardProps) => {
  const explanation = getExplanationForBias(bias)
  const offence = bias.suggestions[0].offence
  const replacement = bias.suggestions[0].replacement
  const color = getColorForBiasType(bias.type)

  return (
    <div className="pt-1">
      <div className="text-xs">
        <p className="text-xs">{explanation}</p>
        <p className="p-1">
          * <s>{offence}</s> → <span>{replacement}</span>
        </p>
      </div>
      <button className={`text-${color}-500 text-xs px-3 border border-${color}-300 rounded hover:bg-${color}-200`} onClick={() => {}}>
        Fix
      </button>
    </div>
  )
}
