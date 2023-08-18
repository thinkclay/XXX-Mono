export const TIPTAP = {
  BIAS: {
    FETCHING: 'TIPTAP/BIAS/FETCHING',
    RESULT: 'TIPTAP/BIAS/RESULT',
    MATCH: 'TIPTAP/BIAS/MATCH',
  },
  LANGUAGE: {
    INIT: 'TIPTAP/LANGUAGE/INIT',
    FETCH: 'TIPTAP/LANGUAGE/FETCH',
    MATCH: 'TIPTAP/LANGUAGE/MATCH',
  },
}

export const FIREBASE = {
  ANALYTICS: {
    BIAS: {
      FETCHED: 'FIREBASE/ANALYTICS/BIAS/FETCHED',
      CREATED: 'FIREBASE/ANALYTICS/BIAS/CREATED',
      UPDATED: 'FIREBASE/ANALYTICS/BIAS/UPDATED',
      ERROR: 'FIREBASE/ANALYTICS/BIAS/ERROR',
    },
  },
}

export function logger(type: string, data?: any) {
  console.log(type, data)
}