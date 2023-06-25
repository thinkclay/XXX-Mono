/** @format */
export interface Software {
  name: string
  version: string
  buildDate: string
  apiVersion: number
  premium: boolean
  premiumHint: string
  status: string
}

export interface Warnings {
  incompleteResults: boolean
}

export interface DetectedLanguage {
  name: string
  code: string
  confidence: number
}

export interface Language {
  name: string
  code: string
  detectedLanguage: DetectedLanguage
}

export interface Context {
  text: string
  offset: number
  length: number
}

export interface Category {
  id: string
  name: string
}

export type IssueType = 'none' | 'cultural' | 'disability' | 'behavioral' | 'gender' | 'household' | 'potential' | 'racial'
export const aiTypes: IssueType[] = ['none', 'cultural', 'disability', 'behavioral', 'gender', 'household', 'potential', 'racial']

export interface Match {
  message: string
  shortMessage: string
  replacements: Replacement[]
  offset: number
  length: number
  context: Context
  sentence: string
  type: IssueType
}

export interface Replacement {
  value: string
}

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

export interface BiasCompletionsResponse {
  input: string
  results: string[]
}

export interface BiasCompletions {
  input: string
  results: Replacement[]
}

export interface Bias {
  categories: string[]
  results: {
    input: string
    biases: {
      id: number
      name: IssueType
      color: string
      percent: number
    }[]
    replacements: string[]
  }[]
}

export enum BIAS_TR {
  MATCH_SET = 'MATCH_SET',
}
