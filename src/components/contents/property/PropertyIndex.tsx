import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import PropertyCreate from './PropertyCreate';
import PropertyEdit from './PropertyEdit';
import PropertyTable from './PropertyTable';

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
  properties: Property[];
  updateActive: boolean;
  propertiesToUpdate: Property;
}

interface Props {
  token: string;
}

class PropertyIndex extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      properties: [],
      updateActive: false,
      propertiesToUpdate: {
        id: 0,
        name: '',
        streetAddress: '',
        city: '',
        state: '',
        zipcode: '',
        numberOfUnits: 0,
        companyId: 0,
      },
    };
  }

  fetchProperties = () => {
    fetch(`${APIURL}/property`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((property) => {
        this.setState({ properties: property });
      });
  };

  editUpdateProperty = (property: Property[]) => {
    this.setState((state) => ({
      propertiesToUpdate: {
        id: 0,
        name: '',
        streetAddress: '',
        city: '',
        state: '',
        zipcode: '',
        numberOfUnits: 0,
        companyId: 0,
      },
    }));
  };

  toggleActive = () => {
    this.setState((state) => ({
      updateActive: true,
    }));
  };

  componentDidMount() {
    this.fetchProperties();
  }

  render() {
    return (
      <div>
        <PropertyCreate token={this.props.token} />
        <PropertyTable
          properties={this.state.properties}
          token={this.props.token}
          fetchProperties={this.fetchProperties}
          editUpdateProperty={this.editUpdateProperty}
          toggleActive={this.toggleActive}
        />
        {this.state.updateActive ? (
          <PropertyEdit
            propertiesToUpdate={this.state.propertiesToUpdate}
            token={this.props.token}
            toggleActive={this.toggleActive}
            fetchProperties={this.fetchProperties}
          />
        ) : null}
      </div>
    );
  }
}

export default PropertyIndex;
