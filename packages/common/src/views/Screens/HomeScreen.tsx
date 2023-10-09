import { useEffect, useState } from 'react'
import { useUser } from 'reactfire'

import EditorScreen from '@common/views/Screens/EditorScreen'
import WelcomeScreen from './WelcomeScreen'
import LoadingScreen from './LoadingScreen'
import AuthScreen from './AuthScreen'
import { PageProps } from '@common/types/UI'
import { MUser, upsertUser } from '@common/models'
import { useUserData } from '../Contexts/FirebaseContext'

interface Props extends PageProps {
  onUpdate?: (text: string) => void
}

function HomeScreen(props: Props) {
  const { status, data: session } = useUser<MUser>()
  const user = useUserData()
  const [acceptedTerms, setAcceptedTerms] = useState<boolean | undefined>(false)

  const _handler = async () => {
    session && upsertUser(session?.uid, { acceptedTerms: true }, session)
    setAcceptedTerms(true)
  }

  useEffect(() => {
    if (acceptedTerms || status !== 'success') return

    setAcceptedTerms(user?.acceptedTerms)
  }, [status, session, user])

  if (status !== 'success') return <LoadingScreen />
  if (!session || !user) return <AuthScreen {...props} />
  if (!acceptedTerms) return <WelcomeScreen handler={_handler} />

  return <EditorScreen {...props} />
}

export default HomeScreen
