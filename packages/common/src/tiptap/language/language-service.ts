/** @format */

import { LanguageToolResponse } from './language-types'

export interface BiasCategory {
  id: number
  name: string
}

export interface BiasClass {
  id: number
  name: string
  percent: number
  color: string
}

// From Rails API Service
export interface BiasClassResult {
  input: string
  results: BiasClass[]
}

export const LANGUAGE_URL = 'https://language-tool.herokuapp.com/v2/'
export const BIAS_URL = 'https://revisioned.herokuapp.com/api/v1/'

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

export async function fetchProof(input: string): Promise<LanguageToolResponse> {
  return await fetch(`${LANGUAGE_URL}check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: `text=${encodeURIComponent(input)}&language=auto&enabledOnly=false`,
  }).then(r => r.json())
}

export const fetchCategories = async (): Promise<BiasCategory[]> => {
  console.log('Categories/FETCHING: ')
  const result = await fetch(`${BIAS_URL}categories`).then(r => r.json())
  console.log('Categories/RESPONSE: ', result)

  return result
}

export const fetchCompletions = async (input: string) => {
  console.log('Completions/FETCHING: ', input)
  const result = await fetch(`${BIAS_URL}completions`, apiBody(input)).then(r => r.json())
  console.log('Completions/RESPONSE: ', input)

  return result
}

export const fetchClassifications = async (input: string): Promise<BiasClassResult[]> => {
  console.log('Completions/FETCHING: ', input)
  const result = await fetch(`${BIAS_URL}classifications`, apiBody(input)).then(r => r.json())
  console.log('Completions/RESPONSE: ', result)

  return result
}
