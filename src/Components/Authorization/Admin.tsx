import React, { Component } from 'react';
import { Register } from './Register';
import APIURL from '../../utilities/Environments';
import UserTable from './UserTable';
import { TitleDiv } from '../../styled/Index';
import { withRouter, RouteComponentProps } from 'react-router-dom';

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

type PathParamsType = {
  companyId: string | undefined;
};

interface Props extends RouteComponentProps<PathParamsType> {
  token: string;
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

  companyId = this.props.match.params.companyId;

  fetchUsers = () => {
    this.setState({ isLoading: true });
    fetch(`${APIURL}/user/`, {
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

  toggleUserEdit = () => {
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
        <TitleDiv>
          <Register token={this.props.token} fetchUsers={this.fetchUsers} />
        </TitleDiv>
        <UserTable
          users={this.state.users}
          token={this.props.token}
          fetchUsers={this.fetchUsers}
          toggleUserEdit={this.toggleUserEdit}
          updateActive={this.state.updateActive}></UserTable>
      </div>
    );
  }
}

export default withRouter(Admin);
