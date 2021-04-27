import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';

interface State {
  name: string;
  url: string;
  unitId: number;
}

interface Props {
  token: string;
}

class PhotoCreate extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      url: '',
      unitId: 0,
    };
  }
  fetchPhotoData = (e: React.FormEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/photo/create`, {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        url: this.state.url,
        unitId: this.state.unitId,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          name: '',
          url: '',
          unitId: 0,
        });
      });
  };
  render() {
    return (
      <div>
        <h1>Hello from PhotoCreate</h1>
      </div>
    );
  }
}

export default PhotoCreate;
