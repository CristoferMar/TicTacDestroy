import React from 'react';

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="full-width height-min-nav center-all">
       <div className="border flex justify-center">
         <div className="custom-heading-1">
           <span className="green">Game</span> <span className="pink">Lobby</span>
         </div>
        </div>
      </div>
    );
  }
}
