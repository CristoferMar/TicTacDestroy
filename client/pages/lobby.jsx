import React from 'react';
import LobbyGames from './lobby-games';
import AppContext from '../lib/app-context';
// if user has a game that isActive with them being player1 in a lobby
// redirect to game page **********REMEMBER TO DO THIS LOGIC WHEN WE HAVE A SIGN IN PAGE***********
// on sign-on check games to see if there is a game where active equals true and player1 equals userId
// if result.row[0] is empty direct to lobby else direct to game. *******REMEMBER TO DO THIS**********

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGames: []
    };
  }

  componentDidMount() {
    fetch('/api/openGames')
      .then(response => response.json())
      .then(result => {
        this.setState({ activeGames: result });
      })
      .catch(err => {
        console.error(err);
      });
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
          <div className='fixed-width'>
            <h2 className="white mt-0">Host</h2>
          </div>
          <div className='fixed-width'>
            <h2 className="white mt-0">Players</h2>
          </div>
        </div>

        <div className="overflow full-width">
          {this.state.activeGames.map(game =>
            <div className="full-width flex-evenly" key={game.gameId} id={game.gameId}>
              <LobbyGames player1={game.player1} hostName={game.hostName} isActive={game.isActive} />
            </div>
          )
          }
        </div>

        <div className="full-width padding-3-rem green flex-evenly">
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
