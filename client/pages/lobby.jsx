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
       <div className="border flex align-center column">
         <div className="custom-heading-1">
           <span className="green">Game</span> <span className="pink">Lobby</span>
         </div>
         <div className="full-width flex-evenly">
          <h2 className="white mt-0">Host</h2>
          <h2 className="white mt-0">Players</h2>
        </div>

         <div className="overflow full-width">
            <div className="full-width flex-evenly">
              <p className="white test-margin">Host2</p>
              <p className="white test-margin">Players</p>
            </div>
            <div className="full-width flex-evenly">
              <p className="white test-margin">Host3</p>
              <p className="white test-margin">Players</p>
            </div>
            <div className="full-width flex-evenly">
              <p className="white test-margin">Host4</p>
              <p className="white test-margin">Players</p>
            </div>
            <div className="full-width flex-evenly">
              <p className="white test-margin">Host5</p>
              <p className="white test-margin">Players</p>
            </div>
            <div className="full-width flex-evenly">
              <p className="white test-margin">Host6</p>
              <p className="white test-margin">Players</p>
            </div>
            <div className="full-width flex-evenly">
              <p className="white test-margin">Host7</p>
              <p className="white test-margin">Players</p>
            </div>
            <div className="full-width flex-evenly">
              <p className="white test-margin">Host8</p>
              <p className="white test-margin">Players</p>
            </div>
         </div>
         <div className="full-width padding-3-rem green flex-around">
           <div className="buttons">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Create Game
           </div>
           <div className="buttons">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Join Game
           </div>
         </div>
        </div>
      </div>
    );
  }
}
