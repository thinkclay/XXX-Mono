/** @format */

import Dexie, { Table } from 'dexie'

import { MSuggestion } from '@common/models'

export interface Dictionary {
  id?: number
  value: string
  timestamp?: Date
}

//
// Declare Database
//
export class RevisionDB extends Dexie {
  public dictionary!: Table<Dictionary, number>
  public suggestion!: Table<MSuggestion, number>

  public constructor() {
    super('revision')
    this.version(2).stores({
      dictionary: '++id, value',
      suggestion: '++id, category, type, date',
    })
  }
}

export const DB = new RevisionDB()
