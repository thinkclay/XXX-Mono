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

export interface Replacement {
  value: string
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

export type LTType = 'misspelling' | 'grammar' | 'typographical' | 'style' | 'whitespace' | 'non-conformance'
export type AIType = 'None' | 'Cultural' | 'Disability' | 'Behavioral' | 'Gender' | 'Household' | 'Potential' | 'Racial'
export type IssueType = LTType | AIType

export const ltTypes: LTType[] = ['misspelling', 'grammar', 'typographical', 'style', 'whitespace', 'non-conformance']
export const aiTypes: AIType[] = ['None', 'Cultural', 'Disability', 'Behavioral', 'Gender', 'Household', 'Potential', 'Racial']

export interface Rule {
  id: string
  description: string
  issueType: IssueType
  category: Category
}

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

export interface LanguageToolResponse {
  software: Software
  warnings: Warnings
  language: Language
  matches: Match[]
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    languagetool: {
      /**
       * Proofreads whole document
       */
      proofread: () => ReturnType

      toggleProofreading: () => ReturnType

      ignoreLanguageToolSuggestion: () => ReturnType

      resetLanguageToolMatch: () => ReturnType

      toggleLanguageTool: () => ReturnType

      getLanguageToolState: () => ReturnType
    }
  }
}

export interface TextNodesWithPosition {
  text: string
  from: number
  to: number
}

export interface LanguageToolOptions {
  language: string
  automaticMode: boolean
  documentId: string | number | undefined
}

export interface LanguageToolStorage {
  match?: Match
  loading?: boolean
  matchRange?: { from: number; to: number }
  active: boolean
}
