import React, { Component } from 'react';
import PhotoCreate from './PhotoCreate';

interface State {}

interface Props {
  token: string;
}

class PhotoIndex extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <PhotoCreate token={this.props.token} />
      </div>
    );
  }
}

export default PhotoIndex;
