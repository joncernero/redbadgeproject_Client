import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import PropertyEdit from './PropertyEdit';
import PropertyCreate from './PropertyCreate';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  EditButton,
  DeleteButton,
  CreateButton,
  TitleDiv,
} from '../../../styled/Index';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

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
  togglePropertyCreate: Function;
  updateActive: boolean;
  createActive: boolean;
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
        <TableRow key={index}>
          <TableCell
            onClick={() => this.props.history.push(`/units/${property.id}`)}>
            {property.name}
          </TableCell>
          <TableCell>{property.streetAddress}</TableCell>
          <TableCell>{property.city}</TableCell>
          <TableCell>{property.state}</TableCell>
          <TableCell>{property.zipcode}</TableCell>
          <TableCell>{property.numberOfUnits}</TableCell>
          <TableCell>{property.companyId}</TableCell>
          <TableCell>
            <EditButton
              onClick={() => {
                this.setState({ editingProperty: property });
                this.props.togglePropertyEdit();
              }}>
              Edit
            </EditButton>
          </TableCell>
          <TableCell>
            <DeleteButton
              onClick={() => {
                this.deleteProperty(property);
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
          {this.props.createActive ? (
            <PropertyCreate
              token={this.props.token}
              fetchProperties={this.props.fetchProperties}
              togglePropertyCreate={this.props.togglePropertyCreate}
            />
          ) : null}
          <TitleDiv>
            <h1>Properties</h1>
            <CreateButton
              onClick={() => {
                this.props.togglePropertyCreate();
              }}>
              New Property
            </CreateButton>
          </TitleDiv>
          <hr />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>PropertyName</TableCell>
                  <TableCell>Street Address</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Zipcode</TableCell>
                  <TableCell># Of Units</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.propertiesMapper()}</TableBody>
            </Table>
          </TableContainer>
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
