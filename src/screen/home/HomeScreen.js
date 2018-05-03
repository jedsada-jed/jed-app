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
    return (
      <View style={styles.container}>
        <Button onPress={() => this.props.navigation.navigate('MapScreen')} title={'Map'} />
        <Button onPress={() => this.props.navigation.navigate('SwipeOutItemScreen')} title={'SwipeoutItem'} />
        <Button onPress={() => this.props.navigation.navigate('SwipeableItemScreen')} title={'SwipeableItem'} />
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
