//  @format 


import { PageProps } from '@common/types/UI'
import Fill from '../Welcome/Fill'
import { useState } from 'react'
import { useFirebase } from "@common/services/firebase/hook";


function Settings({ mode }: PageProps) {
  const settings = localStorage.getItem("spellcheck");
  const [spellcheck, setSpellcheck] = useState<boolean | undefined>(settings !== null ? settings === 'false' ? false : true : true);
  const { authUser, updateUser } = useFirebase();

  const _handlerSpellCheck = async (check: boolean) => {
    if (authUser) {
      updateUser(authUser, { spellCheck: check, acceptedTerms: true });
      localStorage.setItem('spellcheck', check.toString());
      setSpellcheck(check);
    }

  };
  return (
    <div className="WelcomeScreen">
      <h1>Setting page</h1>
      <ul className="terms">
        <li onClick={() => _handlerSpellCheck(!spellcheck)}>
          <Fill checked={spellcheck} />
          <input
            type="checkbox"
            name="spell-checker"
            checked={spellcheck}
            onChange={() => null}
          />
          <label htmlFor="spell-checker">Spell Checker</label>
        </li>
      </ul>
    </div>
  )
}


export default Settings;
