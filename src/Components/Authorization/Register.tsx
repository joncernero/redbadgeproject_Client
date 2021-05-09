import React, { Component } from 'react';
import APIURL from '../../Utilities/Environments';
import { RegisterDiv } from '../../Styles/Index';

interface State {
  user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    companyId: number;
  };
}

interface Props {
  token: string;
  fetchUsers: Function;
}

export class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: '',
        companyId: 0,
      },
    };
  }

  handleUserSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    fetch(`${APIURL}/user/register`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: this.state.user.email,
          password: this.state.user.password,
          firstName: this.state.user.firstName,
          lastName: this.state.user.lastName,
          role: this.state.user.role,
          companyId: 1,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          user: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            role: '',
            companyId: 1,
          },
        });
      })
      .then(() => {
        this.props.fetchUsers();
      })
      .catch((err) => console.log({ error: err }));
  };

  // handleCompanySubmit = (event: React.SyntheticEvent) => {
  //   event.preventDefault();
  //   fetch(`${APIURL}/company/create`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       companyName: this.state.company.companyName,
  //       companyAddress: this.state.company.companyAddress,
  //       city: this.state.company.city,
  //       state: this.state.company.state,
  //       logo: this.state.company.logo,
  //     }),
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //       Authorization: `${localStorage.getItem('token')}`,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // if (data.sessionToken) {
  //       //   this.props.updateToken(data.sessionToken);
  //       // } else {
  //       //   this.resetState();
  //       // }
  //       console.log(data);
  //       this.setState({
  //         company: {
  //           companyName: '',
  //           companyAddress: '',
  //           city: '',
  //           state: '',
  //           zipcode: '',
  //           logo: '',
  //           id: data.id,
  //         },
  //       });
  //     })

  //     .catch((err) => console.log({ error: err }));
  // };

  render() {
    return (
      <RegisterDiv>
        <h1>Create Users</h1>
        <form onSubmit={this.handleUserSubmit}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              onChange={(e) =>
                this.setState({
                  user: { ...this.state.user, email: e.target.value },
                })
              }
              name='email'
              type='email'
              placeholder='email@test.com'
              value={this.state.user.email}
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              onChange={(e) =>
                this.setState({
                  user: { ...this.state.user, password: e.target.value },
                })
              }
              name='password'
              type='password'
              minLength={5}
              placeholder='password'
              value={this.state.user.password}
              required
            />
          </div>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <input
              onChange={(e) =>
                this.setState({
                  user: { ...this.state.user, firstName: e.target.value },
                })
              }
              name='firstName'
              minLength={1}
              placeholder='John'
              value={this.state.user.firstName}
              required
            />
          </div>
          <div>
            <label htmlFor='lastName'>Last Name</label>
            <input
              onChange={(e) =>
                this.setState({
                  user: { ...this.state.user, lastName: e.target.value },
                })
              }
              name='lastName'
              minLength={1}
              placeholder='Doe'
              value={this.state.user.lastName}
              required
            />
          </div>
          <div>
            <label htmlFor='role'>Role</label>
            <input
              onChange={(e) =>
                this.setState({
                  user: { ...this.state.user, role: e.target.value },
                })
              }
              name='role'
              minLength={1}
              placeholder='Doe'
              value={this.state.user.role}
              required
            />
          </div>
          <button type='submit'>Register</button>
        </form>
      </RegisterDiv>
    );
  }
}
