import React from "react";
import { Text, TextInput, View, TouchableHighlight, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../Styles/styles";
import { auth } from "../store/user-reducer";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

class LoginNoAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", modalVisible: false };
    this.onLogIn = this.onLogIn.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  onLogIn() {
    this.setModalVisible({ modalVisible: false });
    this.props.auth(this.state.email, this.state.password, "login");
    this.props.navigation.navigate("Main");
  }

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
            name="envelope"
            backgroundColor="#ffffff"
            color="#F277C6"
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            Login
          </Icon.Button>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  auth: (email, password, method) => dispatch(auth(email, password, method))
});

const LoginModal = connect(
  null,
  mapDispatchToProps
)(LoginNoAuth);

export default withNavigation(LoginModal);
