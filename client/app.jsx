import React from 'react';
import parseRoute from './lib/parse-route';
import NavBar from './pages/nav-bar';
import Lobby from './pages/lobby';
import Landing from './pages/landing';
// import Home from './pages/home';
import { io } from 'socket.io-client';
import AppContext from './lib/app-context';

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
    this.socket = io('http://localhost:2220');
  }

  componentDidMount() {
    const { socket } = this;
    socket.on('connect', () => {
      console.log('socket.id:', socket.id);
    });

    socket.on('tellsEveryone', entry => {
      console.log('Prson says this:', entry);
    });
    // console.log('testing socnole.log');
    // this.socket.on('connect', socket => {
    //   console.log('connected');
    //   console.log(`connected on socket.id: ${socket.id}`);
    // });
    socket.on('newGameCreated', entry => {
      console.log('NEW GAME CREATED:', entry);
    });
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  handleSubmit() {
    event.preventDefault();
    const { socket } = this;
    socket.emit('messageFromClient', this.state.basketball);
    // console.log(this.state.basketball);
    this.setState({ basketball: '' });
    event.target[0].value = '';
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
    const contextValue = { name: 'daniel', age: 29 };
    return (
      <AppContext.Provider value={contextValue}>
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
      </AppContext.Provider>
    );
  }
}
