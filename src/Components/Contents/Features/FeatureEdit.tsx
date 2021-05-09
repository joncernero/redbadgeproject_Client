import React, { Component } from 'react';
import APIURL from '../../../utilities/Environments';
import { StyledModal } from '../../../styled/Modal';
import { motion } from 'framer-motion';

interface Feature {
  id: number;
  feature: string;
  roomType: string;
  value: string;
  notes: string;
  unitId: number;
}

interface State {
  editFeature: string;
  editRoomType: string;
  editValue: string;
  editNotes: string;
}

interface Props {
  token: string;
  toggleFeatureEdit: Function;
  featureToUpdate: Feature;
  fetchFeatures: Function;
}

class FeatureEdit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editFeature: this.props.featureToUpdate.feature,
      editRoomType: this.props.featureToUpdate.roomType,
      editValue: this.props.featureToUpdate.value,
      editNotes: this.props.featureToUpdate.notes,
    };
  }

  featureUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/feature/update/${this.props.featureToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        feature: this.state.editFeature,
        roomType: this.state.editRoomType,
        value: this.state.editValue,
        notes: this.state.editNotes,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        this.props.fetchFeatures();
        this.props.toggleFeatureEdit();
      });
  };
  render() {
    return (
      <StyledModal as={motion.div} whileHover={{ scale: 1.1 }} drag>
        <form onSubmit={this.featureUpdate}>
          <h1>Update Edit</h1>
          <label htmlFor='feature'>Edit Feature:</label>
          <input
            name='name'
            value={this.state.editFeature}
            onChange={(e) => this.setState({ editFeature: e.target.value })}
          />
          <label htmlFor='roomType'>Edit Room Type:</label>
          <input
            name='roomType'
            value={this.state.editRoomType}
            onChange={(e) => this.setState({ editRoomType: e.target.value })}
          />
          <label htmlFor='value'>Edit Value:</label>
          <input
            name='value'
            value={this.state.editValue}
            onChange={(e) => this.setState({ editValue: e.target.value })}
          />
          <label htmlFor='notes'>Edit Notes:</label>
          <input
            name='notes'
            value={this.state.editNotes}
            onChange={(e) => this.setState({ editNotes: e.target.value })}
          />
          <button type='submit'>Update</button>
        </form>
      </StyledModal>
    );
  }
}

export default FeatureEdit;
