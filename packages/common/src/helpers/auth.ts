import { atom } from 'recoil'

export const authDefault = {
  user: null,
  loading: true,
}

export const authState = atom({
  key: 'auth',
  default: authDefault,
})

export const userState = atom({
  key: 'userState',
  default: null,
})

export const loadingState = atom({
  key: 'loadingState',
  default: true,
})
