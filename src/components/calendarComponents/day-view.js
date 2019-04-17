import React from 'react';
import { View, ScrollView  } from 'react-native';
import { Header,ListItem,Text,Input,Button, Divider, ButtonGroup } from 'react-native-elements';
import MealManager from '../editMealsComponents/meal-manager'


class viewDayScreen extends React.Component {
	
	constructor (props) {
        super(props)
        this.state = {
        selectedIndex: 2
        }
        this.updateIndex = this.updateIndex.bind(this);
		
		this.MM = null;
		
		this.plan = '';
		
		this.constructMealPlan();
		
		this.isLoading = true;
    }
	
	async constructMealPlan() {
		
		let mm = new MealManager();
		
		await mm.init();
		
		this.MM = mm;
		
		//console.log('mealplancalendar object: ' + JSON.stringify(mm));
		
		let mp = mm.getMealPlan(this.props.navigation.state.params.dayChosen);
		
		console.log('mealplan object: ' + JSON.stringify(mp));
		
		let Bstr = '', Lstr = '', Dstr = '';
		
		if(mp != undefined) {
			
			let B = mp.Breakfast;
			let L = mp.Lunch;
			let D = mp.Dinner;
		
			if(B.length > 0)
				B.forEach(function(element) { Bstr += (element + '\n'); });
			if(L.length > 0)
				L.forEach(function(element) { Lstr += (element + '\n'); });
			if(D.length > 0)
				D.forEach(function(element) { Dstr += (element + '\n'); });
		}
		
		
		this.plan = 'Breakfast: ' + Bstr + '\nLunch: ' + Lstr + '\nDinner: ' + Dstr;
		
		this.setState({isLoading : false});
	}
    
    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }


  render() {
    const buttons = ['Breakfast', 'Lunch', 'Dinner']
    const { selectedIndex } = this.state

    dayChosen = this.props.navigation.state.params.dayChosen

    currIndex = selectedIndex
	
	if(this.state.isLoading){
		return (<View></View>) ;
	}
	
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
			<Text>{this.plan}</Text>
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 100}}
            />
			<Button title='Add a meal'
				onPress={() => this.props.navigation.navigate('DayAddMeal', dayChosen, currIndex)}
            />
        
        </View>
      );
    }

  }
  export default viewDayScreen;