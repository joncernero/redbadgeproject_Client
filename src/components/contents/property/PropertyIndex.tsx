import React, { Component } from 'react';
import PropertyCreate from './PropertyCreate';
import PropertyEdit from './PropertyEdit';
import PropertyTable from './PropertyTable';

interface State {}

interface Props {
  token: string;
}

class PropertyIndex extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <PropertyCreate token={this.props.token} />
      </div>
    );
  }
}

export default PropertyIndex;
