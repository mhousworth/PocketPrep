import React from 'react';
import { View  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text,Input,Button, Divider } from 'react-native-elements';
import { FileSystem } from 'expo';


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
        <View>
            <Text h3>New Recipe</Text>
            <Button title="Add New" onPress={this.handleAddIngredient.bind(this)}></Button>
            <Button title={"Submit "} onPress={this.handleSubmitsIngredient.bind(this)}></Button>
            <Divider/>
            <ScrollView>
                <Input placeholder="Type Here"
                        label="Name of Meal"
                        onChangeText={(text) => this.setState({name:text})}
                        value={this.state.name}/>
                <Divider/>
                <Input placeholder="Type Here"
                        label={"Ingredient #"+this.state.counter}
                        onChangeText={(text) => this.setState({ingName:text})}
                        value={this.state.ingName}/>
                <Input placeholder="Type Here"
                        label="Measurement Type"
                        onChangeText={(text) => this.setState({ingType:text})}
                        value={this.state.ingType}/>  
                <Input placeholder="Type Here"
                        label="Amount"
                        onChangeText={(text) => this.setState({ingAmount:text})}
                        value={this.state.ingAmount}/>        
            </ScrollView>
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
          type:this.state.ingType,
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
          
          this.props.navigation.navigate('CustomMeal');
      
    return;
  }
  


}
export default AddScreen;