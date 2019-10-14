import React, { Component } from 'react';
import axios from 'axios';
import yelp from '../../server/api/yelp';
import { googleKey } from '../../secrets';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polyline,
} from 'react-native-maps';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { styles } from '../../Styles/styles';
import haversine from 'haversine';
import PlaceCarousel from './Carousel';
import { getOptions } from '../store/options-reducer';
import { connect } from 'react-redux';
import { startTrip, getCurrentTrip } from '../store/currentTrip';

class StartTrip extends Component {
  constructor() {
    super();
    this.state = {
      location: { latitude: 40.704385, longitude: -74.009806 },
      routeCoordinates: [
        {
          latitude: 40.704385,
          longitude: -74.009806,
        },
      ],
      distanceTravelled: 0,
      prevLatLng: {},
      categories: ['Cafe', 'Restaurant', 'Park', 'Movie', 'Museum'],
      currentTrip: {},
    };
  }
  async componentDidMount() {
    //watch the position of the user
    await navigator.geolocation.watchPosition(position => {
      const { coordinate, routeCoordinates, distanceTravelled } = this.state;
      const { latitude, longitude } = position.coords;

      const newCoordinate = {
        latitude,
        longitude,
      };
      this.setState({
        location: { latitude: latitude, longitude: longitude },
        routeCoordinates: this.state.routeCoordinates.concat([newCoordinate]),
        distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
        prevLatLng: newCoordinate,
      });
    });
  }

  render() {
    return (
      <View>
        <View style={styles.mapcontainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: this.state.location.latitude,
              longitude: this.state.location.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
          >
            {/* {this.state.yelp.length > 0
              ? this.state.yelp.map(business => (
                  <Marker
                    coordinate={business.coordinates}
                    title={business.name}
                    key={business.id}
                  />
                ))
              : null}

            <Polyline
              coordinates={this.state.routeCoordinates}
              strokeWidth={3}
            /> */}
          </MapView>
        </View>

        {this.state.currentTrip.id ? (
          <PlaceCarousel data={this.state.categories} />
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={() =>
                this.props.startTrip(this.props.user.id, this.state.location)
              }
              title="Start a Trip"
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  options: state.options,
  user: state.user,
  currentTrip: state.currentTrip,
});

const mapDispatchToProps = dispatch => ({
  getOptions: (params, location) => dispatch(getOptions()),
  getCurrentTrip: userId => dispatch(getCurrentTrip(userId)),
  startTrip: (userId, location) => dispatch(startTrip(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartTrip);
