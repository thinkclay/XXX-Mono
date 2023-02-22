/**
 * @see https://www.electronjs.org/docs/latest/tutorial/context-isolation
 * @format
 */

import { Revision } from './Revision'

export interface OpenAIBridge {
  request: (prompt: string) => Promise<Revision | null>
}

declare global {
  interface Window {
    openAI: OpenAIBridge
  }
}
