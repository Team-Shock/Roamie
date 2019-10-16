import React, { Component } from 'react';
// import axios from 'axios';
// import yelp from '../../server/api/yelp';
// import { googleKey } from '../../secrets';
// import MapView, {
//   PROVIDER_GOOGLE,
//   Marker,
//   Callout,
//   Polyline,
// } from 'react-native-maps';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { styles } from '../../Styles/styles';
// import haversine from 'haversine';
import PlaceCarousel from './Carousel';
// import { getOptions } from '../store/optionsReducer';
import { connect } from 'react-redux';
import { startTrip, getCurrentTrip } from '../store/currentTrip';
import defaultCategories from '../../utils/defaultCategories';
import Map from './Map';
import { TripLogMap } from './TripLogMap';

class StartTrip extends Component {
  constructor() {
    super();
    this.state = {
      location: { latitude: 40.704385, longitude: -74.009806 },
    };
  }


  render() {
    console.log("Current Trip ", this.props.currentTrip)
    return (
      <View>
        {this.props.currentTrip.id ? (
          <View>
            <TripLogMap startLat={this.props.currentTrip.startLat} startLong={this.props.currentTrip.startLong} places={this.props.currentTrip.places}/>
            <View>
              <PlaceCarousel
                    data={defaultCategories}
                    location={this.state.location}
              />
            </View>
          </View>
        ) : (
          <View>
            <TripLogMap startLat={this.state.location.latitude} startLong={this.state.location.longitude}/>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                onPress={() =>
                  this.props.startTrip(this.props.user.id, this.state.location)
                }
                title="Start a Trip"
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  options: state.options.options,
  user: state.user,
  currentTrip: state.currentTrip,
});

const mapDispatchToProps = dispatch => ({
  getCurrentTrip: userId => dispatch(getCurrentTrip(userId)),
  startTrip: (userId, location) => dispatch(startTrip(userId, location)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartTrip);
