import React from 'react';
import { View, ScrollView  } from 'react-native';
import { Header,ListItem,Text,Input,Button, Divider, ButtonGroup } from 'react-native-elements';
import MealManager from '../editMealsComponents/meal-manager'


class viewDayScreen extends React.Component {
	
	constructor (props) {
        super(props)
        
		this.MM = null;
		
		this.bArray = [];
		this.lArray = [];
		this.dArray = [];
		
		this.constructMealPlan();
		let currDate = this.props.navigation.state.params.dayChosen;
		this.state = {
        selectedIndex: 0,
				activeList: this.bArray,
				currDate:currDate
		}

		this.updateIndex = this.updateIndex.bind(this);
		
		this.isLoading = true;
    }
	
	async constructMealPlan() {
		
		let mm = new MealManager();
		
		await mm.init();
		
		this.MM = mm;
		
		//console.log('mealplancalendar object: ' + JSON.stringify(mm));
		
		let mp = mm.getMealPlan(this.state.currDate);
		
		console.log('mealplan object: ' + JSON.stringify(mp));
		
		let Bstr = '', Lstr = '', Dstr = '';
		
		if(mp != undefined) {
			
			this.bArray = mp.Breakfast;
			this.lArray = mp.Lunch;
			this.dArray = mp.Dinner;	
		}
		
		this.setState({isLoading : false,activeList:this.bArray});
	}
    
    updateIndex (selectedIndex) {
        this.setState({selectedIndex});
		if(selectedIndex == 0)
			this.setState({activeList:this.bArray});
		if(selectedIndex == 1)
			this.setState({activeList:this.lArray});
		if(selectedIndex == 2)
			this.setState({activeList:this.dArray});
    }


  render() {
    const buttons = ['Breakfast', 'Lunch', 'Dinner'];
    const { selectedIndex } = this.state;
		let dayChosen=new Date(this.state.currDate);
		dayChosen=dayChosen.toDateString().split(' ').slice(1).join(' ');
    
    currIndex = selectedIndex;
	
		if(this.state.isLoading){
			return (<View></View>) ;
		}
	
      return (
        <View style={{backgroundColor:'#79bd9a',flex:1}} >
          {console.log(this.state.currDate)}
            <Text h1 style={{backgroundColor:'#0b486b',color:'#FFFFFF',padding:'5% 0 5% 5%'}}>{dayChosen}</Text>
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: '10%'}}
            />
			<ScrollView style={{height:'40%'}}>
				{
					this.state.activeList.map( (name) => (
					<ListItem
                        title={name}
                    />
					))
				}
			</ScrollView>
			<Button title='Add a meal'
				onPress={() => this.props.navigation.navigate('DayAddMeal', this.state.currDate, currIndex)}
            />
        
        </View>
      );
    }

  }
  export default viewDayScreen;