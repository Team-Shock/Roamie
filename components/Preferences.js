import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Styles/styles";
import BackgroundButton from "./BackgroundButton";

const preferenceArr = [
  "coffee",
  "bar",
  "lunch",
  "brunch",
  "dinner",
  "$",
  "$$",
  "$$$",
  "outdoors",
  "cozy",
  "vegan-friendly",
  "carnivorous",
  "family friendly",
  "romantic"
];

export default class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected
    };
    this.onPress = this.onPress.bind(this);
    this.makeButtons = this.makeButtons.bind(this);
  }

  onPress = tag => {
    let selected;
    if (this.props.isExclusive) {
      selected = [tag];
    } else {
      selected = addOrRemove(this.state.selected, tag);
    }
    this.setState({
      selected
    });
  };

  makeButtons() {
    // this is working off a dummy array for now
    return preferenceArr.map((tag, i) => {
      <BackgroundButton
        onPress={() => {
          this.onPress(tag);
        }}
        key={i}
        preference={tag}
      />;
    });
  }

  render() {
    return <View style={styles.container}>{this.makeButtons()}</View>;
  }
}
