import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { styles } from "../Styles/styles";

export default class StartTrip extends Component {
  render() {
    let placeholderMap = {
      uri:
        "https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg"
    };
    return (
      <View>
        <Image source={placeholderMap} style={styles.mapcontainer} />
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Start a Trip" />
        </View>
        {/* this is a good place for a list */}
      </View>
    );
  }
}
