import React, { Component } from 'react';
// import axios from 'axios';
import yelp from '../../server/api/yelp';
// import { googleKey } from '../../secrets';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { View } from 'react-native';
import { styles } from '../../Styles/styles';
import haversine from 'haversine';
import { connect } from 'react-redux';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      location: { latitude: 40.704385, longitude: -74.009806 },
      routeCoordinates: [
        {
          latitude: 40.7506,
          longitude: -73.9935,
        },
      ],
      distanceTravelled: 0,
      prevLatLng: {},
      currentTrip: {},
      errorMessage: '',
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
        latitude: latitude,
        longitude: longitude,
        routeCoordinates: this.state.routeCoordinates.concat([newCoordinate]),
        distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
        prevLatLng: newCoordinate,
      });
    });
  }
  //distance calculator for a trip
  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    console.log(
      'OPTIONS PROPS IN MAP COMPONENT:',
      this.props.options.businesses
    );
    console.log('LAT/LONG STATE IN MAP COMPONENT:', this.state.location);
    console.log('ROUTE STATE IN MAP COMPONENT:', this.state.routeCoordinates);
    return (
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
          {this.props.options.businesses
            ? this.props.options.businesses.map(business => (
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

const mapStateToProps = state => ({
  options: state.options.options,
  user: state.user,
  currentTrip: state.currentTrip,
});

// const mapDispatchToProps = dispatch => ({
//   getCurrentTrip: userId => dispatch(getCurrentTrip(userId)),
//   startTrip: (userId, location) => dispatch(startTrip(userId, location)),
// });

export default connect(
  mapStateToProps
  //   mapDispatchToProps
)(Map);
