import { useEffect, useState } from 'react'
import { useUser } from 'reactfire'

import SuggestionsPie from '@common/views/Analytics/SuggestionsPie'
import { MSuggestion, getSuggestionsByUser } from '@common/models'

function Settings() {
  const { data: user } = useUser()
  const [suggestions, setSuggestions] = useState<MSuggestion[]>([])

  useEffect(() => {
    if (!user || !user.uid) return

    const fetchData = async () => {
      // See getSuggestionsByUser for an example of how we should build complex queries
      // this allows us to isolate and keep our queries in the model and not polute the rendering component
      // Let's refactor the <SuggestionsPie /> component using dedicated helper functions
      const suggestionsData = await getSuggestionsByUser(user.uid)
      setSuggestions(suggestionsData)
    }

    fetchData()
  }, [user])

  console.log('Suggestions', suggestions)

  return (
    <div className="WelcomeScreen">
      <h1 className="analytics-text">Analytics</h1>
      <SuggestionsPie />
    </div>
  )
}

export default Settings
