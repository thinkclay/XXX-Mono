/** @format */

import { ReactNode, SyntheticEvent } from 'react'

interface LinkProps {
  to: string
  children: ReactNode
  handler?: (e: SyntheticEvent<HTMLAnchorElement>) => void
}

function Link({ to, children, handler }: LinkProps) {
  return (
    <a href={to} onClick={handler}>
      {children}
    </a>
  )
}

export default Link
