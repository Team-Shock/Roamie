import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Styles/styles";
import Expo from "expo"
import * as Google from 'expo-google-app-auth'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {signedIn: false, name: "", photoUrl: ""}
  }

  signIn = async () => {

    const { type, accessToken, user } = await Google.logInAsync({
      iosClientId: `323507649259-2qu9db15nbstgaij50nq2m7cbqke4p8s.apps.googleusercontent.com`,
      // androidClientId: `<YOUR_ANDROID_CLIENT_ID_FOR_EXPO>`,
      // iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
      // androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
    });
    
    if (type === 'success') {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
      console.log(user);
    }


    // try {
    //   const result = await Expo.Google.logInAsync({
    //     iosClientId: "323507649259-njkthh8sk30ls1na07p56ahp2qjpj4dn.apps.googleusercontent.com",
    //     //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
    //     scopes: ["profile", "email"]
    //   })
    //   if (result.type === "success") {
    //     this.setState({
    //       signedIn: true,
    //       name: result.user.name,
    //       photoUrl: result.user.photoUrl
    //     })
    //   } else {
    //     console.log("cancelled")
    //   }
  
    // } catch (e) {
    //   console.log("error", e)
    // }
  }

  render() {
    let logo = {
      uri:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/88ee8450916825.58dd083a2f888.jpg"
    };
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Welcome to Roamie</Text>
        <Image source={logo} style={styles.logo} />

        {this.state.signedIn ? (
          <View>
            <Text> Welcome {this.state.name} </Text>
            <Image source={{uri: this.state.photoUrl}} />
          </View>
        ) : (
          <View>
          <View style={styles.loginButtonContainer} onPress={() => this.signIn()}>
            <Icon.Button name="google" backgroundColor="#ffffff" color="pink" onPress={() => this.signIn()}>
              Login with Google
            </Icon.Button>
          </View>
          <View style={styles.loginButtonContainer}>
            <Icon.Button name="instagram" backgroundColor="#ffffff" color="pink">
              Login with Instagram
            </Icon.Button>
          </View>
          </View>
        )}
      
      </View>
    );
  }
}
