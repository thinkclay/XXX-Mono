//  @format 


import { PageProps } from '@common/types/UI'

function Feedback({ mode }: PageProps) {
  return (
    <div className="WelcomeScreen">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScBSAbu4sKwqZa4EAZQSpt2eUZie_jhA_9unXrsh2OuXLGbdA/viewform?embedded=true"
        width="100%"
        height="1200px"
      >
        Loading…
      </iframe>
    </div>
  )
}


export default Feedback;