import React, { Component } from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polyline,
} from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { styles } from '../../Styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

export class TripLogMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      routeCoordinates: [],
    };
    this.addRoute = this.addRoute.bind(this);
  }

  addRoute(latitude, longitude) {
    const newCoordinate = {
      latitude: latitude,
      longitude: longitude,
    };

    this.setState({
      routeCoordinates: [...this.state.routeCoordinates, newCoordinate],
    });
  }

  async componentDidMount() {
    if (this.props.places && this.props.places.length > 0) {
      let places = this.props.places;
      for (let i = 0; i < places.length; i++) {
        await this.addRoute(places[i].locationLat, places[i].locationLong);
      }
    }
  }

  render() {
    let startLatitude = this.props.startLat;
    let startLongitude = this.props.startLong;

    return (
      <View>
        {startLatitude ? (
          <View style={styles.mapcontainer}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: startLatitude,
                longitude: startLongitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              showsUserLocation={true}
              followsUserLocation={true}
              showsMyLocationButton={true}
              zoomEnabled={true}
            >
              {this.props.places
                ? this.props.places.map(place => {
                    return (
                      <Marker
                        key={place.uniqueId}
                        coordinate={{
                          latitude: place.locationLat,
                          longitude: place.locationLong,
                        }}
                        title={place.name}
                        image={require('../../assets/images/marker2.png')}
                      />
                    );
                  })
                : null}
              <Polyline
                coordinates={this.state.routeCoordinates}
                strokeWidth={3}
              />
            </MapView>
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  options: state.currentTrip.options,
  user: state.user,
  currentTrip: state.currentTrip.trip,
});

export default connect(mapStateToProps)(Map);
