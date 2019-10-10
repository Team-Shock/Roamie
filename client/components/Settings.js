import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../Styles/styles";
import Preferences from "./Preferences";

export default function Settings() {
  return (
    <View style={styles.loginContainer}>
      <Preferences />
    </View>
  );
}
