import React, { Component } from 'react';
import Dashboard from './Components/Contents/Dashboard';
import PropertyIndex from './Components/Contents/Property/PropertyIndex';
import UnitIndex from './Components/Contents/Units/UnitIndex';
import FeatureIndex from './Components/Contents/Features/FeatureIndex';
import PhotoIndex from './Components/Contents/Photos/PhotoIndex';
import { Container } from './Styles/Containers';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './Components/Authorization/Login';
import Navbar from './Components/Navigation/Navbar';
import Home from './Components/Home';
// import { About } from './pages/About';
import Admin from './Components/Authorization/Admin';

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
    });
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({
      SessionToken: '',
    });
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
    if (pageToShow === 'features') {
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
        <Navbar
          clearToken={this.clearToken}
          SessionToken={this.state.SessionToken}
        />
        <Container>
          <Switch>
            <Route path='/' exact component={Home} />
            {/* <Route path='/about' component={About} /> */}
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
            <Route path='/units/:propertyId'>
              {this.protectedViews('units')}
            </Route>
            <Route path='/features/:unitId'>
              {this.protectedViews('features')}
            </Route>
            <Route path='/photos'>{this.protectedViews('photos')}</Route>
            <Route path='/admin'>{this.protectedViews('admin')}</Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
