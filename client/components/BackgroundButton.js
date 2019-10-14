import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "../../Styles/styles";

export default class BackgroundButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.pref.selected
    };
    this.toggleSelected = this.toggleSelected.bind(this);
  }
  toggleSelected() {
    this.setState({ selected: !this.state.selected });
    this.props.pref.selected = !this.props.pref.selected;
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.backgroundButtonTouchable}
        onPress={this.toggleSelected}
      >
        {this.state.selected ? (
          <View style={styles.backgroundButtonSelected}>
            <Text style={styles.backgroundButtonText}>
              {this.props.pref.name}
            </Text>
          </View>
        ) : (
          <View style={styles.backgroundButtonDeselected}>
            <Text style={styles.backgroundButtonText}>
              {this.props.pref.name}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}
