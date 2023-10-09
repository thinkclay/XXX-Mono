import { firestore } from '@common/services/firebase'
import { BiasResponse, BiasCategory, BiasClassResult, LanguageResponse } from './bias'

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

  const reqPayload = body ? apiBody(body) : undefined
  const response = await fetch(`${API_BASE}/${path}`, reqPayload)

  if (!response.ok) {
    console.error(`API request failed with status: ${response.statusText}`)
    return null as T
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

export const fetchBiases = async (input: string): Promise<BiasResponse> => {
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
        return {} as BiasResponse
      }
    } else {
      return {} as BiasResponse
    }
  }

  const results = await apiRequest<BiasResponse>(API_PATH.CHECK, input)

  console.log('fetchBiases', results, firestore)

  return results
}

export async function fetchLanguage(input: string): Promise<LanguageResponse> {
  return await fetch('https://language-tool.herokuapp.com/v2/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: `text=${encodeURIComponent(input)}&language=auto&enabledOnly=false`,
  }).then(r => r.json())
}
