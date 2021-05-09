import React, { Component } from 'react';
import PropertyIndex from './Property/PropertyIndex';
import { Container } from '../../Styles/Containers';

interface State {}

interface Props {
  token: string;
}

export default class Dashboard extends Component<Props, State> {
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
