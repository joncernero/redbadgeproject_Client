import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import PropertyCreate from './PropertyCreate';
import PropertyEdit from './PropertyEdit';
import PropertyTable from './PropertyTable';
import { Spinner } from 'reactstrap';

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
  isLoading: boolean;
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
      isLoading: false,
    };
  }

  fetchProperties = () => {
    this.setState({ isLoading: true });
    fetch(`${APIURL}/property/`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((property) => {
        this.setState({ properties: property });
      })
      .finally(() => {
        this.setState({ isLoading: false });
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
      updateActive: !state.updateActive,
    }));
  };

  componentDidMount() {
    this.fetchProperties();
  }

  render() {
    if (this.state.isLoading) {
      return <h1>fetching</h1>;
    }
    return (
      <div>
        <PropertyCreate
          token={this.props.token}
          fetchProperties={this.fetchProperties}
        />
        <PropertyTable
          properties={this.state.properties}
          token={this.props.token}
          fetchProperties={this.fetchProperties}
          editUpdateProperty={this.editUpdateProperty}
          toggleActive={this.toggleActive}
          updateActive={this.state.updateActive}
        />
      </div>
    );
  }
}

export default PropertyIndex;
