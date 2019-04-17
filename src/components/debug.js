import React from 'react';
import { Button, View, Text } from 'react-native';
import { FileSystem } from 'expo';
import MealManager from "./editMealsComponents/meal-manager";

let mm = new MealManager();
mm.init();

class DebugScreen extends React.Component {
    constructor(props){
      super(props);
      this.state={
        mm:new MealManager()
      }
      this.constructDebugger()
      
      
    }
    async constructDebugger() {

      let debug = new FileDebugger();
      await debug.init();
      this.setState({debug:debug});
  
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
			onPress={() => mm.removeMeal("2019-05-11","B", "Farmer's Breakfast") }
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