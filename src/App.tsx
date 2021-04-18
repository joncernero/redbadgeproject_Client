import React, { Component} from 'react';
import  { Register } from './components/authorization/Register';
import { Login } from './components/authorization/Login'
import {Dashboard} from './components/contents/dashboard'
import { Container } from './styled/container';
import { GlobalStyle } from './styled/global';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export interface Token {
  SessionToken: string
}

export class App extends Component<{},Token> {
  constructor(props:any){
    super(props)
    this.state={
      SessionToken: '',
    }
  }
  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({
      SessionToken: newToken
    })
  }

  clearToken = () => {
    localStorage.clear()
    this.setState({
      SessionToken: '',
    })
  }

  protectedviews = () => {
    return this.state.SessionToken === localStorage.getItem('token') ? (
      <Dashboard token={this.state.SessionToken} />
    ) : (
      <Auth updateToken={this.updateToken} />
    )
  }
  return (
    <Router>
      <GlobalStyle />
      
    </Router>
  );
}

export default App;
