import React from 'react';
import { View, ScrollView  } from 'react-native';
import { Header,ListItem } from 'react-native-elements'
import recipeData from '../../data/recipe'
import MealManager from '../editMealsComponents/meal-manager'

class viewDayAddMeal extends React.Component {

    constructor (props){
        super(props)
        this.MM = null;
        this.constructMealPlan();
    }

    async constructMealPlan() {

		let mm = new MealManager();

        await mm.init();
        
        this.MM = mm;

	}
	
	/* addmealButtonPress(d,t,m) {
		this.MM.addmeal(d,t,m);
		this.props.navigation.navigate('DayView', dayChosen );
	} */

    // essentially copy pasta of preset.js
    // handle is slightly different
    render() {
      return (

        <View>
            {console.log(dayChosen)}
            {console.log(currIndex)}

            <Header
            placement="left"
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Preset Meals', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            />
        
            <ScrollView >
                {
                    recipeData.map((l, i) => (
                    <ListItem
                        key={i}
                        title={l.name}
                        onPress = {() => this.MM.addmeal(dayChosen,currIndex,l.name)}
                    />
                    ))
                }
            </ScrollView>
        </View>
      );
    }
	
	

  }
  export default viewDayAddMeal;