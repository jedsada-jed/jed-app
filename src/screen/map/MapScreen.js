import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'
import { Container, Header, Left, Button, Icon, Body, Title, Right, Content } from 'native-base'
import MapView, { Marker } from 'react-native-maps'

export default class MapScreen extends Component {
  regionFrom = (lat, lon, distance) => {
    distance = distance / 2
    const circumference = 40075 // The circumference of the Earth is 40,075 km.
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000
    const angularDistance = distance / circumference

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
    const longitudeDelta = Math.abs(Math.atan2(
      Math.sin(angularDistance) * Math.cos(lat),
      Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))
    return result = {
      latitude: lat,
      longitude: lon,
      latitudeDelta,
      longitudeDelta,
    }
  }

  render() {
    const { navigation } = this.props
    let latitude
    let longitude
    if (navigation.state.params) {
      latitude = navigation.state.params.geocodeData.results[0].geometry.location.lat
      longitude = navigation.state.params.geocodeData.results[0].geometry.location.lng
    } else {
      latitude = 13.742239
      longitude = 100.561626
    }
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => navigation.goBack()} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Map</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={this.regionFrom(latitude, longitude, 100)}
          >
            {navigation.state.params &&
              <Marker
                coordinate={{
                  latitude,
                  longitude,
                }}>
                <View style={{ height: 88 }}>
                  <Image style={{ width: 44, height: 44 }} source={require('../../asset/pinmap.png')} />
                </View>
              </Marker>}
          </MapView>
        </View>
      </Container>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})
