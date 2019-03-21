import React from 'react';
import { View, ScrollView  } from 'react-native';
import { Header,ListItem,Text,Input,Button, Divider, ButtonGroup } from 'react-native-elements';

class viewDayScreen extends React.Component {
    constructor () {
        super()
        this.state = {
        selectedIndex: 2
        }
        this.updateIndex = this.updateIndex.bind(this)
    }
    
    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }




  render() {
    const buttons = ['Breakfast', 'Lunch', 'Dinner']
    const { selectedIndex } = this.state
      return (
        <View>
          {console.log(this.props.navigation.state.params.dayChosen)}
            <Header
            placement="left"
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: this.props.navigation.state.params.dayChosen, style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <Text h1>{this.props.navigation.state.params.dayChosen}</Text>
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 100}}
            />
        
        </View>
      );
    }

  }
  export default viewDayScreen;