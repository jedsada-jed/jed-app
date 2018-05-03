import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native'
import Swipeable from 'react-native-swipeable'

const leftContent = <Text>Pull to activate</Text>;

const rightButtons = [
  <TouchableOpacity><Text>Button 1</Text></TouchableOpacity>,
  <TouchableOpacity><Text>Button 2</Text></TouchableOpacity>
];


export default class SwipeableItemScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Swipeable style={{backgroundColor: '#fff'}} leftContent={leftContent} rightButtons={rightButtons}>
          <Text>My swipeable content</Text>
        </Swipeable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
})
