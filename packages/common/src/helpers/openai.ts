/** @format */

import { AxiosResponse } from 'axios'
import { Configuration, CreateCompletionResponse, OpenAIApi } from 'openai'

interface RevisionSuggestion {
  original: string
  reason: string
  correction: string
}

interface Revision {
  bias: RevisionSuggestion[]
}

export function getRevision(prompt: string, key?: string) {
  const configuration = new Configuration({
    apiKey: key || process.env.OPENAI_KEY,
  })

  const openai = new OpenAIApi(configuration)

  const promptScaffold = `
Rewrite the following text removing bias, softening tone, correcting spelling, and grammar. With a maximum of 5 recommendations.\n\n
${prompt}\n\n

Assuming the following schema (yaml):
\n\n
---\n
bias:\n
- original: ''\n
  reason: ''\n
  correction: ''\n
\n\n
Return a json object wrapped in backticks.\n
object.bias should explain bias with reasons and corrections as an array with a maximum of 5 results\n
`

  return openai.createCompletion({
    model: 'text-davinci-003',
    prompt: promptScaffold,
    temperature: 1.0,
    max_tokens: 500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
}

export function getRevisedCopy(prompt: string, key?: string) {
  const configuration = new Configuration({
    apiKey: key || process.env.OPENAI_KEY,
  })

  const openai = new OpenAIApi(configuration)

  const promptScaffold = `
    Rewrite the following text removing bias, softening tone, correcting spelling, and grammar.\n\n${prompt}`

  return openai.createCompletion({
    model: 'text-davinci-003',
    prompt: promptScaffold,
    temperature: 1.0,
    max_tokens: 500,
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
