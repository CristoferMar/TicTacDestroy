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
                  <span className="green">Sign</span><span className="pink">-In</span>
                </>
              : <>
                  <span className="green">Sign</span> <span className="pink">Up</span>
                </>
          }
        </div>
        <div className="width-90">
          <form action="" className="full-width flex column justify-center padding-10">
            <label htmlFor="name" className="white ml-10 mb-10">Name*</label>
            <input type="text" placeholder="Enter your username" id="name" className="height-40 br-12 pl-10"></input>
            <label htmlFor="password" className="white ml-10 mt-20 mb-10">Password*</label>
            <input type="password" placeholder="Enter your password" id="password" className="height-40 br-12 pl-10"></input>
          </form>
        </div>

        <div className="full-width padding-3-rem green flex-evenly">
          <div className="buttons" onClick={this.handleNewGame}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Sign-up
          </div>
        </div>
      </div>
    </div>
    );
  }
}
