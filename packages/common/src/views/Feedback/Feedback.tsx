//  @format 


import { PageProps } from '@common/types/UI'

function Feedback({ mode }: PageProps) {
  return (
    <div className="WelcomeScreen">
      <h1>feedback page</h1>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScnBXnRyIGaM7gWoxORbR1ENOgjBDE78aveKm7cgfHCxpvDoQ/viewform?embedded=true"
        width="100%"
        height="800px"
      >
        Loading…
      </iframe>
    </div>
  )
}


export default Feedback;
