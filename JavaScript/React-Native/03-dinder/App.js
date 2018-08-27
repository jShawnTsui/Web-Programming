import React, { Component } from 'react';
import AppNavigator from './app/app.navigator';
import 'core-js/es6/symbol';
import { Provider } from 'mobx-react';
import stores from './app/stores';

export default class App extends React.Component {
  render() {
    return (
      <Provider stores={stores}>
        <AppNavigator />
      </Provider>
    );
  }
}

