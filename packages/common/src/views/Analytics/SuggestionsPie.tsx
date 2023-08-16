import { Pie } from '@visx/shape'
import { scaleOrdinal } from '@visx/scale'
import { Group } from '@visx/group'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@common/services/firebase'
import { doc, collection, getDocs, query } from 'firebase/firestore'


const getValidLabel = (label: string | null | number) => (label === null ? 'default' : label)

const SuggestionsPie = ({ width = 500, height = 300 }) => {
  const [flags, setFlags] = useState(0);
  const [acceptedFlag, setAcceptedFlag] = useState(0);
  const [ignoreList, setIgnoreList] = useState(0);

  const margin = { top: 20, right: 20, bottom: 20, left: 20 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const radius = Math.min(innerWidth, innerHeight) / 2
  const centerY = innerHeight / 2
  const centerX = innerWidth / 2
  const donutThickness = 50

  const data = [
    { label: flags, count: flags },
    { label: acceptedFlag, count: acceptedFlag },
    { label: ignoreList, count: ignoreList },
  ]
  const typeColors = scaleOrdinal({
    domain: data.map(d => getValidLabel(d.label)),
    range: [
      'rgba(237,140,142,255)',
      'rgba(248,211,102,255)',
      'rgba(137,189,84,255)'
    ],
  })

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const userCollection = collection(db, 'users')
        const userDocRef = doc(userCollection, user.uid)
        const ignoreCollection = collection(userDocRef, 'flags')
        const acceptedFlagsCollection = collection(userDocRef, 'acceptedflags');
        const ignoreListCollection = collection(userDocRef, 'ignorelist');
        const queryDocs = query(ignoreCollection)
        getDocs(queryDocs)
          .then(checkQuery => {
            if (checkQuery.size > 0) {
              getDocs(ignoreCollection)
                .then(querySnapshot => {
                  querySnapshot.forEach((data: any) => {
                    const newData = data.data().data
                    const sum = newData.reduce((total: any, item: any) => total + item.value, 0);
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
                    const sum = newData.reduce((total: any, item: any) => total + item.value, 0);
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
            }
          })
          .catch(error => {
            console.error('Error getting ignoreCollection:', error)
          })
      }
    })
  }, [])

  return (
    <svg width={width} height={height}>
      <rect rx={14} width={width} height={height} fill="url('#visx-pie-gradient')" />
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={data}
          pieValue={d => d.count}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
          cornerRadius={15}
          padAngle={0.005}
        >
          {pie =>
            pie.arcs.map((arc, index) => {
              const label = getValidLabel(data[index].label)
              const [centroidX, centroidY] = pie.path.centroid(arc)
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.5
              return (
                <g key={`arc-${index}`}>
                  <path d={pie.path(arc) || ''} fill={typeColors(label)} />
                  {hasSpaceForLabel && (
                    <text
                      x={centroidX}
                      y={centroidY}
                      dy=".33em"
                      fill="white"
                      fontSize="15"
                      textAnchor="middle"
                    >
                      {label}
                    </text>
                  )}
                </g>
              )
            })
          }
        </Pie>
      </Group>
    </svg>
  )
}

export default SuggestionsPie
