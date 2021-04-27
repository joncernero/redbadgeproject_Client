import React, { Component } from 'react';
import UnitCreate from './UnitCreate';

interface State {}

interface Props {
  token: string;
}

class UnitIndex extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <UnitCreate token={this.props.token} />
      </div>
    );
  }
}

export default UnitIndex;
