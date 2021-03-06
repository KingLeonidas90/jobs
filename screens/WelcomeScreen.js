import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  // init State
  // immer wenn man einen Wert am anfang nicht kennt, der später true oder false
  // wird, verwendet man null als zwischenebene
  state = { token: null }
  async componentWillMount() {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    this.props.navigation.navigate('map');
    this.setState({ token });
  } else {
    this.setState({ token: false });
  }
  }

  onSlidesComplete = () => {
    // Immer wenn man React Navigation verwendet, werden bestimmt props
    // automatisch für die jeweiligen Klassen zur Verfügung gestellt sofern man
    // in der main den jeweiligen Screen als screen angibt bzw bindet
    this.props.navigation.navigate('auth');
  }
  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return (
      <View>
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      </View>
    );
  }
}

export default WelcomeScreen;
