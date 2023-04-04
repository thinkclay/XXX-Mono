/** @format */

import { PageProps } from "@common/types/UI";
import Fill from "../Welcome/Fill";
import { useState } from "react";

function Settings({ mode }: PageProps) {
  const [_formState, _setFormState] = useState(false);
  return (
    <div className="WelcomeScreen">
      <h1>Setting page</h1>
      <ul className="terms">
      <li onClick={() => _setFormState(!_formState)}>
          <Fill checked={_formState} />
          <input
            type="checkbox"
            name="spell-checker"
            checked={_formState}
            onChange={() => null}
          />
          <label htmlFor="spell-checker">Spell Checker</label>
        </li>
        </ul>
    </div>
  );
}

export default Settings;
