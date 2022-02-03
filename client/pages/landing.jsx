import React from 'react';

export default class Landing extends React.Component {

  render() {
    return (
      <>
        <div className="full-width height-75-90 center-all column">
          <img src="/images/large-logo.svg" alt="large logo" className="large-logo-95"></img>
          <a href="#Sign-Up">
            <div className="register mt-40">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Register Now
            </div>
          </a>

        </div>
      </>
    );
  }
}
