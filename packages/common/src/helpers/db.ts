/** @format */

import Dexie, { Table } from 'dexie'

export interface Ignored {
  id?: number
  value: string
}

//
// Declare Database
//
export default class IgnoredDB extends Dexie {
  public ignoredWords!: Table<Ignored, number> // id is number in this case

  public constructor() {
    super('revision')
    this.version(1).stores({
      ignoredWords: '++id,value',
    })

    // TODO: Add in a default ignored word list on construction
  }
}
