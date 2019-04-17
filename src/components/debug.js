import React from 'react';
import { Button, View, Text } from 'react-native';
import MealManager from './editMealsComponents/meal-manager';
import { FileSystem } from 'expo';


class FileDebugger {
  constructor(){
    this.fileUri= FileSystem.documentDirectory;
    this.fileInfo=null;
  }
  	//MUST CALL AFTER CREATING MEALMANAGER OBJECT
	//The point is to call this function using await, since the constructor is not async you cannot await it.
	//Therefore you create the object and then call its init() function
	async init() {
		
    let fileInfo = await FileSystem.readDirectoryAsync(this.fileUri);
    this.fileInfo=fileInfo;
    console.log(this.fileInfo);
  }
  listAll(){
    console.log(this.fileInfo);
  }
}



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
          {/* <Button
            title={"Add meal Mac&Cheese"}
            onPress={() => this.state.mm.addmeal("2019-03-12","L","Mac&Cheese") }
          />
		  <Button
            title="Add meal Beef Dip"
            onPress={() => this.state.mm.addmeal("2019-03-14","D","Beef Dip") }
          />
		  <Button
            title="Print File to Console"
            onPress={() => this.state.mm.printFile() }
          /> */}
      <Button
            title="List All Files"
            onPress={() => this.state.debug.listAll() }
          />
      </View>
      );
    }
  }
export default DebugScreen;