'use client'

import { CSSProperties, PropsWithChildren, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Link, { LinkProps as NextLinkProps } from 'next/link'

type Props = NextLinkProps &
  PropsWithChildren & {
    styles?: CSSProperties
  }

export default function NavLink({ children, styles, ...props }: Props) {
  const pathname = usePathname()

  const memoizedStyles = useMemo(
    () => ({
      color: pathname === props.href ? 'brand.400' : undefined,
      ...styles,
    }),
    [styles]
  )

  return (
    <Link style={memoizedStyles} {...props}>
      {children}
    </Link>
  )
}
