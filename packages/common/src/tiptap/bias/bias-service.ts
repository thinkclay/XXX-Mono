import { Bias, BiasCategory, BiasCompletions, BiasClassResult } from './bias-types'

export const BIAS_URL = 'https://revisioned.herokuapp.com'

function apiBody(input: string) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input,
    }),
  }
}

export const fetchCategories = async (): Promise<BiasCategory[]> => {
  console.log('Categories/FETCHING: ')
  const result = await fetch(`${BIAS_URL}/api/v1/categories`).then(r => r.json())
  console.log('Categories/RESPONSE: ', result)

  return result
}

export const fetchCompletions = async (input: string): Promise<BiasCompletions> => {
  console.log('Completions/FETCHING: ')

  const response = await fetch(`${BIAS_URL}/api/v1/completions`, apiBody(input)).then(r => r.json())
  const result: BiasCompletions = {
    input: response.input,
    results: response.results.map((r: string) => {
      {
        value: r
      }
    }),
  }

  console.log('Completions/RESPONSE: ', result)

  return result
}

export const fetchClassifications = async (input: string): Promise<BiasClassResult[]> => {
  console.log('Completions/FETCHING: ', input)
  const result = await fetch(`${BIAS_URL}/api/v1/classifications`, apiBody(input)).then(r => r.json())
  console.log('Completions/RESPONSE: ', result)

  return result
}

export const fetchBiases = async (input: string): Promise<Bias> => {
  console.log('Biases/FETCHING: ', input)

  // Ignore URLs
  const urlRegex = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-?=%.]+/
  if (urlRegex.test(input)) {
    console.log('Biases/IGNORED URL: ', input)
    const urlMatch = input.match(urlRegex)

    if (urlMatch) {
      const urlIndex = input.indexOf(urlMatch[0])
      const textAfterUrl = input.slice(urlIndex + urlMatch[0].length).trim()
      if (textAfterUrl) {
        input = textAfterUrl
      } else {
        console.log('Biases/NO TEXT AFTER URL: ', input)
        return {} as Bias
      }
    } else {
      console.log('Biases/URL MATCH NOT FOUND: ', input)
      return {} as Bias
    }
  }

  const result = await fetch(`${BIAS_URL}/check`, apiBody(input)).then(r => r.json())
  console.log('Biases/RESPONSE: ', result)

  return result
}
