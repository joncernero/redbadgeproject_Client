import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';

interface State {
  feature: string;
  roomType: string;
  value: string;
  notes: string;
  unitId: number;
}

interface Props {
  token: string;
}

class FeatureCreate extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      feature: '',
      roomType: '',
      value: '',
      notes: '',
      unitId: 0,
    };
  }

  fetchFeatureData = (e: React.FormEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/feature/create`, {
      method: 'POST',
      body: JSON.stringify({
        feature: {
          feature: this.state.feature,
          roomType: this.state.roomType,
          value: this.state.value,
          notes: this.state.notes,
          unitId: this.state.unitId,
        },
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
          feature: '',
          roomType: '',
          value: '',
          notes: '',
          unitId: 0,
        });
      });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.fetchFeatureData}>
          <div>
            <label htmlFor='feature'>Feature:</label>
            <input
              name='feature'
              value={this.state.feature}
              onChange={(e) => this.setState({ feature: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='roomType'>Room Type:</label>
            <input
              name='streetAddress'
              value={this.state.roomType}
              onChange={(e) => this.setState({ roomType: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='value'>Value:</label>
            <input
              name='value'
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='notes'>Notes:</label>
            <input
              name='notes'
              value={this.state.notes}
              onChange={(e) => this.setState({ notes: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='unitId'>Unit:</label>
            <input
              name='unitId'
              value={this.state.unitId}
              onChange={(e) =>
                this.setState({ unitId: Number(e.target.value) })
              }
            />
          </div>
          <button type='submit'>Add Feature</button>
        </form>
      </div>
    );
  }
}

export default FeatureCreate;
