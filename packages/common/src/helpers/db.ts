/** @format */

import Dexie, { Table } from 'dexie'

export interface IgnoredWords {
  id?: number
  value: string
}

export interface SpellingSuggestions {
  id?: number
  session: string
  text: string
  suggestion: string
}

//
// Declare Database
//
export class RevisionDB extends Dexie {
  public ignoredWords!: Table<IgnoredWords, number>
  public spellingSuggestions!: Table<SpellingSuggestions, number>

  public constructor() {
    super('revision')
    this.version(1).stores({
      ignoredWords: '++id, value',
      spellingSuggestions: '++, session',
    })
  }
}

export const DB = new RevisionDB()
