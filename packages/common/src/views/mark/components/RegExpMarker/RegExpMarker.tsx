/** @format */

import { createElement, useEffect, useRef, useState } from 'react'
import { DivAttributes, RegExpMarkerProps } from '../../types'
import Mark from '../../lib/mark'

/**
 * @public
 */
export function RegExpMarker<T = DivAttributes>({
  mark = new RegExp(''),
  options = {},
  as = 'div',
  unmarkOptions = {},
  children,
  elementProps,
}: RegExpMarkerProps<T>) {
  const markerRef = useRef<HTMLDivElement>(null)
  const [markerInstance, setMarkerInstance] = useState<Mark>()

  useEffect(() => {
    if (markerInstance) {
      Promise.resolve(markerInstance.unmark(unmarkOptions)).then(() => {
        markerInstance.markRegExp(mark, options)
      })
    } else {
      if (markerRef.current) {
        const markerInstance = new Mark(markerRef.current)
        setMarkerInstance(markerInstance)
      }
    }
  }, [mark, markerInstance, options, unmarkOptions])

  return createElement(as, { ref: markerRef, children, ...elementProps })
}
