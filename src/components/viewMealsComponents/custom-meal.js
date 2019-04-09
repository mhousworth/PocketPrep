import React from 'react';
import { View, Text, ScrollView  } from 'react-native';
import { Header,ListItem } from 'react-native-elements';
import { FileSystem } from 'expo';

class CustomScreen extends React.Component {
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
                customMeals:currentCustomMeals
            }
        

    }





    render() {
        console.log(this.state.customMeals);
      return (
        <View>
            <Header
            placement="left"
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            />
        
            <ScrollView >
                {
                    this.state.customMeals.map((l, i) => (
                    <ListItem
                        key={i}
                        title={l.name}
                        onPress={this.handleMealSend.bind(this,l.name)}
                    />
                    ))
                }
            </ScrollView>
        </View>
      );
    }

    handleMealSend(name){
        console.log(name);
        return;
    }



  }
  export default CustomScreen;