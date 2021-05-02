import userEvent from '@testing-library/user-event';
import React, { Component } from 'react';
import { Register } from './Register';
import APIURL from '../../utilities/Environments';

interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  companyId: number;
}

interface State {
  users: User[];
  updateActive: boolean;
  userToUpdate: User;
  isLoading: boolean;
}

interface Props {
  token: string;
  // role: string;
}

export class Admin extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      users: [],
      updateActive: false,
      userToUpdate: {
        id: 0,
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: '',
        companyId: 0,
      },
      isLoading: false,
    };
  }

  fetchUsers = () => {
    this.setState({ isLoading: true });
    fetch(`${APIURL}/user`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        this.setState({ users: user });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  toggleFeatureEdit = () => {
    this.setState((state) => ({
      updateActive: !state.updateActive,
    }));
  };

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    return (
      <div>
        <Register token={this.props.token} />
      </div>
    );
  }
}
