import React, { Component } from 'react';
import FeatureCreate from './FeatureCreate';

interface State {}

interface Props {
  token: string;
}

class FeatureIndex extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <FeatureCreate token={this.props.token} />
      </div>
    );
  }
}

export default FeatureIndex;
