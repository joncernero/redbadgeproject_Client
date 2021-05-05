import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import PropertyEdit from './PropertyEdit';
import { withRouter, RouteComponentProps } from 'react-router-dom';

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

interface Props extends RouteComponentProps {
  token: string;
  properties: Property[];
  fetchProperties: Function;
  togglePropertyEdit: Function;
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

  deleteProperty = (property: Property) => {
    fetch(`${APIURL}/property/delete/${property.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    }).then(() => this.props.fetchProperties());
  };

  propertiesMapper = () => {
    return this.props.properties.map((property: Property, index) => {
      return (
        <tr key={index}>
          <td onClick={() => this.props.history.push(`/units/${property.id}`)}>
            {property.name}
          </td>
          <td>{property.streetAddress}</td>
          <td>{property.city}</td>
          <td>{property.state}</td>
          <td>{property.zipcode}</td>
          <td>{property.numberOfUnits}</td>
          <td>{property.companyId}</td>
          <td>
            <button
              onClick={() => {
                this.setState({ editingProperty: property });
                this.props.togglePropertyEdit();
              }}>
              Edit
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                this.deleteProperty(property);
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
      <>
        <div>
          <h3>Properties</h3>
          <hr />
          <table>
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
          </table>
        </div>
        {this.props.updateActive && this.state.editingProperty ? (
          <PropertyEdit
            propertyToUpdate={this.state.editingProperty}
            token={this.props.token}
            togglePropertyEdit={this.props.togglePropertyEdit}
            fetchProperties={this.props.fetchProperties}
          />
        ) : null}
      </>
    );
  }
}

export default withRouter(PropertyTable);
