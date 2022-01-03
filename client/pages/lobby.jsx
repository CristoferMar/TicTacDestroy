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
         <table>
            <thead>
              <tr>
                <th>Games</th>
                <th>Players</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="white">sadfsda</td>
                <td>sadfadsf</td>
              </tr>
            </tbody>
         </table>
        </div>
      </div>
    );
  }
}
