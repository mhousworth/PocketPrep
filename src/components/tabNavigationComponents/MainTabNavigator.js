import React from 'react';

import { Platform } from 'react-native';

import { createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import CalendarScreen from '../calendarComponents/calendar';

import ShoppingListScreen from '../shoppingListComponents/shopping';

import MealListScreen from '../viewMealsComponents/preset'


const CalendarStack = createSwitchNavigator({
  Calendar: CalendarScreen,
});

CalendarStack.navigationOptions = {
 tabBarLabel: 'Calendar',

	tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name={ Platform.OS === 'ios' ? `ios-calendar${focused ? '' : '-outline'}`: 'md-calendar'}
      size = {26}
    />
  ),
};


const ShoppingStack = createSwitchNavigator({
  Shopping: ShoppingListScreen,
});


ShoppingStack.navigationOptions = {
  tabBarLabel: 'Shopping List',
  tabBarIcon: ({ focused }) => (
    <Icon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
      size = {26}
    />
  ),
};

const MealStack = createSwitchNavigator({
    Meals: MealListScreen,
});

MealStack.navigationOptions = {
    tabBarLabel: 'Meals',
    tabBarIcon: ({focused}) => (
        <Icon focused = {focused}
        name={Platform.OS === 'ios' ? 'ios-pizza' : 'md-pizza'}
        size={26}
        />
    )
}


export default createBottomTabNavigator({
  CalendarStack,
  ShoppingStack,
  MealStack,
});
