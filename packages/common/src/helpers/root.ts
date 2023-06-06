/** @format */

import { atom, selector } from 'recoil'

export const rootDefault = {
  route: '/',
  menuOpen: false,
  loading: false,
  spellingCount: 0,
  biasCount: 0,
  fetchingTone: false,
  fetchingLanguage: false,
  fetchingRevision: false,
  acceptedTerms: false,
  spellCheck: true,
}

export const rootState = atom({
  key: 'root',
  default: rootDefault,
})

export const routeState = selector({
  key: 'root.routeState',
  get: ({ get }) => get(rootState).route,
})

export const menuState = selector({
  key: 'root.menuState',
  get: ({ get }) => get(rootState).menuOpen,
})

export const loadingState = selector({
  key: 'root.loadingState',
  get: ({ get }) => get(rootState).loading,
})

export const spellingCountState = selector({
  key: 'root.spellingCount',
  get: ({ get }) => get(rootState).spellingCount,
})

export const biasCountState = selector({
  key: 'root.biasCount',
  get: ({ get }) => get(rootState).biasCount,
})

export const fetchingToneState = selector({
  key: 'root.fetchingToneState',
  get: ({ get }) => get(rootState).fetchingTone,
})

export const fetchingLanguageState = selector({
  key: 'root.fetchingLanguageState',
  get: ({ get }) => get(rootState).fetchingLanguage,
})

export const fetchingRevisionState = selector({
  key: 'root.fetchingRevisionState',
  get: ({ get }) => get(rootState).fetchingRevision,
})

export const termsState = selector({
  key: 'root.termsState',
  get: ({ get }) => get(rootState).acceptedTerms,
})

export const spellCheckState = selector({
  key: 'root.spellCheckState',
  get: ({ get }) => get(rootState).spellCheck,
})
