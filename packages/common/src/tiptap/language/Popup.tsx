/** @format */

import { useEffect, useState } from 'react'
import { PopupPluginProps, PopupPlugin } from './popup-plugin'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type PopupProps = Omit<Optional<PopupPluginProps, 'pluginKey'>, 'element'> & {
  className?: string
  children: React.ReactNode
}

export const Popup = (props: PopupProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!element) {
      return
    }

    if (props.editor.isDestroyed) {
      return
    }

    const { pluginKey = 'popup', editor, tippyOptions = {}, shouldShow = null } = props

    const plugin = PopupPlugin({
      pluginKey,
      editor,
      element,
      tippyOptions,
      shouldShow,
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
