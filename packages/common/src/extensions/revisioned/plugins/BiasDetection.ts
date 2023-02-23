/** @format */

import { getBiasTypeFromAI, BiasType, getTitleForBiasType } from '@common/views/BiasCard'
import { LinterPlugin } from './plugins'

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

export class BiasDetection extends LinterPlugin {
  scan() {
    this.doc.descendants((node: any, position: number) => {
      this.bias.forEach(bias => {
        const biasType = getBiasTypeFromAI(bias.results[0].id)

        if (biasType === BiasType.None) return

        let match: any
        match = new RegExp(bias.input, 'gid').exec(node.text)

        if (match === null) return

        match.indices.forEach((index: any) => {
          const [from, to] = index
          const label = getTitleForBiasType(biasType)
          const color = bias.results[0].color

          this.record(`${label} bias detected in "${match}"`, from, to, biasType, color, () => {
            alert(`${label} bias detected in "${match}"`)
          })
        })
      })
    })

    return this
  }
}
