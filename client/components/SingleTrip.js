import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  ImageBackground,
  ScrollView,
  Modal,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { styles } from "../../Styles/styles";
import { connect } from "react-redux";
import { getSelectedTrip } from "../store/tripsReducer";
import { restElement } from "@babel/types";
import { DateTime } from "luxon";
import { TripLogMap } from "./TripLogMap";
import Icon from "react-native-vector-icons/FontAwesome";

const format = { month: "long", day: "numeric", year: "numeric" };

export class SingleTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      trip: {},
      modalVisible: false
    };
    this.getNoteOnPlace = this.getNoteOnPlace.bind(this);
    this.getFormattedDate = this.getFormattedDate.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  getNoteOnPlace(placeId) {
    let result = this.props.notes.filter(note => note.placeId === placeId);
    return result;
  }

  getFormattedDate(date) {
    return DateTime.fromISO(date)
      .setLocale("en-US")
      .toLocaleString(format);
  }

  render() {
    let trip = this.props.tripInfo;
    let notes = this.props.notes;

    return (
      <View style={{ marginTop: 80, marginBottom: 50 }}>
        <View>
          <Text style={styles.eventTitle}>{trip.name}</Text>
          <Text style={styles.eventP}>
            {this.getFormattedDate(trip.startDate)}
            {" to "}
            {this.getFormattedDate(trip.endDate)}
          </Text>
          <View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View>
                <TripLogMap
                  style={{ marginTop: 80 }}
                  startLat={trip.startLat}
                  startLong={trip.startLong}
                  places={trip.places}
                />
              </View>
              <TouchableHighlight
                style={{ marginTop: 20 }}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                style={styles.modalClose}
              >
                <Text>Close Map</Text>
              </TouchableHighlight>
            </Modal>

            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Icon.Button
                name="map"
                backgroundColor="#ffffff"
                color="#F277C6"
                onPress={() => {
                  this.setModalVisible(true);
                }}
              >
                Map
              </Icon.Button>
            </TouchableHighlight>
          </View>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={{ alignItems: "center" }}>
              {trip.places &&
                trip.places.map(place => (
                  <View style={styles.tripLogRow} key={place.id}>
                    <Image
                      source={{ uri: place.imageUrl }}
                      style={styles.tripImage}
                    />
                    <View>
                      <Text style={styles.eventTitle}>{place.name}</Text>

                      <Text style={styles.eventP}>
                        Description: {place.description}
                      </Text>
                      <Text style={styles.eventP}>
                        Date: {this.getFormattedDate(place.date)}
                      </Text>
                      <Text style={styles.eventP}>
                        Location: {place.locationAddress}
                      </Text>
                    </View>
                    {notes &&
                      this.getNoteOnPlace(place.id).map(placeNotes => (
                        <View key={place.id + Number(placeNotes)}>
                          {placeNotes.rating === "thumbs up" ? (
                            <Icon style={styles.tripLogIcon} name="thumbs-up" />
                          ) : (
                            <Icon
                              style={styles.tripLogIcon}
                              name="thumbs-down"
                            />
                          )}
                          <Text style={styles.tripLogText}>
                            {placeNotes.notes}
                          </Text>
                        </View>
                      ))}
                  </View>
                ))}

              <Icon.Button
                name="envelope"
                backgroundColor="#ffffff"
                color="#F277C6"
              >
                Share this trip!
              </Icon.Button>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trip: state.trips.selectedTrip
});

const mapDispatchToProps = dispatch => ({
  getTrip: (userId, tripId) => dispatch(getSelectedTrip(userId, tripId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleTrip);
