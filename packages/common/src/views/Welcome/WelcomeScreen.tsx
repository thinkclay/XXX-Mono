/** @format */

import { useState } from 'react'

import LogoFull from './LogoFull'
import Fill from './Fill'

import '@common/assets/styles/welcome.css'

interface WelcomeScreenProps {
  handler: () => void
}

function WelcomeScreen({ handler }: WelcomeScreenProps) {
  const [_formState, _setFormState] = useState({
    terms: false,
    privacy: false,
    conditions: false,
  })

  const _accepted = () => _formState.terms && _formState.privacy && _formState.conditions

  const _submitHandler = () => {
    if (_accepted()) handler()
  }

  return (
    <div className="WelcomeScreen">
      <LogoFull />
      <div className="text">
        <p>
          Welcome to ReVision, an AI and human powered bias-flagging tool! Before we get started, please read our{' '}
          <a href="https://revisioned.org/terms" target="_blank">
            Terms and Conditions
          </a>{' '}
          and let us know that you agree. If you are a part of a school, please make sure to read the additional terms related to student
          data and privacy.{' '}
        </p>
        <p>
          We get it, Terms and Conditions can be a bit lengthy. Most importantly, please check each of the following to indicate that you
          agree and understand:
        </p>
      </div>

      <ul className="terms">
        <li onClick={() => _setFormState({ ..._formState, terms: !_formState.terms })}>
          <Fill checked={_formState.terms} />
          <input type="checkbox" name="terms" checked={_formState.terms} onChange={() => null} />
          <label htmlFor="terms">
            I am excited to try out ReVision! Or at least am curious about it. I am using it of my own free will and accept the Terms of
            Use.
          </label>
        </li>
        <li onClick={() => _setFormState({ ..._formState, privacy: !_formState.privacy })}>
          <Fill checked={_formState.privacy} />
          <input type="checkbox" name="privacy" checked={_formState.privacy} onChange={() => null} />
          <label htmlFor="privacy">
            I understand that ReVision may collect and use anonymized data to share, but that no identifiable data about me or usage will be
            exposed to any party.
          </label>
        </li>
        <li onClick={() => _setFormState({ ..._formState, conditions: !_formState.conditions })}>
          <Fill checked={_formState.conditions} />
          <input type="checkbox" name="conditions" checked={_formState.conditions} onChange={() => null} />
          <label htmlFor="conditions">
            I understand that ReVision is a cutting-edge A.I. tool in active development. I accept the Conditions that the app may contain
            glitches and that if it sometimes offers suggestions that do not make sense, I won't behave maliciously or freak out about that.
          </label>
        </li>
      </ul>

      <button className="button bordered" disabled={!_accepted()} onClick={_submitHandler}>
        Accept & Continue
      </button>
    </div>
  )
}

export default WelcomeScreen
