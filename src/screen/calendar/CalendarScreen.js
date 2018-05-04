//import liraries
import React, { Component } from 'react'
import moment from 'moment'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'

// create a component
class CalendarScreen extends Component {
  state = {
    endDate: moment().format('YYYY-MM-DD'),
    startDate: '',
    nextFocusDate: 'start',
    isInitDateToday: true,
  }

  renderDay = ({ date, state, marking }) => {
    if (moment().isBefore(date.dateString)) {
      return <View
        style={{
          width: 44, height: 44, paddingTop: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'gray' }}>
          {date.day}
        </Text>
      </View>
    } else if (marking.startingDay || marking.endingDay) {
      return <TouchableOpacity
        onPress={() => {
          console.log('1',this.state.isInitDateToday)
          if (!this.state.isInitDateToday) {
            console.log('2')
            if (marking.startingDay) {
              console.log('3')
              this.setState({ endDate: '', nextFocusDate: 'end' })
            } else {
              // today
              if (moment(date.dateString).isSame(moment().format('YYYY-MM-DD'))) {
                this.setState({ endDate: date.dateString, startDate: '', nextFocusDate: 'start', isInitDateToday: true, })
              } else {
              this.setState({ endDate: '', startDate: date.dateString, nextFocusDate: 'end', })
            }
            }
          } else {
            console.log('5')
          }
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 44, height: 44, paddingTop: 5,
          backgroundColor: '#ff1654', borderRadius: 8
        }}
      >
        <Text style={{ color: '#fff', position: 'absolute', top: 2, fontSize: 10 }}>{
          this.state.endDate && this.state.startDate ?
            (marking.startingDay
              ? 'From1'
              : 'To1'
            )
            : this.state.isInitDateToday ? 'To2' : 'From2'}</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', color: '#fff' }}>
          {date.day}
        </Text>
      </TouchableOpacity>
    } else {
      return <TouchableOpacity
        onPress={() => {
          console.log('11')
          if (this.state.nextFocusDate === 'start') {
            console.log('12')
            if (this.state.isInitDateToday) {
              console.log('13', date, this.state.nextFocusDate)
              this.setState({ startDate: date.dateString, isInitDateToday: false, })
            } else {
              if (moment(date.dateString).isSame(moment().format('YYYY-MM-DD'))) {
                console.log('15')
                this.setState({ startDate: '', endDate: date.dateString, isInitDateToday: true, })
              } 
              else {
                console.log('16')
                this.setState({ startDate: date.dateString, isInitDateToday: false, endDate: '', nextFocusDate: 'end' })
              }
            }
          } else {
            // end
            console.log('17')
            if (moment(date.dateString).isBefore(this.state.startDate)) {
              console.log('18')
              this.setState({ startDate: date.dateString })
            } else {
              console.log('19')
              this.setState({ endDate: date.dateString, nextFocusDate: 'start' })
            }
          }
          console.log(this.state)
        }}
        style={{
          width: 44, height: 44, paddingTop: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 16, textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>
          {date.day}
        </Text>
      </TouchableOpacity>
    }
  }

  render() {
    return (
      <CalendarList
        markedDates={{
          [this.state.startDate]: { startingDay: true },
          [this.state.endDate]: { endingDay: true },
          ...this.dateDisabled,
        }}
        theme={{
          'stylesheet.calendar.main': {
            dayContainer: {
              width: 44,
              height: 44,
            },
            week: {
              marginTop: 0,
              marginBottom: 0,
              flexDirection: 'row',
              justifyContent: 'space-between'
            },
          },
        }}
        dayComponent={this.renderDay}
        hideDayNames={true}
        // onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
        pastScrollRange={100}
        futureScrollRange={1}
        scrollEnabled={true}
        showScrollIndicator={true}
      />
    )
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
})

//make this component available to the app
export default CalendarScreen
