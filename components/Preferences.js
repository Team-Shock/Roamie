import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Styles/styles";
import BackgroundButton from "./BackgroundButton";
import { connect } from "react-redux";
import { getPreferences } from "../store/preferences";
import reducer from "../store/reducer";

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  async componentDidMount() {
    await this.props.getPreferences();
  }

  isLoading() {
    if (this.props.preferences.length > 0) {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <View style={styles.preferencesContainer}>
        {this.props.preferences.length > 0 ? (
          this.props.preferences.map(pref => (
            <BackgroundButton key={pref.id} preference={pref.preference} />
          ))
        ) : (
          <Text>Loading...</Text>
        )}
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
