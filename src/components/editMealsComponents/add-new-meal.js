import React from 'react';
import { View , Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text,Input, Divider,List,ListItem } from 'react-native-elements';
import { FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackActions,NavigationActions} from 'react-navigation'


class AddScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          counter:1,
          ingredients:[],
          name:"",
          ingName:"",
          ingType:"",
          ingAmount:"",
          customMeals:[]

      }

        let currentCustomMeals=[];
        this.fileUri = FileSystem.documentDirectory + 'custom.json';
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
              this.setState({customMeals:JSON.parse(result)});
            }
            //Run async function
            fileread();
            }
            else {
              console.log('custom file does not exist');

              // Write Empty List 
              FileSystem.writeAsStringAsync(this.fileUri, JSON.stringify(currentCustomMeals));
            }


        });

        
    }
    render() {
      return (
        <View style={{flex:1,backgroundColor:'#d0d0d0'}}>
            <Text h1 style={{backgroundColor:'#0b486b',color:'#FFFFFF'}}>Create a Meal</Text>
            <Divider/>
            <View>
                <Input placeholder="Type Here"
                        label="Name of Meal"
                        onChangeText={(text) => this.setState({name:text})}
                        value={this.state.name}/>
                
                <Input placeholder="Type Here"
                        label={"Ingredient #"+this.state.counter}
                        onChangeText={(text) => this.setState({ingName:text})}
                        value={this.state.ingName}/>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width:'50%'}}>
                        <Input placeholder="Type Here"
                                label="Measurement"
                                onChangeText={(text) => this.setState({ingType:text})}
                                value={this.state.ingType}/>
                    </View>
                    <View style={{width:'50%'}}>
                        <Input placeholder="Type Here"
                                label="Amount"
                                onChangeText={(text) => this.setState({ingAmount:text})}
                                value={this.state.ingAmount}/>
                    </View>
                  
                </View>     
            </View>
            <ScrollView style={{height:'25%',
                                marginTop:'5%',
                                borderRadius: 4,
                                borderWidth: 0.5,
                                borderColor: '#0b486b'}}>
              {
                this.state.ingredients.map((item,i)=>{
                  return(
                    <ListItem
                      key={i}
                      title={item.name}
                      topDivider={true}
							        bottomDivider={true}
                    />

                  );
                })
              }
            </ScrollView>
            

            
            <View style={{flexDirection: 'row',width:'60%',marginHorizontal:'20%'}}>
                <View style={{width:'50%'}}>
                    <Icon 
                        name={Platform.OS === 'ios' ? "ios-done-all":"md-done-all"} 
                        color="#0b486b"
                        size = {100}
                        onPress={this.handleSubmitsIngredient.bind(this)}>
                    </Icon>
                </View>
                <View style={{width:'50%',alignItems:'flex-end'}}>
                    <Icon 
                        name={Platform.OS === 'ios' ? "ios-add":"md-add"} 
                        color="#0b486b"
                        size = {100}
                        onPress={this.handleAddIngredient.bind(this)}>
                    </Icon>
                </View>
                
            </View>
        </View>
      );
    }
    handleAddIngredient(){
      
        if(!this.state.ingName || !this.state.ingAmount || !this.state.ingType)
          // Will not continue if any information is not available
          return;

        // Represents number of ingredients
        let update = this.state.counter+1;

        //Retrieves previous ingredients and adds the new ingredient
        let newIngredients=this.state.ingredients;
        newIngredients.push({
          name:this.state.ingName,
          measurement:this.state.ingType,
          amount:this.state.ingAmount
        })

        // Saves the new Ingredients list 
       this.setState({
         counter:update,
         ingName:"",
         ingType:"",
         ingAmount:"",
         ingredients:newIngredients
      });
      
       return;
    }
	handleSubmitsIngredient(){
      
		console.log('custom meals object: ' + JSON.stringify(this.state.customMeals));
	  
          // Creates a custom meal object
          var newMeal = {
                  name: this.state.name,
                  ingredients: this.state.ingredients
          };
          this.state.customMeals.push(newMeal);

          // Writes custom meal object to file
          FileSystem.writeAsStringAsync(this.fileUri, JSON.stringify(this.state.customMeals));
          
          //Reads custom meal file (debug)
          // FileSystem.readAsStringAsync(this.fileUri).then( (filedata) => {
          //   console.log(filedata);
          //     }
          // );
          
          // this.props.navigation.navigate('MealView');
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Main' })],
          });
          this.props.navigation.dispatch(resetAction);
      
    return;
	}

}
export default AddScreen;