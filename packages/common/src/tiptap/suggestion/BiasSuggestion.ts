/** @format */

import { Node as ProsemirrorNode } from '@tiptap/pm/model'
import { BiasClassResult, BiasFlag } from './suggestion-types'

export class BiasSuggestion {
  protected doc
  protected bias: Array<BiasClassResult> = []
  private results: Array<BiasFlag> = []

  constructor(doc: ProsemirrorNode, bias: BiasClassResult[]) {
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
