import React, { Component } from 'react';

interface State {}

interface Props {
  token: string;
}

class PropertyTable extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Hello from PropertyIndex</h1>
      </div>
    );
  }
}

export default PropertyTable;
