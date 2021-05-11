import React, { Component } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal } from '../../../Styles/Modal';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  feature: string;
  roomType: string;
  value: string;
  notes: string;
}

type PathParamsType = {
  unitId: string | undefined;
};

interface Props extends RouteComponentProps<PathParamsType> {
  token: string;
  fetchFeatures: Function;
  toggleFeatureCreate: Function;
  unitId?: string;
}

class FeatureCreate extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      features: [],
      feature: '',
      roomType: '',
      value: '',
      notes: '',
    };
  }

  unitId = this.props.match.params.unitId;

  fetchFeatureData = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log(this.unitId);
    fetch(`${APIURL}/feature/create`, {
      method: 'POST',
      body: JSON.stringify({
        feature: {
          feature: this.state.feature,
          roomType: this.state.roomType,
          value: this.state.value,
          notes: this.state.notes,
          unitId: Number(this.unitId),
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
          feature: '',
          roomType: '',
          value: '',
          notes: '',
        });
      })
      .then(() => {
        this.props.fetchFeatures();
        this.props.toggleFeatureCreate();
      });
  };
  render() {
    return (
      <StyledModal
        as={motion.div}
        whileHover={{ scale: 1.1 }}
        drag
        dragConstraints={{ top: 50, left: -25, right: 50, bottom: -50 }}>
        <form onSubmit={this.fetchFeatureData}>
          <h1>Create New Feature</h1>
          <div>
            <label htmlFor='feature'>Feature:</label>
            <input
              name='feature'
              value={this.state.feature}
              onChange={(e) => this.setState({ feature: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='roomType'>Room Type:</label>
            <input
              name='streetAddress'
              value={this.state.roomType}
              onChange={(e) => this.setState({ roomType: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='value'>Value:</label>
            <input
              name='value'
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='notes'>Notes:</label>
            <input
              name='notes'
              value={this.state.notes}
              onChange={(e) => this.setState({ notes: e.target.value })}
            />
          </div>
          <button type='submit'>Add Feature</button>
        </form>
      </StyledModal>
    );
  }
}

export default withRouter(FeatureCreate);
