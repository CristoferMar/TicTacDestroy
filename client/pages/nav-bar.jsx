import React from 'react';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log('props bois:', props);
  }

  render() {
    const single = ['Lobby', 'Results'].includes(this.props.path);
    const signOn = ['Sign-Up', 'Sign-In'].includes(this.props.path);
    return (
      <div className="full-width height7-min40 flex-between padding-5 align-center">

        {
        single &&
          <>
            <img src="/images/small-logo.svg" alt="TicTacDestroy" className="height-90" />
            <div className="flex-between">
              <span className="nav-buttons"><a href="#" className="nav-buttons-link sign-out-content"></a></span>
            </div>
          </>
        }
        {
        signOn &&
        <>
          <img src="/images/small-logo.svg" alt="TicTacDestroy" className="height-90" />
          <div className="flex-between">
            <span className="nav-buttons"><a href="#" className="nav-buttons-link sign-in-content"></a></span>
            <span className="nav-buttons wide-button"><a href="#" className="nav-buttons-link play-as-guest"></a></span>
          </div>
        </>
        }

      </div>
    );
  }
}
