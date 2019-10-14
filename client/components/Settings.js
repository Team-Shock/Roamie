import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../Styles/styles";
import Preferences from "./Preferences";
import { logout } from "../store/user-reducer";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

class Settings extends Component {
  constructor(props) {
    super(props);
  }
  onLogout() {
    Alert.alert("You have been logged out");
    this.props.logOutUser();
    this.props.navigation.navigate("Login");
  }
  render() {
    return (
      <View style={styles.loginContainer}>
        <Preferences />
        <View style={styles.loginButtonContainer}>
          <Button
            style={styles.loginButton}
            title="Logout"
            onPress={() => this.onLogout()}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logOutUser: () => dispatch(logout())
});

const SettingsComponent = connect(
  null,
  mapDispatchToProps
)(Settings);

export default withNavigation(SettingsComponent);
