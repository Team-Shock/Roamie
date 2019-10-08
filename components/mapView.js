import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { styles } from '../Styles/styles';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 40.704385,
      longitude: -74.009806,
    };
  }

  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    // console.log(this.state);
  }

  render() {
    console.log('state:', this.state);
    return (
      <View style={styles.mapcontainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 2,
            longitudeDelta: 1,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
        />
      </View>
    );
  }
}
