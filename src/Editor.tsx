/** @format */

import { useRef, useEffect, ReactNode } from 'react'

const noop = () => {}
const Editor = ({ html, children, onChange = noop }: { html: string; children: ReactNode; onChange?: (s: string) => any }) => {
  const ref = useRef<HTMLDivElement>(null)
  const lastHtml = useRef<string>('')

  const emitChange = () => {
    const curHtml = ref.current?.innerHTML || ''
    if (curHtml !== lastHtml.current) {
      onChange(curHtml)
    }
    lastHtml.current = html
  }

  useEffect(() => {
    if (!ref.current) return
    if (ref.current.innerHTML === html) return
    ref.current.innerHTML = html
  }, [html])

  return <div onInput={emitChange} contentEditable dangerouslySetInnerHTML={{ __html: html }} ref={ref}></div>
}

export default Editor
