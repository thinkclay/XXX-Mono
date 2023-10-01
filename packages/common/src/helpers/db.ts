/** @format */

import { IssueType } from '@common/tiptap/language/language-types'
import Dexie, { Table } from 'dexie'

export interface Dictionary {
  id?: number
  value: string
  timestamp?: Date
}

export interface Suggestion {
  id?: number
  category: 'language' | 'bias'
  type: IssueType
  date: number
  input: string
  accepted?: boolean
  replacement?: string
}

//
// Declare Database
//
export class RevisionDB extends Dexie {
  public dictionary!: Table<Dictionary, number>
  public suggestion!: Table<Suggestion, number>

  public constructor() {
    super('revision')
    this.version(2).stores({
      dictionary: '++id, value',
      suggestion: '++id, category, type, date',
    })
  }
}

export const DB = new RevisionDB()
