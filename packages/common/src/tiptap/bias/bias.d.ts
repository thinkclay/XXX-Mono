import { Extension, Mark } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mark: {
      /**
       * Set a bias mark
       */
      setBiasMark: (attributes?: { class: string; message: string; suggestions: string[]; from: number; to: number }) => ReturnType
      /**
       * Toggle a bias mark
       */
      toggleBiasMark: (attributes?: { class: string; message: string; suggestions: string[]; from: number; to: number }) => ReturnType
      /**
       * Unset a bias mark
       */
      unsetBiasMark: () => ReturnType
    }
  }
}

export interface BiasStorage {
  fetching: boolean
  match: Match | null
  lastCheckedAt: number
}

export interface BiasMarkOptions {
  HTMLAttributes: Record<string, any>
}

export declare const Bias: Extension<BiasStorage, any>
export declare const BiasMark: Mark<BiasMarkOptions, any>
