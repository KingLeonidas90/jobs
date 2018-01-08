import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

// Die Liste der jobs liegt in dem reducer piece of state called jobs (index.js reducers)
class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => {
  return <Icon name="description" size={30} color={tintColor} />;
}
  }
  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      longitudeDelta: 0.045,
      latitudeDelta: 0.02
    };

  return (
    <Card title={job.jobtitle}>
      {/* Damit die karte nicht grösser wird als 300 pixel */}
      <View style={{ height: 300 }}>
        <MapView
          // sorgt dafür, dass der User nicht mehr scrollen kann in der Karte
          scrollEnabled={false}
          style={{ flex: 1 }}
          // Dadurch wird die Karte als Bild gerendert und ist nicht mehr als karte
          // benutzbar
           cacheEnabled//={Plaftform.OS === 'android' ? true : false}
          initialRegion={initialRegion}
        >

        </MapView>
      </View>
      <View style={styles.detailWrapper}>
        <Text>
          {job.company}
        </Text>
        <Text>
          {job.formattedRelativeTime}
        </Text>
      </View>
      <Text>
        {job.snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}
      </Text>
    </Card>
  );
}

renderNoMoreCards = () => {
  return (
    <Card title='No more Cards!'>
      <Button
        title='Back to Map'
        large
        icon={{ name: 'my-location' }}
        backgroundColor='#03A9F4'
        onPress={() => this.props.navigation.navigate('map')}
      />
    </Card>
  );
}

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          keyProp='jobkey'
          onSwipeRight={job => this.props.likeJob(job)}
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
};

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);
