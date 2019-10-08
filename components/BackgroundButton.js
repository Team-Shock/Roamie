import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "../Styles/styles";

export default class BackgroundButton extends React.Component {
  render() {
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
