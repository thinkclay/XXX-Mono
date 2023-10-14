import { Extension, Mark } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    bias: {
      proofread: () => void
    }
    mark: {
      /**
       * Set a bias mark
       */
      setBiasMark: (attributes?: { class: string; message: string; suggestions: string[]; from: number; to: number }) => ReturnType
      /**
       * Toggle a bias mark
       */
      toggleBiasMark: (attributes?: { class: string; message: string; suggestions: string[]; from: number; to: number }) => ReturnType
      /**
       * Unset a bias mark
       */
      unsetBiasMark: () => ReturnType

      /**
       * Set a language mark
       */
      setLanguageMark: (attributes?: { class: string; message: string; suggestions: string[]; from: number; to: number }) => ReturnType
      /**
       * Toggle a language mark
       */
      toggleLanguageMark: (attributes?: { class: string; message: string; suggestions: string[]; from: number; to: number }) => ReturnType
      /**
       * Unset a language mark
       */
      unsetLanguageMark: () => ReturnType
    }
  }
}

export interface BiasStorage {
  fetching: boolean
  match: Match | null
  lastCheckedAt: number
}

export interface BiasMarkOptions {
  HTMLAttributes: Record<string, any>
}

// export declare const Bias: Extension<BiasStorage, any>
// export declare const BiasMark: Mark<BiasMarkOptions, any>

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

export interface BiasResponse {
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

export interface Type {
  typeName: string
}

export interface Category {
  id: string
  name: string
}

export interface Rule {
  id: string
  description: string
  issueType: IssueType
  category: Category
}

export type LTType = 'misspelling' | 'grammar' | 'typographical' | 'style' | 'whitespace' | 'non-conformance'
export type AIType = 'none' | 'cultural' | 'disability' | 'behavioral' | 'gender' | 'household' | 'potential' | 'racial'
export type IssueType = LTType | AIType

export type CategoryType = 'bias' | 'language'

export interface Match {
  message: string
  shortMessage: string
  replacements: Replacement[]
  offset: number
  length: number
  context: Context
  sentence: string
  type: Type
  rule: Rule
  ignoreForIncompleteSentence: boolean
  contextForSureMatch: number
}

export interface Replacement {
  value: string
}

export interface LanguageResponse {
  software: Software
  warnings: Warnings
  language: Language
  matches: Match[]
}
