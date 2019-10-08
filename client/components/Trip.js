import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  ImageBackground
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { tsMethodSignature } from "@babel/types";
import { styles } from "../Styles/styles";

export function Trip(props) {
  return (
    <View style={styles.tripLogRow}>
      <Image
        source={{ uri: props.tripInfo.imageUrl }}
        style={styles.listImage}
      />
      <View>
        <Text style={styles.eventTitle}>{props.tripInfo.name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Hide from TripLog" />
      </View>
    </View>
  );
}
