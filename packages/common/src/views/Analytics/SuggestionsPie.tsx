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

const Analytics: React.FC = () => {
  const [flags, setFlags] = useState(0)
  const [acceptedFlag, setAcceptedFlag] = useState(0)
  const [ignoreList, setIgnoreList] = useState(0)
  const [rewriteFlag, setRewriteFlag] = useState(0)


  const [subFlagValue, setSubFlagValue] = useState([])
  const [potentialFlag, setPotentialFlag] = useState(0)
  const [gender, setGender] = useState(0)
  const [racial, setRacial] = useState(0)
  const [ableism, setAbleism] = useState(0)
  const [language, setLanguage] = useState(0)
  const [cultural, setCultural] = useState(0)
  const [disability, setDisability] = useState(0)
  const [behavioral, setBehavioral] = useState(0)

  const getAllSuggestions = async () => {
    try {
      const suggestions: any = await DB.suggestion.toArray();
      setSubFlagValue(suggestions);
      const countByCategoryAndType = (category: string, type: string) =>
        subFlagValue.filter((flag: any) => flag.category === category && flag.type === type).length;
      setLanguage(countByCategoryAndType('language', 'misspelling') + countByCategoryAndType('language', 'typographical'));
      setPotentialFlag(countByCategoryAndType('bias', 'potential'));
      setGender(countByCategoryAndType('bias', 'gender'));
      setCultural(countByCategoryAndType('bias', 'cultural'));
      setDisability(countByCategoryAndType('bias', 'disability'));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    getAllSuggestions();
  }, [flags]);

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
    { label: 'Total Number of flags', value: flags },
    { label: 'Number of correction Accepted', value: acceptedFlag },
    { label: 'IgnoreList', value: ignoreList },
    { label: 'Number of rewrites after flags', value: rewriteFlag },
  ]

  const [selectedBar, setSelectedBar] = useState<number | null>(null)

  const detailedDatasets: DetailedDataset[] = [
    {
      data: [flags, potentialFlag, gender, racial, ableism, language, cultural, disability],
      colors: ['#e98e8c', '#f8b159', '#f67280', '#c06c84 ', '#6c5b7b ', '#355c7d ', '#ffd700', '#EE82EE'],
    },
  ]

  const DetailedChart: React.FC<DetailedChartProps> = ({ selectedBar }) => {
    if (selectedBar === 0) { 
      const selectedData = detailedDatasets[selectedBar];
      const detailedData: Plotly.Data[] = [
        {
          x: [
            'Total number of flags',
            'Potential bias flags',
            'gender bias flags',
            'racial bias flags',
            'ableism bias flags',
            'language bias flags',
            'cultural bias flags',
            'disability flags',
          ],
          y: selectedData.data,
          type: 'bar',
          marker: { color: selectedData.colors },
        },
      ];
  
      const layout: Partial<Plotly.Layout> = {
        title: `Sub Data of ${data[selectedBar].label}`,
      };
  
      return <Plot data={detailedData} layout={layout} />;
    }
  
    return null;
  };

  return (
    <div>
      <Plot
        data={[
          {
            x: data.map(item => item.label),
            y: data.map(item => item.value),
            type: 'bar',
            marker: { color: ['#e98e8c', '#f6d45a', '#8cbb4b', 'orange'] },
          },
        ]}
        onClick={event => setSelectedBar(event.points[0]?.pointIndex)}
        layout={{ title: 'Analytics' }}
      />
      {selectedBar !== null && <DetailedChart selectedBar={selectedBar} />}
    </div>
  )
}

export default Analytics
