/** @format */

import { AxiosResponse } from 'axios'
import { Configuration, CreateCompletionResponse, OpenAIApi } from 'openai'

interface RevisionSuggestion {
  input: string
  reason: string
  replacements: string
}

interface Revision {
  bias: RevisionSuggestion[]
}

const OAI_KEY = atob('c2stamZ5UmhQZDIyRHNURUxBUU9iMFlUM0JsYmtGSjVPRThoRTR6bndtRHl5YWpHMjh5')
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY || OAI_KEY,
})
const openai = new OpenAIApi(configuration)

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

  return openai.createCompletion({
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
    Rewrite the following text removing bias, softening tone, correcting spelling, and grammar.\n\n${prompt}`

  return openai.createCompletion({
    model: 'text-davinci-003',
    prompt: promptScaffold,
    temperature: 1.0,
    max_tokens: 1500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
}

export const parseRevision = (response: AxiosResponse<CreateCompletionResponse>): null | Revision => {
  if (response && response.data && response.data.choices.length > 0 && response.data.choices[0].text) {
    const raw = response.data.choices[0].text.replaceAll('`', '')
    console.log('-- RAW', raw)
    const refined = JSON.parse(raw)
    console.log('-- PARSED', refined)

    return refined as Revision
  }

  console.log('-- Uh oh..', response?.data)

  return null
}
