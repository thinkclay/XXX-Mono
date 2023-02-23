/** @format */

import { fetchCategories } from '@common/helpers/eberhardt'
import { BiasMap } from '@common/types/Revision'

export enum BiasType {
  Language = 'language',
  FamilyStatus = 'family-status',
  Gender = 'gender',
  Racial = 'racial',
  Ethnic = 'ethnic',
  MentalAbility = 'mental-ability',
  Religious = 'religious',
  PhysicalAbility = 'physical-ability',
  EmotionalStatus = 'emotional-status',
  SocioEconomic = 'socio-economic',
  Potential = 'potential',
  None = 'none',
}

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

const categories = fetchCategories().then(items => {
  return items.reduce((acc, obj) => {
    acc[obj.id.toString()] = obj
    return acc
  }, {} as BiasMap)
})

export const getDynamicBiasType = async (id: number) => {
  return await categories.then(a => {
    return a[id]
  })
}

export const getBiasTypeFromAI = (id: number): BiasType => {
  switch (id) {
    case 0:
      return BiasType.None
    case 1:
      return BiasType.Potential
    case 2:
      return BiasType.EmotionalStatus
    case 3:
      return BiasType.Ethnic
    case 4:
      return BiasType.FamilyStatus
    case 5:
      return BiasType.Gender
    case 6:
      return BiasType.Language
    case 7:
      return BiasType.MentalAbility
    case 8:
      return BiasType.PhysicalAbility
    case 9:
      return BiasType.Racial
    case 10:
      return BiasType.Religious
    case 11:
      return BiasType.SocioEconomic
    default:
      return BiasType.None
  }
}

export const getExplanationForBias = (bias: DetectedBias) => {
  switch (bias.type) {
    case BiasType.Language:
      return 'Avoid labeling people by the language they speak.'
    case BiasType.FamilyStatus:
      return 'Avoid labeling people by their family status.'
    case BiasType.Gender:
      return 'Avoid using masculine pronouns when the gender of the person is not known.'
    case BiasType.Racial:
      return 'Avoid labeling people by their racial identity.'
    case BiasType.Ethnic:
      return 'Do not label people by their ethnicity.'
    case BiasType.MentalAbility:
      return 'Do not label people by their mental ability'
    case BiasType.Religious:
      return 'Do not label people by their religion.'
    case BiasType.PhysicalAbility:
      return 'Do not label people based on their physical ability.'
    case BiasType.EmotionalStatus:
      return 'Do not label people based on their emotional status.'
    case BiasType.SocioEconomic:
      return 'Do not label people by their socio-economic status.'
    case BiasType.None:
      return 'No bias detected'
    case BiasType.Potential:
      return 'Potential bias detected'
    default:
      return 'Unknown bias detected'
  }
}

export const getTitleForBiasType = (bias: BiasType) => {
  switch (bias) {
    case BiasType.Language:
      return 'Language'
    case BiasType.FamilyStatus:
      return 'Family Status'
    case BiasType.Gender:
      return 'Gender'
    case BiasType.Racial:
      return 'Racial'
    case BiasType.Ethnic:
      return 'Ethnicity'
    case BiasType.MentalAbility:
      return 'Mental Ability'
    case BiasType.Religious:
      return 'Religious'
    case BiasType.PhysicalAbility:
      return 'Physical Ability'
    case BiasType.EmotionalStatus:
      return 'Emotional Status'
    case BiasType.SocioEconomic:
      return 'Socio-Economic'
    case BiasType.Potential:
      return 'Potential'
    case BiasType.None:
      return 'None'
    default:
      return 'Unknown bias detected'
  }
}

export const getColorForBiasType = (bias: BiasType): string => {
  switch (bias) {
    case BiasType.Language:
      return 'cyan'
    case BiasType.FamilyStatus:
      return 'blue'
    case BiasType.Gender:
      return 'violet'
    case BiasType.Racial:
      return 'fuchsia'
    case BiasType.Ethnic:
      return 'indigo'
    case BiasType.MentalAbility:
      return 'sky'
    case BiasType.Religious:
      return 'amber'
    case BiasType.PhysicalAbility:
      return 'yellow'
    case BiasType.EmotionalStatus:
      return 'stone'
    case BiasType.SocioEconomic:
      return 'zinc'
    case BiasType.Potential:
      return 'slate'
    case BiasType.None:
      return 'black'
    default:
      return 'gray'
  }
}

// list all bias types
export const AllBiasTypes: BiasType[] = [
  BiasType.Language,
  BiasType.FamilyStatus,
  BiasType.Gender,
  BiasType.Racial,
  BiasType.Ethnic,
  BiasType.MentalAbility,
  BiasType.Religious,
  BiasType.PhysicalAbility,
  BiasType.EmotionalStatus,
  BiasType.SocioEconomic,
  BiasType.Potential,
  BiasType.None,
]

export const getRulesForBiasType = (bias: BiasType) => {
  switch (bias) {
    case BiasType.Language:
      return /\b(language)+/gi
    case BiasType.FamilyStatus:
      return /\b(family)+/gi
    case BiasType.Gender:
      return /\b(he|him|she|her)+/gi
    case BiasType.Racial:
      return /\b(ghetto|master|slave|uppity|peanut gallery|gypsy|gyp|paddy wagon?s|bugger|hooligan)+/gi
    case BiasType.Ethnic:
      return /\b(ethnic)+/gi
    case BiasType.MentalAbility:
      return /\b(mental)+/gi
    case BiasType.Religious:
      return /\b(religious|religion)+/gi
    case BiasType.PhysicalAbility:
      return /\b(physical|physical ability)+/gi
    case BiasType.EmotionalStatus:
      return /\b(emotional|socio)+/gi
    case BiasType.SocioEconomic:
      return /\b(socio|economic)+/gi
    default:
      return /\b(default)+/gi
  }
}

export type DetectedBias = {
  type: BiasType
  offset: 0
  length: 20
  text: 'his'
  suggestions: BiasFixSuggestion[]
}

type BiasFixSuggestion = {
  offence: string
  replacement: string
}

interface Props {
  bias: DetectedBias
}

export const BiasCard = ({ bias }: Props) => {
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
