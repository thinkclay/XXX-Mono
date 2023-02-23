/** @format */

import { BiasedResult } from '../extensions/revisioned/plugins/BiasDetection'
import { BiasCategory } from '../types/Revision'

export const fetchCategories = async (): Promise<BiasCategory[]> => {
  const result = await fetch('https://revisioned.herokuapp.com/api/v1/categories')
  const json = await result.json()
  return json
}

export const fetchSuggestions = async (input: string) => {
  console.log('Fetching suggestions: ', input)
  const result = await fetch('https://revisioned.herokuapp.com/api/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input,
    }),
  })
  const json = await result.json()
  return json
}

export const fetchBias = async (text: string): Promise<BiasedResult[]> => {
  const response = await fetch('https://revisioned.herokuapp.com/api/v1/classifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: text,
    }),
  })

  return (await response.json()) as BiasedResult[]
}
