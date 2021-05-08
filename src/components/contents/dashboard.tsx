import React, { Component } from 'react';
import PropertyIndex from './property/PropertyIndex';
import { Container } from '../../styled/Containers';

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
      <Container>
        <PropertyIndex token={this.props.token} />
      </Container>
    );
  }
}
