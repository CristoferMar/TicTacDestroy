import React from 'react';

export default class SignOn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const path = window.location.hash;
    return (
    <div className="full-width height-min-nav center-all">
      <div className="border flex align-center column">
        <div className="custom-heading-1">
          {
            path === '#Sign-In'
              ? <>
                  <span className="green">Sign</span> <span className="pink">In</span>
                </>
              : <>
                  <span className="green">Sign</span> <span className="pink">Up</span>
                </>
          }
        </div>
        <div>
          <form action="">
            <input type="text"></input>
          </form>
        </div>
      </div>
    </div>
    );
  }
}
