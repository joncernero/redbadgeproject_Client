import React, { Component } from 'react';
import { ImageContainer, TextContainer } from '../Styles/Containers';

class Home extends Component {
  render() {
    return (
      <div>
        <ImageContainer>
          <TextContainer>
            <h1>An App For Due Diligence</h1>
            <p>
              Gather, store, and evaluate your property with this simple app.
              Determine the right value for your purchase or stay on budget with
              your next renovation. No paper required!{' '}
            </p>
          </TextContainer>
        </ImageContainer>
      </div>
    );
  }
}

export default Home;
