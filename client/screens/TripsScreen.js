import React from "react";
import { ExpoConfigView } from "@expo/samples";
import Trips from "../components/Trips";
import { View } from "react-native";
import { styles } from "../../Styles/styles";

export default function TripsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Trips />
    </View>
  );
}

TripsScreen.navigationOptions = {
  title: "My Trips"
};
