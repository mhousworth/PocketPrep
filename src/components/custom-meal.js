import React from 'react';
import { View, Text, ScrollView  } from 'react-native';
import { Header,ListItem } from 'react-native-elements'
import customData from '../data/custom'

class CustomScreen extends React.Component {
    render() {
        customData.map((meal)=>{
            console.log(meal.name);
        })
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
                    customData.map((l, i) => (
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