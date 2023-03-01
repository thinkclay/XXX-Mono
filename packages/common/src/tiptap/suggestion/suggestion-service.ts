/** @format */

import { BiasCategory, BiasClassResult } from './suggestion-types'

const API_URL = 'https://revisioned.herokuapp.com/api/v1/'

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
  const result = await fetch(`${API_URL}categories`).then(r => r.json())
  console.log('Categories/RESPONSE: ', result)

  return result
}

export const fetchCompletions = async (input: string) => {
  console.log('Completions/FETCHING: ', input)
  const result = await fetch(`${API_URL}completions`, apiBody(input)).then(r => r.json())
  console.log('Completions/RESPONSE: ', input)

  return result
}

export const fetchClassifications = async (input: string): Promise<BiasClassResult[]> => {
  console.log('Completions/FETCHING: ', input)
  const result = await fetch(`${API_URL}classifications`, apiBody(input)).then(r => r.json())
  console.log('Completions/RESPONSE: ', result)

  return result
}
