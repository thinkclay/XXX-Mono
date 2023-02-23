/** @format */

import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { query, collection, getDocs, where } from 'firebase/firestore'

import { auth, db, logout } from '@common/helpers/firebase'

function Account() {
  const [user, loading, error] = useAuthState(auth)
  const [name, setName] = useState('')

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid))
      const doc = await getDocs(q)
      if (doc && doc.docs && doc.docs[0]) {
        const data = doc.docs[0].data()
        setName(data.name)
      }
    } catch (err) {
      console.error(err)
      alert('An error occured while fetching user data')
    }
  }

  useEffect(() => {
    if (loading) return
    if (!user) return console.log('TODO: /login')
    fetchUserName()
  }, [user, loading])

  return (
    <div className="Account">
      Logged in as
      <div>{name}</div>
      <div>{user?.email}</div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
export default Account
