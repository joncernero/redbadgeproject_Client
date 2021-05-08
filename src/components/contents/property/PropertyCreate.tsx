import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import { StyledModal } from '../../../styled/Modal';
import { motion } from 'framer-motion';

interface State {
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  numberOfUnits: number;
  companyId: number;
}

interface Props {
  token: string;
  fetchProperties: Function;
  togglePropertyCreate: Function;
}

class PropertyCreate extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      streetAddress: '',
      city: '',
      state: '',
      zipcode: '',
      numberOfUnits: 0,
      companyId: 1,
    };
  }

  fetchPropertyData = (e: React.FormEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/property/create`, {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        streetAddress: this.state.streetAddress,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        numberOfUnits: this.state.numberOfUnits,
        companyId: 1,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          name: '',
          streetAddress: '',
          city: '',
          state: '',
          zipcode: '',
          numberOfUnits: 0,
          companyId: 1,
        });
      })
      .then(() => {
        this.props.fetchProperties();
        this.props.togglePropertyCreate();
      });
  };

  render() {
    return (
      <StyledModal as={motion.div} whileHover={{ scale: 1.1 }} drag>
        <form onSubmit={this.fetchPropertyData}>
          <h1>Create New Property</h1>
          <div>
            <label htmlFor='name'>Name:</label>
            <input
              name='name'
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='streetAddress'>Street Address:</label>
            <input
              name='streetAddress'
              value={this.state.streetAddress}
              onChange={(e) => this.setState({ streetAddress: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='city'>City:</label>
            <input
              name='city'
              value={this.state.city}
              onChange={(e) => this.setState({ city: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='state'>State:</label>
            <input
              name='state'
              value={this.state.state}
              onChange={(e) => this.setState({ state: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='zipcode'>Zipcode:</label>
            <input
              name='zipcode'
              value={this.state.zipcode}
              onChange={(e) => this.setState({ zipcode: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='numberOfUnits'># of Units:</label>
            <input
              name='numberOfUnits'
              value={this.state.numberOfUnits}
              onChange={(e) =>
                this.setState({ numberOfUnits: Number(e.target.value) })
              }
            />
          </div>
          <button type='submit'>Create Property</button>
        </form>
      </StyledModal>
    );
  }
}

export default PropertyCreate;
