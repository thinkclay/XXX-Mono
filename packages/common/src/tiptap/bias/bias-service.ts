import { Bias, BiasCategory, BiasCompletions, BiasClassResult } from './bias-types'

const API_BASE = 'https://revisioned.herokuapp.com'

enum API_PATH {
  CHECK = 'check',
  CATEGORIES = 'api/v1/categories',
  COMPLETIONS = 'api/v1/completions',
  CLASSIFICATIONS = 'api/v1/classifications',
}

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

async function apiRequest<T>(path: API_PATH, body?: string): Promise<T> {
  console.log(`BIAS/REQUEST/${path.toUpperCase()}`, { body })

  const response = body ? await fetch(`${API_BASE}/${path}`, apiBody(body)) : await fetch(`${API_BASE}/${path}`)

  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.statusText}`)
  }

  const data: T = await response.json()

  console.log(`BIAS/RESPONSE/${path.toUpperCase()}`, data)

  return data
}

export const fetchCategories = async (): Promise<BiasCategory[]> => {
  return await apiRequest<BiasCategory[]>(API_PATH.CATEGORIES)
}

export const fetchClassifications = async (input: string): Promise<BiasClassResult[]> => {
  return await apiRequest<BiasClassResult[]>(API_PATH.CLASSIFICATIONS, input)
}

export const fetchBiases = async (input: string): Promise<Bias> => {
  // @TODO: consider moving this to helper. Does it work for text before url matching or just after?
  // Ignore URLs
  const urlRegex = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-?=%.]+/
  if (urlRegex.test(input)) {
    const urlMatch = input.match(urlRegex)

    if (urlMatch) {
      const urlIndex = input.indexOf(urlMatch[0])
      const textAfterUrl = input.slice(urlIndex + urlMatch[0].length).trim()
      if (textAfterUrl) {
        input = textAfterUrl
      } else {
        return {} as Bias
      }
    } else {
      return {} as Bias
    }
  }

  return await apiRequest<Bias>(API_PATH.CHECK, input)
}
