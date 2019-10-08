import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Styles/styles";
import StartTrip from "../components/StartTrip";

export default class CurrentTripScreen extends Component {
  render() {
    return (
      <View style={styles.loginContainer}>
        <StartTrip />
      </View>
    );
  }
}
CurrentTripScreen.navigationOptions = {
  title: "Current Trip"
};
