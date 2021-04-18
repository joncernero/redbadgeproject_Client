import React, { Component } from 'react';
import APIURL from '../../utilities/environments';

interface State {
  email: string | undefined;
  password: string | undefined;
  isAlertOpen: boolean;
}

interface Props {
  updateToken: (newToken: string) => void;
}

export class Login extends Component<Props, State> {
  state = {
    email: undefined,
    password: undefined,
    isAlertOpen: false,
  };

  toggleIsAlertOpen = () =>
    this.setState((prevState) => ({
      ...prevState,
      isAlertOpen: !prevState.isAlertOpen,
    }));

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    fetch(`${APIURL}/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sessionToken) {
          this.props.updateToken(data.sessionToken);
        } else {
          this.resetState();
        }
      })
      .catch((err) => this.toggleIsAlertOpen());
  };

  resetState = () => {
    this.setState((prevState) => ({
      ...prevState,
      email: undefined,
      password: undefined,
    }));
  };
  render() {
    return (
      <div>
        <h1>Hello from Login!</h1>
      </div>
    );
  }
}
