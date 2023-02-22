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
