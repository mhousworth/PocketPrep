import React from 'react';
import { Button, View, Text } from 'react-native';
import MealManager from './editMealsComponents/meal-manager';

let mm = new MealManager();

class DebugScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text className="lightblue-tag">Home Screen</Text>
          <Button
            title={"Add meal Mac&Cheese"}
            onPress={() => mm.addmeal("2019-03-12","L","Mac&Cheese") }
          />
		  <Button
            title="Add meal Beef Dip"
            onPress={() => mm.addmeal("2019-03-14","D","Beef Dip") }
          />
		  <Button
            title="Print File to Console"
            onPress={() => mm.printFile() }
          />
      <Button
            title="Print File to Console"
            onPress={() => mm.printFile() }
          />
      </View>
      );
    }
  }
export default DebugScreen;