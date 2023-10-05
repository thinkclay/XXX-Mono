import { Firestore, doc, getDoc, setDoc } from 'firebase/firestore'

export type Ethnicity = 'black' | 'white' | 'asian' | 'indian' | 'hispanic' | 'indigenous' | 'multi'
export type Gender = 'multi' | 'male' | 'female' | 'transgender'
export type Language = 'english' | 'spanish' | 'mandarin'
export type Religion = 'hindu' | 'buddhist' | 'christian' | 'jewish' | 'muslim'
export type Disability = 'intellectual' | 'physical' | 'emotional' | 'developmental'
export type Housing = 'two' | 'one' | 'alternative' | 'transient' | 'low' | 'med' | 'high'

export interface MDemographic {
  ethnicity: Ethnicity[]
  gender: Gender[]
  language: Language[]
  religion: Religion[]
  disability: Disability[]
  housing: Housing[]
}

export const defaultDemographic: MDemographic = {
  ethnicity: [],
  gender: [],
  language: [],
  religion: [],
  disability: [],
  housing: [],
}

export async function upsertUserDemo(firestore: Firestore, uid: string, data: MDemographic) {
  try {
    const ref = doc(firestore, 'demo', uid)
    const nextState = { ...getDoc(ref), ...data }
    await setDoc(ref, nextState)
    console.log(`Updated UserDemo: ${uid}`, nextState)
  } catch (error) {
    console.error(`Error Updating UserDemo: ${uid}`, error)
  }
}
