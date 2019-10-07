import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { styles } from "../Styles/styles";

export default class BackgroundButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.backgroundButtonTouchable}
        onPress={this.props.onPress}
      >
        <View style={styles.backgroundButtonView}>
          <Text style={styles.backgroundButtonText}>
            {this.props.preference || "Preference"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
