import React from 'react';
import { View, ScrollView } from 'react-native';
import { Header,Text,ListItem,Slider,CheckBox,Button } from 'react-native-elements';
import { FileSystem } from 'expo';
import { NavigationActions } from 'react-navigation';



class SettingScreen extends React.Component {
	constructor(props){
      super(props);
      this.settings={};
      this.state={
          value:2,
          isLoading:true
      }
      
      this.constructFileSettings();
    }

    async constructFileSettings(){
        this.fileUri = FileSystem.documentDirectory + 'settings.json';
        //FileSystem retrieves file information (exists), must await before accessing file
        FileSystem.getInfoAsync(this.fileUri).then((fileInfo) =>{

          if ( fileInfo["exists"] == true) {
            
            //FileSystem reads are asynchronous, must await before creating customMeals List
            fileread = async () => {
              let result = null;
            
              try {
                //Wait for FileSystem read to return a result string
                result = await FileSystem.readAsStringAsync(this.fileUri);
              
              } catch(e) {
              console.log(e);
              }
              //Parse result to object and store in Custom Meals List
              this.settings=JSON.parse(result); 
              
              this.setState({isLoading:false,value:this.settings['days']});          
            }
            //Run async function
            fileread();
            }
            else {
              console.log('custom file does not exist');

              // Write Empty List 
              this.settings={days:3}
              FileSystem.writeAsStringAsync(this.fileUri, JSON.stringify({days:3}));
              this.setState({isLoading:false,value:this.settings['days']}); 
            }
        });
    }

    render() {
        if(this.state.isLoading){
            return(<View style={{flex:1,alignItems: 'center', justifyContent: 'center' }}><Text>Loading...</Text></View>)
        }
      return (
        <View style={{ flex: 1}}>
            <Text h1>Settings</Text>
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
                    onLongPress={() => this.handleDeleteCustomMeals()}
                />
                
                
                
            
        </View>
      );
    }
    async handleConfigureDays(numDays){
        console.log(`Configuring to ${numDays} Days`);
        await FileSystem.writeAsStringAsync(this.fileUri, JSON.stringify({days:numDays}));
        this.setState({value:numDays});
        
    }
    async handleDeleteMealPlan(){
        console.log("Deleting Meal Plan");
		this.fileUri = FileSystem.documentDirectory + 'mealplan.json';
		await FileSystem.deleteAsync(FileSystem.documentDirectory + 'mealplan.json');
    }
    async handleDeleteCustomMeals(){
        console.log("Deleting Custom");
		this.fileUri = FileSystem.documentDirectory + 'custom.json';
		await FileSystem.deleteAsync(FileSystem.documentDirectory + 'custom.json');
		const setResetFlag = NavigationActions.setParams({
			params: {resetCustom: true},
			key: 'MealStack',
		});
		this.props.navigation.dispatch(setResetFlag);
    }

  }
export default SettingScreen;