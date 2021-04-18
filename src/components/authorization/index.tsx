import React, { Component } from 'react';
import { Register } from './Register'
import { Login } from './Login'
import { render } from '@testing-library/react';

interface State {
    isLoggingIn: boolean;
}

interface Props {
    updateToken: (newToken: string) => void;
  }

export class Auth = (props) => {

    render(){
        return()
    }
}
