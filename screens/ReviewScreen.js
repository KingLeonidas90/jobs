import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';

class ReviewScreen extends Component {
  // Dieses Klassen Property namens navigationOptions wird automatisch ausgeführt,
  // sobald die Klasse gerendert wird

  // Konfiguration für den Header der StackNavigation
  // wir holen uns den Prop navigate aus dem Objekt navigation
  static navigationOptions = ({ navigation }) => {
   return {
       title: 'Review Jobs',
       headerRight: (
           <Button
             title='Settings'
             onPress={() => navigation.navigate('settings')}
             // backgroundColor= '#397af8',
             color= 'rgba(0,122,255,1)'
           />
         ),
         style: {
           marginTop: Platform.OS === 'android' ? 24 : 0
         }
       };
   }

  render() {
    return (
      <View>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
      </View>
    );
  }
}

export default ReviewScreen;
