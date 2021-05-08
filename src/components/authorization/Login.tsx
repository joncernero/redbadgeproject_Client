import React, { Component } from 'react';
import APIURL from '../../utilities/Environments';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { LoginDiv } from '../../styled/Index';

interface State {
  email: string;
  password: string;
  isAlertOpen: boolean;
}

interface Props extends RouteComponentProps {
  updateToken: (newToken: string) => void;
}

class Login extends Component<Props, State> {
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
          localStorage.setItem('token', data.sessionToken);
          if (data.user.role === 'admin') {
            this.props.history.push('/admin');
            return;
          }
          this.props.history.push('/dashboard');
          // localStorage.setItem('role', data.user.role);
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
      <LoginDiv>
        <h1>Login</h1>
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
            <button type='submit'>Login</button>
          </div>
        </form>
      </LoginDiv>
    );
  }
}

export default withRouter(Login);
