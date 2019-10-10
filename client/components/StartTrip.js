import React, { Component } from 'react';
import axios from 'axios';
import yelp from '../../server/api/yelp';
import { googleKey } from '../../secrets';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { styles } from '../../Styles/styles';
import haversine from 'haversine';

export default class StartTrip extends Component {
  constructor() {
    super();
    this.state = {
      yelp: [],
      google: [],
      latitude: 40.704385,
      longitude: -74.009806,
      selected: '',
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
    this.setState({ yelp: data.businesses });

    const google = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude},${this.state.longitude}&radius=1500&key=${googleKey}`
    );
    this.setState({ google: google.data.results });
  }

  getName = async id => {
    const name = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,rating,formatted_phone_number&key=${googleKey}`
    );
    this.setState({ selected: name.data.result.name });
    return name.data.result.name;
  };

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
            {this.state.yelp.length > 0
              ? this.state.yelp.map(business => (
                  <Marker
                    coordinate={business.coordinates}
                    title={business.name}
                    key={business.id}
                  />
                ))
              : null}
            {this.state.google.length > 0
              ? this.state.google.map(business => (
                  <Marker
                    coordinate={{
                      latitude: business.geometry.location.lat,
                      longitude: business.geometry.location.lng,
                    }}
                    image={require('../../assets/images/marker2.png')}
                    onPress={e => this.getName(business.place_id)}
                    key={business.id}
                  >
                    <Callout>
                      <Text>This is a callout</Text>
                    </Callout>
                  </Marker>
                ))
              : null}
          </MapView>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Start a Trip" />
        </View>
        {this.state.yelp.length ? (
          <View style={styles.container}>
            <FlatList
              data={this.state.yelp}
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
