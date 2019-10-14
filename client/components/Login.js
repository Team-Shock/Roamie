import React, { Component } from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
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
    this.state = { name: "", email: "", showLogin: false };
    this.onLogIn = this.onLogIn.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
  }
  onLogIn() {
    this.props.addOAuthUser(this.state.name, this.state.email);
    this.props.navigation.navigate("Settings");
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

const mapDispatchToProps = dispatch => ({
  addOAuthUser: (name, email) => dispatch(oauth(name, email))
});

const FacebookLogIn = connect(
  null,
  mapDispatchToProps
)(Login);

export default withNavigation(FacebookLogIn);
