import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { styles } from '../Styles/styles';

export default class Map extends Component {
  render() {
    return (
      <View style={styles.mapcontainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          // region={{
          //   latitude: 42.882004,
          //   longitude: 74.582748,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
          showsUserLocation={true}
        />
      </View>
    );
  }
}
