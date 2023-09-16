/** @format */

import OpenAI from 'openai'
import { APIPromise } from 'openai/core'

interface RevisionSuggestion {
  input: string
  reason: string
  replacements: string
}

interface Revision {
  bias: RevisionSuggestion[]
}

const OAI_KEY = atob('c2stamZ5UmhQZDIyRHNURUxBUU9iMFlUM0JsYmtGSjVPRThoRTR6bndtRHl5YWpHMjh5')
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY || OAI_KEY,
  organization: 'org-jPyM8UpbzbxetZLm0oDVNUd1',
  dangerouslyAllowBrowser: true,
})

export function getRevision(prompt: string) {
  const promptScaffold = `
    Rewrite the following text removing bias, softening tone, correcting spelling, and grammar. With a maximum of 3 recommendations.\n\n
    ${prompt}\n\n

    Assuming the following schema (yaml):
    \n\n
    ---\n
    bias:\n
    - input: ''\n
      reason: ''\n
      replacements: ''\n
    \n\n
    Return a json object wrapped in backticks.\n
    object.bias should explain bias with reasons and replacements as an array with a maximum of 5 results\n
`

  return openai.completions.create({
    model: 'text-davinci-003',
    prompt: promptScaffold,
    temperature: 1.0,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
}

export function getRevisedCopy(prompt: string) {
  const promptScaffold = `
    Remove all opinions, subjective language, and judgments from the following sentences, and rewrite them using objective language with no opinions, only observable actions and words and statements of events that have taken place:\n\n${prompt}`

  return openai.completions.create({
    model: 'text-davinci-003',
    prompt: promptScaffold,
    temperature: 1.0,
    max_tokens: 1500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
}

export const parseRevision = (response: OpenAI.Completions.Completion): null | Revision => {
  if (response && response.choices.length > 0 && response.choices[0].text) {
    const raw = response.choices[0].text.replaceAll('`', '')
    console.log('-- RAW', raw)
    const refined = JSON.parse(raw)
    console.log('-- PARSED', refined)

    return refined as Revision
  }

  console.log('-- Uh oh..', response)

  return null
}

export function getToneEmoji(prompt: string): APIPromise<OpenAI.Completions.Completion> {
  const promptScaffold = `
    Considering the following emojis mapped to sentiment:
    Positive - thumbs up 👍
    Accusatory - thumbs down 👎
    Happy - smiley face 😃
    Sad - crying face 😢
    Enthusiastic - hands raised 🙌
    Neutral - shrug 🤷‍♀️
    Surprised - shocked face 😮
    Collaborative - clapping hands 👏
    Discouraging - face with open mouth and sweat 😰
    Insulting - 😤
    Angry- 😡
    Concerned - worried face 😟
    Condescending - rolling eyes 🙄
    Angry - red-faced angry 😠
    Confident - sunglasses face 😎
    Defensive - face shouting 🗣️
    Joyful - smiling face with heart-eyes 😍
    Optimistic - folded hands 🙏
    Confused - face with raised eyebrow 🤨
    Amused - grinning face with smiling eyes 😄
    Frustrated - face with steam from nose 😤
    Calm - relaxed face 😌
    Anxious - face with raised eyebrow and sweat 😅
    Hopeful - face with starry eyes 😊
    Excited - face with party hat 🎉
    Proud - face with smiling eyes and hands on hips 😊
    Impatient - hourglass ⌛
    Bored - expressionless face 😑
    Relieved - smiling face with sweat 😅
    Loving - red heart ❤️
    Crying - loudly crying face 😭

    Please analyze the tone of the following text and respond with a format of <emoji> <reason>:

    ${prompt}.
  `

  return openai.completions.create({
    model: 'text-davinci-003',
    prompt: promptScaffold,
    temperature: 1.0,
    max_tokens: 1500,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
}
