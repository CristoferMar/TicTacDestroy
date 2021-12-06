import React from 'react';
import parseRoute from './lib/parse-route';
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
    console.log(route);
    return (<div>{`we are currently on ${route.path}`}</div>);
  }

  render() {
    return (
      <>
        <div>{this.renderPage(this.state.route)}</div>
      </>
    );
  }
}
