/** @format */

import { useEffect, useState } from 'react'
import { Configuration, CreateCompletionResponse, OpenAIApi } from 'openai'
import { AxiosResponse } from 'axios'

import './styles/App.css'
import Hints, { Hint } from './views/Hints'
import { Marker } from './views/mark'
import Logo from './views/Logo'

const placeholder =
  'Cyrus is disruptive in class. He is constantly distracting other students and is aggressive with me when I try to correct his behavior. Can you please respond to me ASAP so that we can discus a course of action?'

function App() {
  const [_revision, _setRevision] = useState<null | Revision>(null)
  const [_prompt, _setPrompt] = useState<string>(placeholder)
  const [_loading, _setLoading] = useState<boolean | null>(null)
  const [_html, _setHtml] = useState<string>('')

  const _emitChange = (event: any) => {
    _setPrompt(event.currentTarget.textContent)
    _setHtml(event.target.innerHTML)
    console.log('HTML:', _html)
  }

  const _onPaste = (event: any) => {
    event.preventDefault()
    const text = (event.originalEvent || event).clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  const _onSubmit = () => {
    _setLoading(true)
  }

  useEffect(() => {
    if (_loading === null || _prompt.trim().length < 10) {
      return
    }

    if (_loading === true) {
      console.log('Fetching')

      window.openAI
        .request(_prompt)
        .then(result => {
          console.log('-- Result', result)
          _setRevision(result)
          _setLoading(false)
        })
        .catch(err => {
          console.error(err)
          _setLoading(null)
        })
    }

    if (_loading === false) {
      console.log('Not Fetching')
    }
  }, [_loading, _prompt])

  return (
    <div className="App">
      <Logo className={_loading ? 'loading' : ''} handler={_onSubmit} />

      <div className="layout">
        <Marker
          mark={_revision?.bias || ''}
          // mark={[
          //   {
          //     original: 'Cyrus is disruptive in class.',
          //     reason: 'Identifying Cyrus using a label',
          //     correction: 'Cyrus has been exhibiting disruptive behavior in class.',
          //   },
          //   {
          //     original: 'He is constantly distracting other students and is aggressive with me when I try to correct his behavior',
          //     reason: 'Subjective language - Implication of causality and judgement of character',
          //     correction:
          //       'His actions have been distracting other students, and he has displayed aggression when asked to alter his behavior.',
          //   },
          //   {
          //     original: 'Can you please respond to me ASAP so that we can discus a course of action?',
          //     reason: 'Grammatical error and colloquial language',
          //     correction: 'Could you please let me know what can be done to address this so that we can discuss a possible course of action?',
          //   },
          // ]}
          // mark={[
          //   {
          //     original: 'He is aggressive with me',
          //     reason: 'Expressing aggression towards an individual could be viewed as gendered.',
          //     correction: 'He has expressed aggression towards me',
          //   },
          // ]}
          elementProps={{
            className: 'editor',
            contentEditable: true,
            suppressContentEditableWarning: true,
            onPaste: _onPaste,
            onBlur: _emitChange,
            onInput: _emitChange,
          }}
          options={{
            accuracy: 'partially',
            separateWordSearch: false,
          }}
        >
          {placeholder}
        </Marker>

        <div className="Suggestions">
          <Hints hints={_revision?.bias} />
        </div>
      </div>
    </div>
  )
}

export default App
