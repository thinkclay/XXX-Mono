/** @format */

import { ChangeEvent, useEffect, useState } from 'react'
import { Configuration, CreateCompletionResponse, OpenAIApi } from 'openai'
import { AxiosResponse } from 'axios'

import logo from './logo.svg'
import './App.css'
import Hints, { Hint } from './Hints'
import { Marker } from './Mark'
import Editor from './Editor'

const configuration = new Configuration({
  apiKey: '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',
})

const openai = new OpenAIApi(configuration)

async function getRevision(prompt: string) {
  const promptScaffold = `
Rewrite the following text removing bias, softening tone, correcting spelling, and grammar.\n\n
${prompt}\n\n

Assuming the following schema (yaml):
\n\n
---\n
output: ''\n
bias:\n
- original: ''\n
  reason: ''\n
  correction: ''\n
\n\n
Return a json object wrapped in backticks.\n
object.output should contain the new and recommended text with corrections.\n
object.bias should explain bias with reasons and corrections as an array\n
`

  return await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: promptScaffold,
    temperature: 1.0,
    max_tokens: 500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
}

const placeholder =
  'Cyrus is disruptive in class. He is constantly distracting other students and is aggressive with me when I try to correct his behavior. Can you please respond to me ASAP so that we can discus a course of action?'

interface Revision {
  output?: string
  bias?: [Hint]
}

const _parseRevision = (response: AxiosResponse<CreateCompletionResponse>): null | Revision => {
  if (response && response.data && response.data.choices.length > 0 && response.data.choices[0].text) {
    let raw = response.data.choices[0].text.replaceAll('`', '')
    console.log('_parseRevision', raw)
    let refined = JSON.parse(raw)
    console.log('-- Refined', refined)
    return refined as Revision
  }

  console.log('-- Uh oh..', response?.data)

  return null
}

function App() {
  const [_revision, _setRevision] = useState<null | Revision>(null)
  const [_prompt, _setPrompt] = useState<string>(placeholder)
  const [_loading, _setLoading] = useState<boolean | null>(null)

  const _onPromptChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    _setPrompt(event.currentTarget.value)
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

      const result = getRevision(_prompt)
        .then(response => {
          console.log('-- Response', response)
          _setRevision(_parseRevision(response))
          _setLoading(false)
          return response
        })
        .catch(err => {
          console.error(err)
          _setLoading(null)
        })

      console.log('Result', result)
    }

    if (_loading === false) {
      console.log('Not Fetching')
    }
  }, [_loading])

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <Editor />

        <input type="submit" value="ReVision" onClick={_onSubmit} />

        <Marker
          // mark={_revision?.bias}
          mark={[
            {
              original: 'Cyrus is disruptive in class.',
              reason: 'Identifying Cyrus using a label',
              correction: 'Cyrus has been exhibiting disruptive behavior in class.',
            },
            {
              original: 'He is constantly distracting other students and is aggressive with me when I try to correct his behavior',
              reason: 'Subjective language - Implication of causality and judgement of character',
              correction:
                'His actions have been distracting other students, and he has displayed aggression when asked to alter his behavior.',
            },
            {
              original: 'Can you please respond to me ASAP so that we can discus a course of action?',
              reason: 'Grammatical error and colloquial language',
              correction:
                'Could you please let me know what can be done to address this so that we can discuss a possible course of action?',
            },
          ]}
          // mark={[
          //   {
          //     original: 'He is aggressive with me',
          //     reason: 'Expressing aggression towards an individual could be viewed as gendered.',
          //     correction: 'He has expressed aggression towards me',
          //   },
          // ]}
          elementProps={{ title: 'test' }}
          options={{
            accuracy: 'partially',
            separateWordSearch: false,
          }}
        >
          {_revision?.output || _prompt}
        </Marker>

        {/* <Highlight text={_prompt} hints={_revision?.bias || []} /> */}

        <Hints hints={_revision?.bias} />
      </header>
    </div>
  )
}

export default App
