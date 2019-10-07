import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Styles/styles";
import BackgroundButton from "./BackgroundButton";

const preferenceArr = [
  { id: 1, preference: "coffee" },
  { id: 2, preference: "brunch" },
  { id: 3, preference: "breakfast" },
  { id: 4, preference: "dinner" },
  { id: 5, preference: "$" },
  { id: 6, preference: "$$" },
  { id: 7, preference: "$$$" },
  { id: 8, preference: "family friendly" },
  { id: 9, preference: "dog friendly" },
  { id: 10, preference: "romantic" },
  { id: 11, preference: "laptop friendly" },
  { id: 12, preference: "indie" },
  { id: 13, preference: "local favorite" },
  { id: 14, preference: "ice cream" },
  { id: 15, preference: "scenic" },
  { id: 16, preference: "outdoorsy" }
];

export default class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
  }
  render() {
    return (
      <View style={styles.preferencesContainer}>
        {preferenceArr.map(pref => (
          <BackgroundButton key={pref.id} preference={pref.preference} />
        ))}
      </View>
    );
  }
}
