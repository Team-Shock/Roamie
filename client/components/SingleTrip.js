import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  ImageBackground,
  ScrollView
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { tsMethodSignature } from "@babel/types";
import { styles } from "../../Styles/styles";

export function SingleTrip(props) {
  console.log("Single Trip", props.tripInfo)
  let trip = props.tripInfo

  return (
    <View>
      <Image
        source={{ uri: props.tripInfo.imageUrl }}
        style={styles.listImage}
      />
      <View>
        <Text style={styles.eventTitle}>{props.tripInfo.name}</Text>
        <ScrollView>
            {trip.places && trip.places.map(place => 
            (
              <View style={styles.tripLogRow} key={place.id}>
              <Image
                source={{ uri: place.imageUrl }}
                style={styles.listImage}
              />
              <View>
                <Text style={styles.eventTitle}>{place.name}</Text>
              </View>
            </View>
            ))}
          </ScrollView>
      </View>
    </View>
  );
}
