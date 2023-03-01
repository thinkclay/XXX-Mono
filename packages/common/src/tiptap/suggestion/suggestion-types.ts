/** @format */

export interface BiasCategory {
  id: number
  name: string
}

export interface BiasClass {
  id: number
  name: string
  percent: number
  color: string
}

// From Rails API Service
export interface BiasClassResult {
  input: string
  results: BiasClass[]
}

export interface BiasMap {
  [key: string]: BiasCategory
}

export interface BiasFlag {
  message: string
  from: number
  to: number
  type: string
  color: string
  fix?: Function
}

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
