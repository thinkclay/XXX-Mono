import { doc, getDoc, setDoc } from 'firebase/firestore'

import { firestore } from '@common/services/firebase'
import { MDemographic, defaultDemographic } from './demographic'
import { MScribe, defaultScribe } from './scribe'

export interface MSetting {
  scribe: MScribe
  demographics: MDemographic
}

export const defaultSettings: MSetting = {
  scribe: defaultScribe,
  demographics: defaultDemographic,
}

export async function getSetting(uid: string): Promise<MSetting | null> {
  try {
    const ref = doc(firestore, 'settings', uid)
    const result = await getDoc(ref)
    return result.data() as MSetting
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function upsertSetting(uid: string, data: MSetting) {
  try {
    const ref = doc(firestore, 'settings', uid)
    const nextState = { ...getDoc(ref), ...data }
    await setDoc(ref, nextState)
    console.log(`Updated Settings: ${uid}`, nextState)
  } catch (error) {
    console.error(`Error Updating Settings: ${uid}`, error)
  }
}
