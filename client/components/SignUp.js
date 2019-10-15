import React from "react";
import { Text, TextInput, View, TouchableHighlight, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../Styles/styles";
import { auth } from "../store/userReducer";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", modalVisible: false };
    this.onSignUp = this.onSignUp.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onSignUp() {
    this.props.auth(this.state.email, this.state.password, "signup");
    this.setModalVisible(!this.state.modalVisible);
    this.props.navigation.navigate("Main");
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.loginContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Your email"
              onChangeText={email =>
                this.setState({ email: email.toLowerCase() })
              }
              value={this.state.email}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              placeholder="Your password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
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
        <View style={styles.loginButtonContainer}>
          <Icon.Button
            name="pencil"
            backgroundColor="#ffffff"
            color="#F277C6"
            onPress={() => {
              this.setModalVisible(true);
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

const SignUpModal = connect(
  null,
  mapDispatchToProps
)(SignUp);

export default withNavigation(SignUpModal);
