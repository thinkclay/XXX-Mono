import React from 'react'
import '../../assets/styles/components.scss'

function OverlayLoader() {
  return (
    <div className="overly-loader">
      <img
        aria-hidden="true"
        src="https://lh3.googleusercontent.com/hpmOa05kpbLU2iOFs9AtU4Y_d0clC4Wds-4G_PjOGwBI-PM26iwWPPzaj4e1fnxmNikYgU6EaJeaLe8mJDGNHHZ7CtI=w128-h128-e365-rj-sc0x00ffffff"
        style={{ height: 50, width: 50 }}
      />
      <p>Loading...</p>
    </div>
  )
}

export default OverlayLoader
