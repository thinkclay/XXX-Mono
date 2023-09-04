import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import { auth, db } from '@common/services/firebase'
import { doc, collection, getDocs } from 'firebase/firestore'
import { DB } from '@common/helpers/db'
import { useFirebase } from '@common/services/firebase/hook'
interface DataItem {
  label: string
  value: number
}
interface DetailedDataset {
  data: number[]
  colors: string[]
}
interface DetailedChartProps {
  selectedBar: number | null
}
interface FlagState {
  subFlagValue: any[]
  potentialFlag: number
  racial: number
  cultural: number
  household: number
  disability: number
}

const SuggestionsPie: React.FC = () => {
  const {authUser} = useFirebase()
  const [flags, setFlags] = useState(0)
  const [acceptedFlag, setAcceptedFlag] = useState(0)
  const [ignoreList, setIgnoreList] = useState(0)
  const [rewriteFlag, setRewriteFlag] = useState(0)
  const [selectedBar, setSelectedBar] = useState<number | null>(null)

  const initialState: FlagState = {
    subFlagValue: [],
    potentialFlag: 0,
    racial: 0,
    cultural: 0,
    household: 0,
    disability: 0,
  }
  const [state, setState] = useState<FlagState>(initialState)

  const countByCategoryAndType = (category: string, type: string, suggestions: any[]) => {
    return suggestions.filter(flag => flag.category === category && flag.type === type).length
  }

  const getAllSuggestions = async () => {
    try {
      const suggestions: any[] = await DB.suggestion.toArray()
      setState(prevState => ({
        ...prevState,
        subFlagValue: suggestions,
        potentialFlag: countByCategoryAndType('bias', 'potential', suggestions),
        cultural: countByCategoryAndType('bias', 'cultural', suggestions),
        racial: countByCategoryAndType('bias', 'racial', suggestions),
        household: countByCategoryAndType('bias', 'household', suggestions),
        disability: countByCategoryAndType('bias', 'disability', suggestions),
      }))
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  const getAnalyticsData = async () => {
    try {
      if (!authUser) return
      const userCollection = collection(db, 'users')
      const userDocRef = doc(userCollection, authUser.uid)
      const [flagCollection, acceptedFlagsCollection, ignoreListCollection, rewriteflags] = await Promise.all([
        collection(userDocRef, 'flags'),
        collection(userDocRef, 'acceptedflags'),
        collection(userDocRef, 'ignorelist'),
        collection(userDocRef, 'rewriteflags'),
      ])
      const [flagSnapshot, acceptedFlagSnapshot, ignoreListSnapshot, rewriteFlagSnapshot] = await Promise.all([
        getDocs(flagCollection),
        getDocs(acceptedFlagsCollection),
        getDocs(ignoreListCollection),
        getDocs(rewriteflags),
      ])
      const flagSum = flagSnapshot.docs.reduce((total, doc) => total + doc.data().data.length, 0)
      const acceptedFlagSum = acceptedFlagSnapshot.docs.reduce((total, doc) => {
        return total + doc.data().data.reduce((itemTotal, item) => itemTotal + item.value, 0)
      }, 0)
      const ignoreListCount = ignoreListSnapshot.docs.reduce((total, doc) => total + doc.data().data.length, 0)
      const rewriteFlagCount = rewriteFlagSnapshot.docs.reduce((total, doc) => total + doc.data().data.length, 0)
      setFlags(flagSum)
      setAcceptedFlag(acceptedFlagSum)
      setIgnoreList(ignoreListCount)
      setRewriteFlag(rewriteFlagCount)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    getAllSuggestions()
    getAnalyticsData()
  }, [authUser])

  const data: DataItem[] = [
    { label: 'TOTAL FLAGS', value: flags },
    { label: 'CORRECTION ACCEPTED', value: acceptedFlag },
    { label: 'IGNORE LIST', value: ignoreList },
    { label: 'REWRITES AFTER FLAGS', value: rewriteFlag },
  ]
  const { potentialFlag, racial, cultural, household, disability } = state
  const detailedDatasets: DetailedDataset[] = [
    {
      data: [flags, potentialFlag, racial, cultural, household, disability],
      colors: ['#e98e8c', '#f8b159', '#f67280', '#355c7d ', '#6c5b7b', '#355c7d'],
    },
  ]
  const DetailedChart: React.FC<DetailedChartProps> = ({ selectedBar }) => {
    if (selectedBar === 0) {
      const selectedData = detailedDatasets[selectedBar]
      const labels = [
        'TOTAL FLAGS',
        'POTENTIAL BIAS FLAGS',
        'RACIAL BIAS FLAGS',
        'CULTURAL BIAS FLAGS',
        'HOUSEHOLD FLAGS',
        'DISABILITY FLAGS',
      ]
      const detailedData: Plotly.Data[] = [
        {
          x: labels,
          y: selectedData.data,
          type: 'bar',
          marker: { color: selectedData.colors },
        },
      ]
      const layout: Partial<Plotly.Layout> = {
        title: `SUB DATA OF ${data[selectedBar].label}`,
        xaxis: {
          tickangle: 0,
        },
        width: 1050,
      }
      return <Plot data={detailedData} layout={layout} useResizeHandler config={{ displayModeBar: false }} />
    }
    return null
  }

  const totalImprovements = ((acceptedFlag + rewriteFlag) / flags) * 100
  return (
    <div className="analytics-main">
      <div className="improvements-circle">
        <div className="reaction-emoji">
          {totalImprovements >= 90
            ? '😎'
            : totalImprovements >= 80
            ? '😊'
            : totalImprovements >= 50
            ? '😃'
            : totalImprovements >= 30
            ? '🙂'
            : isNaN(totalImprovements)
            ? '😐'
            : '😢'}
        </div>
        <div className="improvement-text">Improvements</div>
        <p className="percentage">{isNaN(totalImprovements) ? '-' : `${totalImprovements.toFixed(2)}%`}</p>
      </div>
      <Plot
        data={[
          {
            x: data.map(item => item.label),
            y: data.map(item => item.value),
            type: 'bar',
            mode: 'lines+markers',
            marker: { color: ['#e98e8c', '#f6d45a', '#8cbb4b', '#ffa500'] },
          },
        ]}
        onClick={event => setSelectedBar(event.points[0]?.pointIndex)}
        layout={{ title: 'Analytics', width: 1050 }}
        config={{ displayModeBar: false }}
      />
      {selectedBar !== null && <DetailedChart selectedBar={selectedBar} />}
    </div>
  )
}

export default SuggestionsPie
