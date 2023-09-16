
import React, { useState } from 'react';
import '../../assets/styles/components.scss';
const Popup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    showPopup ? <div className={`popup ${showPopup ? 'active' : ''}`}>
      <div className="popup-content">
        <div className="popup-header">
          <img aria-hidden="true" src="https://lh3.googleusercontent.com/hpmOa05kpbLU2iOFs9AtU4Y_d0clC4Wds-4G_PjOGwBI-PM26iwWPPzaj4e1fnxmNikYgU6EaJeaLe8mJDGNHHZ7CtI=w128-h128-e365-rj-sc0x00ffffff" />
          <button className="popup-close-btn" onClick={closePopup}>
            <svg height="20px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg" ><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" /></svg>
          </button>
        </div>
        <img aria-hidden="true" src="https://upload.wikimedia.org/wikipedia/commons/0/01/Google_Docs_logo_%282014-2020%29.svg" alt="GIF Example" />
        <h2>Welcome to Revision <br /> for Google Docs!</h2>
        <h2 className="revision-signup">Sign Up to turn on Revision<br /> suggestion in yout Google Docs.</h2>
        <button onClick={() => window.open("https://chrome.google.com/webstore/detail/revision-fighting-bias/jgflbioihdojhldekghdbelfgickocnp")} className="google-signin-btn">Sign Up with Google</button>
        <p>
          Already have an account?{' '}
          <a href="#" className="signin-link">
            Log in
          </a>
        </p>
      </div>
    </div> : ""
  );
};

export default Popup;