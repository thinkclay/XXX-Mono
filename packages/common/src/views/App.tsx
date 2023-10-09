/** @format */

import { StrictMode } from 'react'
import { RecoilRoot } from 'recoil'

import { RenderMode } from '@common/types/UI'
import { FirebaseApp, FirebaseAddons, FirebaseUserContext } from '@common/views/Contexts/FirebaseContext'

import Main from './Main'

interface Props {
  mode: RenderMode
  onUpdate?: (text: string) => void
}

export default function App(props: Props) {
  if (props.mode !== 'embedded') {
    require('@common/assets/styles/index.scss')
  }

  return (
    <RecoilRoot>
      <StrictMode>
        <FirebaseApp>
          <FirebaseAddons>
            <FirebaseUserContext>
              <Main {...props} />
            </FirebaseUserContext>
          </FirebaseAddons>
        </FirebaseApp>
      </StrictMode>
    </RecoilRoot>
  )
}
