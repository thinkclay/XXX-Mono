//  @format

import { PageProps } from '@common/types/UI'
import UsageChart from '@common/views/Analytics/UsageChart'
import SuggestionsPie from '@common/views/Analytics/SuggestionsPie'

function Settings({ mode }: PageProps) {
  return (
    <div className="WelcomeScreen">
      <h1>Analytics</h1>
      <SuggestionsPie height={500} width={1000} />
    </div>
  )
}

export default Settings
