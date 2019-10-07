import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Styles/styles";
import LoginForm from "./LoginForm";
import Expo from "expo";
import * as Google from "expo-google-app-auth";
import { googleAPIConfig } from "../secrets";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { signedIn: false, name: "", photoUrl: "" };
  }

  signIn = async () => {
    const { type, accessToken, user } = await Google.logInAsync(
      googleAPIConfig
    );

    if (type === "success") {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
      console.log(user);
    }
  };

  render() {
    let logo = {
      uri:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/88ee8450916825.58dd083a2f888.jpg"
    };
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Welcome to Roamie</Text>
        <Image source={logo} style={styles.logo} />
        <LoginForm />
        <View style={styles.loginButtonContainer}>
          <Icon.Button name="google" backgroundColor="#ffffff" color="#F277C6">
            Login with Google
          </Icon.Button>
        </View>
        <View style={styles.loginButtonContainer}>
          <Icon.Button
            name="facebook"
            backgroundColor="#ffffff"
            color="#F277C6"
          >
            Login with Facebook
          </Icon.Button>
        </View>
      </View>
    );
  }
}
