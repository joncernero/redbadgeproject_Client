import React, { Component } from 'react';
import APIURL from '../../utilities/Environments';

interface State {
  email: string;
  password: string;
  isAlertOpen: boolean;
}

interface Props {
  updateToken: (newToken: string) => void;
}

export class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isAlertOpen: false,
    };
  }

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
      email: '',
      password: '',
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
