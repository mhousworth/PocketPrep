import React from 'react';
import moment from 'moment';
import { View } from 'react-native';
import { Button } from 'react-native-elements'
import { CalendarList } from 'react-native-calendars';
import MealManager from '../editMealsComponents/meal-manager';



const _format = 'YYYY-MM-DD'
const _today = moment().format(_format-1)
const _maxDate = moment().add(60, 'days').format(_format)

class CalendarScreen extends React.Component {
  // It is not possible to select some to current day.
  initialState = {
      [_today]: {disabled: true}
  }
  
  constructor(props) {
    super(props);
    this.MealManage = new MealManager();
    this.state = {
      _markedDates: this.initialState
    }
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
          onPress ={this.handleSend.bind(_today, _today+1)}
        />
      </View>
    );
  }
  handleSend(date1, date2){
    meallist = this.MM.getMealPlan(date1);
    // concatenate with mealplan for tomorrow
    meallist += this.MM.getMealPlan(date2);

    // parse meallist for mealnames

    // send array of mealnames through .createShoppingList

    // navigate to the shopping list

    // this.props.navigation.navigate('List')

    console.log(meallist);
  }
}

export default CalendarScreen;

// TODO: Set up an event handle for navigating to date specified page
// TODO: Set up item container for user entered meals -- requires backend pulling from a list
// TODO: If there is at least 1 item in the item container for that date, the app marks the day