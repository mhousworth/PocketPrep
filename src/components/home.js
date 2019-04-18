import React from 'react';
import { Button, View, Text } from 'react-native';
import AppNavigator from './tabNavigationComponents/MainTabNavigator'

class HomeScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text className="lightblue-tag">Home Screen</Text>
          <Button
            title="Go to Calendar view"
            onPress={() => this.props.navigation.navigate('Calendar')}
          />
          {/* <Button
            title="Go to Shopping List"
            onPress={() => this.props.navigation.navigate('List')}
          /> */}
          <Button
            title="Go to Preset Meals"
            onPress={() => this.props.navigation.navigate('Preset')}
          />
          <Button
            title="Add new Meal"
            onPress={() => this.props.navigation.navigate('AddRecipe')}
          />
          <Button
            title="Go to Custom Meals"
            onPress={() => this.props.navigation.navigate('CustomMeal')}
          />
          <Button
            title="Debug"
            onPress={() => this.props.navigation.navigate('Debugger')}
          />
        </View>
      );
    }
  }
export default HomeScreen;