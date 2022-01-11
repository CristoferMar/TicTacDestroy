import React from 'react';
import { io } from 'socket.io-client';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const socket = io('http://localhost:2222');
    return (
      <div></div>
    );
  }
}
