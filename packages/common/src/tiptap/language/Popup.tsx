/** @format */

import { useEffect, useState } from 'react'
import { PopupPluginProps, PopupPlugin } from './popup-plugin'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type PopupProps = Omit<Optional<PopupPluginProps, 'pluginKey'>, 'element'> & {
  className?: string
  children: React.ReactNode
}

export const Popup = ({ editor, className, children, tippyOptions }: PopupProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const pluginKey = 'popup'

  useEffect(() => {
    if (!element) {
      return
    }

    if (editor.isDestroyed) {
      return
    }

    const plugin = PopupPlugin({
      pluginKey,
      editor,
      element,
      tippyOptions,
      shouldShow: null,
    })

    editor.registerPlugin(plugin)
    return () => editor.unregisterPlugin(pluginKey)
  }, [editor, element])

  return (
    <div ref={setElement} className={className} style={{ visibility: 'hidden' }}>
      {children}
    </div>
  )
}
