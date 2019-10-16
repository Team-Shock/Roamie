import * as WebBrowser from "expo-web-browser";
import React, { Component } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Button
} from "react-native";
import { styles } from "../../Styles/styles";
import { SingleTrip } from "./SingleTrip";
import { connect } from "react-redux";
import { getSelectedTrip, getSelectedTripNotes } from "../store/tripsReducer";

class Trips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleTripSelected: false,
      selectedTripId: 0
    };
    this.onBackButton = this.onBackButton.bind(this);
    this.onTripPress = this.onTripPress.bind(this);
  }
  componentDidMount() {
    if (this.state.selectedTripId !== 0) {
      this.props.getTrip(this.props.user.id, this.state.selectedTripId);
    }
  }

  onTripPress(tripId) {
    this.setState({ singleTripSelected: true, selectedTripId: tripId });
    this.props.getTrip(this.props.user.id, tripId);
    this.props.getNotes(tripId);
  }

  onBackButton() {
    this.setState({ singleTripSelected: false });
  }
  render() {
    const trips = this.props.trips;

    return (
      <View>
        {!this.state.singleTripSelected ? (
          <View>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
              {!trips || trips.length <= 0 ? (
                <View>
                  <Text>
                    No Trips in your account. Go to 'Current Trip' to start your
                    trip with Roamie today!
                  </Text>
                </View>
              ) : (
                <View>
                  {trips &&
                    trips.map(trip => (
                      <View style={styles.tripLogRow} key={trip.id}>
                        <Image
                          source={{ uri: trip.imageUrl }}
                          style={styles.listImage}
                        />
                        <View>
                          <Text style={styles.eventTitle}>{trip.name}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                          <Button
                            title="View"
                            onPress={() => this.onTripPress(trip.id)}
                          />
                        </View>
                      </View>
                    ))}
                </View>
              )}
            </ScrollView>
          </View>
        ) : (
          <View>
            {this.props.selectedTrip ? (
              <SingleTrip
                tripInfo={this.props.selectedTrip}
                notes={this.props.notes}
              />
            ) : (
              <View></View>
            )}
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                title="See All Trips"
                onPress={() => this.onBackButton()}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

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
)(Trips);
