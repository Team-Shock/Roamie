import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Styles/styles";
import Settings from "../components/Settings";

export default class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.loginContainer}>
        <Settings />
      </View>
    );
  }
}
SettingsScreen.navigationOptions = {
  title: "Settings and Preferences"
};
