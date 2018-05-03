import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native'
import Swipeout from 'react-native-swipeout'

const styleLeftBtn = {
  backgroundColor: '#6fff72',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}

const styleRightBtn = {
  backgroundColor: '#ff6f76',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}

const leftBtn = [
  {
    component: <TouchableOpacity style={styleLeftBtn}><Text>Keep</Text></TouchableOpacity>
  }
]

const rightBtn = [
  {
    component: <TouchableOpacity style={styleRightBtn}><Text>Delete</Text></TouchableOpacity>
  }
]

export default class SwipeOutItemScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Swipeout style={styles.wrapper} left={leftBtn} right={rightBtn}>
          <View style={styles.content}>
            <Text>Swipe me left</Text>
          </View>
        </Swipeout>
        <Swipeout style={styles.wrapper} left={leftBtn} right={rightBtn}>
          <View style={styles.content}>
            <Text>Swipe me left</Text>
          </View>
        </Swipeout>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#399',
  },
  wrapper: {
    backgroundColor: '#e7e0dd',
  },
  content: {
    height: 40,
    borderColor: '#e7e0dd',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})
