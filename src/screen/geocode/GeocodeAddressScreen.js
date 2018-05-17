import React, { Component } from 'react'
import { Alert } from 'react-native'
import { Container, Title, Header, Left, Right, Body, Content, View, Form, Item, Input, Label, Button, Icon, Text } from 'native-base';

const googleAPI = 'https://maps.googleapis.com/maps/api/geocode/json?&address='

export default class GeocodeAddressScreen extends Component {
  state = {
    country: 'United Kingdom',
    zip: 'B1 1DH',
    addressLineFirst: 'Apartment 20',
    addressLineSeccond: 'City Walk Apartments',
    addressLineThird: '',
    town: 'Birmingham',
  }

  getGeocode = () => {
    const { navigation } = this.props
    const {
      country,
      zip,
      addressLineFirst,
      addressLineSeccond,
      addressLineThird,
      town,
    } = this.state
    return fetch(`${googleAPI}${country} ${zip} ${addressLineFirst} ${addressLineSeccond} ${addressLineThird} ${town}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJson', responseJson)
        console.log('responseJson.results[0].geometry', responseJson.results[0].geometry)
        console.log('responseJson.results[0].geometry.location', responseJson.results[0].geometry.location)
        // alert(JSON.stringify(responseJson.results[0].geometry.location))
        Alert.alert(
          'Latitude : Longitude',
          JSON.stringify(responseJson.results[0].geometry.location),
          [
            { text: 'Go to Map', onPress: () => navigation.navigate('MapScreen', { geocodeData: responseJson }) },
            { text: 'Done', onPress: () => console.log('OK Pressed') },
            // { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          ],
          { cancelable: false }
        )
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { navigation } = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => navigation.goBack()} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Get Geocode</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form style={{ backgroundColor: '#fff' }}>
            <Item floatingLabel last>
              <Label>Country</Label>
              <Input
                onChangeText={(country) => this.setState({ country })}
                value={this.state.country}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Zip / PostCode</Label>
              <Input
                onChangeText={(zip) => this.setState({ zip })}
                value={this.state.zip}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Address 1</Label>
              <Input
                onChangeText={(addressLineFirst) => this.setState({ addressLineFirst })}
                value={this.state.addressLineFirst}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Address 2</Label>
              <Input
                onChangeText={(addressLineSeccond) => this.setState({ addressLineSeccond })}
                value={this.state.addressLineSeccond}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Address 3</Label>
              <Input
                onChangeText={(addressLineThird) => this.setState({ addressLineThird })}
                value={this.state.addressLineThird}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Town</Label>
              <Input
                onChangeText={(town) => this.setState({ town })}
                value={this.state.town}
              />
            </Item>
          </Form>
          <View style={{ alignSelf: 'center', marginTop: 20 }}>
            <Button iconLeft onPress={this.getGeocode}>
              <Text>OK</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}
