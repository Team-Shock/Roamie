import React, { Component } from "react";
import {
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { connect } from "react-redux";
import SingleTrip from "./SingleTrip";
import { getSelectedTrip, getSelectedTripNotes } from "../store/tripsReducer";

const { width: screenWidth } = Dimensions.get("window");

class TripsCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleTripSelected: false,
      selectedTripId: null
    };
    this.onBackButton = this.onBackButton.bind(this);

    this.renderTrips = this.renderTrips.bind(this);
  }

  onBackButton() {
    this.setState({ singleTripSelected: false });
  }

  renderTrips(trip) {
    const tripItem = trip.item;
    return (
      <View style={styles.item}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {tripItem.name}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={this.setState({
            selectedTrip: true,
            selectedTripId: tripItem.id
          })}
        >
          <Image
            source={{ uri: tripItem.imageUrl }}
            containerStyle={styles.imageContainer}
            style={styles.image}
          />
        </TouchableOpacity>
        <SingleTrip tripInfo={tripItem} />
      </View>
    );
  }

  render() {
    return (
      <View>
        <View>
          <Carousel
            layout={"default"}
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 60}
            data={this.props.data}
            renderItem={this.renderTrips}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: 400,
    borderRadius: 15
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover"
  },
  imageContainer: {
    flex: 1,
    width: screenWidth - 60,
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden"
  },

  title: {
    fontSize: 18,
    textAlign: "center",
    margin: 10
  },
  textContainer: {
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.6)"
  }
});

const mapStateToProps = state => ({
  user: state.user,
  trips: state.user.trips,
  selectedTrip: state.trips.selectedTrip,
  notes: state.trips.selectedTripNotes
});

const mapDispatchToProps = dispatch => ({
  getTrip: (userId, tripId) => dispatch(getSelectedTrip(userId, tripId)),
  getNotes: tripId => dispatch(getSelectedTripNotes(tripId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsCarousel);
