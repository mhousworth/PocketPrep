import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import ShoppingListScreen from "./src/components/shoppingListComponents/shopping"
import HomeScreen from "./src/components/home"
import CalendarScreen from './src/components/calendarComponents/calendar';
import PresetScreen from './src/components/viewMealsComponents/preset';
import AddScreen from './src/components/editMealsComponents/add-meal';
import CustomScreen from './src/components/viewMealsComponents/custom-meal';
import IngredientScreen from './src/components/viewMealsComponents/ingredients';

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
