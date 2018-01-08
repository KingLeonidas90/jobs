import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator} from 'react-navigation';
// Das Provider tag ist eine RN Komponente, die den Redux Store als Prop akzep.
import { Provider } from 'react-redux';

import store from './store'
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
  render() {
    // wir erstellen einen neuen TabNavigator durch die jeweilige Konfiguration
    // die übergeben wird
    const MainNavigator = TabNavigator({
      // welcome ist unser key, er stellt den router für den welcomeScreen
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }

      }, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
          labelStyle: { fontSize: 12 }
        }
      })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      // durch false kann man nicht mehr durchs swipen durch die jeweiligen Tabs switchen
      swipeEnabled: false,
      // Each screen will not mount/load until user clicks on them
    lazy: true,
    animationEnabled: false,
    tabBarPosition: 'bottom',
    // // tabBarOptions: {
    // //   showIcon: true,
    // //         iconStyle: {
    // //           width: 30,
    // //           height: 30 }
    // }
    });

    return (
      <Provider store={store}>
        {/* Eventuell geht so die leere stelle der unsichtbaren tabbar weg */}
        {/* <View style={styles.container}> */}
          <MainNavigator />
        {/* </View> */}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
