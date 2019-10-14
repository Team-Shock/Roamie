import React from "react";
import { Text, TextInput, View, TouchableHighlight, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../Styles/styles";
import { auth } from "../store/user-reducer";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import * as Facebook from "expo-facebook";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", modalVisible: false };
    this.onLogIn = this.onLogIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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
        // console.log(await response.json())
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.loginContainer}>
            <TextInput
              style={{ height: 40 }}
              placeholder="Your email"
              onChangeText={email =>
                this.setState({ email: email.toLowerCase() })
              }
              value={this.state.email}
            />
            <TextInput
              secureTextEntry={true}
              style={{ height: 40 }}
              placeholder="Your password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <View style={styles.loginButtonContainer}>
              <Icon.Button
                name="envelope"
                backgroundColor="#ffffff"
                color="#F277C6"
                onPress={() => {
                  this.onLogIn();
                }}
              >
                Login
              </Icon.Button>
            </View>
            <View style={styles.loginButtonContainer}>
              <Icon.Button
                name="pencil"
                backgroundColor="#ffffff"
                color="#F277C6"
                onPress={() => {
                  this.onSignUp();
                }}
              >
                Sign Up
              </Icon.Button>
            </View>
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
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
            style={styles.modalClose}
          >
            <Text>Return to Login</Text>
          </TouchableHighlight>
        </Modal>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
          style={styles.loginButtonContainer}
        >
          <Text style={styles.modalButtonText}>Enter</Text>
        </TouchableHighlight>
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
