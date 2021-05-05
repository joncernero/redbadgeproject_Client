import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import FeatureCreate from './FeatureCreate';
import FeatureTable from './FeatureTable';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Feature {
  id: number;
  feature: string;
  roomType: string;
  value: string;
  notes: string;
  unitId: number;
}

interface State {
  features: Feature[];
  updateActive: boolean;
  featureToUpdate: Feature;
  isLoading: boolean;
}

type PathParamsType = {
  unitId: string | undefined;
};

interface Props extends RouteComponentProps<PathParamsType> {
  token: string;
}

class FeatureIndex extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      features: [],
      updateActive: false,
      featureToUpdate: {
        id: 0,
        feature: '',
        roomType: '',
        value: '',
        notes: '',
        unitId: 0,
      },
      isLoading: false,
    };
  }

  unitId = this.props.match.params.unitId;

  fetchFeatures = () => {
    this.setState({ isLoading: true });
    fetch(`${APIURL}/feature/${this.unitId}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((feature) => {
        this.setState({ features: feature });
      })
      .finally(() => {
        this.setState({ isLoading: false });
        console.log('hello');
      });
  };

  toggleFeatureEdit = () => {
    this.setState((state) => ({
      updateActive: !state.updateActive,
    }));
  };

  componentDidMount() {
    this.fetchFeatures();
  }

  render() {
    if (this.state.isLoading) {
      return <h1>fetching</h1>;
    }
    return (
      <div>
        <FeatureCreate
          token={this.props.token}
          fetchFeatures={this.fetchFeatures}
          unitId={this.unitId}
        />
        <FeatureTable
          features={this.state.features}
          token={this.props.token}
          fetchFeatures={this.fetchFeatures}
          toggleFeatureEdit={this.toggleFeatureEdit}
          updateActive={this.state.updateActive}
        />
      </div>
    );
  }
}

export default withRouter(FeatureIndex);
