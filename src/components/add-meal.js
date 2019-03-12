import React from 'react';
import { View,  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text,Input,Button, Divider } from 'react-native-elements';

class AddScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            counter:1,
            title:"",
        }
    }
    render() {
      return (
        <View>
            <Text h3>New Recipe</Text>
            <Divider/>
            <ScrollView>
                <Input placeholder="Type Here"
                        label="Name of Meal"/>
                <Divider/>
                <Input placeholder="Type Here"
                        label={"Ingredient #"+this.state.counter}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.title}/>
                <Input placeholder="Type Here"
                        label="Measurement Type"
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}/>  
                <Input placeholder="Type Here"
                        label="Amount"
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}/>
                {

                }          
            </ScrollView>
            <Button title="Add New" onPress={this.handleAddIngredient.bind(this)}></Button>
            <Button title={this.state.counter} onPress={this.handleAddIngredient.bind(this)}></Button>
        </View>
      );
    }
    handleAddIngredient(){
        let update = this.state.counter+1;
        let ingredients=this.state.ingredients;

        console.log(update);
       this.setState({counter:update});
       return;
    }
  }
  export default AddScreen;