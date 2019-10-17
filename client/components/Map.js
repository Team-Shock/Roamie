import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { View } from 'react-native';
import { styles } from '../../Styles/styles';
import { connect } from 'react-redux';

class Map extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <View style={styles.mapcontainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude,
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

          {this.props.currentTrip.places
            ? this.props.currentTrip.places.map(place => {
                return (
                  <Marker
                    key={place.uniqueId}
                    coordinate={{
                      latitude: place.locationLat,
                      longitude: place.locationLong,
                    }}
                    title={place.name}
                    // description={marker.subtitle}
                    image={require('../../assets/images/marker2.png')}
                  />
                );
              })
            : null}

          <Polyline coordinates={this.props.route} strokeWidth={2} />
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  options: state.currentTrip.options,
  user: state.user,
  currentTrip: state.currentTrip.trip,
  route: state.currentTrip.route,
});

// const mapDispatchToProps = dispatch => ({
//   getCurrentTrip: userId => dispatch(getCurrentTrip(userId)),
//   startTrip: (userId, location) => dispatch(startTrip(userId, location)),
// });

export default connect(
  mapStateToProps
  //   mapDispatchToProps
)(Map);
