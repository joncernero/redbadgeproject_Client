import React, { Component } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal } from '../../../Styles/Modal';
import { motion } from 'framer-motion';

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
  editName: string;
  editUnitNumber: string;
  editBldgNumber: string;
  editNumberOfBeds: number;
  editNumberOfBaths: number;
  editTotalSquareFootage: number;
}

interface Props {
  token: string;
  toggleUnitEdit: Function;
  unitToUpdate: Unit;
  fetchUnits: Function;
}

class UnitEdit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editName: this.props.unitToUpdate.name,
      editUnitNumber: this.props.unitToUpdate.unitNumber,
      editBldgNumber: this.props.unitToUpdate.bldgNumber,
      editNumberOfBeds: this.props.unitToUpdate.numberOfBeds,
      editNumberOfBaths: this.props.unitToUpdate.numberOfBaths,
      editTotalSquareFootage: this.props.unitToUpdate.totalSquareFootage,
    };
  }

  unitUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/unit/update/${this.props.unitToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        name: this.state.editName,
        unitNumber: this.state.editUnitNumber,
        bldgNumber: this.state.editBldgNumber,
        numberOfBeds: this.state.editNumberOfBeds,
        numberOfBaths: this.state.editNumberOfBaths,
        totalSquareFootage: this.state.editTotalSquareFootage,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        this.props.fetchUnits();
        this.props.toggleUnitEdit();
      });
  };

  render() {
    return (
      <StyledModal
        as={motion.div}
        whileHover={{ scale: 1.1 }}
        drag
        dragConstraints={{ top: 50, left: -25, right: 50, bottom: -50 }}>
        <form onSubmit={this.unitUpdate}>
          <h1>Update Unit</h1>
          <label htmlFor='name'>EditName:</label>
          <input
            name='name'
            value={this.state.editName}
            onChange={(e) => this.setState({ editName: e.target.value })}
          />
          <label htmlFor='unitNumber'>Edit Unit #:</label>
          <input
            name='unitNumber'
            value={this.state.editUnitNumber}
            onChange={(e) => this.setState({ editUnitNumber: e.target.value })}
          />
          <label htmlFor='bldgNumber'>Edit Bldg #:</label>
          <input
            name='bldgNumber'
            value={this.state.editBldgNumber}
            onChange={(e) => this.setState({ editName: e.target.value })}
          />
          <label htmlFor='name'>Edit # Of Beds:</label>
          <input
            name='numberOfBeds'
            value={this.state.editNumberOfBeds}
            onChange={(e) =>
              this.setState({ editNumberOfBeds: Number(e.target.value) })
            }
          />
          <label htmlFor='numberOfBaths'>Edit # of Baths:</label>
          <input
            name='numberOfBaths'
            value={this.state.editNumberOfBaths}
            onChange={(e) =>
              this.setState({ editNumberOfBaths: Number(e.target.value) })
            }
          />
          <label htmlFor='totalSquareFootage'>Total SQFT:</label>
          <input
            name='totalSquareFootage'
            value={this.state.editTotalSquareFootage}
            onChange={(e) =>
              this.setState({
                editTotalSquareFootage: Number(e.target.value),
              })
            }
          />
          <button type='submit'>Update</button>
        </form>
      </StyledModal>
    );
  }
}

export default UnitEdit;
