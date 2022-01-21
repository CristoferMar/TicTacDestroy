import React from 'react';
import LobbyGames from './lobby-games';
import AppContext from '../lib/app-context';

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    fetch();
  }

  render() {
    console.log(this.context);
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

          <LobbyGames />

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

Lobby.contextType = AppContext;
