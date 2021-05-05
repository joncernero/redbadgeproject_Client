import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';

interface State {
  name: string;
  unitNumber: string;
  bldgNumber: string;
  numberOfBeds: number;
  numberOfBaths: number;
  totalSquareFootage: number;
}

interface Props {
  token: string;
  fetchUnits: Function;
  propertyId?: string;
}

class UnitCreate extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      unitNumber: '',
      bldgNumber: '',
      numberOfBeds: 0,
      numberOfBaths: 0,
      totalSquareFootage: 0,
    };
  }

  fetchUnitData = (e: React.FormEvent): void => {
    e.preventDefault();
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
          propertyId: Number(this.props.propertyId),
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
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.fetchUnitData}>
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
      </div>
    );
  }
}
export default UnitCreate;
