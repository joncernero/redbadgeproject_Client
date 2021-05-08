import React, { Component } from 'react';
import APIURL from '../../utilities/Environments';
import UserEdit from './UserEdit';
import { EditButton, DeleteButton, TitleDiv } from '../../styled/Index';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

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
  editingUser: User | undefined;
}

interface Props {
  token: string;
  users: User[];
  fetchUsers: Function;
  toggleUserEdit: Function;
  updateActive: boolean;
}

class UserTable extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editingUser: undefined,
    };
  }

  deleteUser = (user: User) => {
    fetch(`${APIURL}/user/delete/${user.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    }).then(() => this.props.fetchUsers());
  };

  usersMapper = () => {
    return this.props.users.map((user: User, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.firstName}</TableCell>
          <TableCell>{user.lastName}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>
            <EditButton
              onClick={() => {
                this.setState({ editingUser: user });
                this.props.toggleUserEdit();
              }}>
              Edit
            </EditButton>
          </TableCell>
          <TableCell>
            <DeleteButton
              onClick={() => {
                this.deleteUser(user);
              }}>
              Delete
            </DeleteButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  render() {
    return (
      <>
        <div>
          <TitleDiv>
            <h1>Users</h1>
          </TitleDiv>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.usersMapper()}</TableBody>
            </Table>
          </TableContainer>
        </div>
        {this.props.updateActive && this.state.editingUser ? (
          <UserEdit
            userToUpdate={this.state.editingUser}
            token={this.props.token}
            toggleUserEdit={this.props.toggleUserEdit}
            fetchUsers={this.props.fetchUsers}
          />
        ) : null}
      </>
    );
  }
}

export default UserTable;
