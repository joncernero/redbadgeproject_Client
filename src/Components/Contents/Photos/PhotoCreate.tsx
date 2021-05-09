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

  fetchSequelizeData = (e: React.SyntheticEvent): void => {
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
        this.setState({
          name: '',
          url: '',
          unitId: 0,
        });
      });
  };

  fetchCloudinaryURL = (e: React.SyntheticEvent): void => {};
  render() {
    return (
      <div>
        {/* <input type='file' onChange={this.fileSelectedHandler} /> */}
      </div>
    );
  }
}

export default PhotoCreate;
