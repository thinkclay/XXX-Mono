//  @format

import { PageProps } from '@common/types/UI'
import SuggestionsPie from '@common/views/Analytics/SuggestionsPie'

function Settings({ mode }: PageProps) {
  return (
    <div className="WelcomeScreen">
      <h1>Analytics</h1>
      <SuggestionsPie height={500} width={1000} />
      <div className="analyticsview">
        <div className="analyticsbox">
          <div className='flags'>
            <div className='flagsback'></div>
            <div>Flags</div>
          </div>
          <div className='flags'>
            <div className='ignoreList'></div>
            <div>IgnoreList</div>
          </div>
          <div className='flags'>
            <div className='acceptedFlag'></div>
            <div>AcceptedFlag</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
