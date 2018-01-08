import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Button, Card, Icon } from 'react-native-elements';
import * as actions from '../actions';

class ReviewScreen extends Component {
  // Dieses Klassen Property namens navigationOptions wird automatisch ausgeführt,
  // sobald die Klasse gerendert wird

  // Konfiguration für den Header der StackNavigation
  // wir holen uns den Prop navigate aus dem Objekt navigation
  static navigationOptions = ({ navigation }) => {
   return {
       title: 'Review Jobs',
       tabBarIcon: ({ tintColor }) => {
     return <Icon name="favorite" size={30} color={tintColor} />;
   },
       headerRight: (
           <Button
             title='Settings'
             onPress={() => navigation.navigate('settings')}
             backgroundColor='rgba(0,0,0,0)'
             color='rgba(0,122,255,1)'
           />
         ),
         style: {
           marginTop: Platform.OS === 'android' ? 24 : 0
         }
       };
   }
   renderLikedJobs() {
     return this.props.likedJobs.map(job => {
       const { company, formattedRelativeTime, url, longitude, latitude, jobtitle, jobkey } = job;
       const initialRegion = {
         longitude,
         latitude,
         longitudeDelta: 0.045,
         latitudeDelta: 0.02
       };
       return (
         <Card  title={jobtitle}>
           <View style={{ height: 200 }}>
             <MapView
               style={{ flex: 1 }}
               cacheEnabled
               scrollEnabled={false}
               initialRegion={initialRegion}

             />
             <View style={styles.detailWrapper}>
               <Text styles={styles.italic}>
                 {company}
               </Text>
               <Text styles={styles.italic}>
                 {formattedRelativeTime}
               </Text>
             </View>
             <Button
               title='Apply Now!'
               backgroundColor='#03A9F4'
               onPress={() => Linking.openURL(url)}
             />
           </View>
         </Card>
       );
     });
   }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
};

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps, actions)(ReviewScreen);
