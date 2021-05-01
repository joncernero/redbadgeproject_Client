import React, { Component } from 'react';
import PropertyIndex from '../contents/property/PropertyIndex';

interface State {}

interface Props {
  token: string;
}

export class Dashboard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <PropertyIndex token={this.props.token} />
      </div>
    );
  }
}
