import React from 'react';

export default class NavBar extends React.Component {

  render() {
    const path = this.props.path;
    const single = ['Lobby', 'Results'].includes(path);
    const signOn = ['Sign-Up', 'Sign-In', 'Landing-Page', ''].includes(path);
    const landing = (path === 'Landing-Page' || path === '');
    return (
      <div className="full-width height7-min40 flex-between padding-5 align-center">

        {
        single &&
          <>
            <img src="/images/small-logo.svg" alt="TicTacDestroy" className="height-70-90" />
            <div className="flex-between">
              <span className="nav-buttons"><a href="#Sign-In" className="nav-buttons-link sign-out-content"></a></span>
            </div>
          </>
        }
        {
        signOn &&
        <>
          {
            landing
              ? <div></div>
              : <img src="/images/small-logo.svg" alt="TicTacDestroy" className="height-70-90" />
          }
          <div className="flex-between">
            {
            (path === 'Sign-Up' || path === '')
              ? <span className="nav-buttons"><a href="#Sign-In" className="nav-buttons-link sign-in-content"></a></span>
              : <span className="nav-buttons"><a href="#Sign-Up" className="nav-buttons-link sign-up-content"></a></span>
            }
            <span className="nav-buttons wide-button"><a href="#Lobby" className="nav-buttons-link play-as-guest"></a></span>
          </div>
        </>
        }
      </div>
    );
  }
}
