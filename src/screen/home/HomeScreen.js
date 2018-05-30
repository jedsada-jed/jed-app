import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'

export default class HomeScreen extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Button onPress={() => navigation.navigate('MapScreen')} title={'Map'} />
        <Button onPress={() => navigation.navigate('SwipeOutItemScreen')} title={'SwipeoutItem'} />
        <Button onPress={() => navigation.navigate('SwipeableItemScreen')} title={'SwipeableItem'} />
        <Button onPress={() => navigation.navigate('CalendarScreen')} title={'Calendar'} />
        <Button onPress={() => navigation.navigate('LazyLoadScreen')} title={'LazyLoad'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
