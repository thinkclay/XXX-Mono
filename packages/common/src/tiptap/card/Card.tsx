/** @format */

import React, { useEffect, useState } from 'react'
import { CardPlugin, CardPluginProps } from './card-plugin'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type CardProps = Omit<Optional<CardPluginProps, 'pluginKey'>, 'element'> & {
  className?: string
  children: React.ReactNode
  updateDelay?: number
}

function Card(props: CardProps) {
  const [element, setElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!element) {
      return
    }

    if (props.editor.isDestroyed) {
      return
    }

    const { pluginKey = 'card', editor, tippyOptions = {}, updateDelay, shouldShow = null } = props

    const plugin = CardPlugin({
      updateDelay,
      editor,
      element,
      pluginKey,
      shouldShow,
      tippyOptions,
    })

    editor.registerPlugin(plugin)
    return () => editor.unregisterPlugin(pluginKey)
  }, [props.editor, element])

  return (
    <div ref={setElement} className={props.className} style={{ visibility: 'hidden' }}>
      {props.children}
    </div>
  )
}

export default Card
