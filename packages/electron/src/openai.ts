/** @format */

import { AxiosResponse } from 'axios'
import { Configuration, CreateCompletionResponse, OpenAIApi } from 'openai'

import { Hint } from '@revision/common/src/types/Revision'

interface Revision {
  output?: string
  bias?: [Hint]
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
const configuration = new Configuration({
  apiKey: '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',
})

const openai = new OpenAIApi(configuration)

export function getRevision(prompt: string) {
  const promptScaffold = `
Rewrite the following text removing bias, softening tone, correcting spelling, and grammar.\n\n
${prompt}\n\n

Assuming the following schema (yaml):
\n\n
---\n
output: ''\n
bias:\n
- original: ''\n
  reason: ''\n
  correction: ''\n
\n\n
Return a json object wrapped in backticks.\n
object.output should contain the new and recommended text with corrections.\n
object.bias should explain bias with reasons and corrections as an array\n
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
