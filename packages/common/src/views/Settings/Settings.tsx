//  @format 


import { PageProps } from "@common/types/UI";
import Fill from "../Welcome/Fill";
import { useState } from "react";


function Settings({ mode }: PageProps) {
  const settings = localStorage.getItem("spellcheck");
  const [spellcheck, setSpellcheck] = useState<boolean | undefined>(settings !== null ? settings === 'false' ? false : true : true);
 const _handlerSpellCheck = (check:boolean) =>{
  setSpellcheck(check);
   localStorage.setItem('spellcheck',check.toString());
 }
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