/** @format */

import { Node as ProsemirrorNode } from '@tiptap/pm/model'
import { BiasedResult } from './BiasDetection'

export interface Result {
  message: string
  from: number
  to: number
  type: string
  color: string
  fix?: Function
}

export class LinterPlugin {
  protected doc

  protected bias: Array<BiasedResult> = []

  private results: Array<Result> = []

  constructor(doc: ProsemirrorNode, bias: BiasedResult[]) {
    this.doc = doc
    this.bias = bias
  }

  record(message: string, from: number, to: number, type: string, color: string, fix?: Function) {
    this.results.push({
      message,
      from,
      to,
      type,
      color,
      fix,
    })
  }

  scan() {
    return this
  }

  getResults() {
    return this.results
  }
}
