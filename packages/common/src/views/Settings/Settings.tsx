/** @format */

import { PageProps } from "@common/types/UI";
import Fill from "../Welcome/Fill";
import { useEffect, useState } from "react";
import { useFirebase } from "@common/services/firebase/hook";

function Settings({ mode }: PageProps) {
  const [spellcheck, setSpellcheck] = useState<boolean | undefined>(true);
  const { authUser ,updateUser, getUser } = useFirebase();

  const _handlerSpellCheck = async (check: boolean) => {
    if (authUser) {
      updateUser(authUser, { spellCheck: check });
    }
    setSpellcheck(check);
  };
  useEffect(() => {
    (async () => {
      if (authUser) {
        const user = await getUser(authUser);
        user.spellCheck !== undefined && setSpellcheck(user.spellCheck);
      }
    })();
  }, [authUser]);
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
  );
}

export default Settings;
