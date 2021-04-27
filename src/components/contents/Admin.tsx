import React, { Component } from 'react';
import { Register } from '../authorization/Register';

interface State {}

interface Props {
  updateToken: (newToken: string) => void;
}

export class Admin extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Register updateToken={this.props.updateToken} />
      </div>
    );
  }
}
