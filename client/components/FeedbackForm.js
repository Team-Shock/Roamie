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
    this.state = { feedbackText: "", liked: true, modalVisible: false };

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
          style={{ marginTop: 50 }}
        >
          <View style={styles.loginContainer}>
            <Text style={styles.loginHeader}>
              How was {this.props.item.name}?
            </Text>
            <TextInput
              multiline={true}
              style={{ height: 250, width: 250, margin: 15 }}
              placeholder="Tell Roamie what you thought, or make a note about anything memorable about this spot"
              onChangeText={text => this.setState({ feedbackText: text })}
              value={this.state.feedbackText}
            />

            {this.state.liked ? (
              <Text style={styles.loginText}>I like this place</Text>
            ) : (
              <Text style={styles.loginText}>I dislike this place</Text>
            )}
            <View style={styles.loginButtonContainer}>
              <Icon.Button
                name="thumbs-up"
                backgroundColor="#ffffff"
                color="#F277C6"
                onPress={() => this.setState({ liked: true })}
              >
                I liked this place
              </Icon.Button>
            </View>
            <View style={styles.loginButtonContainer}>
              <Icon.Button
                name="thumbs-down"
                backgroundColor="#ffffff"
                color="#F277C6"
                onPress={() => {
                  this.setState({ liked: false });
                }}
              >
                I disliked this place
              </Icon.Button>
            </View>

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
        <View style={{ textAlign: "center" }}>
          <Icon.Button
            name="pencil"
            backgroundColor="rgba(255, 255, 255, 1)"
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

//This thunk doesn't exist yet
const mapDispatchToProps = dispatch => ({
  submitFeedback: (feedbackText, liked) =>
    dispatch(submitFeedback(feedbackText, liked))
});

export default connect(
  null,
  mapDispatchToProps
)(FeedbackForm);
