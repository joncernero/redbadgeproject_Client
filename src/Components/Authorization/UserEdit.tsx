import React, { Component } from 'react';
import { StyledModal } from '../../Styles/Modal';
import APIURL from '../../Utilities/Environments';
import { motion } from 'framer-motion';

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
  editFirstName: string;
  editLastName: string;
  editRole: string;
}

interface Props {
  token: string;
  toggleUserEdit: Function;
  userToUpdate: User;
  fetchUsers: Function;
}

class UserEdit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editFirstName: this.props.userToUpdate.firstName,
      editLastName: this.props.userToUpdate.lastName,
      editRole: this.props.userToUpdate.role,
    };
  }

  userUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/user/update/${this.props.userToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        firstName: this.state.editFirstName,
        lastName: this.state.editLastName,
        role: this.state.editRole,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        this.props.fetchUsers();
        this.props.toggleUserEdit();
      });
  };

  render() {
    return (
      <StyledModal as={motion.div} whileHover={{ scale: 1.1 }} drag>
        <form onSubmit={this.userUpdate}>
          <h1>Update Edit</h1>
          <label htmlFor='firstName'>Edit First Name:</label>
          <input
            name='name'
            value={this.state.editFirstName}
            onChange={(e) => this.setState({ editFirstName: e.target.value })}
          />
          <label htmlFor='lastName'>Edit Last Name:</label>
          <input
            name='lastName'
            value={this.state.editLastName}
            onChange={(e) => this.setState({ editLastName: e.target.value })}
          />
          <label htmlFor='role'>Edit Role:</label>
          <input
            name='role'
            value={this.state.editRole}
            onChange={(e) => this.setState({ editRole: e.target.value })}
          />
          <button type='submit'>Update</button>
        </form>
      </StyledModal>
    );
  }
}

export default UserEdit;
