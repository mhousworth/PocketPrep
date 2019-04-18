import React from 'react';
import { View, ScrollView  } from 'react-native';
import { Header,ListItem,Divider, ButtonGroup } from 'react-native-elements';
import recipeData from '../../data/recipe';
import { FileSystem } from 'expo';

class MealScreen extends React.Component {
    constructor(props){
        super(props);

        let currentCustomMeals=[];
        this.fileUri = FileSystem.documentDirectory + 'custom.json';
        //FileSystem reads are asynchronous, must await before creating MealPlanCalendar object
        FileSystem.getInfoAsync(this.fileUri).then((fileInfo) =>{

          if ( fileInfo["exists"] == true) {
            console.log('custom file exists');
            
            //FileSystem reads are asynchronous, must await before creating MealPlanCalendar object
            fileread = async () => {
              let result = null;
            
              try {
                //Wait for FileSystem read to return a result string
                result = await FileSystem.readAsStringAsync(this.fileUri);
              
              } catch(e) {
              console.log(e);
              }
              //Parse result to object and store in MealPlanCalendar
              currentCustomMeals = JSON.parse(result);
              this.setState({customMeals:currentCustomMeals});
              console.log(currentCustomMeals);
            //    console.log(currentCustomMeals);
            }
            //Run async function
            fileread();
            }
            else {
              console.log('custom file does not exist');
              //create the file based on app's asset
              currentCustomMeals = "[]";
              FileSystem.writeAsStringAsync(this.fileUri, currentCustomMeals);
              currentCustomMeals = [];
            }


        });
        
        this.state={
            customMeals:currentCustomMeals,
            presetMeals:recipeData,
            displayList:recipeData,
            selectedIndex:0
        }

        this.updateIndex = this.updateIndex.bind(this);
    

    }
    updateIndex (selectedIndex) {
        this.setState({selectedIndex});
        if(selectedIndex == 0)
          this.setState({displayList:this.state.presetMeals});
        else
          this.setState({displayList:this.state.customMeals});
    }
    render() {
        const buttons = ['Preset', 'Custom'];
        const {selectedIndex} = this.state;
        console.log(this.state.displayList);
      return (
        <View style={{flex:1}}>
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: '10%'}}
            />
        
            <ScrollView style={{height:'85%'}} >
                {
                    this.state.displayList.map((l) => (
                    <ListItem
                        key={l.name}
                        title={l.name}
                        topDivider={true}
                        bottomDivider={true}
                        // onPress={this.handleMealSend.bind(this,l.name)}
                    />
                    ))
                }
            </ScrollView>
        </View>
      );
    }

    handleMealSend(name){
        const { navigate } = this.props.navigation;
        // Send name of the meal to the Ingredients Screen Component (ingredients.js)
        navigate('Ingredients', { mealName: name })

        return;
    }
    


  }
  export default MealScreen;