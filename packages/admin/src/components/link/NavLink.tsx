'use client'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { CSSProperties, PropsWithChildren, useMemo } from 'react'

export type NavLinkProps = NextLinkProps &
  PropsWithChildren & {
    styles?: CSSProperties
  }

function NavLink({ children, styles, ...props }: NavLinkProps) {
  const memoizedStyles = useMemo(
    () => ({
      ...styles,
    }),
    [styles]
  )

  return (
    <NextLink style={memoizedStyles} {...props}>
      {children}
    </NextLink>
  )
}

export default NavLink
