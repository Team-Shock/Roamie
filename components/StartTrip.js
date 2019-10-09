import React, { Component } from 'react';
import axios from 'axios';
import yelp from '../server/api/yelp';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { styles } from '../Styles/styles';
import Map from './mapView';

export default class StartTrip extends Component {
  constructor() {
    super();
    this.state = {
      businesses: [],
      latitude: 40.704385,
      longitude: -74.009806,
    };
  }
  async componentDidMount() {
    const { data } = await yelp.get('/search', {
      params: {
        term: 'tacos',
        location: 'san francisco, ca',
      },
    });
    this.setState({ businesses: data.businesses });
    // console.log(this.state.businesses[0]);
    await navigator.geolocation.watchPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }
  x;

  render() {
    console.log('state:', this.state);
    return (
      <View>
        <View style={styles.mapcontainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Start a Trip" />
        </View>
        {this.state.businesses.length ? (
          <View style={styles.container}>
            <FlatList
              data={this.state.businesses}
              renderItem={({ item }) => (
                <Text style={styles.eventTitle}>{item.name}</Text>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        ) : (
          <View>
            <Text>Nothing To See Here</Text>
          </View>
        )}
      </View>
    );
  }
}
