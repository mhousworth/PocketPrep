import React from 'react';
import { Button, View, Text } from 'react-native';
class HomeScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text className="lightblue-tag">Home Screen</Text>
          <Button
            title="Go to Calendar view"
            onPress={() => this.props.navigation.navigate('Calendar')}
          />
          <Button
            title="Go to Shopping List"
            onPress={() => this.props.navigation.navigate('Details')}
          />
          <Button
            title="Go to Preset Meals"
            onPress={() => this.props.navigation.navigate('Details')}
          />
        </View>
      );
    }
  }
export default HomeScreen;