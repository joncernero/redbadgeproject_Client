import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import { StyledModal } from '../../../styled/Modal';
import { motion } from 'framer-motion';
import { withRouter, RouteComponentProps } from 'react-router-dom';

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
  units: Unit[];
  name: string;
  unitNumber: string;
  bldgNumber: string;
  numberOfBeds: number;
  numberOfBaths: number;
  totalSquareFootage: number;
  propertyId: number;
}

type PathParamsType = {
  propertyId: string | undefined;
};

interface Props extends RouteComponentProps<PathParamsType> {
  token: string;
  fetchUnits: Function;
  toggleUnitCreate: Function;
  propertyId?: number;
}

class UnitCreate extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      units: [],
      name: '',
      unitNumber: '',
      bldgNumber: '',
      numberOfBeds: 0,
      numberOfBaths: 0,
      totalSquareFootage: 0,
      propertyId: 0,
    };
  }

  propertyId = this.props.match.params.propertyId;

  fetchUnitData = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log(this.propertyId);
    fetch(`${APIURL}/unit/create`, {
      method: 'POST',
      body: JSON.stringify({
        unit: {
          name: this.state.name,
          unitNumber: this.state.unitNumber,
          bldgNumber: this.state.bldgNumber,
          numberOfBeds: this.state.numberOfBeds,
          numberOfBaths: this.state.numberOfBeds,
          totalSquareFootage: this.state.totalSquareFootage,
          propertyId: Number(this.propertyId),
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          name: '',
          unitNumber: '',
          bldgNumber: '',
          numberOfBeds: 0,
          numberOfBaths: 0,
          totalSquareFootage: 0,
        });
      })
      .then(() => {
        this.props.fetchUnits();
        this.props.toggleUnitCreate();
      });
  };

  render() {
    return (
      <StyledModal as={motion.div} whileHover={{ scale: 1.1 }} drag>
        <form onSubmit={this.fetchUnitData}>
          <h1>Create Unit</h1>
          <div>
            <label htmlFor='name'>Name:</label>
            <input
              name='name'
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='unitNumber'>Unit Number:</label>
            <input
              name='unitNumber'
              value={this.state.unitNumber}
              onChange={(e) => this.setState({ unitNumber: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='bldgNumber'>Building Number:</label>
            <input
              name='bldgNumber'
              value={this.state.bldgNumber}
              onChange={(e) => this.setState({ bldgNumber: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='numberOfBeds'>Number of Beds:</label>
            <input
              name='numberOfBeds'
              value={this.state.numberOfBeds}
              onChange={(e) =>
                this.setState({ numberOfBeds: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label htmlFor='numberOfBaths'>Number of Baths:</label>
            <input
              name='numberOfBaths'
              value={this.state.numberOfBaths}
              onChange={(e) =>
                this.setState({ numberOfBaths: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label htmlFor='totalSquareFootage'>Total Sqft:</label>
            <input
              name='totalSquareFootage'
              value={this.state.totalSquareFootage}
              onChange={(e) =>
                this.setState({ totalSquareFootage: Number(e.target.value) })
              }
            />
          </div>
          <button type='submit'>Create Unit</button>
        </form>
      </StyledModal>
    );
  }
}
export default withRouter(UnitCreate);
