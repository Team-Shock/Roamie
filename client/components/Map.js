import React, { Component } from 'react';
// import axios from 'axios';
import yelp from '../../server/api/yelp';
// import { googleKey } from '../../secrets';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { View } from 'react-native';
import { styles } from '../../Styles/styles';
import haversine from 'haversine';

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      yelp: [],
      google: [],
      latitude: 40.704385,
      longitude: -74.009806,
      routeCoordinates: [
        {
          latitude: 40.704385,
          longitude: -74.009806,
        },
      ],
      distanceTravelled: 0,
      prevLatLng: {},
    };
    this.getName = this.getName.bind(this);
  }
  async componentDidMount() {
    let businessList = [];
    //watch the position of the user
    await navigator.geolocation.watchPosition(position => {
      const { coordinate, routeCoordinates, distanceTravelled } = this.state;
      const { latitude, longitude } = position.coords;

      const newCoordinate = {
        latitude,
        longitude,
      };
      // coordinate.timing(newCoordinate).start();
      this.setState({
        latitude: latitude,
        longitude: longitude,
        routeCoordinates: this.state.routeCoordinates.concat([newCoordinate]),
        distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
        prevLatLng: newCoordinate,
      });
    });
    //pull POI based on user's current location
    const { data } = await yelp.get('/search', {
      params: {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      },
    });

    this.setState({ yelp: data.businesses });
  }

  //distance calculator for a trip
  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    return (
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

          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={3} />
        </MapView>
      </View>
    );
  }
}
