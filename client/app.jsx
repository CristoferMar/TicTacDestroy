import React from 'react';
import parseRoute from './lib/parse-route';
import NavBar from './pages/nav-bar';
import Lobby from './pages/lobby';
import Landing from './pages/landing';
// import Home from './pages/home';
import { io } from 'socket.io-client';

// const socket = io.connect('http://localhost:2220');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorizing: window.localStorage.getItem('tic-tac-destroy') === null,
      route: parseRoute(window.location.hash),
      ioMessage: '',
      basketball: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.socket = io('http://localhost:2220');
    const { socket } = this;
    socket.on('connect', () => {
      console.log('socket.id:', socket.id);
    });
    // console.log('testing socnole.log');
    // this.socket.on('connect', socket => {
    //   console.log('connected');
    //   console.log(`connected on socket.id: ${socket.id}`);
    // });
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  handleSubmit() {
    event.preventDefault();
    console.log(this.state.basketball);
  }

  handleChange() {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  renderPage(route) {
    const { path } = route;

    if (path === 'Landing-Page' || path === '') {
      return <Landing />;
    }
    if (path === 'Lobby') {
      return <Lobby />;
    }

  }

  render() {
    const { path } = this.state.route;
    const background = path === 'Game-Page' ? 'shootingStarBackground' : 'blue-radial';
    return (
      <div className={`full-height ${background}`}>
        <NavBar path={path} />
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} placeholder="type here..." name="basketball"></input>
            <button>push me</button>
          </form>
          {this.state.ioMessage}</div>
        {/* {this.renderPage(this.state.route)} */}
      </div>
    );
  }
}
