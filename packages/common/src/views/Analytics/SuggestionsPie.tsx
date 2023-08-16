import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@common/services/firebase'
import { doc, collection, getDocs, query } from 'firebase/firestore'
import { DB } from '@common/helpers/db'

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

const SuggestionsPie: React.FC = () => {
  const [flags, setFlags] = useState(0)
  const [acceptedFlag, setAcceptedFlag] = useState(0)
  const [ignoreList, setIgnoreList] = useState(0)
  const [rewriteFlag, setRewriteFlag] = useState(0)

  const [subFlagValue, setSubFlagValue] = useState([])
  const [potentialFlag, setPotentialFlag] = useState(0)
  const [racial, setRacial] = useState(0)
  const [cultural, setCultural] = useState(0)
  const [household, setHousehold] = useState(0)
  const [disability, setDisability] = useState(0)

  const [selectedBar, setSelectedBar] = useState<number | null>(null)

  const getAllSuggestions = async () => {
    try {
      const suggestions: any = await DB.suggestion.toArray()
      setSubFlagValue(suggestions)

      const countByCategoryAndType = (category: string, type: string) =>
        subFlagValue.filter((flag: any) => flag.category === category && flag.type === type).length
      setPotentialFlag(countByCategoryAndType('bias', 'potential'))
      setCultural(countByCategoryAndType('bias', 'cultural'))
      setRacial(countByCategoryAndType('bias', 'racial'))
      setHousehold(countByCategoryAndType('bias', 'household'))
      setDisability(countByCategoryAndType('bias', 'disability'))
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  useEffect(() => {
    getAllSuggestions()
  }, [flags])

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const userCollection = collection(db, 'users')
        const userDocRef = doc(userCollection, user.uid)
        const flagCollection = collection(userDocRef, 'flags')
        const acceptedFlagsCollection = collection(userDocRef, 'acceptedflags')
        const ignoreListCollection = collection(userDocRef, 'ignorelist')
        const rewriteflags = collection(userDocRef, 'rewriteflags')
        const queryDocs = query(flagCollection)
        getDocs(queryDocs)
          .then(checkQuery => {
            if (checkQuery.size > 0) {
              getDocs(flagCollection)
                .then(querySnapshot => {
                  querySnapshot.forEach((data: any) => {
                    const newData = data.data().data
                    const sum = newData.length
                    setFlags(sum)
                  })
                })
                .catch(error => {
                  console.error('Error getting documents: ', error)
                })
              getDocs(acceptedFlagsCollection)
                .then(querySnapshot => {
                  querySnapshot.forEach((data: any) => {
                    const newData = data.data().data
                    const sum = newData.length
                    setAcceptedFlag(sum)
                  })
                })
                .catch(error => {
                  console.error('Error getting documents: ', error)
                })
              getDocs(ignoreListCollection)
                .then(querySnapshot => {
                  querySnapshot.forEach((data: any) => {
                    const newData = data.data().data
                    setIgnoreList(newData.length + 1)
                  })
                })
                .catch(error => {
                  console.error('Error getting documents: ', error)
                })
              getDocs(rewriteflags)
                .then(querySnapshot => {
                  querySnapshot.forEach((data: any) => {
                    const newData = data.data().data
                    setRewriteFlag(newData.length)
                  })
                })
                .catch(error => {
                  console.error('Error getting documents: ', error)
                })
            }
          })
          .catch(error => {
            console.error('Error getting ignoreCollection:', error)
          })
      }
    })
  }, [])

  const data: DataItem[] = [
    { label: 'TOTAL NUMBER OF FLAGS', value: flags },
    { label: 'NUMBER OF CORRECTION ACCEPTED', value: acceptedFlag },
    { label: 'IGNORE LIST', value: ignoreList },
    { label: 'NUMBER OF REWRITES AFTER FLAGS', value: rewriteFlag },
  ]
  const detailedDatasets: DetailedDataset[] = [
    {
      data: [flags, potentialFlag, racial, cultural, household, disability],
      colors: ['#e98e8c', '#f8b159', '#f67280', '#355c7d ', '#6c5b7b', '#355c7d'],
    },
  ]
  const DetailedChart: React.FC<DetailedChartProps> = ({ selectedBar }) => {
    if (selectedBar === 0) {
      const selectedData = detailedDatasets[selectedBar]
      const detailedData: Plotly.Data[] = [
        {
          x: [
            'TOTAL NUMBERS OF FLAGS',
            'POTENTIAL BIAS FLAGS',
            'RACIAL BIAS FLAGS',
            'CULTURAL BIAS FLAGS',
            'HOUSEHOLD FLAGS',
            'DISABILITY FLAGS',
          ],
          y: selectedData.data,
          type: 'bar',
          marker: { color: selectedData.colors },
        },
      ]
      const layout: Partial<Plotly.Layout> = {
        title: `SUB DATA OF ${data[selectedBar].label}`,
      }
      return <Plot data={detailedData} layout={layout} config={{ displayModeBar: false }} />
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
            marker: { color: ['#e98e8c', '#f6d45a', '#8cbb4b', '#ffa500'] },
          },
        ]}
        onClick={event => setSelectedBar(event.points[0]?.pointIndex)}
        layout={{ title: 'Analytics' }}
        config={{ displayModeBar: false }}
      />
      {selectedBar !== null && <DetailedChart selectedBar={selectedBar} />}
    </div>
  )
}

export default SuggestionsPie
