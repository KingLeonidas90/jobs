import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

// für einen einzlenen Import einer action
// import { facebookLogin } from '../actions';
import * as actions from '../actions';

class AuthScreen extends Component {
  // sobald die Komponente gerendert wird auf den Screen
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
    AsyncStorage.removeItem('fb_token');
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      props.navigation.navigate('map');
    }
  }
  render() {
    return (
      <View />
    );
  }
}
// der Token wird aus dem reducer geholt und als prop umgewandelt aus dem vorherigen
// State
function mapStateToProps({ auth }) {
    return { token: auth.token };
}


export default connect(mapStateToProps, actions)(AuthScreen);
