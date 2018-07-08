import { StackNavigator } from 'react-navigation'
import {
  MapScreen,
  HomeScreen,
  SwipeableItemScreen,
  SwipeOutItemScreen,
  CalendarScreen,
  LazyLoadScreen,
  GeocodeAddressScreen,
} from './screen'

const root = StackNavigator(
  {
    HomeScreen: { screen: HomeScreen, navigationOptions: { header: null } },
    MapScreen: { screen: MapScreen, navigationOptions: { header: null } },
    SwipeableItemScreen: { screen: SwipeableItemScreen },
    SwipeOutItemScreen: { screen: SwipeOutItemScreen },
    CalendarScreen: { screen: CalendarScreen },
    LazyLoadScreen: { screen: LazyLoadScreen },
    GeocodeAddressScreen: { screen: GeocodeAddressScreen, navigationOptions: { header: null } },
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'screen',
  }
)

export default root