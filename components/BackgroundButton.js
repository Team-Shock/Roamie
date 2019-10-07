import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { styles } from "../Styles/styles";

export default class BackgroundButton extends React.Component {
  render() {
    console.log("FROM BACKGROUND BUTTON", this.props);
    return (
      <TouchableOpacity style={styles.backgroundButtonTouchable}>
        <View style={styles.backgroundButtonView}>
          <Text style={styles.backgroundButtonText}>
            {this.props.preference}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
