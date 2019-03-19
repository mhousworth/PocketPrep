import React from 'react';
import { View,  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text,Input,Button, Divider } from 'react-native-elements';

// import console = require('console');

class AddScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            counter:1,
            ingredients:[],
            name:"",
            ingName:"",
            ingType:"",
            ingAmount:""

        }
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
                        onChangeText={(text) => this.setState({title:text})}
                        value={this.state.title}/>
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
          return;

        let update = this.state.counter+1;
        let newIngredients=this.state.ingredients;
        newIngredients.push({
          name:this.state.ingName,
          type:this.state.ingType,
          amount:this.state.ingAmount
        })
        console.log(this.state);
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
      //Output JSON format and append to recipe List with id="Created Recipe"  
      
    return;
  }
  }
  export default AddScreen;