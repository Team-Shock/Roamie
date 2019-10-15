import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button, Alert} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../Styles/styles";
import Preferences from "./Preferences";
import { logout } from '../store/userReducer';
import { connect } from "react-redux";

class Settings extends Component{
  constructor(props){
    super(props)
  }
  onLogout(){
    Alert.alert("You have been logged out")
    this.props.logOutUser();
  }
  render(){
    return (
      <View style={styles.loginContainer}>
        <Preferences />
        <View style={styles.buttonContainer}>
          <Button title="Logout" onPress={() => this.onLogout()} />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logOutUser: () => dispatch(logout()),
});

export default connect (
null, mapDispatchToProps
)(Settings)
