import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
// Das Provider tag ist eine RN Komponente, die den Redux Store als Prop akzep.
import { Provider } from 'react-redux';
import { Permissions, Notifications } from 'expo'
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './store';
import registerForNotifications from './services/push_notifications';
// import store from './store'
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
  componentDidMount() {
    // Rufe die push_notifications funktion auf und überprüfe ob der nutzer
    // bereits zugestimmt hat
    registerForNotifications();
    // DIese Callback Funktion wird immer ausgelöst, sobald der user eine Notification
    // erhält
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
      // ist das selbe wie : const text = notification.data.text
      Alert.alert(
        // title
        'New Push Notification',
        // das text property kommt von dem notification objekt
        text,
        [{ text: 'Ok.' }]

      );
        }
    });
  }

  render() {
    const { persistor, store } = configureStore();
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
          labelStyle: { fontSize: 12 },
          showIcon: true,
          iconStyle: { width: 30 }

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
         <PersistGate persistor={persistor}>
        {/* Eventuell geht so die leere stelle der unsichtbaren tabbar weg */}
        {/* <View style={styles.container}> */}
          <MainNavigator />
        {/* </View> */}
      </PersistGate>
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
