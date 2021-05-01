import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import { Table } from 'reactstrap';
import PropertyEdit from './PropertyEdit';

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

interface Props {
  token: string;
  properties: Property[];
  fetchProperties: Function;
  editUpdateProperty: Function;
  toggleActive: Function;
  updateActive: boolean;
}

interface State {
  editingProperty: Property | undefined;
}

class PropertyTable extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editingProperty: undefined,
    };
  }

  deleteProperties = (property: Property) => {
    fetch(`${APIURL}/property/delete/${property.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    }).then(() => this.props.fetchProperties());
  };

  propertiesMapper = () => {
    console.log(this.props.properties);
    return this.props.properties.map((property: Property, index) => {
      return (
        <tr key={index}>
          <th scope='row'>{property.id}</th>
          <td>{property.name}</td>
          <td>{property.streetAddress}</td>
          <td>{property.city}</td>
          <td>{property.state}</td>
          <td>{property.zipcode}</td>
          <td>{property.numberOfUnits}</td>
          <td>{property.companyId}</td>
          <td>
            <button
              color='danger'
              onClick={() => {
                this.deleteProperties(property);
              }}>
              Delete
            </button>
          </td>
          <td>
            <button
              color='primary'
              onClick={() => {
                this.setState({ editingProperty: property });
                this.props.toggleActive();
              }}>
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <>
        <div>
          <h3>Properties</h3>
          <hr />
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>PropertyName</th>
                <th>Street Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zipcode</th>
                <th># Of Units</th>
              </tr>
            </thead>
            <tbody>{this.propertiesMapper()}</tbody>
          </Table>
        </div>
        {this.props.updateActive && this.state.editingProperty ? (
          <PropertyEdit
            propertiesToUpdate={this.state.editingProperty}
            token={this.props.token}
            toggleActive={this.props.toggleActive}
            fetchProperties={this.props.fetchProperties}
          />
        ) : null}
      </>
    );
  }
}

export default PropertyTable;
