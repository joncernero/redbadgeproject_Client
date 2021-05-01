import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import FeatureEdit from './FeatureEdit';

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
  updateActive: boolean;
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
        <tr key={index}>
          <th scope='row'>{feature.id}</th>
          <td>{feature.feature}</td>
          <td>{feature.roomType}</td>
          <th>{feature.value}</th>
          <td>{feature.notes}</td>
          <td>{feature.unitId}</td>
          <td>
            <button
              onClick={() => {
                this.setState({ editingFeature: feature });
                this.props.toggleFeatureEdit();
              }}>
              Edit
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                this.deleteFeature(feature);
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
          <h1>Features</h1>
          <hr />
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Feature</th>
                <th>Room Type</th>
                <th>Value</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>{this.featuresMapper()}</tbody>
          </table>
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
