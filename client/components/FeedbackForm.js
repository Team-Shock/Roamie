import React from "react";
import { Text, TextInput, View, TouchableHighlight, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../Styles/styles";
import { connect } from "react-redux";
import { submitFeedback } from "../store/tripsReducer";

// [x] edit component
// [ ] write actions and thunks for feedback
// [ ] connect to backend

class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feedbackText: "", modalVisible: false };

    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  onSubmit() {
    this.setModalVisible({ modalVisible: false });
    //this.props.submitFeedback(this.state.feedbackText);
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
              placeholder="Tell Roamie what you thought of this place"
              onChangeText={text => this.setState({ feedbackText: text })}
              value={this.state.feedbackText}
            />

            <View style={styles.loginButtonContainer}>
              <Icon.Button
                name="pencil"
                backgroundColor="#ffffff"
                color="#F277C6"
                onPress={() => {
                  this.onSubmit();
                }}
              >
                Submit Feedback
              </Icon.Button>
            </View>
          </View>
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
            style={styles.modalClose}
          >
            <Text>Return to Trip</Text>
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
            Submit Feedback
          </Icon.Button>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  submitFeedback: (feedbackText, liked) =>
    dispatch(submitFeedback(feedbackText, liked))
});

export default connect(
  null,
  mapDispatchToProps
)(FeedbackForm);
