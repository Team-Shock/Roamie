import React, { Component } from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import { styles } from "../../Styles/styles";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import About from "../components/About.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", showLogin: false };
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  signInWithFacebook = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync("755192041599866", {
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,birthday,picture.type(large)`
        );
        const res = await response.json();
        this.setState({ name: res.name, email: res.email });
        this.onLogIn();
        Alert.alert("Logged in!", `Welcome ${res.name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  toggleLogin(event) {
    this.setState({ showLogin: !this.state.showLogin });
  }
  render() {
    let logo = {
      uri:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/88ee8450916825.58dd083a2f888.jpg"
    };
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginHeader}>Welcome to Roamie</Text>
        <Text style={styles.loginText}>
          A travel companion {"\n"} for exploring near and far!
        </Text>
        <Image source={logo} style={styles.logo} />

        {this.state.showLogin ? (
          <LoginForm />
        ) : (
          <TouchableHighlight
            onPress={() => {
              this.toggleLogin();
            }}
            style={styles.loginButtonContainer}
          >
            <Text style={styles.modalButtonText}>Enter</Text>
          </TouchableHighlight>
        )}
        <About />
      </View>
    );
  }
}

export default withNavigation(Login);
