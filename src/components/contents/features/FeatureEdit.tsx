import React, { Component } from 'react';

interface State {}

interface Props {
  token: string;
}

class FeatureEdit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Hello from FeatureEdit</h1>
      </div>
    );
  }
}

export default FeatureEdit;
