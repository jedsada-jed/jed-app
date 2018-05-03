import { StackNavigator } from 'react-navigation'
import {
  MapScreen,
  HomeScreen,
  SwipeableItemScreen,
  SwipeOutItemScreen,
} from './screen'


const root =  StackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    MapScreen: { screen: MapScreen },
    SwipeableItemScreen: { screen: SwipeableItemScreen },
    SwipeOutItemScreen: { screen: SwipeOutItemScreen },
  },
  {
    initialRouteName: 'HomeScreen',
  },
)

export default root