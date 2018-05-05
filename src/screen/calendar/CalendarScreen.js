import React, { Component } from 'react'
import moment from 'moment'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'

const calendarDayHeight = 44
const calenderTextHeadMargin = 11
const calendarHeaderMargin = 11
const calendarHeaderFontSize = 14
const calendarMainHeight = (calendarDayHeight * 5) + (calenderTextHeadMargin * 2) + (calendarHeaderMargin * 2) + calendarHeaderFontSize
const styleSheetCalendarMain = {
  container: {
    flex: 1,
  },
  monthView: {
    flex: 1,
  },
  dayContainer: {
    height: calendarDayHeight,
    flex: 1,
  },
  week: {
    flex: 1,
    paddingLeft: 7,
    paddingRight: 7,
    marginTop: 0,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
}

class CalendarScreen extends Component {
  dateNow = moment().format('YYYY-MM-DD')
  state = {
    startDate: '',
    isInitDateToday: true,
    endDate: this.dateNow,
    nextFocusDate: 'start',
  }

  handleOnDayMarkPress = (startingDay, dateString) => {
    const { isInitDateToday } = this.state
    if (!this.state.isInitDateToday) {
      if (startingDay) {
        this.setState({
          endDate: '',
          nextFocusDate: 'end',
        })
      } else if (moment(dateString).isSame(this.dateNow)) {
        // today
        this.setState({
          endDate: dateString,
          startDate: '',
          nextFocusDate: 'start',
          isInitDateToday: true,
        })
      } else {
        this.setState({
          endDate: '',
          startDate: dateString,
          nextFocusDate: 'end',
        })
      }
    }
  }

  handleOnDayPress = (dateString) => {
    const { nextFocusDate, isInitDateToday, startDate } = this.state
    if (nextFocusDate === 'start') {
      if (isInitDateToday) {
        this.setState({
          startDate: dateString,
          isInitDateToday: false,
        })
      } else if (moment(dateString).isSame(this.dateNow)) {
        this.setState({
          startDate: '',
          endDate: dateString,
          isInitDateToday: true,
        })
      } else {
        this.setState({
          startDate: dateString,
          isInitDateToday: false,
          endDate: '',
          nextFocusDate: 'end',
        })
      }
    } else if (moment(dateString).isBefore(startDate)) {
      this.setState({ startDate: dateString })
    } else {
      this.setState({
        endDate: dateString,
        nextFocusDate: 'start',
      })
    }
  }

  renderDayDisabled = (day) =>
    <View style={styles.dayWrapperDisable}>
      <Text style={styles.dayTextDisable}>
        {day}
      </Text>
    </View>

  renderDayMark = (marking, day, dateString) => {
    const { startingDay, endingDay } = marking
    const { endDate, startDate, isInitDateToday } = this.state
    return (
      <TouchableOpacity
        onPress={() => this.handleOnDayMarkPress(startingDay, dateString)}
        style={styles.dayWrapper}
      >
        <View style={styles.mark}>
          <Text style={styles.fromToMark}>
            {
              endDate && startDate
                ? (startingDay ? 'From' : 'To')
                : isInitDateToday ? 'To' : 'From'
            }
          </Text>
          <Text style={styles.dayMark}>
            {day}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderDay = (day, dateString) =>
    <TouchableOpacity
      onPress={() => this.handleOnDayPress(dateString)}
      style={[styles.dayWrapper]}
    >
      <Text style={styles.dayText}>
        {day}
      </Text>
    </TouchableOpacity>

  renderDayComponent = ({ date, state, marking }) => {
    const { dateString, day } = date
    const { startingDay, endingDay } = marking
    if (moment().isBefore(dateString)) {
      return this.renderDayDisabled(day)
    } else if (startingDay || endingDay) {
      return this.renderDayMark(marking, day, dateString)
    } else {
      return this.renderDay(day, dateString)
    }
  }

  render() {
    const { startDate, endDate } = this.state
    return (
      <CalendarList
        calendarHeight={calendarMainHeight}
        markedDates={{
          [startDate]: { startingDay: true },
          [endDate]: { endingDay: true },
          ...this.dateDisabled,
        }}
        theme={{
          'stylesheet.calendar.main': {
            ...styleSheetCalendarMain
          },
          'stylesheet.calendar.header': {
            header: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              alignItems: 'center',
              backgroundColor: '#f6f6f6',
              marginVertical: calendarHeaderMargin,
              borderTopColor: '#e8e8e8',
              borderBottomColor: '#e8e8e8',
              borderTopWidth: 1,
              borderBottomWidth: 1,
            },
            monthText: {
              fontSize: calendarHeaderFontSize,
              fontWeight: 'bold',
              // fontFamily: 'OpenSans',
              color: '#666666',
              margin: calenderTextHeadMargin,
            },
          },
          'stylesheet.calendar-list.main': {
            calendar: {
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
        }}
        dayComponent={this.renderDayComponent}
        hideDayNames
        scrollEnabled
        showScrollIndicator
        pastScrollRange={100}
        futureScrollRange={1}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  dayMark: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  dayWrapperDisable: {
    flex: 1,
    height: calendarDayHeight,
    paddingBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayTextDisable: {
    fontSize: 16,
    textAlign: 'center',
    color: '#cccccc',
  },
  dayWrapper: {
    flex: 1,
    height: calendarDayHeight,
    paddingBottom: 4,
    justifyContent: 'center',
  },
  mark: {
    flex: 1,
    width: 43,
    backgroundColor: '#ff1654',
    borderRadius: 8,
    paddingTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
  },
  fromToMark: {
    color: '#fff',
    position: 'absolute',
    top: 1,
    fontSize: 10
  }
})

export default CalendarScreen