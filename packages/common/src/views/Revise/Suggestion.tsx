/** @format */

interface SuggestionProp {
  suggestions: string[]
  highlighted: string
}

function Suggestion({ suggestions, highlighted }: SuggestionProp) {
  return <div className="Suggestion">{suggestions.length > 0 && highlighted}</div>
}

export default Suggestion
