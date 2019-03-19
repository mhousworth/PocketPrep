import React from 'react';
import moment from 'moment';
import { View } from 'react-native';
import { CalendarList } from 'react-native-calendars';


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

    this.state = {
      _markedDates: this.initialState
    }
  }
  
  // Could use this to navigate to a new page
  // probably something like: navigation.navigate('MealList', {day.dateString})
  // if food is found in the MealList, mark the date
  onDaySelect = (day) => {
      const _selectedDay = moment(day.dateString).format(_format);


      let marked = true;
      let markedDates = {}
      if (this.state._markedDates[_selectedDay]) {
        // Already in marked dates, so reverse current marked state
        marked = !this.state._markedDates[_selectedDay].marked;
        markedDates = this.state._markedDates[_selectedDay];
      }
      
      markedDates = {...markedDates, ...{ marked }};
      
      // Create a new object using object property spread since it should be immutable
      // Reading: https://davidwalsh.name/merge-objects
      const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: markedDates } };
      
      console.log(markedDates);
      // Triggers component to render again, picking up the new state
      this.setState({ _markedDates: updatedMarkedDates });


  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <CalendarList
            theme={{dotColor: 'red', monthTextColor: 'orange'
        }}
            
            pastScrollRange={1}
            futureScrollRange={1}

            // we use moment.js to give the minimum and maximum dates.
            minDate={_today}
            maxDate={_maxDate}

            // hideArrows={true}

            onDayPress={this.onDaySelect}
            markedDates={this.state._markedDates}

            //Would like to get this working with: markingType={'period'}, but currently only implemented for default marking
        />
      </View>
    );
  }
}

export default CalendarScreen;

// TODO: Set up an event handle for navigating to date specified page
// TODO: Set up item container for user entered meals -- requires backend pulling from a list
// TODO: If there is at least 1 item in the item container for that date, the app marks the day