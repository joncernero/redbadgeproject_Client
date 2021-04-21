import React, { Component } from 'react';
import { Dashboard } from './components/contents/Dashboard';
import { Container } from './styled/Containers';
import { GlobalStyle } from './styled/Global';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth } from './components/authorization/Index';
import { Navbar } from './components/navigation/Navbar';
import { Home } from './pages/Home';
import { About } from './pages/About';

export interface Token {
  SessionToken: string;
}

export class App extends Component<{}, Token> {
  constructor(props: any) {
    super(props);
    this.state = {
      SessionToken: '',
    };
  }
  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({
      SessionToken: newToken,
    });
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({
      SessionToken: '',
    });
  };

  protectedViews = () => {
    return this.state.SessionToken === localStorage.getItem('token') ? (
      <Dashboard token={this.state.SessionToken} />
    ) : (
      <Auth updateToken={this.updateToken} />
    );
  };

  render() {
    return (
      <Router>
        <GlobalStyle />
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/authorization' component={Auth} />
          <Route path='/dashboard' component={Dashboard} />
          {this.protectedViews()}
        </Switch>
      </Router>
    );
  }
}

export default App;
