import React from 'react';
import parseRoute from './lib/parse-route';
import NavBar from './pages/nav-bar';
import Lobby from './pages/lobby';
import Landing from './pages/landing';
// import Home from './pages/home';
// import { io } from 'socket.io-client';
import SignOn from './pages/sign-on';
import AppContext from './lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: window.localStorage.getItem('TTD-JWT'),
      route: parseRoute(window.location.hash),
      ioMessage: ''
      // socketConnected: false
    };
    // this.socket = io('http://localhost:2220');
    // console.log('constructor has finished');
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });

    // const { socket } = this;
    // socket.on('connect', socket => {
    //   this.setState({ socketConnected: true });
    // });
  }

  handleSignIn() {
    console.log('handleSignIn has run from app.jsx');

    // window.location.hash = '#Lobby';
    this.setState({ token: JSON.parse(window.localStorage.getItem('TTD-JWT')) });
    window.location.hash = '#Lobby';
  }

  handleSignOut() {
    window.localStorage.removeItem('TTD-JWT');
    this.setState({ token: null });
  }

  renderPage() {

    const { token, route } = this.state;
    const { path } = route;
    console.log('token:', token);
    console.log('path:', path);

    if (!token) {
      if (path === 'Landing-Page' || path === '') {
        return <Landing />;
      } else if (path === 'Sign-Up' || path === 'Sign-In') {
        return <SignOn signInHandler={this.handleSignIn} />;
      } else {
        window.location.hash = '';
        return <Landing />;
      }
    } else {
      if (path === 'Lobby') {
        return <Lobby />;
      }

    }

    console.log('componentDidMount has finished');
  }

  // can move the socket connection into app.jsx
  // pass this.socket via context
  // when they go into lobby page, put them into a lobby room, or when they
  // go into a private room, put them in a private room

  render() {
    // const socketId = this.socket ? this.socket.id : 'nothing yet';
    // console.log('this.socket.id:', socketId);
    console.log('render has finished');
    const { path } = this.state.route;
    const background = path === 'Game-Page' ? 'shootingStarBackground' : 'blue-radial';
    // const { socket } = this;
    const contextValue = { name: 'daniel', age: 29 };
    return (
        <AppContext.Provider value={contextValue}>
          <div className={`full-height ${background}`}>
            <NavBar path={path} signOutHandler={this.handleSignOut} />
            {this.renderPage()}

            {/* {this.renderPage(this.state.route)} */}
          </div>
        </AppContext.Provider>
    );
  }
}
