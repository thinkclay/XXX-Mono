/** @format */

import { atom, selector } from 'recoil'

export const rootDefault = {
  menuOpen: false,
  loading: false,
  route: 'login',
}

export const rootState = atom({
  key: 'root',
  default: rootDefault,
})

export const menuState = selector({
  key: 'menuState',
  get: ({ get }) => get(rootState).menuOpen,
})

export const loadingState = selector({
  key: 'loadingState',
  get: ({ get }) => get(rootState).loading,
})

export const routeState = selector({
  key: 'routeState',
  get: ({ get }) => get(rootState).route,
})
