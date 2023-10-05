import { Firestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { MDemographic, defaultDemographic } from './demographic'

export interface MSetting {
  demographics: MDemographic
}

export const defaultSettings: MSetting = {
  demographics: defaultDemographic,
}

export async function getSetting(firestore: Firestore, uid: string): Promise<MSetting | null> {
  try {
    const ref = doc(firestore, 'settings', uid)
    const result = await getDoc(ref)
    return result.data() as MSetting
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function upsertSetting(firestore: Firestore, uid: string, data: MSetting) {
  try {
    const ref = doc(firestore, 'settings', uid)
    const nextState = { ...getDoc(ref), ...data }
    await setDoc(ref, nextState)
    console.log(`Updated UserDemo: ${uid}`, nextState)
  } catch (error) {
    console.error(`Error Updating UserDemo: ${uid}`, error)
  }
}
