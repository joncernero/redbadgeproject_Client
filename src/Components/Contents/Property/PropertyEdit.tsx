import React, { Component } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal } from '../../../Styles/Modal';
import { motion } from 'framer-motion';

interface Property {
  id: number;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  numberOfUnits: number;
  companyId: number;
}

interface State {
  editName: string;
  editStreetAddress: string;
  editCity: string;
  editState: string;
  editZipcode: string;
  editNumberOfUnits: number;
}

interface Props {
  token: string;
  togglePropertyEdit: Function;
  propertyToUpdate: Property;
  fetchProperties: Function;
}

class PropertyEdit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editName: this.props.propertyToUpdate.name,
      editStreetAddress: this.props.propertyToUpdate.streetAddress,
      editCity: this.props.propertyToUpdate.city,
      editState: this.props.propertyToUpdate.state,
      editZipcode: this.props.propertyToUpdate.zipcode,
      editNumberOfUnits: this.props.propertyToUpdate.numberOfUnits,
    };
  }

  propertyUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/property/update/${this.props.propertyToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        name: this.state.editName,
        streetAddress: this.state.editStreetAddress,
        city: this.state.editCity,
        state: this.state.editState,
        zipcode: this.state.editZipcode,
        numberOfUnits: this.state.editNumberOfUnits,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        this.props.fetchProperties();
        this.props.togglePropertyEdit();
      });
  };

  render() {
    return (
      <StyledModal as={motion.div} drag>
        <form onSubmit={this.propertyUpdate}>
          <h1>Update Property</h1>
          <label htmlFor='name'>Edit Name:</label>
          <input
            name='name'
            value={this.state.editName}
            onChange={(e) => this.setState({ editName: e.target.value })}
          />
          <label htmlFor='streetAddress'>Edit Street Address:</label>
          <input
            name='streetAddress'
            value={this.state.editStreetAddress}
            onChange={(e) =>
              this.setState({ editStreetAddress: e.target.value })
            }
          />
          <label htmlFor='city'>Edit City:</label>
          <input
            name='city'
            value={this.state.editCity}
            onChange={(e) => this.setState({ editCity: e.target.value })}
          />
          <label htmlFor='state'>Edit State:</label>
          <input
            name='state'
            value={this.state.editState}
            onChange={(e) => this.setState({ editState: e.target.value })}
          />
          <label htmlFor='zipcode'>Edit Zipcode:</label>
          <input
            name='zipcode'
            value={this.state.editZipcode}
            onChange={(e) => this.setState({ editZipcode: e.target.value })}
          />
          <label htmlFor='numberOfUnits'>Edit Number Of Units:</label>
          <input
            name='numberOfUnits'
            value={this.state.editNumberOfUnits}
            onChange={(e) =>
              this.setState({ editNumberOfUnits: Number(e.target.value) })
            }
          />
          <button type='submit'>Update</button>
        </form>
      </StyledModal>
    );
  }
}

export default PropertyEdit;
