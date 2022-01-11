import React from 'react';
import parseRoute from './lib/parse-route';
import NavBar from './pages/nav-bar';
import Lobby from './pages/lobby';
import Landing from './pages/landing';
// import Home from './pages/home';
import Chat from './pages/chat';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorizing: window.localStorage.getItem('tic-tac-destroy') === null,
      route: parseRoute(window.location.hash)
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
    if (path === 'Chat') {
      return <Chat />;
    }
  }

  render() {
    const { path } = this.state.route;
    const background = path === 'Game-Page' ? 'shootingStarBackground' : 'blue-radial';
    return (
      <div className={`full-height ${background}`}>
        <NavBar path={path} />
        {this.renderPage(this.state.route)}
      </div>
    );
  }
}
