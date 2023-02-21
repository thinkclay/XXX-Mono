/**
 * @see https://stackoverflow.com/questions/29652862/highlight-text-using-reactjs
 * @format
 */
import { escapeRegExp } from 'lodash'
import { Fragment } from 'react'
import { Hint } from './Hints'

interface HighlightProps {
  text: string
  hints: Hint[]
}

function Highlighted({ text, hints }: HighlightProps) {
  const results = hints.map(h => {
    if (!h.original?.trim()) {
      return <span>{text}</span>
    }

    const regex = new RegExp(`(${escapeRegExp(h.original)})`, 'gi')
    const parts = text.split(regex)

    return (
      <span>
        {parts.filter(part => part).map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    )
  })

  return <Fragment>{results}</Fragment>
}

export default Highlighted

// const Highlighted = ({ text = '', highlight = '' }: { text: string; highlight: string }) => {
//   if (!highlight.trim()) {
//     return <span>{text}</span>
//   }

//   var highlightRegex = /'([^']*)'|"([^"]*)"|(\S+)/gi // search for all strings but keep strings with "" or '' together
//   var highlightArray = (highlight.match(highlightRegex) || []).map(m => m.replace(highlightRegex, '$1$2$3'))

//   // join the escaped parts with | to a string
//   const regexpPart = highlightArray.map(a => `${_.escapeRegExp(a)}`).join('|')

//   // add the regular expression
//   const regex = new RegExp(`(${regexpPart})`, 'gi')

//   const parts = text.split(regex)
//   return (
//     <span>
//       {parts.filter(part => part).map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
//     </span>
//   )
// }
