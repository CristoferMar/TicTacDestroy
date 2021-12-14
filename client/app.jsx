import React from 'react';
import parseRoute from './lib/parse-route';
import NavBar from './pages/nav-bar';
// import Home from './pages/home';

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

  renderPage() {
    const { route } = this.state;
    // console.log(route);
    // console.log('main branch established');
    return (<div>{`we are currently on ${route.path}`}</div>);
  }

  render() {
    console.log('this.state.route:', this.state.route);
    const { path } = this.state.route;
    const background = path === 'Game-Page' ? 'shootingStarBackground' : 'blue-radial';
    return (
      <div className={`full-height ${background}`}>
        <NavBar path={path} />
      </div>
    );
  }
}
