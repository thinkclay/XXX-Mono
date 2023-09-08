/** @format */

import { fetchingLanguageState, spellingCountState } from '@common/helpers/root'
import { useRecoilValue } from 'recoil'
import { ToolbarActionProps } from './Toolbar'
import { doc, collection, getDocs, query, addDoc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '@common/services/firebase'
import { useEffect, useState } from 'react'
import { useFirebase } from '@common/services/firebase/hook'

function Reload({ handler }: ToolbarActionProps) {
  const { authUser } = useFirebase()
  const fetching = useRecoilValue(fetchingLanguageState)
  const spellingCount = useRecoilValue(spellingCountState)
  const [addCount, setAddCount] = useState(0)

  const rewriteData = async(item: any) => {
      if (authUser) {
        const userCollection = collection(db, 'users')
        const userDocRef = doc(userCollection, authUser.uid)
        const rewriteFlagCollection = collection(userDocRef, 'rewriteflags')
        const queryDocs = query(rewriteFlagCollection)
        try {
          const checkQuery = await getDocs(queryDocs)
          if (checkQuery.size > 0) {
            const querySnapshot = await getDocs(rewriteFlagCollection)
            querySnapshot.forEach(data => {
              const rewriteListDocument = doc(rewriteFlagCollection, data.id)
              const filterData = data.data().data
              item.forEach((element: any) => {
                filterData.push({ timestamp: Timestamp.now(), value: element })
              })
              setDoc(rewriteListDocument, { data: filterData })
                .then(() => console.log('UPDATED rewriteList Firebase'))
                .catch(e => console.log('Error', e))
            })
          } else {
            const filterData: any = []
            item.forEach((element: any) => {
              filterData.push({ timestamp: Timestamp.now(), value: element })
            })
            await addDoc(rewriteFlagCollection, { data: filterData })
          }
        } catch (error) {
          console.log(error)
        }
      }
  }

  useEffect(() => {
    const spelling = document.querySelectorAll('span.language')
    const textContents: any = Array.from(spelling).map(span => span.textContent)
    const result = spellingCount - addCount
    if (result <= 0) {
      setAddCount(spellingCount)
      return
    }
    const fetchData = async () => {
      if (authUser) {
        const userCollection = collection(db, 'users')
        const userDocRef = doc(userCollection, authUser.uid)
        const flagsCollection = collection(userDocRef, 'flags')
        const queryDocs = query(flagsCollection)
        try {
          const checkQuery = await getDocs(queryDocs)
          if (checkQuery.size > 0) {
            const querySnapshot = await getDocs(flagsCollection)
            querySnapshot.forEach(data => {
              const rewriteListDocument = doc(flagsCollection, data.id)
              const newData = data.data().data
              const commonValues = textContents.map((flag: any) => {
                const data = newData.find((d: { key: number; value: string }) => d.value === flag)
                if(data){
                  return data.value
                }
              })
              rewriteData(commonValues)
              textContents.forEach((element: any) => {
                if (element.trim()) {
                  newData.push({ timestamp: Timestamp.now(), value: element })
                }
              })
              setDoc(rewriteListDocument, { data: newData })
                .then(() => console.log('UPDATED flags Firebase'))
                .catch(e => console.log('Error', e))
            })
          } else {
            const filterData: any = []
            textContents.forEach((element: any) => {
              filterData.push({ timestamp: Timestamp.now(), value: element })
            })
            await addDoc(flagsCollection, { data: filterData })
          }
        } catch (error) {
          console.error('Error:', error)
        }
      }
    setAddCount(spellingCount)
    }
    fetchData();
  }, [spellingCount,authUser])
  return (
    <button className={`reload ${fetching ? 'active fetching' : ''}`} onClick={handler}>
      {spellingCount ? (
        <div className="counter">{spellingCount}</div>
      ) : (
        <svg viewBox="0 0 100 100">
          <path
            d="M27.9145771,10.7907643 C37.0817835,5.6271571 47.7765157,3.83838384 58.1248978,5.74098714 C68.4774919,7.63937851 77.8345591,13.1109965 84.5714833,21.1944415 C91.3087314,29.2816665 95,39.4742073 95,49.9997064 C95,52.4845277 92.9834587,54.501069 90.4986374,54.501069 C88.0138161,54.501069 85.9972747,52.4845277 85.9972747,49.9997064 C85.9972747,41.5791991 83.0483854,33.4241513 77.6569021,26.9572225 C72.2696307,20.4899696 64.7813634,16.1109689 56.5000658,14.592515 C48.2187681,13.0740611 39.6674751,14.5039241 32.3311612,18.6340215 C24.9948473,22.7682985 19.3379045,29.3410655 16.346356,37.2129422 C13.3553474,45.0808229 13.2203497,53.7496179 15.9582322,61.715561 C18.6962012,69.6762122 24.1424396,76.4259882 31.3436478,80.7880332 C38.544964,85.1501862 47.0454979,86.8545049 55.3732347,85.5972985 C62.1737698,84.5679358 68.5014891,81.6232908 73.6400408,77.1473078 L69.5732627,73.6710635 C68.2317097,72.5193713 67.6832951,70.6926907 68.1768467,68.9925839 C68.6704306,67.2966891 70.1132534,66.0436946 71.8640113,65.7948669 L87.6123006,63.5463455 C88.9158382,63.3607183 90.2321196,63.7530648 91.2192226,64.6221042 C92.2063904,65.4911545 92.767484,66.7483717 92.7464243,68.0645451 L92.5144011,84.6984192 C92.4890864,86.508252 91.3837686,88.1240123 89.7047214,88.8074245 C88.0298862,89.4866357 86.1104352,89.0985119 84.8321692,87.8202567 L80.2886873,83.2767748 C73.7412998,89.2419443 65.5447807,93.1610889 56.7148525,94.4945409 C46.3073954,96.0680738 35.680054,93.9376809 26.6784088,88.4871452 C17.6800034,83.032375 10.8750404,74.595344 7.44933929,64.6433151 C4.02374725,54.6915021 4.19676028,43.8536724 7.93448855,34.0161215 C11.6721963,24.1781386 18.7429428,15.9599119 27.9141451,10.7922007 L27.9145771,10.7907643 Z"
            className="FillLayer"
          ></path>
        </svg>
      )}
    </button>
  )
}

export default Reload
