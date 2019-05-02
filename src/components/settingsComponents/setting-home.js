import React from 'react';
import { View, ScrollView } from 'react-native';
import { Header,Text,ListItem,Slider,CheckBox,Button } from 'react-native-elements';
import { FileSystem } from 'expo';



class SettingScreen extends React.Component {
	constructor(props){
      super(props);
      this.settings={};
      this.state={
          value:2,
      }
    }

    render() {

      return (
        <View style={{ flex: 1}}>
            <Text h1>Settings</Text>

                {/* {
                    this.state.settings.map((setting,i)=>{
                        return(
                            <ListItem
                                key={i}
                                title={setting.title}
                                onPress={setting.function}
                            />
                        );
                    })
                } */}
                <ListItem
                    key={0}
                    title={"Configure Days"}
                    rightElement={(
                        <Button 
                            title="Save"
                            onPress={this.handleConfigureDays.bind(this,this.state.value)}
                        />
                    )}
                />
                <View style={{height:'25%',alignItems: 'center', justifyContent: 'center' }}>
                    <Slider
                        maximumValue={7}
                        minimumValue={1}
                        step={1}
                        style={{width:'60%'}}
                        value={this.state.value}
                        onValueChange={value => this.setState({ value })}
                    />
                    <Text>{this.state.value} day(s)</Text>
                </View>
                
                <ListItem
                    key={1}
                    title={"Delete All Meals"}
                    titleStyle={{color:'red'}}
                    topDivider={true}
                    onLongPress={this.handleDeleteMealPlan}
                />
                <ListItem
                    key={2}
                    title={"Delete All Custom Meals"}
                    titleStyle={{color:'red'}}
                    onLongPress={this.handleDeleteCustomMeals}
                />
                
                
                
            
        </View>
      );
    }
    handleConfigureDays(numDays){
        console.log(`Configuring to ${numDays} Days`);
        this.settings['days']=numDays;
        console.log(this.settings['days']);
    }
    handleDeleteMealPlan(){
        console.log("Deleting Meal Plan");
    }
    handleDeleteCustomMeals(){
        console.log("Deleting Custom");
    }

  }
export default SettingScreen;