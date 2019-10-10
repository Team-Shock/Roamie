import React from "react";
import { Text, TextInput, View, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../Styles/styles";
import { auth } from "../store/user-reducer";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.onLogIn = this.onLogIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  onLogIn() {
    this.props.auth(this.state.email, this.state.password, "login");
    this.props.navigation.navigate("Settings");
  }

  onSignUp() {
    this.props.auth(this.state.email, this.state.password, "signup");
    this.props.navigation.navigate("Settings");
  }
  render() {
    return (
      <View>
        <TextInput
          style={{ height: 40 }}
          placeholder="Your email"
          onChangeText={email => this.setState({ email: email.toLowerCase() })}
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
            name="envelope"
            backgroundColor="#ffffff"
            color="#F277C6"
            onPress={() => {
              this.onSignUp();
            }}
          >
            Sign Up
          </Icon.Button>
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
