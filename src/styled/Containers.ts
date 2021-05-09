import styled from 'styled-components';
import img1 from '../components/Images/DSC_0002.jpg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 90vw;
  margin: auto;
`;

export const TextContainer = styled.div`
  margin-left: 200px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.6);
  height: 50vh;
  width: 25vw;

  h1 {
    color: black;
    font-size: 65px;
    font-weight: bolder;
    text-align: left;
  }

  p {
    color: gray;
    font-size: 25px;
  }

  button {
    height: 40px;
    width: 150px;
    color: black;
    font-size: 15px;
    font-weight: bold;
    background: #fca311;
    border-radius: 5px;
    margin-bottom: 15px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${img1});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;
