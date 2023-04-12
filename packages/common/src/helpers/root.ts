/** @format */

import { atom, selector } from 'recoil'

export const rootDefault = {
  route: '/',
  menuOpen: false,
  loading: false,
  fetchingLanguage: false,
  fetchingRevision: false,
  acceptedTerms: false,
  spellCheck:true
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

export const gStatus = selector({
  key: 'root.spellCheckStatus',
  get: ({ get }) => get(rootState).spellCheck,
})
