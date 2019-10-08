import React from "react";
import { Text, TextInput, View, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Styles/styles";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: ""};
  }

  onLogIn(){
    auth(this.state.email, this.state.password, 'login')
  }

  onSignUp(){
    auth(this.state.email, this.state.password, 'signup')
  }

  render() {
    return (
      <View>
        <TextInput
          style={{ height: 40 }}
          placeholder="Your email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
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
  authUser: (email, password, requestType) => dispatch(auth(email, password, requestType))
})

export const LoginOrSignUp = connect(null, mapDispatchToProps)(AuthForm)

