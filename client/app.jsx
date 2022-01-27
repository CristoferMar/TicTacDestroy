import React from 'react';
import parseRoute from './lib/parse-route';
import NavBar from './pages/nav-bar';
import Lobby from './pages/lobby';
import Landing from './pages/landing';
// import Home from './pages/home';
import AppContext from './lib/app-context';

// const socket = io.connect('http://localhost:2220');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorizing: window.localStorage.getItem('tic-tac-destroy') === null,
      route: parseRoute(window.location.hash),
      ioMessage: ''
    };

  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
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

  // can move the socket connection into app.jsx
  // pass this.socket via context
  // when they go into lobby page, put them into a lobby room, or when they
  // go into a private room, put them in a private room

  render() {
    const { path } = this.state.route;
    const background = path === 'Game-Page' ? 'shootingStarBackground' : 'blue-radial';
    const contextValue = { name: 'daniel', age: 29 };
    return (
      <AppContext.Provider value={contextValue}>
        <div className={`full-height ${background}`}>
          <NavBar path={path} />
          {this.renderPage(this.state.route)}
        </div>
      </AppContext.Provider>
    );
  }
}
