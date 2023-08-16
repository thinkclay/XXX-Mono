//  @format

import { PageProps } from '@common/types/UI'
import SuggestionsPie from '@common/views/Analytics/SuggestionsPie'

function Settings({ mode }: PageProps) {
  return (
    <div className="WelcomeScreen">
      <h1>Analytics</h1>
      <SuggestionsPie/>
    </div>
  )
}

export default Settings
