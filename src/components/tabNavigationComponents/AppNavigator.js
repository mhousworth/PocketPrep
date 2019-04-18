import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import PresetScreen from '../viewMealsComponents/preset';

import AddScreen from '../editMealsComponents/add-new-meal';

import CustomScreen from '../viewMealsComponents/custom-meal';

import IngredientScreen from '../viewMealsComponents/ingredients';

import DebugScreen from '../debug';

import viewDayScreen from '../calendarComponents/day-view';

import viewDayAddMeal from '../calendarComponents/day-add-meal';

import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Preset: PresetScreen,
  AddRecipe: AddScreen,
  CustomMeal: CustomScreen,
  Ingredients: IngredientScreen,
  Debugger:DebugScreen,
  DayView: viewDayScreen,
  DayAddMeal: viewDayAddMeal,
}));