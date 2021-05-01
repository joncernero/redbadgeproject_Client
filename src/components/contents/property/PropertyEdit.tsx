import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

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
  toggleActive: Function;
  propertiesToUpdate: Property;
  fetchProperties: Function;
}

class PropertyEdit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editName: this.props.propertiesToUpdate.name,
      editStreetAddress: this.props.propertiesToUpdate.streetAddress,
      editCity: this.props.propertiesToUpdate.city,
      editState: this.props.propertiesToUpdate.state,
      editZipcode: this.props.propertiesToUpdate.zipcode,
      editNumberOfUnits: this.props.propertiesToUpdate.numberOfUnits,
    };
  }

  propertyUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/property/update/${this.props.propertiesToUpdate.id}`, {
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
      .then((propertyData) => {
        this.props.toggleActive();
      });
  };

  render() {
    return (
      <div>
        <Modal isOpen={true}>
          <ModalHeader>Update Property</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.propertyUpdate}>
              <FormGroup>
                <Label htmlFor='name'>Edit Name:</Label>
                <Input
                  name='name'
                  value={this.state.editName}
                  onChange={(e) => this.setState({ editName: e.target.value })}
                />
                <Label htmlFor='streetAddress'>Edit Street Address:</Label>
                <Input
                  name='streetAddress'
                  value={this.state.editStreetAddress}
                  onChange={(e) =>
                    this.setState({ editStreetAddress: e.target.value })
                  }
                />
                <Label htmlFor='city'>Edit City:</Label>
                <Input
                  name='city'
                  value={this.state.editCity}
                  onChange={(e) => this.setState({ editCity: e.target.value })}
                />
                <Label htmlFor='state'>Edit State:</Label>
                <Input
                  name='state'
                  value={this.state.editState}
                  onChange={(e) => this.setState({ editState: e.target.value })}
                />
                <Label htmlFor='zipcode'>Edit Zipcode:</Label>
                <Input
                  name='zipcode'
                  value={this.state.editZipcode}
                  onChange={(e) =>
                    this.setState({ editZipcode: e.target.value })
                  }
                />
                <Label htmlFor='numberOfUnits'>Edit Number Of Units:</Label>
                <Input
                  name='numberOfUnits'
                  value={this.state.editNumberOfUnits}
                  onChange={(e) =>
                    this.setState({ editNumberOfUnits: Number(e.target.value) })
                  }
                />
              </FormGroup>
              <Button type='submit'>Update Property!</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default PropertyEdit;
