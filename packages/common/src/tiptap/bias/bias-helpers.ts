import { AIType, IssueType, LTType, Match, Replacement } from '@common/tiptap/bias/bias'

export const ltTypes: LTType[] = ['misspelling', 'grammar', 'typographical', 'style', 'whitespace', 'non-conformance']
export const aiTypes: AIType[] = ['none', 'cultural', 'disability', 'behavioral', 'gender', 'household', 'potential', 'racial']

export function normalizeMatch(text: string, body: string, type: IssueType, message: string, replacements: Replacement[]): Match | void {
  if (type === 'none') return

  const m = new RegExp(text, 'gid').exec(body)

  if (!m || !m[0]) return

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
    rule: {
      id: 'noid',
      description: 'no description',
      issueType: type,
      category: {
        id: 'noid',
        name: type,
      },
    },
    ignoreForIncompleteSentence: false,
    contextForSureMatch: 0,
  }
}
