/** @format */

import { IssueType, Replacement } from '../language/language-types'

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
