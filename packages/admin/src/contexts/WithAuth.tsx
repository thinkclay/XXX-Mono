'use client'

import { ReactNode } from 'react'
import { useSigninCheck } from 'reactfire'
import { useRouter } from 'next/navigation'

import LoadingOverlay from 'components/ui/LoadingOverlay'

export default function WithAuth({ children }: { children: ReactNode }) {
  const { status, data: signInCheckResult } = useSigninCheck()
  const router = useRouter()

  if (status === 'loading') return <LoadingOverlay />

  if (!signInCheckResult.signedIn) {
    router.push('/')
    return null
  }

  return children
}
