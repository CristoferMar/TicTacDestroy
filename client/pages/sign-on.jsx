import React from 'react';

export default class SignOn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleChange() {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSignIn() {
    console.log('handleSignIn has RUNN');
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.name,
        password: this.state.password
      })
    };
    fetch('/api/auth/sign-in', req)
      .then(response => response.json())
      .then(result => {
        window.localStorage.setItem('TTD-JWT', JSON.stringify(result));
        this.props.signInHandler();
      });
  }

  handleSubmit() {
    console.log('was this submitted');
    event.preventDefault();
    const signUp = window.location.hash === '#Sign-Up';
    if (signUp === true) {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.name,
          password: this.state.password
        })
      };
      fetch('/api/auth/sign-up', req)
        .then(response => response.json())
        .then(result => {
          console.log('did this run line 58');
          this.handleSignIn();
        });
    }

  }

  render() {
    const path = window.location.hash;
    return (
    <div className="full-width height-min-nav center-all">
      <div className="border flex align-center column">
        <div className="custom-heading-1">
          {
            path === '#Sign-In'
              ? <>
                  <span className="green">Sign</span><span className="pink"> In</span>
                </>
              : <>
                  <span className="green">Sign</span><span className="pink"> Up</span>
                </>
          }
        </div>
        <div className="width-90">
          <form action="" onSubmit={this.handleSubmit} className="full-width flex column justify-center padding-10">
            <label htmlFor="name" className="white ml-10 mb-10">Name*</label>
            <input type="text" placeholder="Enter your username" id="name" onChange={this.handleChange} className="height-40 br-12 pl-10"></input>
            <label htmlFor="password" className="white ml-10 mt-20 mb-10">Password*</label>
            <input type="password" placeholder="Enter your password" id="password" onChange={this.handleChange} className="height-40 br-12 pl-10"></input>
            <div className="full-width padding-3-rem green center-all">
              <button className="transparent-button">
                <div className="register roboto-fixed-size click">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {
                  path === '#Sign-In'
                    ? 'Sign In'
                    : 'Sign Up'
                }
              </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
  }
}
