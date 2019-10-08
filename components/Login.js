import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Styles/styles";
import LoginForm from "./LoginForm";
import * as Facebook from 'expo-facebook';
// import * as firebase from 'firebase'

export default class Login extends Component {npm 
  constructor(props) {
    super(props);
    this.state = { signedIn: false, name: "", photoUrl: "" };
  }

  signInWithFacebook = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('755192041599866', {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,birthday,picture.type(large)`);
        // console.log(await response.json())
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);

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
        <View style={styles.loginButtonContainer} >
          <Icon.Button
            name="facebook"
            backgroundColor="#ffffff"
            color="#F277C6"
            onPress={() => this.signInWithFacebook()}
          >
            Login with Facebook
          </Icon.Button>
        </View>      
      </View>
    );
  }
}
