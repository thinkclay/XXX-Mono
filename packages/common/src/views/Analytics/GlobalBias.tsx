import { useEffect, useState } from 'react'
import { useUser } from 'reactfire'

import { getSuggestionsByType } from '@common/models'
import PieChart, { Datum } from '../Analytics/PieChart'
import { aiTypes } from '@common/tiptap/bias'

export default function GlobalBias() {
  const { data: user } = useUser()
  const [summary, setSummary] = useState<Datum[]>([])

  useEffect(() => {
    if (!user || !user.uid) return

    const fetchData = async () => {
      Promise.all(aiTypes.map(getSuggestionsByType))
        .then(results => {
          // Map the results to the desired format
          const formattedResults = results.map((result, index) => ({
            id: aiTypes[index],
            label: aiTypes[index],
            value: result.length,
          }))

          console.log(formattedResults)
          setSummary(formattedResults)
        })
        .catch(error => {
          console.error(error)
        })
    }

    fetchData()
  }, [user])

  return <PieChart data={summary} />
}
