import React from 'react';
import { Button, View, Text } from 'react-native';
import { FileSystem } from 'expo';


class DebugScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text className="lightblue-tag">Home Screen</Text>
          <Button
            title={"Reset local mealplan.json file"}
            onPress={() => FileSystem.deleteAsync(FileSystem.documentDirectory + 'mealplan.json') }
          />
      <Button
            title="Print File to Console"
            onPress={() => mm.printFile() }
          />
      </View>
      );
    }
  }
export default DebugScreen;