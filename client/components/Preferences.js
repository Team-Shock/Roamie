import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { styles } from "../../Styles/styles";
import BackgroundButton from "./BackgroundButton";
import { connect } from "react-redux";
import { getPreferences, setPreferences } from "../store/preferences";
import { me } from "../store/user-reducer";

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      preferences: [],
      user: {}
    };
    this.handlePress = this.handlePress.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  componentDidMount() {
    this.props.user.id ? this.updateState() : console.log("state not updated");
  }

  updateState() {
    const user = this.props.user;
    const prefs = this.props.user.preferences;
    this.setState({
      loading: false,
      preferences: prefs,
      user: user
    });
  }

  async handlePress() {
    await this.props.me();
    await this.props.setPreferences(this.state.preferences);
  }
  render() {
    return (
      <View>
        <View style={styles.preferencesContainer}>
          {this.props.user && this.props.user.preferences && this.props.user.preferences.length > 0 ? (
            this.props.user.preferences.map(pref => (
              <BackgroundButton key={pref.id} pref={pref} />
            ))
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title="Submit edits to preferences"
            onPress={this.handlePress}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

const mapDispatchToProps = dispatch => ({
  setPreferences: preferences => dispatch(setPreferences(preferences)),
  me: () => dispatch(me())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preferences);
