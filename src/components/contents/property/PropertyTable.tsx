import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import { Table } from 'reactstrap';

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
}

class PropertyTable extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  deleteProperties = (property: Property) => {
    fetch(`${APIURL}/property/${property.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    }).then(() => this.props.fetchProperties());
  };

  propertiesMapper = () => {
    return this.props.properties.map((properties: Property, index) => {
      return (
        <tr key={index}>
          <th scope='row'>{properties.id}</th>
          <td>{properties.name}</td>
          <td>{properties.streetAddress}</td>
          <td>{properties.city}</td>
          <td>{properties.state}</td>
          <td>{properties.zipcode}</td>
          <td>{properties.numberOfUnits}</td>
          <td>{properties.companyId}</td>
          <td>
            <button
              color='danger'
              onClick={() => {
                this.deleteProperties(properties);
              }}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
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
    );
  }
}

export default PropertyTable;
