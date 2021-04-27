import React, { Component } from 'react';

interface State {}

interface Props {
  token: string;
}

class FeatureTable extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Hello from FeatureTable</h1>
      </div>
    );
  }
}

export default FeatureTable;
