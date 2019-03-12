import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import ShoppingListScreen from "./src/components/shopping"
import HomeScreen from "./src/components/home"
import CalendarScreen from './src/components/calendar';
import PresetScreen from './src/components/preset';
import AddScreen from './src/components/add-meal';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    List: ShoppingListScreen,
    Calendar: CalendarScreen,
    Preset: PresetScreen,
    AddRecipe: AddScreen
  },
  {
    initialRouteName: 'Home',
  }
);
console.log("begin");
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
