//  @format

import { PageProps } from '@common/types/UI'
import UsageChart from '@common/views/Analytics/UsageChart'

function Settings({ mode }: PageProps) {
  return (
    <div className="WelcomeScreen">
      <h1>Analytics</h1>
      <UsageChart width={300} height={200} />
    </div>
  )
}

export default Settings
