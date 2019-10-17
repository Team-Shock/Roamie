import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  Modal,
  TouchableHighlight,
  Share
} from "react-native";
import { styles } from "../../Styles/styles";
import { connect } from "react-redux";
import { getSelectedTrip } from "../store/tripsReducer";
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
    this.onShare = this.onShare.bind(this);
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
  async onShare() {
    let tripInfo = `${this.props.tripInfo.name}` + "\n";
    tripInfo +=
      `${this.getFormattedDate(this.props.tripInfo.startDate)}` +
      " to " +
      `${this.getFormattedDate(this.props.tripInfo.endDate)}` +
      "\n";
    for (let i = 0; i < this.props.tripInfo.places.length; i++) {
      tripInfo += "➡" + "\n";
      tripInfo += `${this.props.tripInfo.places[i].name}` + "\n";

      this.getNoteOnPlace(this.props.tripInfo.places[i].id).map(placeNotes => {
        tripInfo += placeNotes.rating + "\n";
        tripInfo += placeNotes.notes + "\n";
      });
    }

    Share.share({
      subject: `${this.props.tripInfo.name}`,
      title: `${this.props.tripInfo.name}`,
      message: `${tripInfo}`,
      url: `${this.props.tripInfo.imageUrl}`
    });
  }
  render() {
    let trip = this.props.tripInfo;
    let notes = this.props.notes;

    return (
      <View style={{ marginTop: 60, marginBottom: 50 }}>
        <View>
          <Text style={styles.eventTitle}>{trip.name}</Text>
          <Text style={styles.eventP}>
            {this.getFormattedDate(trip.startDate)}
            {" to "}
            {this.getFormattedDate(trip.endDate)}
          </Text>
          <View style={{ alignItems: "center" }}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={{ marginTop: 80 }}>
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

            <Icon.Button
              name="map"
              backgroundColor="#ffffff"
              color="#F277C6"
              onPress={() => {
                this.setModalVisible(true);
              }}
              style={{ textAlign: "center" }}
            >
              Map
            </Icon.Button>
          </View>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={{ alignItems: "center" }}>
              {trip.places &&
                trip.places.map(place => (
                  <View style={styles.tripLogRow} key={place.id}>
                    <ImageBackground
                      source={{ uri: place.imageUrl }}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <View style={styles.tripLogTextContainer}>
                        <Text style={styles.eventTitle}>{place.name}</Text>

                        <Text style={styles.tripLogText}>
                          Description: {place.description}
                        </Text>
                        <Text style={styles.tripLogText}>
                          Date: {this.getFormattedDate(place.date)}
                        </Text>
                        <Text style={styles.tripLogText}>
                          Location: {place.locationAddress}
                        </Text>
                      </View>

                      {notes &&
                        this.getNoteOnPlace(place.id).map(placeNotes => (
                          <View
                            style={{ backgroundColor: "#ffffff" }}
                            key={place.id + Number(placeNotes)}
                          >
                            {placeNotes.rating === "thumbs up" ? (
                              <Icon
                                style={styles.tripLogIcon}
                                name="thumbs-up"
                              />
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
                    </ImageBackground>
                  </View>
                ))}

              <Icon.Button
                name="envelope"
                backgroundColor="#ffffff"
                color="#F277C6"
                onPress={this.onShare}
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
