import React from 'react';

import { Platform } from 'react-native';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import TabBarIcon from './TabBarIcon';

import Icon from 'react-native-vector-icons';

import CalendarScreen from '../calendarComponents/calendar';

import ShoppingListScreen from '../shoppingListComponents/shopping';

import MealListScreen from '../viewMealsComponents/preset'


const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
});

CalendarStack.navigationOptions = {
 tabBarLabel: 'Calendar',

	tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-calendar${focused ? '' : '-outline'}`
          : 'md-calendar'
      }
    />
  ),
};


const ShoppingStack = createStackNavigator({
  Shopping: ShoppingListScreen,
});


ShoppingStack.navigationOptions = {
  tabBarLabel: 'Shopping List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  ),
};

const MealStack = createStackNavigator({
    Meals: MealListScreen,
});

MealStack.navigationOptions = {
    tabBarLabel: 'Meals',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused = {focused}
        name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} />
    )
}


export default createBottomTabNavigator({
  CalendarStack,
  ShoppingStack,
  MealStack,
});
