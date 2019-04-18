import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

import AppNavigator from './src/components/tabNavigationComponents/AppNavigator';

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
