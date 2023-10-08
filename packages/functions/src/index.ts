/** @format */

import { logger } from 'firebase-functions'
import { onRequest } from 'firebase-functions/v2/https'
import language from '@google-cloud/language'
import { google } from '@google-cloud/language/build/protos/protos'

/**
 * @url https://us-central1-unicorn-revision.cloudfunctions.net/analyzeSentiment
 */
export const helloWorld = onRequest(async (request, response) => {
  logger.info('Start of analyzeSentiment!', { structuredData: true })

  try {
    const client = new language.LanguageServiceClient()
    const text = 'Hello, world!'
    const document = {
      content: text,
      type: google.cloud.language.v1.Document.Type.PLAIN_TEXT,
    }

    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({ document })
    const sentiment = result.documentSentiment

    logger.info(`Text: ${text}`)
    logger.info(`Sentiment score: ${sentiment?.score}`)
    logger.info(`Sentiment magnitude: ${sentiment?.magnitude}`)

    response.send(`Sentiment score: ${sentiment?.score} / Sentiment magnitude: ${sentiment?.magnitude}`)
  } catch (error) {
    logger.error('Error analyzing sentiment:', error)
    response.status(500).send('Error analyzing sentiment')
  }

  return
})
