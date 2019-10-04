import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Styles/styles";

export default class Login extends Component {
  render() {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Current trip will go here</Text>
      </View>
    );
  }
}
