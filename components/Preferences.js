import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { styles } from "../Styles/styles";
import BackgroundButton from "./BackgroundButton";
import { connect } from "react-redux";
import { getPreferences, setPreferences } from "../store/preferences";

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      preferences: []
    };
    this.handlePress = this.handlePress.bind(this);
  }
  async componentDidMount() {
    await this.props.getPreferences();
    await this.setState({
      loading: false,
      preferences: this.props.preferences
    });
  }

  async handlePress() {
    this.props.setPreferences(this.state.preferences);
  }
  render() {
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
  preferences: state.preferences
});

const mapDispatchToProps = dispatch => ({
  getPreferences: () => dispatch(getPreferences()),
  setPreferences: preferences => dispatch(setPreferences(preferences))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preferences);
