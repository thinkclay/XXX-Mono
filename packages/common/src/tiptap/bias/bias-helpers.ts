import { Match, Replacement } from '@common/tiptap/bias/bias-types'
import { IssueType } from '@common/tiptap/bias/bias-types'
import { fetchBiases } from '@common/tiptap/bias/bias-service'

export function findAndCreateMatch(
  text: string,
  body: string,
  type: IssueType,
  message: string,
  replacements: Replacement[]
): Match | void {
  if (type === 'none') return

  const m = new RegExp(text, 'gid').exec(body)

  if (!m || !m[0]) return

  console.log('matcher', m)

  const from = m.index

  return {
    message,
    shortMessage: message,
    replacements,
    offset: from,
    length: text.length,
    context: {
      text: text,
      offset: from,
      length: text.length,
    },
    sentence: text,
    type: {
      typeName: type,
    },
  }
}

export async function getBiasMatches(text: string): Promise<Match[]> {
  let matches: Match[] = []
  const biases = await fetchBiases(text)

  biases.results.forEach(bias => {
    // Biases are returned with weights with highest probability match returned first
    const type = bias.biases[0].name

    // Skip if the top match is None for bias
    if (type === 'none') return

    const m = findAndCreateMatch(
      bias.input,
      text,
      type,
      `This phrase may contain ${type
        .toLocaleLowerCase()
        .replace('potential ', '')} bias. Here are some examples of alternative statements:`,
      bias.replacements.map(r => ({ value: r }))
    )

    if (m) matches.push(m)
  })

  return matches
}
