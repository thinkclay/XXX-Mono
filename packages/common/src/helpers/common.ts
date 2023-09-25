import { getDocs, query, CollectionReference } from 'firebase/firestore'
import moment from 'moment'

export const getFiltterOutData = async (collectionRef: CollectionReference, startDate: string, endDate: string) => {
  const queryDocs = query(collectionRef)
  try {
    const querySnapshot = await getDocs(queryDocs)
    const filteredData: any = []
    querySnapshot.forEach(data => {
      const newData = data.data().data
      const filtered = newData.filter((item: { timestamp: { seconds: number; nanoseconds: number } }) => {
        if (item.timestamp) {
          const itemDate = item.timestamp
          const date = new Date(itemDate.seconds * 1000 + itemDate.nanoseconds / 1000000)
          const formattedDate = moment(date).format('DD-MM-YYYY')
          const momentStartDate = moment(startDate, 'DD-MM-YYYY')
          const momentEndDate = moment(endDate, 'DD-MM-YYYY')
          return moment(formattedDate, 'DD-MM-YYYY').isBetween(momentStartDate, momentEndDate, null, '[]')
        }
      })
      if (startDate !== null && endDate !== null) {
        filteredData.push(filtered)
      }
    })
    return filteredData
  } catch (error) {
    console.error('Error getting documents: ', error)
    return []
  }
}
export const subLabels = [
  'Total Nudges',
  'Nudges related to subjective language',
  'Nudges related to race/ethnicity',
  'Nudges related to cultural identity',
  'Nudges related to household status',
  'Nudges related to disability status',
]
export const FlagsColor = ['#FF5C38', '#FCF051', '#EFA291', '#262626']
export const subFlagsColor = ['#FF5C38', '#FCF051', '#262626', '#EFA291', '#FFFFA7', '#999999']
