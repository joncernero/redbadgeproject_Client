import React, { Component } from 'react';
import { Dashboard } from './components/contents/Dashboard';
import PropertyIndex from './components/contents/property/PropertyIndex';
import UnitIndex from './components/contents/units/UnitCreate';
import FeatureIndex from './components/contents/features/FeatureCreate';
import PhotoIndex from './components/contents/photos/PhotoCreate';
import { Container } from './styled/Containers';
import { GlobalStyle } from './styled/Global';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './components/authorization/Login';
import Navbar from './components/navigation/Navbar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Admin } from './components/authorization/Admin';

export interface Token {
  SessionToken: string;
}

export class App extends Component<{}, Token> {
  constructor(props: any) {
    super(props);
    this.state = {
      SessionToken: '',
      // email: this.state.email,
      // role: this.state.role,
    };
  }
  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({
      SessionToken: newToken,
      // email: newEmail,
      // role: newRole,
    });
  };
  componentDidMount() {}

  clearToken = () => {
    localStorage.clear();
    this.setState({
      SessionToken: '',
    });
    // if (this.state.SessionToken === '') {
    //   return <Redirect to='/home' />;
    // }
  };

  protectedViews = (pageToShow: any) => {
    let component;

    if (pageToShow === 'dashboard') {
      component = <Dashboard token={this.state.SessionToken} />;
    }
    if (pageToShow === 'admin') {
      component = <Admin token={this.state.SessionToken} />;
    }
    if (pageToShow === 'property') {
      component = <PropertyIndex token={this.state.SessionToken} />;
    }
    if (pageToShow === 'units') {
      component = <UnitIndex token={this.state.SessionToken} />;
    }
    if (pageToShow === 'feature') {
      component = <FeatureIndex token={this.state.SessionToken} />;
    }
    if (pageToShow === 'photos') {
      component = <PhotoIndex token={this.state.SessionToken} />;
    }
    return localStorage.getItem('token') ? component : <Redirect to='/' />;
  };

  render() {
    return (
      <Router>
        <GlobalStyle />
        <Navbar
          clearToken={this.clearToken}
          SessionToken={this.state.SessionToken}
        />
        <Container>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/about' component={About} />
            <Route
              path='/login'
              component={() =>
                this.state.SessionToken ? (
                  <Redirect to='/dashboard' />
                ) : (
                  <Login updateToken={this.updateToken} />
                )
              }
            />
            <Route path='/dashboard'>{this.protectedViews('dashboard')}</Route>
            <Route path='/property'>{this.protectedViews('property')}</Route>
            <Route path='/units'>{this.protectedViews('units')}</Route>
            <Route path='/feature'>{this.protectedViews('feature')}</Route>
            <Route path='/photos'>{this.protectedViews('photos')}</Route>
            <Route path='/admin'>{this.protectedViews('admin')}</Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
