import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SettingsScreen extends Component {
  // static navigationOptions = {
  //   header: {
  //     style: {
  //       marginTop: Platform.OS === 'android' ? 35 : 0
  //     }
  //   }
  // }
  render() {
    return (
      <View>
        <Button
          title='Reset liked Jobs'
          large
          icon={{ name: 'delete-forever' }}
          backgroundColor='#f44336'
          onPress={this.props.clearLikedJobs}
        />
      </View>
    );
  }
}

export default connect(null, actions)(SettingsScreen);
