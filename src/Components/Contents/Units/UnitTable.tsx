import React, { Component } from 'react';
import APIURL from '../../../Utilities/Environments';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { EditButton, DeleteButton, TitleDiv } from '../../../Styles/Index';
import UnitCreate from './UnitCreate';
import UnitEdit from './UnitEdit';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

interface Unit {
  id: number;
  name: string;
  unitNumber: string;
  bldgNumber: string;
  numberOfBeds: number;
  numberOfBaths: number;
  totalSquareFootage: number;
  propertyId: number;
}

interface State {
  editingUnit: Unit | undefined;
}

interface Props extends RouteComponentProps {
  token: string;
  units: Unit[];
  fetchUnits: Function;
  toggleUnitEdit: Function;
  toggleUnitCreate: Function;
  updateActive: boolean;
  createActive: boolean;
}

class UnitTable extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editingUnit: undefined,
    };
  }

  deleteUnit = (unit: Unit) => {
    fetch(`${APIURL}/unit/delete/${unit.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/Type',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    }).then(() => this.props.fetchUnits());
  };

  unitsMapper = () => {
    return this.props.units.map((unit: Unit, index) => {
      return (
        <TableRow key={index}>
          <TableCell
            onClick={() => this.props.history.push(`/features/${unit.id}`)}>
            {unit.name}
          </TableCell>
          <TableCell>{unit.unitNumber}</TableCell>
          <TableCell>{unit.bldgNumber}</TableCell>
          <TableCell>{unit.numberOfBeds}</TableCell>
          <TableCell>{unit.numberOfBaths}</TableCell>
          <TableCell>{unit.totalSquareFootage}</TableCell>
          <TableCell>
            <EditButton
              onClick={() => {
                this.setState({
                  editingUnit: unit,
                });
                this.props.toggleUnitEdit();
              }}>
              Edit
            </EditButton>
          </TableCell>
          <TableCell>
            <DeleteButton
              onClick={() => {
                this.deleteUnit(unit);
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
            <UnitCreate
              token={this.props.token}
              fetchUnits={this.props.fetchUnits}
              toggleUnitCreate={this.props.toggleUnitCreate}
            />
          ) : null}
          <TitleDiv>
            <h1>Units</h1>
            <button
              onClick={() => {
                this.props.toggleUnitCreate();
              }}>
              Create Unit
            </button>
          </TitleDiv>
          <hr />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Unit Name</TableCell>
                  <TableCell>Unit #</TableCell>
                  <TableCell>Bldg #</TableCell>
                  <TableCell># Of Beds</TableCell>
                  <TableCell># Of BaTableCells</TableCell>
                  <TableCell>Total SQFT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.unitsMapper()}</TableBody>
            </Table>
          </TableContainer>
        </div>
        {this.props.updateActive && this.state.editingUnit ? (
          <UnitEdit
            unitToUpdate={this.state.editingUnit}
            token={this.props.token}
            toggleUnitEdit={this.props.toggleUnitEdit}
            fetchUnits={this.props.fetchUnits}
          />
        ) : null}
      </>
    );
  }
}

export default withRouter(UnitTable);
