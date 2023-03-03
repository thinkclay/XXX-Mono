/** @format */

import { atom, selector } from 'recoil'

export const rootDefault = {
  route: '/',
  menuOpen: false,
  loading: false,
  fetchingLanguage: false,
  fetchingRevision: false,
  acceptedTerms: false,
}

export const rootState = atom({
  key: 'root',
  default: rootDefault,
})

export const routeState = selector({
  key: 'routeState',
  get: ({ get }) => get(rootState).route,
})

export const menuState = selector({
  key: 'menuState',
  get: ({ get }) => get(rootState).menuOpen,
})

export const loadingState = selector({
  key: 'loadingState',
  get: ({ get }) => get(rootState).loading,
})

export const fetchingLanguageState = selector({
  key: 'fetchingLanguageState',
  get: ({ get }) => get(rootState).fetchingLanguage,
})

export const fetchingRevisionState = selector({
  key: 'fetchingRevisionState',
  get: ({ get }) => get(rootState).fetchingRevision,
})

export const termsState = selector({
  key: 'termsState',
  get: ({ get }) => get(rootState).acceptedTerms,
})
