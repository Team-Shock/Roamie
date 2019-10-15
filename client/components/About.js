import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, Alert } from "react-native";
import { styles } from "../../Styles/styles";

export default class About extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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
          <View style={styles.modalContainer}>
            <View>
              <Text style={styles.loginHeader}>About Roamie</Text>
              <Text style={styles.about}>
                Roamie accompanies users as they explore their home city or a
                city they're just visiting for the first time! She offers users
                options in digestible sets of three for activities or places to
                visit based on their preferences (budget, interests, favorite
                activities) and their location, and allows users to rate and
                describe their experiences through words and pictures in a trip
                diary that they can share with friends.
                {"\n\n"}
                As users visit a new place, Roamie will serve up new suggestions
                for what to do next, and a map visualization will show where the
                user has been so far and what they've done. Roamie can remind a
                user of a beautiful day they spent in their hometown, or help
                tell the story of the spots they visited while adventuring away
                from home.
              </Text>
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
          <Text style={styles.modalButtonText}>About</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
