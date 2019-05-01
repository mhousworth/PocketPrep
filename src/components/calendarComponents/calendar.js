import React from 'react';
import moment from 'moment';
import { View } from 'react-native';
import { Button } from 'react-native-elements'
import { CalendarList } from 'react-native-calendars';
import MealManager from '../fileManager/meal-manager';
import { StackActions,NavigationActions} from 'react-navigation'




const _format = 'YYYY-MM-DD'
const _today = moment().add(0,'days').format(_format)
const _maxDate = moment().add(60, 'days').format(_format)

class CalendarScreen extends React.Component {
  // It is not possible to select some to current day.
  initialState = {
      [_today]: {disabled: false}
  }
  
  constructor(props) {
    super(props);
    this.MealManage = null;
    this.state = {
      _markedDates: this.initialState
    }
    this.constructMealPlan();
	}

	async constructMealPlan() {

		console.log("Navigated to Calendar");
	
		let mm = new MealManager();

		await mm.init();
		
		this.MealManage = mm;

	}
  
  // Could use this to navigate to a new page
  // probably something like: navigation.navigate('MealList', {day.dateString})
  // if food is found in the MealList, mark the date
  onDaySelect = (day) => {
      const _selectedDay = moment(day.dateString).format(_format);

      this.props.navigation.navigate('DayView',{
        dayChosen: _selectedDay
      });

  }
  
  render() {
	this.constructMealPlan();
	
    let date1 = moment(_today.dateString).format(_format);
    let date2 = moment().add(1, 'days').format(_format);
    return (
      <View style={{flex: 1}}>
        <CalendarList
            theme={{dotColor: 'red', monthTextColor: 'orange'
        }}
            
            pastScrollRange={0}
            futureScrollRange={2}

            // we use moment.js to give the minimum and maximum dates.
            minDate={_today}
            maxDate={_maxDate}

            // hideArrows={true}

            onDayPress={this.onDaySelect}
            markedDates={this.state._markedDates}

            //Would like to get this working with: markingType={'period'}, but currently only implemented for default marking
        />
        <Button
          title= 'Compile Shopping List'
          onPress ={this.handleSend.bind(this,[date1,date2])}
        />
      </View>
    );
  }
  handleSend(dates){
    // Account for :
    //    - Undefined(Days with no meals set)
    //    - MealPlan({"Breakfast":[],"Lunch":[],"Dinner":[]})
    
    let mealNames = [];
    // Extracts each date and collects all meal names
    // Stores an array of all meal names (string[] mealNames)
    dates.map((d) => {
      let plan = this.MealManage.getMealPlan(d);
      if(plan !== undefined){
          mealNames=mealNames.concat(plan["Breakfast"],plan["Lunch"],plan["Dinner"]);
      }
    });


    // send array of mealnames through .createShoppingList

    // navigate to the shopping list


    const navigateAction = NavigationActions.navigate({
      routeName: 'Shopping',
      params:{
        compileNames:mealNames,
        shouldReset:true
      },
    });

    this.props.navigation.dispatch(navigateAction);

    // this.props.navigation.navigate('Shopping',{compileNames:mealNames});
    return;
    
  }
}

export default CalendarScreen;

// TODO: Set up an event handle for navigating to date specified page
// TODO: Set up item container for user entered meals -- requires backend pulling from a list
// TODO: If there is at least 1 item in the item container for that date, the app marks the day