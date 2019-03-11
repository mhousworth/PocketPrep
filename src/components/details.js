import React from 'react';
import { Button, View, Text } from 'react-native';
import recipeData from '../data/recipe'

class DetailsScreen extends React.Component {
    render() {
      console.log(recipeData[0]);
      return (
        
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen</Text>
          <Button
            title="Go to Details... again"
            onPress={() => this.props.navigation.navigate('Details')}
          />
        </View>
      );
    }
  }
  export default DetailsScreen;