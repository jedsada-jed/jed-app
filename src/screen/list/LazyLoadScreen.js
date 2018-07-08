//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

// create a component
class LazyLoadScreen extends Component {
  state = {
    isLoading: false,
    dataSource: [],
    count: 1,
    isLastPage: false,
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.getMovie(0)
  }

  onRefresh = () => {
    // clear
    this.setState({ dataSource: [], count: 1, isLastPage: false, isLoading: false },
      () => this.getMovie()
    )
  }

  getMovie = (offset = 0) => {
    const { dataSource, count, isLastPage } = this.state
    console.log('call API', count)
    if (!isLastPage) {
      return fetch(`https://facebook.github.io/react-native/movies.json?fakeLimit=20&fakeOffset=${offset}`)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('call')
          this.setState({
            isLoading: false,
            count: count + 1,
          }, () => {
            if (count > 8) {
              this.setState({
                dataSource: [...dataSource, ...[]],
                isLastPage: true, // fake data is empty list
              })
            } else {
              this.setState({
                dataSource: [...dataSource, ...responseJson.movies]
              })
            }
          })
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    const { dataSource, isLoading } = this.state
    return (
      <View style={styles.container}>
        <FlatList
          data={dataSource}
          onRefresh={this.onRefresh}
          refreshing={isLoading}
          onEndReachedThreshold={0.7}
          onEndReached={() => this.getMovie(0, true)}
          renderItem={({ item }) => <Text>{item.title}</Text>}
        />
      </View>
    )
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FFF',
  },
})

//make this component available to the app
export default LazyLoadScreen
