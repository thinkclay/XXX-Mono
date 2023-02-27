/** @format */
interface Revision {
  output?: string
  bias?: [Hint]
}

export interface Hint {
  original?: string
  correction?: string
  reason?: string
}

export interface BiasCategory {
  id: number
  name: string
}

export interface BiasMap {
  [key: string]: BiasCategory
}

export interface BiasResultType {
  id: number
  name: string
  percent: number
  color: string
}

export interface BiasedResult {
  input: string
  results: BiasResultType[]
}
