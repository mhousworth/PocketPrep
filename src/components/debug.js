import React from 'react';
import { Button, View, Text } from 'react-native';
import { FileSystem } from 'expo';
import MealManager from "./fileManager/meal-manager";



class DebugScreen extends React.Component {
	constructor(props){
      super(props);
      this.state={
        mm:new MealManager()
      }

      this.state.mm.init();
      
    }

    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text className="lightblue-tag">Home Screen</Text>
		<Button
			title={"Reset local mealplan.json file"}
			onPress={() => FileSystem.deleteAsync(FileSystem.documentDirectory + 'mealplan.json') }
		/>
		<Button
			title="Remove "
			onPress={() => this.state.mm.removeMeal("2019-04-19", "D", "Portobello Mushroom Lasagna") }
		/>
		<Button
			title="Print File to Console"
			onPress={() => this.state.mm.printFile() }
		/>
		</View>
      );
    }
  }
export default DebugScreen;