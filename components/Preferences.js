import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Styles/styles";
import BackgroundButton from "./BackgroundButton";
import { connect } from "react-redux";

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
  }
  async componentDidMount() {
    await this.props.getPreferences();
  }

  render() {
    return (
      <View style={styles.preferencesContainer}>
        {this.state.selected.map(pref => (
          <BackgroundButton key={pref.id} preference={pref.preference} />
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  preferences: state.preferences
});

const mapDispatchToProps = dispatch => ({
  getPreferences: () => dispatch(getPreferences())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preferences);
