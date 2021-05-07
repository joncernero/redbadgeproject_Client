import styled from 'styled-components';

export const EditButton = styled.button`
  height: 35px;
  width: 100px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  background: #3498db;
  border-radius: 5px;
  margin: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #d6eaf8;
    color: #3498db;
  }
`;
export const DeleteButton = styled.button`
  height: 35px;
  width: 100px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  background: #c0392b;
  border-radius: 5px;
  margin: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #f2d7d5;
    color: #c0392b;
  }
`;

export const CreateButton = styled.button`
  height: 35px;
  width: 150px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  background: #27ae60;
  border-radius: 5px;
  margin: 5px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #d4efdf;
    color: #27ae60;
    border: 2px solid #27ae60;
  }
`;

export const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 65vh;

  h1 {
    text-shadow: 1px 1px 3px gray;
  }

  form {
    color: #283747;
    display: block;
    width: 300px;
    margin: 10px auto;
  }

  label {
    margin-bottom: 0.5em;
    color: #283747;
    display: block;
    text-align: left;
    font-weight: bold;
  }

  input {
    padding: 0.5em;
    color: #283747;
    background: #eaecee;
    border: 1px solid #283747;
    border-radius: 3px;
    width: 100%;
    margin-bottom: 1em;
  }

  button {
    height: 35px;
    width: 150px;
    color: white;
    font-size: 15px;
    font-weight: bold;
    background: #27ae60;
    border-radius: 5px;
    margin: 15px;
    text-align: center;
    box-shadow: 1px 3px 7px gray;

    &:hover {
      background: #d4efdf;
      color: #27ae60;
      border: 2px solid #27ae60;
    }
  }
  div {
    text-align: center;
  }
`;

export const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5em;

  button {
    height: 35px;
    width: 150px;
    color: white;
    font-size: 15px;
    font-weight: bold;
    background: #27ae60;
    border-radius: 5px;
    margin: 5px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

    &:hover {
      background: #d4efdf;
      color: #27ae60;
      border: 2px solid #27ae60;
    }
  }
`;
