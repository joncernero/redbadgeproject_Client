import React, { Component } from 'react';
import { Register } from './Register';
import { Login } from './Login';

interface State {
  isLoggingIn: boolean;
}

interface Props {
  updateToken: (newToken: string) => void;
}

export class Auth extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoggingIn: false,
    };
  }

  toggleLoggingIn = () => {
    this.setState((prevState) => ({
      ...prevState,
      isLoggingIn: !prevState.isLoggingIn,
    }));
  };
  render() {
    return (
      <div>
        {this.state.isLoggingIn ? (
          <Login updateToken={this.props.updateToken} />
        ) : (
          <Register updateToken={this.props.updateToken} />
        )}
        {this.state.isLoggingIn ? (
          <button onClick={this.toggleLoggingIn}>Register</button>
        ) : (
          <button onClick={this.toggleLoggingIn}>Login</button>
        )}
      </div>
    );
  }
}
