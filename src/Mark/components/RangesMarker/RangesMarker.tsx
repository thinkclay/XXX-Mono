/** @format */

import { createElement, useEffect, useRef, useState } from 'react'
import { RangesMarkerProps, DivAttributes } from '../../types'
import Mark from '../../lib/mark'

/**
 * @public
 */
export function RangesMarker<T = DivAttributes>({
  as = 'div',
  mark: ranges = [],
  options = {},
  unmarkOptions = {},
  children,
  elementProps,
}: RangesMarkerProps<T>) {
  const markerRef = useRef<null | HTMLDivElement>(null)

  const [markJSInstance, setMarkJSInstance] = useState<Mark>()

  useEffect(() => {
    if (markerRef.current) {
      const markJSInstance = new Mark(markerRef.current)
      setMarkJSInstance(markJSInstance)
    }
  }, [])

  useEffect(() => {
    if (markJSInstance) {
      Promise.resolve(markJSInstance.unmark(unmarkOptions)).then(() => {
        markJSInstance.markRanges(ranges, options)
      })
    }
  }, [ranges, markJSInstance, options, unmarkOptions])

  return createElement(as, {
    ref: markerRef,
    children,
    ...elementProps,
  })
}
