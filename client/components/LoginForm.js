import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../Styles/styles";
import { auth } from "../store/userReducer";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import * as Facebook from "expo-facebook";
import SignUp from "./SignUp";
import LoginNoAuth from "./LoginNoAuth";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onLogIn = this.onLogIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  onLogIn() {
    this.props.auth(this.state.email, this.state.password, "login");
    this.props.navigation.navigate("Main");
  }

  onSignUp() {
    this.props.auth(this.state.email, this.state.password, "signup");
    this.props.navigation.navigate("Main");
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
  render() {
    return (
      <View>
        <View>
          <LoginNoAuth />

          <SignUp />

          <View style={styles.loginButtonContainer}>
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
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  auth: (email, password, method) => dispatch(auth(email, password, method))
});

const LogInOrSignUp = connect(
  null,
  mapDispatchToProps
)(LoginForm);

export default withNavigation(LogInOrSignUp);
