import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import ShoppingListScreen from "./src/components/shoppingListComponents/shopping"
import HomeScreen from "./src/components/home"
import CalendarScreen from './src/components/calendarComponents/calendar';
import PresetScreen from './src/components/viewMeals/preset';
import AddScreen from './src/components/editMeals/add-meal';
import CustomScreen from './src/components/viewMeals/custom-meal';
import IngredientScreen from './src/components/viewMeals/ingredients';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    List: ShoppingListScreen,
    Calendar: CalendarScreen,
    Preset: PresetScreen,
    AddRecipe: AddScreen,
    CustomMeal: CustomScreen,
    Ingredients: IngredientScreen
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
