import React, { Component } from 'react';

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
        <h1>DASHBOARD</h1>
      </div>
    );
  }
}
