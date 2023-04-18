/** @format */

import {
  GoogleAuthProvider,
  User,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithCredential,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'

import { app, auth, CustomUserModel, db, googleProvider } from './index'

setPersistence(auth, browserLocalPersistence)

export const useFirebase = () => {
  const [authLoading, setAuthLoading] = useState(false)
  const [authUser, setAuthUser] = useState<User | null>(null)

  const firestore = useMemo(() => (authUser ? getFirestore(app) : null), [authUser])

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      setAuthLoading(false)
      setAuthUser(user)
      if (user) {
        const u = await getUser(user);
        if (u.spellCheck !== undefined) {
          localStorage.setItem('spellCheck', u.spellCheck.toString());
        } else {
          localStorage.setItem('spellCheck', 'true');
        }
      }
    })
  }, [])

  const getUser = async (user: User): Promise<CustomUserModel> => {
    setAuthLoading(true)

    try {
      const _doc = doc(db, 'users', user.uid)
      const _result = await getDoc(_doc)
      setAuthLoading(false)
      return _result.data() as CustomUserModel
    } catch (e) {
      // Hack: if error thrown, it's likely because we don't have a custom user record.
      // So let's create one
      console.error(e)
      setAuthLoading(false)
      return updateUser(user, {})
    }
  }

  const updateUser = async (user: User, newProps: CustomUserModel): Promise<CustomUserModel> => {
    setAuthLoading(true)

    const _nextState = {
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      isAnonymous: user.isAnonymous,
      phoneNumber: user.phoneNumber,
      photoUrl: user.photoURL,
      providerData: user.providerData,
      providerId: user.providerId,
      tenantId: user.tenantId,
      uid: user.uid,
      ...newProps,
    }

    const _doc = doc(db, 'users', _nextState.uid)
    await setDoc(_doc, { ...getDoc(_doc), ..._nextState })
    setAuthLoading(false)

    return _nextState
  }

  const logout = async () => {
    setAuthLoading(true);
    localStorage.clear();
    if (authUser) {
      await auth.signOut()
    }
  }

  const googlePopupLogin = async () => {
    setAuthLoading(true)


    try {
      const res = await signInWithPopup(auth, googleProvider)
      const user = res.user
      if (user) {
        const u = await getUser(user);
        await updateUser(user, {
          authProvider: 'google',
          displayName: user.displayName,
          spellCheck: u.spellCheck
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const googleTokenLogin = () => {
    setAuthLoading(true)

    if (!chrome || !chrome.identity) {
      setAuthLoading(false)
      return
    }

    chrome.identity.getAuthToken({ interactive: true }, async function (token) {
      if (chrome.runtime.lastError || !token) {
        console.error(chrome.runtime.lastError)
        setAuthLoading(false)
        return
      }
      if (token) {
        const credential = GoogleAuthProvider.credential(null, token)
        try {
          await signInWithCredential(auth, credential)
        } catch (e) {
          console.error('Could not log in. ', e)
        }
      }
    })
  }

  const loginClassic = async (email: string, password: string) => {
    setAuthLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.error(err)
    }
  }

  const registerClassic = async (displayName: string, email: string, password: string) => {
    setAuthLoading(true)

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const user = res.user

      await updateUser(user, {
        authProvider: 'local',
        displayName,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const passwordReset = async (email: string) => {
    setAuthLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      alert('Password reset link sent!')
    } catch (err) {
      console.error(err)
    }
  }

  return {
    authLoading,
    authUser,
    firestore,
    getUser,
    updateUser,
    googleTokenLogin,
    googlePopupLogin,
    loginClassic,
    registerClassic,
    passwordReset,
    logout,
  }
}
