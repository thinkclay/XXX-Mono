/** @format */

import { createElement, useEffect, useRef, useState } from 'react'
import Mark from '../../lib/mark'
import { DivAttributes, MarkerProps } from '../../types'

/**
 * @public
 */
export const Marker = <T extends {} = DivAttributes>({
  as = 'div',
  mark = '',
  options = {},
  children,
  unmarkOptions = {},
  elementProps,
}: MarkerProps<T>): JSX.Element => {
  const markerRef = useRef<HTMLDivElement | null>(null)
  const [markInstance, setMarkInstance] = useState<Mark>()

  console.log('opts', options)

  useEffect(() => {
    if (markerRef.current) {
      const markInstance = new Mark(markerRef.current)
      setMarkInstance(markInstance)
    }
  }, [])

  useEffect(() => {
    if (markInstance) {
      Promise.resolve(markInstance.unmark(unmarkOptions)).then(() => {
        // if (hints && hints.length > 0) markInstance.hint(hints, options)
        markInstance.mark(mark, options)
      })
    }
  }, [mark, markInstance, options, unmarkOptions])

  return createElement(as, { ref: markerRef, children, ...elementProps })
}
