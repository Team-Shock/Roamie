import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { styles } from '../../Styles/styles';
import PlaceCarousel from './Carousel';
import { connect } from 'react-redux';
import { startTrip, getCurrentTrip } from '../store/currentTrip';
import FeedbackForm from './FeedbackForm';
import defaultCategories from '../../utils/defaultCategories';
import Map from './Map';
import { TripLogMap } from './TripLogMap';

console.disableYellowBox = true;

class StartTrip extends Component {
  constructor() {
    super();
    this.state = {
      location: { latitude: 40.704385, longitude: -74.009806 },
    };
    this.tripStatus = this.tripStatus.bind(this);
    this.tripSwitch = this.tripSwitch.bind(this);
  }

  tripStatus() {
    if (this.props.currentTrip.id && !this.props.inTransit) {
      return 'select-next-activity';
    } else if (this.props.currentTrip.id && this.props.inTransit) {
      return 'traveling-to-place';
    } else {
      return null;
    }
  }

  tripSwitch(status) {
    switch (status) {
      case 'select-next-activity':
        return (
          <View>
            <PlaceCarousel
              data={defaultCategories}
              location={this.props.currentLatLong}
            />
          </View>
        );
      case 'traveling-to-place':
        return (
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.loginHeader}>
              You are traveling to {this.props.currentPlace.name}
            </Text>
            <FeedbackForm item={this.props.currentPlace} />
          </View>
        );
      default:
        return (
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={() =>
                this.props.startTrip(this.props.user.id, this.state.location)
              }
              title="Start a Trip"
            />
          </View>
        );
    }
  }

  render() {
    console.log(
      'START TRIP COMPONENT CURRENT TRIP PROP',
      this.props.currentTrip
    );
    return (
      <View>
        <Map
          location={this.props.currentLatLong}
          currentTrip={this.props.currentTrip}
        />
        {this.tripSwitch(this.tripStatus())}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  // options: state.options.options,
  user: state.user,
  currentTrip: state.currentTrip.trip,
  currentLatLong: state.currentTrip.currentLatLong,
  inTransit: state.currentTrip.inTransit,
  currentPlace: state.currentTrip.currentPlace,
});

const mapDispatchToProps = dispatch => ({
  getCurrentTrip: userId => dispatch(getCurrentTrip(userId)),
  //creates a trip instance and adds it to redux state as current trip
  startTrip: (userId, location) => dispatch(startTrip(userId, location)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartTrip);
