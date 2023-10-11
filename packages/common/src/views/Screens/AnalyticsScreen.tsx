import { useEffect, useState } from 'react'
import { useUser } from 'reactfire'

import SuggestionsPie from '@common/views/Analytics/SuggestionsPie'
import { MSuggestion, getBiasSuggestionsByType, getSuggestionsByUser } from '@common/models'
import PieChart, { Datum } from '../Analytics/PieChart'
import { aiTypes, ltTypes } from '@common/tiptap/bias'

export default function Settings() {
  const { data: user } = useUser()
  const [suggestions, setSuggestions] = useState<MSuggestion[]>([])
  const [biasSummary, setBiasSummary] = useState<Datum[]>([])
  const [languageSummary, setLanguageSummary] = useState<Datum[]>([])

  useEffect(() => {
    if (!user || !user.uid) return

    const fetchData = async () => {
      // See getSuggestionsByUser for an example of how we should build complex queries
      // this allows us to isolate and keep our queries in the model and not polute the rendering component
      // Let's refactor the <SuggestionsPie /> component using dedicated helper functions
      const suggestionsData = await getSuggestionsByUser(user.uid)
      setSuggestions(suggestionsData)

      const bias = aiTypes.map(getBiasSuggestionsByType)
      const language = ltTypes.map(getBiasSuggestionsByType)

      Promise.all(bias)
        .then(results => {
          // Map the results to the desired format
          const formattedResults = results.map((result, index) => ({
            id: aiTypes[index],
            label: aiTypes[index],
            value: result.length,
          }))

          console.log(formattedResults)
          setBiasSummary(formattedResults)
        })
        .catch(error => {
          console.error(error)
        })

      Promise.all(bias)
        .then(results => {
          // Map the results to the desired format
          const formattedResults = results.map((result, index) => ({
            id: ltTypes[index],
            label: ltTypes[index] || 'other',
            value: result.length,
          }))

          console.log(formattedResults)
          setLanguageSummary(formattedResults)
        })
        .catch(error => {
          console.error(error)
        })
    }

    fetchData()
  }, [user])

  console.log('Suggestions', suggestions)

  return (
    <div className="WelcomeScreen">
      <h1 className="analytics-text">Analytics</h1>
      <PieChart data={biasSummary} />
      <PieChart data={languageSummary} />
      <SuggestionsPie />
    </div>
  )
}
