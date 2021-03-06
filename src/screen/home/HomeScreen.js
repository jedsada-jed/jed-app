import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native'
import { Container, Header, Left, Button, Icon, Body, Title, Right, Content, Text } from 'native-base'

export default class HomeScreen extends Component {
  render() {
    const { navigation } = this.props
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.container}>
          <Button primary style={styles.btn} block onPress={() => navigation.navigate('MapScreen')}><Text>Map</Text></Button>
          <Button primary style={styles.btn} block onPress={() => navigation.navigate('GeocodeAddressScreen')}><Text>GeocodeAddress</Text></Button>
          <Button primary style={styles.btn} block onPress={() => navigation.navigate('SwipeOutItemScreen')}><Text>SwipeoutItem</Text></Button>
          <Button primary style={styles.btn} block onPress={() => navigation.navigate('SwipeableItemScreen')}><Text>SwipeableItem</Text></Button>
          <Button primary style={styles.btn} block onPress={() => navigation.navigate('CalendarScreen')}><Text>Calendar</Text></Button>
          <Button primary style={styles.btn} block onPress={() => navigation.navigate('LazyLoadScreen')}><Text>LazyLoad</Text></Button>
        </View>
      </Container>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 10,
  },
  btn: {
    marginTop: 10,
  }
})
