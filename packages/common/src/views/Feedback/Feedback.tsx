//  @format

import { PageProps } from '@common/types/UI'

function Feedback({ mode }: PageProps) {
  return (
    <div className="WelcomeScreen">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScnBXnRyIGaM7gWoxORbR1ENOgjBDE78aveKm7cgfHCxpvDoQ/viewform?embedded=true"
        width="600px"
        height="1200px"
      >
        Loading…
      </iframe>
    </div>
  )
}

export default Feedback
