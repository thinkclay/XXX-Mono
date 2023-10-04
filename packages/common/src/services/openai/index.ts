/** @format */

import OpenAI from 'openai'

interface RevisionSuggestion {
  input: string
  reason: string
  replacements: string
}

interface Revision {
  bias: RevisionSuggestion[]
}

const OAI_KEY = atob('c2stamZ5UmhQZDIyRHNURUxBUU9iMFlUM0JsYmtGSjVPRThoRTR6bndtRHl5YWpHMjh5')
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY || OAI_KEY,
  organization: 'org-PGtYgdSkRlmctEZXIu7nnpzW',
  dangerouslyAllowBrowser: true,
})

export function getRevision(prompt: string) {
  const promptScaffold = `
    Rewrite the following text removing bias, softening tone, correcting spelling, and grammar. With a maximum of 3 recommendations.\n\n
    ${prompt}\n\n

    Assuming the following schema (yaml):
    \n\n
    ---\n
    bias:\n
    - input: ''\n
      reason: ''\n
      replacements: ''\n
    \n\n
    Return a json object wrapped in backticks.\n
    object.bias should explain bias with reasons and replacements as an array with a maximum of 5 results\n
`

  return openai.completions.create({
    model: 'text-davinci-003',
    prompt: promptScaffold,
    temperature: 1.0,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
}

export function getRevisedCopy(prompt: string) {
  const promptScaffold = `
    Remove all opinions, subjective language, and judgments from the following sentences, and rewrite them using objective language with no opinions, only observable actions and words and statements of events that have taken place:\n\n${prompt}`

  return openai.completions.create({
    model: 'text-davinci-003',
    prompt: promptScaffold,
    temperature: 1.0,
    max_tokens: 1500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
}

export const parseRevision = (response: OpenAI.Completions.Completion): null | Revision => {
  if (response && response.choices.length > 0 && response.choices[0].text) {
    const raw = response.choices[0].text.replaceAll('`', '')
    console.log('-- RAW', raw)
    const refined = JSON.parse(raw)
    console.log('-- PARSED', refined)

    return refined as Revision
  }

  console.log('-- Uh oh..', response)

  return null
}

export async function getToneEmoji(prompt: string): Promise<{ icon?: string; message: string | null }> {
  console.log(`TONE/REQUEST`)

  const promptScaffold = `
    Considering the following emojis mapped to sentiment:
    Positive: 👍
    Accusatory: 👎
    Happy: smiley face 😃
    Sad: 😢
    Enthusiastic: 🙌
    Neutral: 🤷‍♀️
    Surprised: 😮
    Collaborative: 👏
    Discouraging: 😰
    Insulting: 😤
    Angry: 😡
    Concerned: 😟
    Condescending: 🙄
    Confident: 😎
    Defensive: 🗣️
    Joyful: 😍
    Optimistic: 🙏
    Confused: 🤨
    Amused: 😄
    Frustrated: 😤
    Calm: 😌
    Anxious: 😅
    Hopeful: 😊
    Excited: 🎉
    Proud: 😊
    Impatient: ⌛
    Bored: 😑
    Relieved: 😅
    Loving: ❤️
    Crying: 😭
    Please analyze the tone and sentiment of the following text and respond with a format of <emoji> <reason>:

    ${prompt}.
  `

  try {
    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: promptScaffold,
      temperature: 1.0,
      max_tokens: 250,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })

    const emojiRegex =
      /((\ud83c[\udde6-\uddff]){2}|([\#\*0-9]\u20e3)|(\u00a9|\u00ae|[\u2000-\u3300]|[\ud83c-\ud83e][\ud000-\udfff])((\ud83c[\udffb-\udfff])?(\ud83e[\uddb0-\uddb3])?(\ufe0f?\u200d([\u2000-\u3300]|[\ud83c-\ud83e][\ud000-\udfff])\ufe0f?)?)*)/g

    const message = response.choices[0].text
    const icon = message?.match(emojiRegex)?.[0]

    return { icon, message }
  } catch (error) {
    console.error(`TONE/REQUEST/ERROR`, error)
    return { icon: undefined, message: null }
  }
}
