/** @format */

import { LanguageToolResponse } from './language-types'

export const LANGUAGE_URL = 'https://language-tool.herokuapp.com/v2'

export async function fetchProof(input: string): Promise<LanguageToolResponse> {
  return await fetch(`${LANGUAGE_URL}/check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: `text=${encodeURIComponent(input)}&language=auto&enabledOnly=false`,
  }).then(r => r.json())
}
