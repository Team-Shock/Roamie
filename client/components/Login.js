
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
        <TouchableHighlight
          onPress={() => {
            this.toggleLogin();
          }}
          style={styles.loginButtonContainer}
        >
          <Text style={styles.modalButtonText}>Enter</Text>
        </TouchableHighlight>
        {this.state.showLogin ? <LoginForm /> : null}
        <About />
      </View>
    );
  }
}


export default withNavigation(Login);

