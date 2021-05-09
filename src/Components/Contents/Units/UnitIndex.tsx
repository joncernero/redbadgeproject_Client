import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import UnitTable from './UnitTable';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Container } from '../../../styled/Containers';

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
  createActive: boolean;
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
      createActive: false,
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
    fetch(`${APIURL}/unit/${this.propertyId}`, {
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

  toggleUnitCreate = () => {
    this.setState((state) => ({
      createActive: !state.createActive,
    }));
  };

  componentDidMount() {
    this.fetchUnits();
  }

  render() {
    return (
      <Container>
        <UnitTable
          token={this.props.token}
          units={this.state.units}
          fetchUnits={this.fetchUnits}
          toggleUnitEdit={this.toggleUnitEdit}
          toggleUnitCreate={this.toggleUnitCreate}
          updateActive={this.state.updateActive}
          createActive={this.state.createActive}
        />
      </Container>
    );
  }
}

export default withRouter(UnitIndex);
