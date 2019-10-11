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
      preferences: this.props.preferences,
      user: this.props.user
    };
    this.handlePress = this.handlePress.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  async componentDidMount() {
    this.props.user.id
      ? this.updateState()
      : console.log("Props from component", this.props);
  }

  async updateState() {
    const user = await this.props.user;
    const prefs = await this.props.preferences;
    await this.setState({
      loading: false,
      preferences: prefs,
      user: user
    });
  }

  async handlePress() {
    await this.props.me();
    await this.props.setPreferences(this.state.preferences);
    await this.props.getPreferences();
  }
  render() {
    console.log("props inside preferences", this.props);
    this.updateState();
    return (
      <View>
        <View style={styles.preferencesContainer}>
          {this.props.preferences.length > 0 ? (
            this.props.preferences.map(pref => (
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

const mapStateToProps = state => ({
  user: state.user,
  preferences: state.preferences
});

const mapDispatchToProps = dispatch => ({
  getPreferences: id => dispatch(getPreferences(id)),
  setPreferences: preferences => dispatch(setPreferences(preferences))
  // me: () => dispatch(me())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preferences);
