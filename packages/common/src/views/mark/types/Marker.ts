/** @format */

import { ElementType } from 'react'
import { Hint } from '../../../types/Revision'
import { MarkOptions } from './MarkOptions'
import { UnmarkOptions } from './UnmarkOptions'

export interface MarkerProps<T> {
  children?: React.ReactNode
  as?: string | ElementType
  mark?: string | string[] | Hint[]
  options?: MarkOptions
  unmarkOptions?: UnmarkOptions
  elementProps?: T
}
