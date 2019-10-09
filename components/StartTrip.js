import React, { Component } from 'react';
import axios from 'axios';
import yelp from '../server/api/yelp';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { styles } from '../Styles/styles';
import haversine from 'haversine';

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
    await navigator.geolocation.watchPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    const { data } = await yelp.get('/search', {
      params: {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      },
    });
    this.setState({ businesses: data.businesses });
  }

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
          >
            {this.state.businesses.length > 0
              ? this.state.businesses.map(business => (
                  <Marker
                    coordinate={business.coordinates}
                    title={business.name}
                    key={business.id}
                  />
                ))
              : null}
          </MapView>
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
