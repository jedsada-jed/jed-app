import { StackNavigator } from 'react-navigation'
import {
  MapScreen,
  HomeScreen,
  SwipeableItemScreen,
  SwipeOutItemScreen,
  CalendarScreen,
} from './screen'


const root =  StackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    MapScreen: { screen: MapScreen },
    SwipeableItemScreen: { screen: SwipeableItemScreen },
    SwipeOutItemScreen: { screen: SwipeOutItemScreen },
    CalendarScreen: { screen: CalendarScreen },
  },
  {
    initialRouteName: 'HomeScreen',
  },
)

export default root