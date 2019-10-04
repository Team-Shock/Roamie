import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Styles/styles";

export default class Login extends Component {
  render() {
    let logo = {
      uri:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/88ee8450916825.58dd083a2f888.jpg"
    };
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Welcome to Roamie</Text>
        <Image source={logo} style={styles.logo} />
        <View style={styles.loginButtonContainer}>
          <Icon.Button name="google" backgroundColor="#ffffff" color="pink">
            Login with Google
          </Icon.Button>
        </View>
        <View style={styles.loginButtonContainer}>
          <Icon.Button name="instagram" backgroundColor="#ffffff" color="pink">
            Login with Instagram
          </Icon.Button>
        </View>
      </View>
    );
  }
}
