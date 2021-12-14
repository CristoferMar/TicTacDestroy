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
    return (
      <div className="full-width height7-min40 flex-between padding-5 align-center">

        {
        single &&
          <>
            <img src="/images/small-logo.svg" alt="TicTacDestroy" className="height-90" />
            <div className="flex-between">
              <span className="nav-buttons"><a href="#" className="nav-buttons-link"></a></span>
            </div>
          </>
        }
        {/* {
        landing &&
        <>
        </>
        } */}

      </div>
    );
  }
}
