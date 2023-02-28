/** @format */

import { getBiasTypeFromAI, BiasType, getTitleForBiasType } from '@common/views/BiasCard'
import { SuggestionPlugin } from './suggestion-plugin'

class BiasDetection extends SuggestionPlugin {
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
            console.log(`${label} bias detected in "${match}"`)
          })
        })
      })
    })

    return this
  }
}

export default BiasDetection
