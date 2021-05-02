import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import UnitEdit from './UnitEdit';

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

interface Props {
  token: string;
  units: Unit[];
  fetchUnits: Function;
  toggleUnitEdit: Function;
  updateActive: boolean;
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
        <tr key={index}>
          <th scope='row'>{unit.id}</th>
          <td>{unit.name}</td>
          <td>{unit.unitNumber}</td>
          <td>{unit.bldgNumber}</td>
          <td>{unit.numberOfBeds}</td>
          <td>{unit.numberOfBaths}</td>
          <td>{unit.totalSquareFootage}</td>
          <td>
            <button
              onClick={() => {
                this.setState({
                  editingUnit: unit,
                });
                this.props.toggleUnitEdit();
              }}>
              Edit
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                this.deleteUnit(unit);
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
          <h1>Units</h1>
          <hr />
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Unit Name</th>
                <th>Unit #</th>
                <th>Bldg #</th>
                <th># Of Beds</th>
                <th># Of Baths</th>
                <th>Total SQFT</th>
              </tr>
            </thead>
            <tbody>{this.unitsMapper()}</tbody>
          </table>
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

export default UnitTable;
