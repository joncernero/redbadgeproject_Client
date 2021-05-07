import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import FeatureEdit from './FeatureEdit';
import FeatureCreate from './FeatureCreate';
import { EditButton, DeleteButton, TitleDiv } from '../../../styled/Index';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

interface Feature {
  id: number;
  feature: string;
  roomType: string;
  value: string;
  notes: string;
  unitId: number;
}

interface State {
  editingFeature: Feature | undefined;
}

interface Props {
  token: string;
  features: Feature[];
  fetchFeatures: Function;
  toggleFeatureEdit: Function;
  toggleFeatureCreate: Function;
  updateActive: boolean;
  createActive: boolean;
}

class FeatureTable extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editingFeature: undefined,
    };
  }

  deleteFeature = (feature: Feature) => {
    fetch(`${APIURL}/feature/delete/${feature.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    }).then(() => this.props.fetchFeatures());
  };

  featuresMapper = () => {
    return this.props.features.map((feature: Feature, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{feature.feature}</TableCell>
          <TableCell>{feature.roomType}</TableCell>
          <TableCell>{feature.value}</TableCell>
          <TableCell>{feature.notes}</TableCell>
          <TableCell>
            <EditButton
              onClick={() => {
                this.setState({ editingFeature: feature });
                this.props.toggleFeatureEdit();
              }}>
              Edit
            </EditButton>
          </TableCell>
          <TableCell>
            <DeleteButton
              onClick={() => {
                this.deleteFeature(feature);
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
            <FeatureCreate
              token={this.props.token}
              fetchFeatures={this.props.fetchFeatures}
              toggleFeatureCreate={this.props.toggleFeatureCreate}
            />
          ) : null}
          <TitleDiv>
            <h1>Features</h1>
            <button
              onClick={() => {
                this.props.toggleFeatureCreate();
              }}>
              New Feature
            </button>
          </TitleDiv>
          <hr />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Feature</TableCell>
                  <TableCell>Room Type</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.featuresMapper()}</TableBody>
            </Table>
          </TableContainer>
        </div>
        {this.props.updateActive && this.state.editingFeature ? (
          <FeatureEdit
            featureToUpdate={this.state.editingFeature}
            token={this.props.token}
            toggleFeatureEdit={this.props.toggleFeatureEdit}
            fetchFeatures={this.props.fetchFeatures}
          />
        ) : null}
      </>
    );
  }
}

export default FeatureTable;
