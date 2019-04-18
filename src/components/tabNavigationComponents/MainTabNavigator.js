import React from 'react';

import { Platform } from 'react-native';

import { createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import CalendarScreen from '../calendarComponents/calendar';

import ShoppingListScreen from '../shoppingListComponents/shopping';

import MealListScreen from '../viewMealsComponents/view-meals'


const CalendarStack = createSwitchNavigator({
  Calendar: CalendarScreen,
});

CalendarStack.navigationOptions = {
 tabBarLabel: 'Calendar',

	tabBarIcon: ({ focused }) => (
    <FontAwesome
      focused={focused}
      name={"calendar"}
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
    <FontAwesome
      focused={focused}
      name={'shopping-cart'}
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
        <FontAwesome focused = {focused}
        name={'cutlery'}
        size={26}
        />
    )
}


export default createBottomTabNavigator({
  CalendarStack,
  ShoppingStack,
  MealStack,
});
