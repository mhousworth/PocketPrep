import React from 'react';
import { View, ScrollView  } from 'react-native';
import { Header,ListItem,Text,Input,Button, Divider, ButtonGroup } from 'react-native-elements';
import MealManager from '../editMealsComponents/meal-manager'


class viewDayScreen extends React.Component {
	
	constructor (props) {
        super(props)
        this.state = {
        selectedIndex: 2,
        plan:''
        }
        this.updateIndex = this.updateIndex.bind(this);
		
		this.MM;
	
		
		this.constructMealPlan();
    }
	
	async constructMealPlan() {
		
		let mm = new MealManager();
		
		await mm.init();
		
		console.log('mealplan object: ' + JSON.stringify(mm));
		
		let mp = mm.getMealPlan(this.props.navigation.state.params.dayChosen);
		
		if(mp == undefined)
			return;
		
		let B = mp.Breakfast;
		let L = mp.Lunch;
		let D = mp.Dinner;
		
		let Bstr = '', Lstr = '', Dstr = '';
		
		if(B.length > 0)
			B.forEach(function(element) { Bstr += (element + '\n'); });
		if(L.length > 0)
			L.forEach(function(element) { Lstr += (element + '\n'); });
		if(D.length > 0)
			D.forEach(function(element) { Dstr += (element + '\n'); });
		
		this.setState({plan:'Breakfast: ' + Bstr + '\nLunch: ' + Lstr + '\nDinner: ' + Dstr});
	}
    
    updateIndex (index) {
        this.setState({selectedIndex:index});
    }


  render() {
    const buttons = ['Breakfast', 'Lunch', 'Dinner'];
    const { selectedIndex } = this.state;
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
			<Text>{this.state.plan}</Text>
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 100}}
            />
        {/* <Text>{this.state.selectedIndex}</Text> */}
        </View>
      );
    }

  }
  export default viewDayScreen;