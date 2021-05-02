import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import UnitCreate from './UnitCreate';
import UnitTable from './UnitTable';
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
  updateActive: boolean;
  unitToUpdate: Unit;
  isLoading: boolean;
}

type PathParamsType = {
  propertyId: string | undefined;
};
interface Props extends RouteComponentProps<PathParamsType> {
  token: string;
}

class UnitIndex extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      units: [],
      updateActive: false,
      unitToUpdate: {
        id: 0,
        name: '',
        unitNumber: '',
        bldgNumber: '',
        numberOfBeds: 0,
        numberOfBaths: 0,
        totalSquareFootage: 0,
        propertyId: 0,
      },
      isLoading: false,
    };
  }

  propertyId = this.props.match.params.propertyId;

  fetchUnits = () => {
    this.setState({ isLoading: true });
    fetch(`${APIURL}/unit/`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((unit) => {
        this.setState({ units: unit });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  toggleUnitEdit = () => {
    this.setState((state) => ({
      updateActive: !state.updateActive,
    }));
  };

  componentDidMount() {
    this.fetchUnits();
  }

  render() {
    return (
      <div>
        <UnitCreate
          token={this.props.token}
          fetchUnits={this.fetchUnits}
          propertyId={this.propertyId}
        />
        <UnitTable
          token={this.props.token}
          units={this.state.units}
          fetchUnits={this.fetchUnits}
          toggleUnitEdit={this.toggleUnitEdit}
          updateActive={this.state.updateActive}
        />
      </div>
    );
  }
}

export default withRouter(UnitIndex);
