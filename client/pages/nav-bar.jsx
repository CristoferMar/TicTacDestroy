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
      <div className="full-width height7-min40 flex-between padding-5">

        {
        single &&
          <>
            <img src="/images/small-logo.svg" alt="TicTacDestroy" />
            <div className="flex-between">
              <button>fart</button>
              <button className="margin-left">Sign Out</button>
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
