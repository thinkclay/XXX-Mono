//  @format

import { PageProps } from '@common/types/UI'
import Fill from '../Welcome/Fill'
import { useEffect, useState } from 'react'
import { useFirebase } from '@common/services/firebase/hook'

function SettingsScreen({ mode }: PageProps) {
  const settings = localStorage.getItem('spellCheck')
  const [spellcheck, setSpellcheck] = useState<boolean | undefined>(settings !== null ? (settings === 'false' ? false : true) : true)
  const { authUser, updateUser, getUser } = useFirebase()

  const _handlerSpellCheck = async (check: boolean) => {
    if (authUser) {
      updateUser(authUser, { spellCheck: check, acceptedTerms: true })
      localStorage.setItem('spellCheck', check.toString())
    }
    setSpellcheck(check)
  }
  useEffect(() => {
    ;(async () => {
      if (authUser) {
        const user = await getUser(authUser)
        user.spellCheck !== undefined && setSpellcheck(user.spellCheck)
      }
    })()
  }, [authUser])

  return (
    <div className="WelcomeScreen">
      <h1>Settings</h1>
      <ul className="terms">
        <li onClick={() => _handlerSpellCheck(!spellcheck)}>
          <Fill checked={spellcheck} />
          <input type="checkbox" name="spell-checker" checked={spellcheck} onChange={() => null} />
          <label htmlFor="spell-checker">Use Native Spell Checker</label>
        </li>
      </ul>
    </div>
  )
}

export default SettingsScreen
