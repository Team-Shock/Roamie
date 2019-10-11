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
    console.log("COMPONENT MOUNTED", this.props);
    this.props.user.id ? this.updateState() : console.log("state not updated");
  }

  updateState() {
    const user = this.props.user;
    const prefs = this.props.user.preferences;
    console.log("#### Inside update state", user, prefs);
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

  renderReturn() {
    return (
      <View>
        <View style={styles.preferencesContainer}>
          {this.props.user.preferences ? (
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

  render() {
    if (this.props.user.preferences) {
      console.log("!!!!!   PREFERENCES EXIST", this.props.user.preferences);
      return this.renderReturn();
    } else {
      console.log("@@@@@@ PREFERENCES DO NOT EXIST", this.props);
      return null;
    }
  }
}

const mapStateToProps = state => {
  console.log("MAP STATE TO PROPS", state);
  return { user: state.user };
};

const mapDispatchToProps = dispatch => ({
  setPreferences: preferences => dispatch(setPreferences(preferences))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preferences);
