import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../Styles/styles";
import LoginForm from "./LoginForm";

import { auth, oauth } from "../store/user-reducer";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import About from "../components/About.js";

class Login extends Component {
  npm;
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", showAbout: false };
    this.onLogIn = this.onLogIn.bind(this);
  }
  onLogIn() {
    this.props.addOAuthUser(this.state.name, this.state.email);
    this.props.navigation.navigate("Settings");
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
        <LoginForm />
        <About />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addOAuthUser: (name, email) => dispatch(oauth(name, email))
});

const FacebookLogIn = connect(
  null,
  mapDispatchToProps
)(Login);

export default withNavigation(FacebookLogIn);
