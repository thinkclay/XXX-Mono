/** @format */

import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { query, collection, getDocs, where } from 'firebase/firestore'
import { useRecoilState } from 'recoil'
import { useLocation } from 'wouter'

import { auth, db, logout } from '@common/helpers/firebase'
import { rootState } from '@common/helpers/root'

function Account() {
  const [_location, _setLocation] = useLocation()
  const [_user, _loading, _error] = useAuthState(auth)

  // const [name, setName] = useState('')

  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, 'users'), where('uid', '==', user?.uid))
  //     const doc = await getDocs(q)
  //     if (doc && doc.docs && doc.docs[0]) {
  //       const data = doc.docs[0].data()
  //       setName(data.name)
  //     }
  //   } catch (err) {
  //     console.error(err)
  //     alert('An error occured while fetching user data')
  //   }
  // }

  useEffect(() => {
    if (_loading) return
    if (!_user) _setLocation('/login')
    // fetchUserName()
  }, [_user, _loading])

  return (
    <div className="Account auth centered">
      <h1>Account</h1>
      {/* <p>Logged in as {name}</p> */}
      <p>Logged in as: {_user?.email}</p>
      <div className="ButtonRow">
        <button className="button primary" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}
export default Account
