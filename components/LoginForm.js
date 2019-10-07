import React from "react";
import { Text, TextInput, View, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Styles/styles";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
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
              alert("You are now signed in!");
            }}
          >
            Login with your email
          </Icon.Button>
        </View>
      </View>
    );
  }
}
