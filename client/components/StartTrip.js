import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { styles } from '../../Styles/styles';
import PlaceCarousel from './Carousel';
import { connect } from 'react-redux';
import { startTrip, getCurrentTrip } from '../store/currentTrip';
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
  }

  render() {
    return (
      <View>
        {this.props.currentTrip.id ? (
          <View>
            <Map
              currentTrip={this.props.currentTrip}
              location={this.props.currentLatLong}
            />
            <View>
              <PlaceCarousel
                data={defaultCategories}
                location={this.props.currentLatLong}
              />
            </View>
          </View>
        ) : (
          <View>
            <Map location={this.state.location} />
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
  // options: state.options.options,
  user: state.user,
  currentTrip: state.currentTrip.trip,
  currentLatLong: state.currentTrip.currentLatLong,
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
