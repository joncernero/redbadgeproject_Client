import React, { Component } from 'react';
import APIURL from '../../utilities/Environments';

interface State {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  companyId: number;
  isAlertOpen: boolean;
}

interface Props {
  updateToken: (newToken: string) => void;
}

export class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: '',
      companyId: 0,
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
    fetch(`${APIURL}/user/register`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          role: this.state.role,
          companyId: 1,
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
      firstName: '',
      lastName: '',
      companyId: 1,
    }));
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              onChange={(e) => this.setState({ email: e.target.value })}
              name='email'
              type='email'
              placeholder='email@test.com'
              value={this.state.email}
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              onChange={(e) => this.setState({ password: e.target.value })}
              name='password'
              type='password'
              minLength={5}
              placeholder='password'
              value={this.state.password}
              required
            />
          </div>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <input
              onChange={(e) => this.setState({ firstName: e.target.value })}
              name='firstName'
              minLength={1}
              placeholder='John'
              value={this.state.firstName}
              required
            />
          </div>
          <div>
            <label htmlFor='lastName'>Last Name</label>
            <input
              onChange={(e) => this.setState({ lastName: e.target.value })}
              name='lastName'
              minLength={1}
              placeholder='Doe'
              value={this.state.lastName}
              required
            />
          </div>
          <div>
            <label htmlFor='role'>Role</label>
            <input
              onChange={(e) => this.setState({ lastName: e.target.value })}
              name='lastName'
              minLength={1}
              placeholder='Doe'
              value={this.state.lastName}
              required
            />
          </div>
          <button type='submit'>Register</button>
        </form>
      </div>
    );
  }
}
