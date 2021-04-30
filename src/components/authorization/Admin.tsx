import React, { Component } from 'react';
import { Register } from './Register';

interface State {}

interface Props {
  token: string;
  // role: string;
}

export class Admin extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Register token={this.props.token} />
      </div>
    );
  }
}
