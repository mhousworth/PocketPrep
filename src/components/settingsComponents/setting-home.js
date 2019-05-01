import React from 'react';
import { View, ScrollView } from 'react-native';
import { Header,Text,ListItem,CheckBox,Button } from 'react-native-elements';
import { FileSystem } from 'expo';



class SettingScreen extends React.Component {
	constructor(props){
      super(props);
      
      this.state={
          settings:[
              {title:"Configure Days",function:this.handleConfigureDays},
              {title:"Delete All Meals",function:this.handleDeleteMealPlan},
              {title:"Delete All Custom Meals",function:this.handleDeleteCustomMeals}
          ]
      }
      
    }

    render() {
      return (
        <View style={{ flex: 1}}>
            <Text h1>Settings</Text>
            <ScrollView style={{height:'40%'}}>

                {
                    this.state.settings.map((setting,i)=>{
                        return(
                            <ListItem
                                key={i}
                                title={setting.title}
                                onPress={setting.function}
                            />
                        );
                    })
                }
                

            </ScrollView>
        </View>
      );
    }
    handleConfigureDays(){
        console.log("Configuring Days");
    }
    handleDeleteMealPlan(){
        console.log("Deleting Meal Plan");
    }
    handleDeleteCustomMeals(){
        console.log("Deleting Custom");
    }

  }
export default SettingScreen;