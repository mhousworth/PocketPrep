import React from 'react';
import { Button, View, Text } from 'react-native';
import MealManager from './meal-manager';

let mm = new MealManager();

class DebugScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text className="lightblue-tag">Home Screen</Text>
          <Button
            title={"Add meal Mac&Cheese"}
            onPress={() => mm.addmeal("03-12-2019","L","Mac&Cheese") }
          />
		  <Button
            title="Add meal Beef Dip"
            onPress={() => mm.addmeal("03-14-2019","D","Beef Dip") }
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