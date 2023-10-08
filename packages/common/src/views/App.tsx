/** @format */

import { StrictMode } from 'react'
import { RecoilRoot } from 'recoil'

import { RenderMode } from '@common/types/UI'
import { FirebaseApp, FirebaseAddons, FirebaseUserContext } from '@common/views/Contexts/FirebaseContext'

import '@common/assets/styles/reset.scss'
import '@common/assets/styles/index.scss'
import Main from './Main'

interface Props {
  mode: RenderMode
}

export default function App(screen: Props) {
  return (
    <RecoilRoot>
      <StrictMode>
        <FirebaseApp>
          <FirebaseAddons>
            <FirebaseUserContext>
              <Main {...screen} />
            </FirebaseUserContext>
          </FirebaseAddons>
        </FirebaseApp>
      </StrictMode>
    </RecoilRoot>
  )
}
