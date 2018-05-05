import React, { Component } from 'react'
import moment from 'moment'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import styles, {
  cDayHeight,
  cTextHeadMargin,
  cHeaderMargin,
  cHeaderFontSize,
  cMainHeight,
  cBodyPaddingHorizontal,
} from './styles'


const styleSheetCalendarMain = {
  container: {
    flex: 1,
  },
  monthView: {
    flex: 1,
  },
  dayContainer: {
    height: cDayHeight,
    flex: 1,
  },
  week: {
    flex: 1,
    paddingHorizontal: cBodyPaddingHorizontal,
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

  renderDayName = dayNames =>
    <View style={styles.weekDayName}>
      {
        dayNames.map((dayName, index) => {
          return (
            <View key={index} style={styles.dayName}>
              <Text>{dayName}</Text>
            </View>
          )
        })
      }
    </View>

  render() {
    const { startDate, endDate } = this.state
    return (
      <View style={{ flex: 1 }}>
        {this.renderDayName(['S', 'M', 'T', 'W', 'T', 'F', 'S'])}
        <CalendarList
          calendarHeight={cMainHeight}
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
                marginVertical: cHeaderMargin,
                borderTopColor: '#e8e8e8',
                borderBottomColor: '#e8e8e8',
                borderTopWidth: 1,
                borderBottomWidth: 1,
              },
              monthText: {
                fontSize: cHeaderFontSize,
                fontWeight: 'bold',
                // fontFamily: 'OpenSans',
                color: '#666666',
                margin: cTextHeadMargin,
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
      </View>
    )
  }
}

export default CalendarScreen
